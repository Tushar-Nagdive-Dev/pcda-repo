import React from 'react'
import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table'

function AdminFormTable({ columnNameList, children }) {
 return (
  <Table className="rounded-lg">
   <TableHeader className="bg-newprimaryColor text-white border-none">
    <TableRow>
     {columnNameList.map((column) => (
      <TableHead key={column}>{column}</TableHead>
     ))}
    </TableRow>
   </TableHeader>
   <TableBody>{children}</TableBody>
  </Table>
 )
}

export default AdminFormTable