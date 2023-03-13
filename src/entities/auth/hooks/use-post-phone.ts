import { useMutation } from "react-query";
import { AuthData } from "@entities/auth/models/types";
import axios from "axios";

const baseUrlString = 'https://stoplight.io/mocks/kode-education/kode-bank/27774162'

const fetcher = async (phone: string): Promise<AuthData> => {
    const path = '/api/auth/login'
    const configurationObject = {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            "phone": phone
        }),
        url: `${baseUrlString}${path}`,
    };
    const response = await axios(configurationObject)
    return response.data
}

export const usePostPhone = () => {
    return useMutation((phone: string) => fetcher(phone))
}
