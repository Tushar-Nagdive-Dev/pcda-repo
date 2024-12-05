import React, { useState } from 'react'
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
 DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

function AdminDeleteDialog({ callback, children }) {
 const [isOpen, setIsOpen] = useState(false)

 const handleConfirm = () => {
  callback(true) // Perform the delete action
  setIsOpen(false) // Close the dialog
 }

 const handleCancel = () => {
  callback(false) // Cancel the action
  setIsOpen(false) // Close the dialog
 }

 return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
   <DialogTrigger asChild>{children}</DialogTrigger>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader className="space-y-4">
     <DialogTitle>Are you sure you want to delete?</DialogTitle>
     <DialogDescription className="text-base text-titleColor">
      This will delete this item permanently. You cannot undo this action.
     </DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <DialogClose asChild>
      <Button className="bg-transparent border-newprimaryColor text-titleColor" type="button" onClick={handleCancel}>Cancel</Button>
     </DialogClose>
     <Button variant="destructive" type="button" onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 )
}

export default AdminDeleteDialog
