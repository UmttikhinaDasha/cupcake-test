import { useState } from 'react'
import { usePollingRequest } from '../../hooks/usePollingRequest'

import './table.scss'
import clsx from 'clsx'

export const Table = () => {
    const [error, setError] = useState<Error>()
    const [delay, setDelay] = useState<number | null>(3000)

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
                        Number(firstRates.RUB.toFixed(3)),
                        Number(secondRates?.RUB?.toFixed(3)),
                        Number(thirdRates?.RUB?.toFixed(3)),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>USD/CUPCAKE</td>
                    {renderTableValues([
                        Number(firstRates?.USD?.toFixed(3)),
                        Number(secondRates?.USD?.toFixed(3)),
                        Number(thirdRates?.USD?.toFixed(3)),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>EUR/CUPCAKE</td>
                    {renderTableValues([
                        Number(firstRates?.EUR?.toFixed(3)),
                        Number(secondRates?.EUR?.toFixed(3)),
                        Number(thirdRates?.EUR?.toFixed(3)),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>RUB/USD</td>
                    {renderTableValues([
                        Number((firstRates?.RUB / firstRates?.USD).toFixed(3)),
                        Number(
                            (secondRates?.RUB / secondRates?.USD).toFixed(3)
                        ),
                        Number((thirdRates?.RUB / thirdRates?.USD).toFixed(3)),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>RUB/EUR</td>
                    {renderTableValues([
                        Number((firstRates?.RUB / firstRates?.EUR).toFixed(3)),
                        Number(
                            (secondRates?.RUB / secondRates?.EUR).toFixed(3)
                        ),
                        Number((thirdRates?.RUB / thirdRates?.EUR).toFixed(3)),
                    ])}
                </tr>
                <tr>
                    <td className='table__body-item'>EUR/RUB</td>
                    {renderTableValues([
                        Number((firstRates?.EUR / firstRates?.RUB).toFixed(3)),
                        Number(
                            (secondRates?.EUR / secondRates?.RUB).toFixed(3)
                        ),
                        Number((thirdRates?.EUR / thirdRates?.RUB).toFixed(3)),
                    ])}
                </tr>
            </tbody>
        </table>
    )
}
