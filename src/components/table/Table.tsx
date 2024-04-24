import { useState } from 'react'
import { usePollingRequest } from '../../hooks/usePollingRequest'
import { getFixedNumber } from '../../helpers/getFixedNumber'

import './table.scss'
import clsx from 'clsx'

export const Table = () => {
    const [error, setError] = useState<Error>()
    const [delay, setDelay] = useState<number | null>(2000)

    const firstRates = usePollingRequest(
        'first',
        'first/poll',
        setError,
        delay,
        setDelay
    )
    const secondRates = usePollingRequest(
        'second',
        'second/poll',
        setError,
        delay,
        setDelay
    )
    const thirdRates = usePollingRequest(
        'third',
        'third/poll',
        setError,
        delay,
        setDelay
    )

    const renderTableValues = (items: number[]) => {
        const minValue = Math.min.apply(null, items)

        return items.map((item, index) => (
            <td
                key={index}
                className={clsx(
                    'table__body-item',
                    minValue == item && 'table__body-item_active'
                )}>
                {item}
            </td>
        ))
    }

    if (error?.message) {
        return <div>{error.message}</div>
    }

    return (
        <table className='table'>
            <thead className='table__head'>
                <tr>
                    <th className='table__head-item'>Pair name/market</th>
                    <th className='table__head-item'>First</th>
                    <th className='table__head-item'>Second</th>
                    <th className='table__head-item'>Third</th>
                </tr>
            </thead>

            <tbody className='table__body'>
                <tr>
                    <td className='table__body-item'>RUB/CUPCAKE</td>
                    {renderTableValues([
                        getFixedNumber(firstRates.RUB),
                        getFixedNumber(secondRates.RUB),
                        getFixedNumber(thirdRates.RUB),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>USD/CUPCAKE</td>
                    {renderTableValues([
                        getFixedNumber(firstRates.USD),
                        getFixedNumber(secondRates.USD),
                        getFixedNumber(thirdRates.USD),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>EUR/CUPCAKE</td>
                    {renderTableValues([
                        getFixedNumber(firstRates.EUR),
                        getFixedNumber(secondRates.EUR),
                        getFixedNumber(thirdRates.EUR),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>RUB/USD</td>
                    {renderTableValues([
                        getFixedNumber(firstRates.RUB / firstRates.USD),

                        getFixedNumber(secondRates.RUB / secondRates.USD),
                        getFixedNumber(thirdRates.RUB / thirdRates.USD),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>RUB/EUR</td>
                    {renderTableValues([
                        getFixedNumber(firstRates.RUB / firstRates.EUR),

                        getFixedNumber(secondRates.RUB / secondRates.EUR),
                        getFixedNumber(thirdRates.RUB / thirdRates.EUR),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>EUR/RUB</td>
                    {renderTableValues([
                        getFixedNumber(firstRates.EUR / firstRates.RUB),

                        getFixedNumber(secondRates.EUR / secondRates.RUB),
                        getFixedNumber(thirdRates.EUR / thirdRates.RUB),
                    ])}
                </tr>
            </tbody>
        </table>
    )
}
