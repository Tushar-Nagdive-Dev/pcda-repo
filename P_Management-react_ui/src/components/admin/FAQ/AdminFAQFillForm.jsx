import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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

import { Textarea } from '@/components/ui/textarea'
import { FAQValidation } from './FAQFormValidation.js' // Validation schema
import apiClient from '../../../auth/ApiClient.jsx' // Axios instance
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AdminFAQFillForm() {
 const [sections, setSections] = useState([]) // State to store sections
 const navigate = useNavigate()

 // Map wing IDs to wing types
 const wingTypeMap = {
  1: 'LEDGER_WING',
  2: 'TRANSPORT_WING',
  3: 'CENTRAL_WING',
 }

 // Function to fetch sections based on wing ID
 const fetchSections = async (wingId) => {
  if (!wingId) return // Avoid unnecessary API calls
  try {
   const response = await apiClient.get(`faqdetails/byWing/${wingId}`)
   setSections(response.data) // Set fetched sections
  } catch (error) {
   console.error('Error fetching sections:', error)
   toast.error('Failed to fetch sections. Please try again.')
  }
 }

 // React Hook Form setup
 const form = useForm({
  resolver: zodResolver(FAQValidation),
  defaultValues: {
   question: '',
   answer: '',
   wing: '',
   section: '',
   active: false,
  },
 })

 // Handle form submission
 const onSubmit = async (values) => {
  const faqPayload = {
   isActive: values.active, // Ensure boolean is passed
   wingType: wingTypeMap[values.wing], // Map wing ID to wing type
   sectionId: values.section, // Selected section ID
   questions: [
    {
     question: values.question,
     answer: values.answer,
    },
   ],
  }

  try {
   const response = await apiClient.post(
    'faqdetails/addWithQuestions',
    faqPayload
   )
   console.log('Response from API:', response.data)

   if (response.status === 201) {
    toast.success('FAQ created successfully!')
    navigate('/pcdao/faq') // Redirect on success
   }
  } catch (error) {
   console.error('Error creating FAQ:', error.response?.data || error)
   toast.error('Failed to create FAQ Form. Please try again.')
  }
 }

 // Function to get title by ID
const getTitleById = (id) => {
  const item = sections?.find(item => item.id === Number(id));
  console.log(item?.title);
  return item ? item?.title : null;
};

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Add FAQ Module
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-6 mb-7">
       {/* Question Field */}
       <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Question:
          </FormLabel>
          <FormControl>
           <Input placeholder="Type Question here" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       {/* Answer Field */}
       <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Answer:
          </FormLabel>
          <FormControl>
           <Textarea placeholder="Type Answer here" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <div className="w-full grid grid-cols-2 gap-2">
        {/* Wing Dropdown */}
        <FormField
         control={form.control}
         name="wing"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">
            Wing:
           </FormLabel>
           <FormControl>
            <Select
             onValueChange={(value) => {
              field.onChange(value) // Update form value
              fetchSections(value) // Fetch sections when wing changes
             }}
            >
             <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Wing" />
             </SelectTrigger>
             <SelectContent>
              <SelectItem value="1">Ledger</SelectItem>
              <SelectItem value="2">Transportation</SelectItem>
              <SelectItem value="3">Central</SelectItem>
             </SelectContent>
            </Select>
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        {/* Section Dropdown */}
        <FormField
         control={form.control}
         name="section"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">
            Section:
           </FormLabel>
           <FormControl>
            <Select onValueChange={field.onChange}>
             <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Section">
               {getTitleById(field.value)}
              </SelectValue>
             </SelectTrigger>
             <SelectContent>
              {sections?.map((section) => (
               <SelectItem key={section.id} value={section.id}>
                {section.title}
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

       {/* Active Checkbox */}
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

export default AdminFAQFillForm
