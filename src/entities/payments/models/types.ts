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