import React from 'react'
import { AdminDataTableColumnHeader } from '../../TableComponents/admin-data-table-column-header.jsx'
import { Link } from 'react-router-dom'

export const OfficersColumns =  [
 {
  id: 'sr_no',
  header: ({ table }) => <p className>Sr. No.</p>,
  cell: (info) => <p>{info.row.index + 1}</p>,
  enableSorting: false,
  enableHiding: false,
 },
 {
  accessorKey: 'officer_name',
  header: ({ column }) => (
   <AdminDataTableColumnHeader column={column} title="Officer Name" />
  ),
  cell: ({ row }) => (
   <div className="w-[500px] capitalize">{row.getValue('officer_name')}</div>
  ),
  enableSorting: false,
  enableHiding: false,
 },
 {
  accessorKey: 'cdac_acc_no',
  header: ({ column }) => <p className>CDAC Acc. No.</p>,
  cell: ({ row }) => {
   const type = row.getValue('cdac_acc_no')?.toLowerCase()
   return (
    <div className="flex w-fit items-center">{row.getValue('cdac_acc_no')}</div>
   )
  },
  filterFn: (row, id, value) => {
   return value.includes(row.getValue(id))
  },
 },
 {
  accessorKey: 'email',
  header: ({ column }) => <p className>Email</p>,
  cell: ({ row }) => {
   return (
    <div className="flex space-x-2">
     <span className="max-w-[350px] truncate font-medium capitalize">
      {row.getValue('email')}
     </span>
    </div>
   )
  },
 },
 {
  accessorKey: 'user_name',
  header: ({ column }) => <p className>User Name</p>,
  cell: ({ row }) => {
   return (
    <div className="flex space-x-2">
     <span className="max-w-[500px] truncate font-medium capitalize">
      {row.getValue('user_name')}
     </span>
    </div>
   )
  },
 },
 {
  id: 'actions',
  header: ({ column }) => <p className>Action</p>,
  cell: ({ row }) => (
   <div className="flex space-x-2">
    <Link to={`#`} className="truncate font-medium capitalize">
     Reset
    </Link>
   </div>
  ),
 },
]
