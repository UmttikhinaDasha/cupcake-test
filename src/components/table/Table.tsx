import './table.scss'

export const Table = () => {
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
                </tr>
                <tr>
                    <td className='table__body-item'>USD/CUPCAKE</td>
                </tr>
                <tr>
                    <td className='table__body-item'>EUR/CUPCAKE</td>
                </tr>
                <tr>
                    <td className='table__body-item'>RUB/USD</td>
                </tr>
                <tr>
                    <td className='table__body-item'>RUB/EUR</td>
                </tr>
                <tr>
                    <td className='table__body-item'>EUR/RUB</td>
                </tr>
            </tbody>
        </table>
    )
}
