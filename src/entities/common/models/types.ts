import { ServiceCategory } from "@entities/payments/models/types"

export type StackParamList = {
    phoneAuth: undefined,
    pinCode: undefined,
    errorScreen: undefined,
    passwordScreen: undefined,
    successScreen: undefined,
    mainTabBarScreen: undefined,
    paymentsType: undefined,
    paymentServices: {
        title: string,
        services: ServiceCategory[]
    },
    payment: {
        service: ServiceCategory
    }
}