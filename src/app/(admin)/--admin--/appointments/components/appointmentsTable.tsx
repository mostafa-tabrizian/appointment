'use client'

import Link from 'next/link'

import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getSortedRowModel,
   SortingState,
   useReactTable,
   getPaginationRowModel,
} from '@tanstack/react-table'

import { IAppointment } from '@/models/appointment'
import { useMemo, useState } from 'react'

const AppointmentsTable = ({ appointments }: { appointments: IAppointment[] }) => {
   const [sorting, setSorting] = useState<SortingState>([])

   const columns = useMemo<ColumnDef<unknown>[]>(
      () => [
         {
            accessorKey: '_id',
            header: 'آی‌دی',
            cell: ({ getValue }) => {
               const value = getValue() as string
               return (
                  <Link href={`/--admin--/appointments/${value}`}>
                     <span className=''>{value.slice(-5)}</span>
                  </Link>
               )
            },
         },
         // {
         //    accessorKey: 'active',
         //    header: 'فعال',
         //    cell: ({ getValue }) => (
         //       <>
         //          {getValue() ? (
         //             <svg
         //                className='mx-auto h-5 w-5 text-green-700'
         //                width='24'
         //                height='24'
         //                viewBox='0 0 24 24'
         //                strokeWidth='2'
         //                stroke='currentColor'
         //                fill='none'
         //                strokeLinecap='round'
         //                strokeLinejoin='round'
         //             >
         //                {' '}
         //                <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
         //                <path d='M9 12l2 2l4 -4' />
         //             </svg>
         //          ) : (
         //             <svg
         //                className='mx-auto h-5 w-5 text-rose-700'
         //                width='24'
         //                height='24'
         //                viewBox='0 0 24 24'
         //                strokeWidth='2'
         //                stroke='currentColor'
         //                fill='none'
         //                strokeLinecap='round'
         //                strokeLinejoin='round'
         //             >
         //                {' '}
         //                <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
         //                <path d='M10 10l4 4m0 -4l-4 4' />
         //             </svg>
         //          )}
         //       </>
         //    ),
         // },
         {
            accessorKey: 'name',
            header: 'نام و نام خانوادگی',
            cell: ({ getValue }) => (
               <span className='text-sm text-slate-500'>{getValue() as string}</span>
            ),
         },
         {
            accessorKey: 'description',
            header: 'توضیحات',
            cell: ({ getValue }) => (
               <span className='text-sm text-slate-500'>{getValue() as string}</span>
            ),
         },
         {
            accessorKey: 'reservedAt',
            header: 'تاریخ و ساعت رزرو',
            cell: ({ getValue }) => (
               <span className='text-sm text-slate-500'>
                  {new Date(getValue() as string).toLocaleString('fa')}
               </span>
            ),
         },
      ],
      [],
   )

   const table = useReactTable({
      data: appointments,
      columns,
      state: {
         sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: false,
   })

   return (
      <div className='relative overflow-x-auto bg-white'>
         <table className='w-full table-auto text-left text-sm text-slate-500'>
            <thead className='bg-slate-50 text-xs uppercase text-slate-500'>
               {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <th
                              key={header.id}
                              colSpan={header.colSpan}
                              className='px-6 py-3 text-center'
                           >
                              {header.isPlaceholder ? null : (
                                 <div
                                    {...{
                                       className: header.column.getCanSort()
                                          ? 'cursor-pointer select-none'
                                          : '',
                                       onClick: header.column.getToggleSortingHandler(),
                                    }}
                                 >
                                    {flexRender(
                                       header.column.columnDef.header,
                                       header.getContext(),
                                    )}
                                    {{
                                       asc: ' 🔼',
                                       desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null}
                                 </div>
                              )}
                           </th>
                        )
                     })}
                  </tr>
               ))}
            </thead>
            <tbody>
               {table.getRowModel().rows.map((row) => {
                  return (
                     <tr key={row.id} className='border-b border-slate-200 bg-white'>
                        {row.getVisibleCells().map((cell) => {
                           return (
                              <td key={cell.id} className='px-6 py-4 text-center'>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                           )
                        })}
                     </tr>
                  )
               })}
            </tbody>
         </table>

         <div className='mt-5 flex items-center gap-5'>
            <button
               className='rounded-lg border bg-white p-1 px-2 text-sm'
               onClick={() => table.setPageIndex(0)}
               disabled={!table.getCanPreviousPage()}
            >
               اولین صفحه
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2 text-sm'
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               صفحه قبل
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2 text-sm'
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               صفحه بعد
            </button>
            <button
               className='rounded-lg border bg-white p-1 px-2 text-sm'
               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
               disabled={!table.getCanNextPage()}
            >
               آخرین صفحه
            </button>
            <span className='flex items-center gap-1'>
               <div>صفحه</div>
               <strong>
                  {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
               </strong>
            </span>
            برو به:
            <span className='flex items-center gap-1 bg-white text-sm'>
               <input
                  type='number'
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                     const page = e.target.value ? Number(e.target.value) - 1 : 0
                     table.setPageIndex(page)
                  }}
                  className='w-16 rounded bg-white p-1 text-sm'
               />
            </span>
            نمایش:
            <select
               className='bg-white text-sm'
               value={table.getState().pagination.pageSize}
               onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
               }}
            >
               {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                     {pageSize}
                  </option>
               ))}
            </select>
         </div>
      </div>
   )
}

export default AppointmentsTable
