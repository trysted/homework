import { createEffect, createStore, combine, restore } from "effector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cache } from "react-native-cache";
import { PaymentParser } from "@pages/api/payment-parser";
import axios from "axios";

export const $fetchError = createStore<Error | null>(null)

export const cache = new Cache({
    namespace: "appCache",
    policy: {
        maxEntries: 1,
        stdTTL: 60 * 60 * 24
    },
    backend: AsyncStorage
});

export const fetchPaymentsFx = createEffect(async (ignoreCache: boolean) => {
    if (ignoreCache) {
        clearCache()
    }
    const paymentsCache = await cache.get('payments')
    if (paymentsCache) {
        try {
            return JSON.parse(paymentsCache)
        } catch {
            clearCache()
            throw new Error('Invalid cache')
        }
    }
    const response = await axios.get('https://github.com/kode-frontend/files/raw/main/categories.json')
    const data = response.data
    const payments = PaymentParser({ paymentCategoriesDTO: data.category })
    cache.set('payments', JSON.stringify(payments))
    return payments
})

export const $payments = restore(fetchPaymentsFx.doneData, null)

export const $paymentsGetStatus = combine({
    loading: fetchPaymentsFx.pending,
    error: $fetchError,
    data: $payments,
});


$fetchError
  .on(fetchPaymentsFx.fail, (_, { error }) => error)
  .reset(fetchPaymentsFx.done);

const clearCache = () => {
    cache.remove('payments')
}

export const clearError = () => {
    $fetchError.reset()
}