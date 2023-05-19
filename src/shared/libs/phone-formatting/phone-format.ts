import { phoneMask } from "./phone-mask"

export const phoneFormat = (value: string, mask: phoneMask): string => {
    const countryCode = '7'
    let index = 0
    let replacedIndex = -1
    const formattedValue = value.replace(/[^\d]/g, '')
    const filteredString = mask.replace(/#/g, (_, j) => {
        if (index >= formattedValue.length) {
            return '#'
        }
        replacedIndex = j
        if (j == 1 && formattedValue[0] != countryCode) {
            return countryCode
        }
        return formattedValue[index++];
    })
    const filteredSubstring = filteredString.substring(0, replacedIndex + 1)
    return filteredSubstring
}