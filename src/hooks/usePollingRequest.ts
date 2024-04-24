import { useEffect, useState } from 'react'
import { getRates, IRates, IRatesDto } from '../api/api'

const initialRates: IRates = {
    RUB: 0,
    USD: 0,
    EUR: 0,
}

/**
 * @param url For the first request to the server.
 * @param urlPoll To receive new data from the server.
 * @param setError Function to receive the error object.
 * @param delay Delay between requests to the server.
 * @param setDelay Function for setting a new delay value.
 *                 Needed to abort requests when an error is received.
 *
 * @returns rates - Received data.
 */
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
        getPoll(url)
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
