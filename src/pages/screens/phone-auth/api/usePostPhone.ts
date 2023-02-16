import { useMutation } from "react-query";
import { AuthData } from "@shared/types/types";

const baseUrlString = 'https://stoplight.io/mocks/kode-education/kode-bank/27774162'

const fetcher = async (phone: string): Promise<AuthData> => {
    const path = '/api/auth/login'
    const request = await fetch(baseUrlString + path, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "phone": phone
        })
    })
    const data = request.json()
    return data    
}

export const usePostPhone = () => {
    return useMutation((phone: string) => fetcher(phone))
}
