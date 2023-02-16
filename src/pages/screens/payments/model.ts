import { createEffect, createStore, combine } from "effector";
import { PaymentCategory } from "@shared/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cache } from "react-native-cache";
import { PaymentParser } from "@pages/api/payment-parser";

export const $payments = createStore<PaymentCategory[] | null>([])
export const $fetchError = createStore<Error | null>(null)

export const cache = new Cache({
    namespace: "appCache",
    policy: {
        maxEntries: 1,
        stdTTL: 60 * 60 * 24
    },
    backend: AsyncStorage
});

export const fetchPaymentsFx = createEffect(async () => {
    const paymentsCache = await cache.get('payments')
    if (paymentsCache) {
        return JSON.parse(paymentsCache)
    }
    const response = await fetch('https://github.com/kode-frontend/files/raw/main/categories.json');
    const json = await response.json();
    const payments = PaymentParser({ paymentCategoriesDTO: json.category })
    cache.set('payments', JSON.stringify(payments))
    return payments
})

export const $paymentsGetStatus = combine({
    loading: fetchPaymentsFx.pending,
    error: $fetchError,
    data: $payments,
});

$payments.on(fetchPaymentsFx.doneData, (_, payload) => payload)

$fetchError
  .on(fetchPaymentsFx.fail, (_, { error }) => error)
  .reset(fetchPaymentsFx.done);

export const clearCache = () => {
    cache.remove('payments')
}

export const clearError = () => {
    $fetchError.reset()
}