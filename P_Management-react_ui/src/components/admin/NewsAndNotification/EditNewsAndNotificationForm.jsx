import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
 SelectGroup,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'
import { NewsandNotificationValidation } from './NewsAndNotificationFormValidation'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiClient from '../../../auth/ApiClient.jsx'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FilePdf } from '@phosphor-icons/react'

function EditNewsAndNotificationForm() {
 const { id } = useParams()
 const navigate = useNavigate()

 const form = useForm({
  resolver: zodResolver(NewsandNotificationValidation),
  defaultValues: {
   title: '',
   title_hindi: '',
   type: '',
   status: '',
   isNew: false,
   order: '',
  },
 })

 const [selectedFile, setSelectedFile] = useState(null)

 const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0])
 }

 useEffect(() => {
  getNewsAndNotificationSingleDetails()
 }, [])

 async function getNewsAndNotificationSingleDetails() {
  try {
   const response = await apiClient.get('news')
   const data = response.data.find((item) => item.id === Number(id))
   if (data) {
    form.setValue('title', data.titleEnglish)
    form.setValue('title_hindi', data.titleHindi)
    form.setValue(
     'type',
     data.type === 'NEWS_AND_NOTIFICATION' ? 'News & Notification' : 'News'
    )
    form.setValue('status', data.status === 'ACTIVE' ? 'Active' : 'In-Active')
    form.setValue('isNew', data.isNew)
    form.setValue('order', data.uiOrder.toString())
    setSelectedFile(data.documentUrl)
   }
  } catch (error) {
   console.error('Failed to get data', error)
   toast.error('Failed to get data')
  }
 }

 async function onSubmit(values) {
  const formData = new FormData()

  const newAndNotificationDTO = {
   titleEnglish: values.title,
   titleHindi: values.title_hindi,
   type:
    values.type === 'News & Notification' ? 'NEWS_AND_NOTIFICATION' : 'NEWS',
   status: values.status === 'Active' ? 'ACTIVE' : 'INACTIVE',
   isNew: values.isNew,
   uiOrder: parseInt(values.order, 10),
  }

  formData.append(
   'news',
   new Blob([JSON.stringify(newAndNotificationDTO)], {
    type: 'application/json',
   })
  )
  if (selectedFile instanceof File) {
   formData.append('file', selectedFile)
  }

  try {
   await apiClient.put(`news/withDocs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
   })
   toast.success('News and Notification updated successfully!')
   navigate('/pcdao/news-and-notification')
  } catch (error) {
   console.error('Error updating News and Notification:', error)
   toast.error('Failed to update News and Notification. Please try again.')
  }
 }

 const getFileNameFromUrl = (url) => url.substring(url.lastIndexOf('/') + 1)

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Edit News Flash
   </h3>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
     <div className="space-y-6 mb-7">
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
       name="title_hindi"
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
       <Input id="document" type="file" onChange={handleFileChange} />
       {selectedFile && (
        <a
         href={`http://localhost:8888/${
          selectedFile instanceof File
           ? URL.createObjectURL(selectedFile)
           : selectedFile
         }`}
         target="_blank"
         rel="noopener noreferrer"
         className="flex gap-2 py-4"
        >
         <div>
          Stored File: <FilePdf size={30} color="#D21416" />
         </div>
         {selectedFile instanceof File
          ? selectedFile.name
          : getFileNameFromUrl(selectedFile)}
        </a>
       )}
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
           <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
             <SelectValue>{field.value || 'Select Type'}</SelectValue>
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
           <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
             <SelectValue>{field.value || 'Select Status'}</SelectValue>
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
       name="order"
       render={({ field }) => (
        <FormItem>
         <FormLabel className="text-titleColor text-base font-raleway">
          Select Order
         </FormLabel>
         <FormControl>
          <Select value={field.value} onValueChange={field.onChange}>
           <SelectTrigger className="w-full">
            <SelectValue>{field.value || 'Select Order'}</SelectValue>
           </SelectTrigger>
           <SelectContent>
            <SelectGroup>
             {Array.from({ length: 50 }).map((_, i) => (
              <SelectItem key={i} value={i.toString()}>
               {i}
              </SelectItem>
             ))}
            </SelectGroup>
           </SelectContent>
          </Select>
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
         <Checkbox checked={field.value} onCheckedChange={field.onChange} />
         <FormLabel>New</FormLabel>
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
       Save
      </Button>
     </div>
    </form>
   </Form>
  </div>
 )
}

export default EditNewsAndNotificationForm
