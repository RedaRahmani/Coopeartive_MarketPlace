// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { LeftMenu } from '../components/Userinfo';
// import { ClipLoader } from 'react-spinners';

// const Orders = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecentOrders = async () => {
//       try {
//         const res = await fetch(`/api/orders/getorder?userRef=${currentUser._id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await res.json();
//         setRecentOrders(data.orders);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentUser) {
//       fetchRecentOrders();
//     }
//   }, [currentUser]);

//   return (
//     <>
//           <div className="flex">
//       <LeftMenu />
//       <div className="flex-grow p-6 md:pl-64 bg-gray-100 min-h-screen">
//         <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-gray-900 pl-32">
//           All Orders
//         </h2>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <ClipLoader size={50} color="#4A90E2" />
//             </div>
//           ) : recentOrders.length === 0 ? (
//             <div className="text-center text-gray-600">
//               <p className="text-xl">No orders found.</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-blue-600">
//                   {headerGroups.map(headerGroup => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                       {headerGroup.headers.map(column => (
//                         <th
//                           {...column.getHeaderProps(column.getSortByToggleProps())}
//                           className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
//                         >
//                           {column.render('Header')}
//                           <span>
//                             {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
//                           </span>
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
//                   {page.map(row => {
//                     prepareRow(row);
//                     return (
//                       <tr {...row.getRowProps()} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
//                         {row.cells.map(cell => (
//                           <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {cell.render('Cell')}
//                           </td>
//                         ))}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//               <div className="py-3 flex items-center justify-between">
//                 <div className="flex-1 flex justify-between sm:hidden">
//                   <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     Previous
//                   </button>
//                   <button onClick={() => nextPage()} disabled={!canNextPage} className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     Next
//                   </button>
//                 </div>
//                 <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       Page{' '}
//                       <span className="font-medium">
//                         {pageIndex + 1}
//                       </span>{' '}
//                       of{' '}
//                       <span className="font-medium">
//                         {pageOptions.length}
//                       </span>
//                     </p>
//                   </div>
//                   <div>
//                     <select
//                       value={pageSize}
//                       onChange={e => setPageSize(Number(e.target.value))}
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                     >
//                       {[10, 20, 30, 40, 50].map(pageSize => (
//                         <option key={pageSize} value={pageSize}>
//                           Show {pageSize}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       {'<<'}
//                     </button>
//                     <button onClick={() => previousPage()} disabled={!canPreviousPage} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       Previous
//                     </button>
//                     <button onClick={() => nextPage()} disabled={!canNextPage} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       Next
//                     </button>
//                     <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       {'>>'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>

//     </>
//   );
// };

// export default Orders;
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LeftMenu } from '../components/Userinfo';
import { ClipLoader } from 'react-spinners';
import { useTable, useSortBy, usePagination } from 'react-table';

const Orders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await fetch(`/api/orders/getorder?userRef=${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setRecentOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchRecentOrders();
    }
  }, [currentUser]);

  const columns = useMemo(() => [
    {
      Header: 'Order ID',
      accessor: 'id', // Will be created dynamically
    },
    {
      Header: 'Product',
      accessor: 'product', // Will be created dynamically
    },
    {
      Header: 'Quantity',
      accessor: 'quantity', // Will be created dynamically
    },
    {
      Header: 'Price',
      accessor: 'price', // Will be created dynamically
    },
  ], []);

  const data = useMemo(() => 
    recentOrders.flatMap((order, orderIndex) =>
      order.items.map((item, itemIndex) => ({
        id: orderIndex + 1,
        product: item.name,
        quantity: item.quantity,
        price: item.price !== undefined ? `MAD ${item.price.toFixed(2)}` : 'N/A',
      }))
    ), 
    [recentOrders]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <div className="flex">
      <LeftMenu />
      <div className="flex-grow p-6 md:pl-64 bg-gray-100 min-h-screen">
        <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-gray-900 pl-32">
          All Orders
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader size={50} color="#4A90E2" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center text-gray-600">
              <p className="text-xl">No orders found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          {column.render('Header')}
                          <span>
                            {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Previous
                  </button>
                  <button onClick={() => nextPage()} disabled={!canNextPage} className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Page{' '}
                      <span className="font-medium">
                        {pageIndex + 1}
                      </span>{' '}
                      of{' '}
                      <span className="font-medium">
                        {pageOptions.length}
                      </span>
                    </p>
                  </div>
                  <div>
                    <select
                      value={pageSize}
                      onChange={e => setPageSize(Number(e.target.value))}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      {'<<'}
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Previous
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Next
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      {'>>'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
