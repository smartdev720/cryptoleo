import React from 'react'

const TableComponent = () => {
  return (
    <div className='flex flex-col mt-9 border border-gray-100 rounded'>
        <table className='w-full table-auto'>
            <thead className='capitalize text-base text-gray-100'>
                <tr>
                    <th>asset</th>
                    <th>name</th>
                    <th>price</th>
                    <th>total volume</th>
                    <th>market cap change</th>
                    <th>1H</th>
                    <th>24H</th>
                    <th>70</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                        <td>asset</td>
                        <td>name</td>
                        <td>price</td>
                        <td>total volume</td>
                        <td>market cap change</td>
                        <td>1H</td>
                        <td>24H</td>
                        <td>70</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TableComponent