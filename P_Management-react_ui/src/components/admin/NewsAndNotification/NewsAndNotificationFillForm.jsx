import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

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
  resolver: zodResolver(NewsandNotificationValidation),
  defaultValues: {
   title: '',
   title_hindi: '',
   url: '',
   type: '',
   status: '',
   isNew: '',
   order: 1,
  },
 })

 async function onSubmit(values) {
  console.log(values)

  // Determine type
  const type =
   values.type === 'News & Notification'
    ? 'NEWS_AND_NOTIFICATION'
    : values.type === 'News'
    ? 'NEWS'
    : ''

  // Determine status
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
   url: values.url,
   type: type,
   status: status,
   isNew: values.isNew,
   uiOrder: values.order, // Default value - 0
  }

  try {
   // Make the API call
   const response = await apiClient.post('news', newAndNotification)
   // console.log('Response from API:', response)
   toast.success('News and Notification created successfully!')
   navigate('/admin/news-and-notification')
  } catch (error) {
   console.error('Error creating News and Notification:', error)
   // alert('Failed to create News and Notification. Please try again.')
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

       <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Url
          </FormLabel>
          <FormControl>
           <Input placeholder="Enter Url" {...field} />
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
             // defaultValue={field.value} // Set the default value
            >
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
            <Select
             onValueChange={(value) => field.onChange(value)} // Update form value
             // defaultValue={field.value} // Set the default value
            >
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
        name="order"
        render={({ field }) => (
         <FormItem className="flex flex-col w-full">
          <FormLabel className="text-titleColor text-base font-raleway">
           Select Order
          </FormLabel>
          <FormControl>
           <>
            <Select
             value={field.value}
             onValueChange={(value) => field.onChange(value)}
            >
             <SelectTrigger className="w-full">
              <SelectValue>
               {field.value || 'Select Order'}{' '}
               {/* Display selected value or placeholder */}
              </SelectValue>
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
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
           </>
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
        className="w-fit text-white  bg-newprimaryColor"
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
