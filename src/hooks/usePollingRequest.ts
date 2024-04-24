import { useEffect, useState } from 'react'
import { getRates, IRates, IRatesDto } from '../api/api'

export const usePollingRequest = (
    url: string,
    urlPoll: string,
    delay: number = 3000
): IRates | undefined => {
    const [rates, setRates] = useState<IRates>()

    const getPoll = (urlPoll: string) => {
        getRates(urlPoll).then((res: IRatesDto) => {
            setRates(res.rates)
        })
    }

    useEffect(() => {
        getRates(url).then((res: IRatesDto) => setRates(res.rates))
    }, [url])

    useEffect(() => {
        const intervalId = setInterval(() => getPoll(urlPoll), delay)

        return () => {
            clearInterval(intervalId)
        }
    }, [urlPoll])

    return rates
}
