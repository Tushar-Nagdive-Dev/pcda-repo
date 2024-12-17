import React from 'react'
import { AdminDataTableColumnHeader } from '../../TableComponents/admin-data-table-column-header.jsx'
import { DataTableRowActions } from './admin-news-notification-data-table-row-actions'
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'
import { FilePdf } from '@phosphor-icons/react'

export const newsAndNotificationColumns = (getAllNewAndNotification) => [
 {
  id: 'sr_no',
  header: ({ table }) => <p className>Sr. No.</p>,
  cell: (info) => <p>{info.row.index + 1}</p>,
  enableSorting: false,
  enableHiding: false,
 },
 {
  accessorKey: 'title',
  header: ({ column }) => (
   <AdminDataTableColumnHeader column={column} title="Title" />
  ),
  cell: ({ row }) => (
   <div className="w-[150px] capitalize">{row.getValue('title')}</div>
  ),
  enableSorting: false,
  enableHiding: false,
 },
 {
  accessorKey: 'document_url',
  header: ({ column }) => (
   <AdminDataTableColumnHeader column={column} title="Document Url" />
  ),
  cell: ({ row }) => (
   <div className=" capitalize">
    {row.original.url ? (
     <a href={row.original.url} target="_blank" rel="noopener noreferrer">
      <FilePdf size={24} color="#D21416" />
     </a>
    ) : (
     'No Document'
    )}
   </div>
  ),
  enableSorting: false,
  enableHiding: false,
 },
 {
  accessorKey: 'type',
  header: ({ column }) => <p className>Type</p>,
  cell: ({ row }) => {
   return (
    <div className="flex space-x-2">
     <span className="max-w-[500px] truncate font-medium capitalize">
      {row.getValue('type')}
     </span>
    </div>
   )
  },
 },
 {
  accessorKey: 'new',
  header: ({ column }) => <p className>New</p>,
  cell: ({ row }) => {
   const value = row.getValue('new')?.toLowerCase() // Get the value of the cell
   const textColor = value === 'yes' ? 'text-green-500' : 'text-red-500' // Define conditional color
   return (
    <div className="flex items-center">
     <span className={`capitalize ${textColor}`}>{value}</span>
    </div>
   )
  },
  filterFn: (row, id, value) => {
   return value.includes(row.getValue(id))
  },
 },
 {
  accessorKey: 'status',
  header: ({ column }) => <p className>Status</p>,
  cell: ({ row }) => {
   const type = row.getValue('status')?.toLowerCase()
   return (
    <div className="flex w-fit items-center">
     {type === 'active' ? (
      <div className="w-full px-3 py-1 rounded-full text-newprimaryColor bg-white border-[1px] border-newprimaryColor">
       {row.getValue('status')}
      </div>
     ) : (
      <div className="w-full px-3 py-1 rounded-full text-red-500 bg-white border-[1px] border-red-500">
       {row.getValue('status')}
      </div>
     )}
    </div>
   )
  },
  filterFn: (row, id, value) => {
   return value.includes(row.getValue(id))
  },
 },
 {
  accessorKey: 'created_date',
  header: ({ column }) => (
   <AdminDataTableColumnHeader column={column} title="Created Date" />
  ),
  cell: ({ row }) => {
   const date = new Date(row.getValue('created_date'))
   return (
    <div className="flex items-center">
     <span className="capitalize">{row.getValue('created_date')}</span>
    </div>
   )
  },
  filterFn: (row, id, value) => {
   const rowDate = new Date(row.getValue(id))
   const [startDate, endDate] = value
   return rowDate >= startDate && rowDate <= endDate
  },
 },
 {
  accessorKey: 'order',
  header: ({ column }) => <p className>Order</p>,
  cell: ({ row }) => {
   return <div className="flex items-center">{row.getValue('order')}</div>
  },
  filterFn: (row, id, value) => {
   return value.includes(row.getValue(id))
  },
 },
 {
  id: 'actions',
  header: ({ column }) => <p className>Actions</p>,
  cell: ({ row }) => <DataTableRowActions row={row} getAllNewAndNotification={getAllNewAndNotification}/>,
 },
]
