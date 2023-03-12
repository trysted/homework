import { restore, createEvent } from "effector";
import { ServiceCategory } from "@shared/types/types";

export const searchServices = createEvent<{ text: string, initialData: ServiceCategory[] }>()
export const setServices = createEvent<ServiceCategory[]>()

export const $filteredServices = restore(setServices, [])

$filteredServices
  .on(searchServices, (_, { text, initialData }) => {
    if (!text) {
        return initialData
    }

    const formattedQuery = text.toLowerCase()

    return  initialData.filter(item => item.serviceName.toLowerCase().includes(formattedQuery))
})