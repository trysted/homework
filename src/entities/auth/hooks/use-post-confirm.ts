import axios from "axios";
import { useMutation } from "react-query";

const baseUrlString = 'https://stoplight.io/mocks/kode-education/kode-bank/27774162'

type FetcherProps = {
    phone: string
    pinCode: string
    otpId: string
}

const fetcher = async (params: FetcherProps): Promise<string> => {
    const path = '/api/auth/confirm'
    const configurationObject = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'phone': params.phone,
            'otpId': params.otpId,
            'otpCode': params.pinCode,
        }),
        url: `${baseUrlString}${path}`,
    };
    const response = await axios(configurationObject)
    return response.data
}

export const usePostConfirm = () => {
    return useMutation(({phone, pinCode, otpId}: FetcherProps) => fetcher({phone, pinCode, otpId}))
}