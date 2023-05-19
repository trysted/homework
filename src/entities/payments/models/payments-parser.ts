type ServiceCategoryDTO = {
    service_id: string,
    service_name: string,
    service_icon: string
}

type PaymentCategoryDTO = {
    category_id: string,
    category_name: string,
    category_icon: string,
    services: ServiceCategoryDTO[]
}

type PaymentParserProps = {
    paymentCategoriesDTO: PaymentCategoryDTO[]
}

export const PaymentParser = ({ paymentCategoriesDTO }: PaymentParserProps) => {
    return paymentCategoriesDTO.map(item => ({
        categoryId: item.category_id,
        categoryName: item.category_name,
        categoryIcon: item.category_icon,
        services: item.services.map(item => ({
            serviceId: item.service_id,
            serviceName: item.service_name,
            serviceIcon: item.service_icon
        }))
    }
    ))
}