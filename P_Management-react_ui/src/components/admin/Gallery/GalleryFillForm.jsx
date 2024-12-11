import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'

import { TableCell, TableRow } from '@/components/ui/table'
import AdminFormTable from '../AdminFormTable.jsx'
import { PlusIcon, Trash2 } from 'lucide-react'
import AdminDeleteDialog from '../AdminDeleteDialog.jsx'
import { GalleryFormValidation } from './GalleryFormValidation.js'
import apiClient from '../../../auth/ApiClient.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const formColumns = ['Sr. No.', 'Upload File', 'Action']

function GalleryFillForm() {
 const navigate = useNavigate()
 const form = useForm({
  resolver: zodResolver(GalleryFormValidation),
  defaultValues: {
   event_name: '',
   type: '',
   year: new Date().getFullYear(),
   active: false,
   gallery: [{ image: null }],
  },
 })

 const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'gallery',
 })

 const onSubmit = async (values) => {
  if (!values.year) {
   alert('Year is required!')
   return
  }

  try {
   const formData = new FormData()

   // Append files to FormData
   values.gallery.forEach((item) => {
    if (item.image) {
     formData.append('files', item.image)
    }
   })

   // Append gallery data as JSON
   const galleryData = {
    eventName: values.event_name,
    type: values.type.toUpperCase(),
    year: values.year,
    isActive: values.active,
   }
   formData.append(
    'gallery',
    new Blob([JSON.stringify(galleryData)], { type: 'application/json' })
   )

   // Make the API request
   const response = await apiClient.post('/gallery/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
   })

   // Handle successful response
   // alert('Gallery saved successfully!');
   toast.success('Gallery Record Save Sucessfully!')
   navigate('/pcdao/gallery')
   form.reset()
  } catch (error) {
   // Handle errors
   console.error(error)
   // alert(error.response?.data || 'Failed to save gallery. Please try again.');
   toast.error(
    error.response?.data || 'Failed to save gallery. Please try again.'
   )
  }
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Gallery Manager
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       {/* Event Name */}
       <FormField
        control={form.control}
        name="event_name"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Event Name:
          </FormLabel>
          <FormControl>
           <Input placeholder="Enter event name" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       {/* Type */}
       <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Type:
          </FormLabel>
          <FormControl>
           <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
             <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
             <SelectItem value="IMAGE">Image</SelectItem>
            </SelectContent>
           </Select>
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       {/* Year */}
       <FormField
        control={form.control}
        name="year"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Year:
          </FormLabel>
          <FormControl>
           <Input
            type="number"
            placeholder="Year"
            value={field.value || new Date().getFullYear()}
            onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       {/* Active */}
       <FormField
        control={form.control}
        name="active"
        render={({ field }) => (
         <FormItem className="flex gap-2 items-center">
          <FormControl>
           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="text-titleColor text-base font-raleway">
           Active
          </FormLabel>
          <FormMessage />
         </FormItem>
        )}
       />

       {/* Gallery Files */}
       <div className="flex flex-col space-y-3 items-center">
        <AdminFormTable columnNameList={formColumns}>
         {fields.map((field, index) => (
          <TableRow key={field.id}>
           <TableCell>{index + 1}</TableCell>
           <TableCell>
            <Input
             type="file"
             onChange={(e) =>
              form.setValue(
               `gallery.${index}.image`,
               e.target.files ? e.target.files[0] : null
              )
             }
            />
           </TableCell>
           <TableCell>
            <div className="w-fit rounded-full p-2 bg-red-500">
             <AdminDeleteDialog callback={() => remove(index)}>
              <Trash2 className="text-white w-4 h-4 cursor-pointer" />
             </AdminDeleteDialog>
            </div>
           </TableCell>
          </TableRow>
         ))}
        </AdminFormTable>
        <button
         type="button"
         onClick={() => append({ image: null })}
         className="w-fit bg-titleColor/50 text-white px-4 py-2 rounded-md"
        >
         <PlusIcon size={18} />
        </button>
       </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center">
       <Button
        type="submit"
        className="w-fit text-white bg-newprimaryColor"
        size="lg"
       >
        Submit
       </Button>
      </div>
     </form>
    </Form>
   </div>
  </div>
 )
}

export default GalleryFillForm
