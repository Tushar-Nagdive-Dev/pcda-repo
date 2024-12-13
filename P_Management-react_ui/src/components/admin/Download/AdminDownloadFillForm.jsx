import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import apiClient from '../../../auth/ApiClient.jsx'

function AdminDownloadFillForm() {
 const navigate = useNavigate()
 const form = useForm({
  // resolver: zodResolver(),
  defaultValues: {
   title: '',
   titleInHindi: '',
   status: '',
   uiOrder: 1,
  },
 })

 const [selectedFile, setSelectedFile] = useState(null)

 const handleFileChange = (event) => {
  const uploadFile = event.target.files[0]

  if (uploadFile) {
   // Check file type
   if (uploadFile.type !== 'application/pdf') {
    toast.error('Only PDF files are allowed.')
    setSelectedFile(null)
    return
   }

   // Check file size (e.g., 10MB limit)
   const maxSize = 10 * 1024 * 1024 // 10MB in bytes
   if (uploadFile.size > maxSize) {
    toast.error('File size must be less than 10MB.')
    setSelectedFile(null)
    return
   }
   setSelectedFile(event.target.files[0])
  }
 }

 const onSubmit = async (values) => {
  try {
   // Prepare form data for API call
   const formData = new FormData()
   formData.append('title', values.title)
   formData.append('titleInHindi', values.titleInHindi)
   formData.append('status', values.status === 'Active')
   formData.append('uiOrder', values.uiOrder)
   if (selectedFile) {
    formData.append('file', selectedFile)
   }

   // Make the API call
   const response = await apiClient.post('/document', formData, {
    headers: {
     'Content-Type': 'multipart/form-data',
    },
   })

   if (response.status === 200) {
    toast.success('Download item created successfully!')
    navigate('/pcdao/download')
   } else {
    toast.error('Failed to create download item. Please try again.')
   }
  } catch (error) {
   console.error('Error creating download item:', error)
   toast.error('Failed to create download item. Please try again.')
  }
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Add Download Module
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Title
          </FormLabel>
          <FormControl>
           <Textarea placeholder="Enter title" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="titleInHindi"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Title in Hindi
          </FormLabel>
          <FormControl>
           <Textarea placeholder="Enter title in Hindi" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <div className="w-full flex flex-col space-y-1 my-2">
        <Label className="text-titleColor text-base font-raleway">
         Document:
        </Label>
        <Input id="document" type="file"  accept=".pdf" onChange={handleFileChange} />
       </div>

       <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Status
          </FormLabel>
          <FormControl>
           <Select onValueChange={(value) => field.onChange(value)}>
            <SelectTrigger className="w-full">
             <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
             <SelectItem value="Active">Active</SelectItem>
             <SelectItem value="In-Active">In-Active</SelectItem>
            </SelectContent>
           </Select>
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="uiOrder"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Order
          </FormLabel>
          <FormControl>
           <Select
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
           >
            <SelectTrigger className="w-full">
             <SelectValue>{field.value || 'Select Order'}</SelectValue>
            </SelectTrigger>
            <SelectContent side="bottom" className="h-64">
             {Array.from({ length: 50 }).map((_, index) => (
              <SelectItem key={index} value={index + 1}>
               {index + 1}
              </SelectItem>
             ))}
            </SelectContent>
           </Select>
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>

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

export default AdminDownloadFillForm
