import { AuthTokensData } from "@shared/types/types";
import axios from "axios";
import { useMutation } from "react-query";

const baseUrlString = 'https://stoplight.io/mocks/kode-education/kode-bank/27774162'

type FetcherProps = {
    password: string,
    guestToken: string
}

const fetcher = async (params: FetcherProps): Promise<AuthTokensData> => {
    const path = '/api/auth/confirm'
    const configurationObject = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'password': params.password,
            'guestToken': params.guestToken
        }),
        url: `${baseUrlString}${path}`,
    };
    const response = await axios(configurationObject)
    return response.data
}

export const usePostPassword = () => {
    return useMutation(({password, guestToken}: FetcherProps) => fetcher({password, guestToken}))
}