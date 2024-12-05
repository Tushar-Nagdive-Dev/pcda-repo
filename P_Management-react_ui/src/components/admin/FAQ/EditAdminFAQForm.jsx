import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
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
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'
import { FAQValidation } from './FAQFormValidation.js'
import AdminFormTable from '../AdminFormTable.jsx'
import { PlusIcon } from 'lucide-react'
import apiClient from '../../../auth/ApiClient.jsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

function EditAdminFAQForm() {
 const { id } = useParams()
 const navigate = useNavigate()
 const form = useForm({
  resolver: zodResolver(FAQValidation),
  defaultValues: {
   question: '',
   answer: '',
   wing: '',
   section: '',
   active: '',
  },
 })

 useEffect(() => {
  getFAQSingleDetails()
 }, [])

 async function getFAQSingleDetails() {
  try {
   const response = await apiClient.get(`faqdetails`)
   const data = response.data.filter((item) => item.id === Number(id))
   if (data.length > 0) {
    form.setValue('question', data[0].question)
    form.setValue('answer', data[0].answers)
    // Determine type
    const wing =
     data[0].wings === 'CENTRAL_WING'
      ? 'Central'
      : data[0].type === 'LEDGER_WING'
       ? 'Ledger'
       : 'Transportation'
    form.setValue('wing', wing)
    form.setValue('active', data[0].isActive)
    form.setValue('section', data[0].sections)
   }
  } catch (error) {
   console.error('Failed to get data', error)
   toast.error('Failed to get data')
  }
 }


 async function onSubmit(values) {
  console.log(values)

  // Determine status
  const wing =
   values.wing === 'Ledger'
    ? 'LEDGER_WING'
    : values.wing === 'Transportation'
     ? 'TRANSPORT_WING'
     : 'CENTRAL_WING'

  const newFAQ = {
   wings: wing,
   sections: values.section,
   question: values.question,
   answers: values.answer,
   isActive: values.active,
  }

  try {
   // Make the API call
   const response = await apiClient.put(`faqdetails/${id}`, newFAQ)
   // console.log('Response from API:', response)
   toast.success('FAQ created successfully!')
   navigate('/admin/faq')
  } catch (error) {
   console.error('Error updating FAQ:', error)
   // alert('Failed to create News and Notification. Please try again.')
   toast.error('Failed to update FAQ Form. Please try again.')
  }
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Add FAQ Module
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">Question:</FormLabel>
          <FormControl>
           <Input placeholder={'Type Question here'} {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">Answer</FormLabel>
          <FormControl>
           <Textarea placeholder="Type here" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <div className="w-full grid grid-cols-2 gap-2">
        <FormField
         control={form.control}
         name="wing"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">
            Wing
           </FormLabel>
           <FormControl>
            <Select
             onValueChange={(value) => field.onChange(value)} // Update form value
             // defaultValue={field.value} // Set the default value
             value={field.value}
            >
             <SelectTrigger className="w-full">
              <SelectValue>
               {field.value || "Select Wing"} {/* Display selected value or placeholder */}
              </SelectValue>
             </SelectTrigger>
             <SelectContent>
              <SelectItem value="Ledger">
               Ledger
              </SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Central">Central</SelectItem>
             </SelectContent>
            </Select>
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="section"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">
            Section
           </FormLabel>
           <FormControl>
            <Select
             onValueChange={(value) => field.onChange(value)} // Update form value
             value={field.value}
             // defaultValue={field.value} // Set the default value
            >
             <SelectTrigger className="w-full">
              <SelectValue>
               {field.value || "Select Wing"} {/* Display selected value or placeholder */}
              </SelectValue>
             </SelectTrigger>
             <SelectContent>
              <SelectItem value="General">General</SelectItem>
              {/* Add more option here*/}
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
        name="active"
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
          <FormLabel className="text-titleColor text-base font-raleway">Active</FormLabel>
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

export default EditAdminFAQForm