import { createStore, createEvent } from "effector";
import { AuthData, AuthTokensData, ServiceCategory } from "@shared/types/types";

export const $filteredServices = createStore<ServiceCategory[]>([])

export const searchServices = createEvent<{ text: string, initialData: ServiceCategory[] }>()
export const setServices = createEvent<ServiceCategory[]>()

$filteredServices.on(setServices, (_, payload) => payload)

$filteredServices
  .on(searchServices, (_, { text, initialData }) => {
    if (text) {
        const formattedQuery = text.toLowerCase()
        const filterData = initialData.filter(item => item.serviceName.toLowerCase().includes(formattedQuery))
        return filterData
    } else {
        return initialData
    }
})