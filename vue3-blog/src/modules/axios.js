import { axios } from '@bundled-es-modules/axios'

export default function () {
    const BASE_URL = 'http://localhost:8000';
    const axiosGet = (URL, onSuccess = null, onFailed = null) => {
        const final_URL = URL.startsWith('http') ? URL : BASE_URL + URL;
        axios.get(final_URL).then((res) => {
            if (res.status === 200 && res.data.rsp === 'ok') {
                if (onSuccess) {
                    onSuccess(res.data)
                } else {
                    if (onFailed) {
                        onFailed(res.data)
                    }
                }
            }
        })
    }
    return {
        axiosGet
    }
}