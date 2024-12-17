import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
 Form,
 FormControl,
 FormDescription,
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
 SelectGroup,
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { NewsandNotificationValidation } from './NewsAndNotificationFormValidation'
import apiClient from '../../../auth/ApiClient.jsx'

function NewsAndNotificationFillForm() {
 const navigate = useNavigate()
 const form = useForm({
  // resolver: zodResolver(NewsandNotificationValidation),
  defaultValues: {
   titleEnglish: '',
   titleHindi: '',
   type: '',
   status: '',
   isNew: false,
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

 async function onSubmit(values) {
  console.log(values)

  // Map form values to the API payload
  const newAndNotification = {
   titleEnglish: values.titleEnglish,
   titleHindi: values.titleHindi,
   type:
    values.type === 'News & Notification' ? 'NEWS_AND_NOTIFICATION' : 'NEWS',
   status: values.status === 'Active' ? 'ACTIVE' : 'INACTIVE',
   isNew: values.isNew,
   uiOrder: values.uiOrder,
  }

  // Create FormData for multipart file upload
  const formData = new FormData()
  formData.append(
   'news',
   new Blob([JSON.stringify(newAndNotification)], { type: 'application/json' })
  )
  if (selectedFile) {
   formData.append('file', selectedFile)
  }

  try {
   // Make the API call
   const response = await apiClient.post('/news/withDocs', formData, {
    headers: {
     'Content-Type': 'multipart/form-data',
    },
   })
   toast.success('News and Notification created successfully!')
   navigate('/pcdao/news-and-notification')
  } catch (error) {
   console.error('Error creating News and Notification:', error)
   toast.error('Failed to create News and Notification. Please try again.')
  }
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Add News Flash
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-6 mb-7">
       <FormField
        control={form.control}
        name="titleEnglish"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Title (English)
          </FormLabel>
          <FormControl>
           <Textarea
            placeholder="Enter title in English"
            {...field}
            onInput={(e) => {
             const value = e.target.value
             if (value.length > 70) {
              e.target.value = value.slice(0, 70) // Truncate pasted text
             }
             field.onChange(e) // Update form state
            }}
           />
          </FormControl>
          <p className="text-sm text-newprimaryColor">
           {`${field.value?.length || 0}/70 characters`}
          </p>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="titleHindi"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Title (Hindi)
          </FormLabel>
          <FormControl>
           <Textarea
            placeholder="Enter title in Hindi"
            {...field}
            onInput={(e) => {
             const value = e.target.value
             if (value.length > 70) {
              e.target.value = value.slice(0, 70) // Truncate pasted text
             }
            }}
           />
          </FormControl>
          <p className="text-sm text-newprimaryColor">
           {`${field.value?.length || 0}/70 characters`}
          </p>
          <FormMessage />
         </FormItem>
        )}
       />

       {/* File Upload */}
       <div className="w-full flex flex-col space-y-1 my-2">
        <Label className="text-titleColor text-base font-raleway">
         Document (Optional):
        </Label>
        <Input
         id="document"
         type="file"
         accept=".pdf"
         onChange={handleFileChange}
        />
       </div>

       <div className="w-full grid grid-cols-2 gap-2">
        <FormField
         control={form.control}
         name="type"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">
            Type
           </FormLabel>
           <FormControl>
            <Select onValueChange={field.onChange}>
             <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
             </SelectTrigger>
             <SelectContent>
              <SelectItem value="News & Notification">
               News & Notification
              </SelectItem>
              <SelectItem value="News">News</SelectItem>
             </SelectContent>
            </Select>
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="status"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">
            Status
           </FormLabel>
           <FormControl>
            <Select onValueChange={field.onChange}>
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
       </div>

       <FormField
        control={form.control}
        name="uiOrder"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Order
          </FormLabel>
          <FormControl>
           <Input
            type="number"
            placeholder="Enter Order"
            {...field}
            min={1}
            max={50}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="isNew"
        render={({ field }) => (
         <FormItem className="flex gap-2 items-center">
          <FormControl>
           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="text-titleColor text-base font-raleway">
           New
          </FormLabel>
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

export default NewsAndNotificationFillForm
