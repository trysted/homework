export type PaymentCategory = {
    categoryId: string,
    categoryName: string,
    categoryIcon: string,
    services: ServiceCategory[]
}

export type ServiceCategory = {
    serviceId: string,
    serviceName: string,
    serviceIcon: string
}

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

export type AuthData = {
    otpId: string
    otpCode: string
}

export type AuthTokensData = {
    accessToken: string
    refreshToken: string
}