import { useMutation } from "react-query";

const baseUrlString = 'https://stoplight.io/mocks/kode-education/kode-bank/27774162'

type FetcherProps = {
    phone: string
    pinCode: string
    otpId: string
}

const fetcher = async (phone: string, pinCode: string, otpId: string): Promise<string> => {
    const path = '/api/auth/confirm'
    const request = await fetch(baseUrlString + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'phone': phone,
            'otpId': otpId,
            'otpCode': pinCode
        })
    })
    const data = request.json()
    return data    
}

export const usePostConfirm = () => {
    return useMutation(({phone, pinCode, otpId}: FetcherProps) => fetcher(phone, pinCode, otpId))
}