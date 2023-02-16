import { AuthTokensData } from "@shared/types/types";
import { useMutation } from "react-query";

const baseUrlString = 'https://stoplight.io/mocks/kode-education/kode-bank/27774162'

type FetcherProps = {
    password: string,
    guestToken: string
}

const fetcher = async (password: string, guestToken: string): Promise<AuthTokensData> => {
    const path = '/api/auth/confirm'
    const request = await fetch(baseUrlString + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'password': password,
            'guestToken': guestToken
        })
    })
    const data = request.json()
    return data    
}

export const usePostPassword = () => {
    return useMutation(({password, guestToken}: FetcherProps) => fetcher(password, guestToken))
}