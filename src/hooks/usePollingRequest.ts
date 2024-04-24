import { useEffect, useState } from 'react'
import { getRates, IRates, IRatesDto } from '../api/api'

const initialRates: IRates = {
    RUB: 0,
    USD: 0,
    EUR: 0,
}

export const usePollingRequest = (
    url: string,
    urlPoll: string,
    setError: (error: Error) => void,
    delay: number | null,
    setDelay: (newDelay: number | null) => void
): IRates => {
    const [rates, setRates] = useState<IRates>(initialRates)

    const getPoll = (urlPoll: string) => {
        getRates(urlPoll)
            .then((res: IRatesDto) => {
                setRates(res.rates)
            })
            .catch((error: Error) => {
                setDelay(null)
                setError(error)
            })
    }

    useEffect(() => {
        getRates(url)
            .then((res: IRatesDto) => setRates(res.rates))
            .catch((error: Error) => {
                setDelay(null)
                setError(error)
            })
    }, [url])

    useEffect(() => {
        if (delay !== null) {
            const intervalId = setInterval(() => getPoll(urlPoll), delay)

            return () => {
                clearInterval(intervalId)
            }
        }
    }, [urlPoll, delay])

    return rates
}
