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

function EditNewsAndNotificationForm() {
 /* To current selected Id from params */
 const { id } = useParams();
 const navigate = useNavigate();

 const [uiorder, setUIorder] = useState(null)
 const form = useForm({
  resolver: zodResolver(NewsandNotificationValidation),
  /* Set this defaultvalues from backend data */
  defaultValues: {
   title: '',
   title_hindi: '',
   type: '',
   status: '',
   isNew: '',
   order: '',
  },
 })

 useEffect(() => {
  getNewsAndNotificationSingleDetails()
 }, [])

 async function getNewsAndNotificationSingleDetails() {
  try {
   const response = await apiClient.get('news')
   console.log(response.data)
   const data = response.data.filter((item) => item.id === Number(id))
   if (data.length > 0) {
    form.setValue('title', data[0].titleEnglish)
    form.setValue('title_hindi', data[0].titleHindi)
    // Determine type
    const type =
     data[0].type === 'NEWS_AND_NOTIFICATION'
      ? 'News & Notification'
      : data[0].type === 'NEWS'
       ? 'News'
       : ''
    // Determine status
    const status =
     data[0].status === 'ACTIVE'
      ? 'Active'
      : data[0].status === 'INACTIVE'
       ? 'In-Active'
       : ''
    form.setValue('type', type)
    form.setValue('status', status)
    form.setValue('isNew', data[0].isNew)
    form.setValue("order", data[0].uiOrder.toString())
   }
  } catch (error) {
   console.error('Failed to get data', error)
   toast.error('Failed to get data')
  }
 }

 // Publish Edit Form
 async function onSubmit(values) {
  console.log(values);

  // Determine type
  const type =
   values.type === 'News & Notification'
    ? 'NEWS_AND_NOTIFICATION'
    : values.type === 'News'
     ? 'NEWS'
     : ''

  const status =
   values.status === 'Active'
    ? 'ACTIVE'
    : values.status === 'In-Active'
     ? 'INACTIVE'
     : ''

  // Construct newAndNotification object
  const newAndNotification = {
   titleEnglish: values.title,
   titleHindi: values.title_hindi,
   type: type,
   status: status,
   isNew: values.isNew,
   uiOrder: values.order, // Default value
  }

  try {
   // Make the API call
   const response = await apiClient.put(`news/${id}`, newAndNotification)
   // console.log('Response from API:', response)
   toast.success('News and Notification updated successfully!')
   navigate('/admin/news-and-notification')
  } catch (error) {
   console.error('Error updating News and Notification:', error)
   // alert('Failed to update News and Notification. Please try again.')
   toast.error('Failed to update News and Notification. Please try again.')
  }
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Edit News Flash
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
          <FormLabel>Title</FormLabel>
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
          <FormLabel>Title in Hindi</FormLabel>
          <FormControl>
           <Textarea placeholder="Enter title in Hindi" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

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
            <Select
             onValueChange={(value) => field.onChange(value)} // Update form value
             value={field.value} // Set the default value
            >
             <SelectTrigger className="w-full">
              <SelectValue>
               {field.value || "Select Type"} {/* Display selected value or placeholder */}
              </SelectValue>
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
            <Select
             onValueChange={(value) => field.onChange(value)} // Update form value
             value={field.value} // Set the default value
            >
             <SelectTrigger className="w-full">
              <SelectValue>
               {field.value || "Select Status"} {/* Display selected value or placeholder */}
              </SelectValue>
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
         <FormItem className="flex flex-col w-full">
          <FormLabel className="text-titleColor text-base font-raleway">
           Select Order
          </FormLabel>
          <FormControl>
           <>
            <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
             <SelectTrigger className="w-full">
              <SelectValue>
               {field.value || "Select Order"} {/* Display selected value or placeholder */}
              </SelectValue>
             </SelectTrigger>
             <SelectContent side="bottom" className="h-64">
              <SelectGroup>
               {Array.from(Array(50).keys()).map((item) => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
               ))}
              </SelectGroup>
             </SelectContent>
            </Select>
           </>
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
           <>
            <Checkbox
             checked={field.value}
             onCheckedChange={field.onChange}
            />
           </>
          </FormControl>
          <FormLabel>New</FormLabel>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>
      <div className="w-full flex justify-center">
       <Button
        type="submit"
        className="w-fit text-white  bg-newprimaryColor"
        size="lg"
       >
        Save
       </Button>
      </div>
     </form>
    </Form>
   </div>
  </div>
 )
}

export default EditNewsAndNotificationForm
