import React from 'react'
import { AdminDataTableColumnHeader } from '../../TableComponents/admin-data-table-column-header.jsx'
import { FAQDownloadDataTableRowActions } from './admin-download-section-data-table-row-actions.jsx'
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'
import { FilePdf } from '@phosphor-icons/react'

export const downloadColumns = (fetchData) => [
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
   <div className="capitalize">{row.getValue('title')}</div>
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
    <a href={row.getValue('url')} target="_blank" rel="noopener noreferrer">
     <FilePdf size={24} color="#D21416" />
    </a>
   </div>
  ),
  enableSorting: false,
  enableHiding: false,
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
  accessorKey: 'order',
  header: ({ column }) => <p className>Order</p>,
  cell: ({ row }) => {
   return (
    <div className="flex items-center">
     <Select value={row.getValue('order')}>
      <SelectTrigger className="w-fit">
       <SelectValue placeholder="Select Order" />
      </SelectTrigger>
      <SelectContent side="bottom" className="h-64">
       <SelectGroup>
        {Array.from(Array(50).keys()).map((item) => (
         <SelectItem key={item} value={item}>
          {item + 1}
         </SelectItem>
        ))}
       </SelectGroup>
      </SelectContent>
     </Select>
    </div>
   )
  },
 },
 {
  accessorKey: 'created_by',
  header: ({ column }) => <p className>Created By</p>,
  cell: ({ row }) => {
   return (
    <div className="flex space-x-2">
     <span className=" line-clamp-3 font-medium capitalize">
      {row.getValue('created_by')}
     </span>
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
  accessorKey: 'updated_by',
  header: ({ column }) => <p className>Updated By</p>,
  cell: ({ row }) => {
   return (
    <div className="flex space-x-2">
     <span className="line-clamp-3 font-medium capitalize">
      {row.getValue('updated_by')}
     </span>
    </div>
   )
  },
  filterFn: (row, id, value) => {
   return value.includes(row.getValue(id))
  },
 },
 {
  accessorKey: 'updated_date',
  header: ({ column }) => <p className>Updated Date</p>,
  cell: ({ row }) => {
   return (
    <div className="flex space-x-2">
     <span className="line-clamp-3 font-medium capitalize">
      {row.getValue('updated_date')}
     </span>
    </div>
   )
  },
  filterFn: (row, id, value) => {
   return value.includes(row.getValue(id))
  },
 },
 {
  id: 'actions',
  header: ({ column }) => <p className>Actions</p>,
  cell: ({ row }) => (
   <FAQDownloadDataTableRowActions row={row} fetchData={fetchData} />
  ),
 },
]
