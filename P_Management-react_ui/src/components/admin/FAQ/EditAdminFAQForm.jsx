import React, { useEffect, useState } from 'react'
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
import { FAQValidation } from './FAQFormValidation.js'
import apiClient from '../../../auth/ApiClient.jsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const wingEnumMapping = {
 LEDGER_WING: 'Ledger',
 TRANSPORT_WING: 'Transportation',
 CENTRAL_WING: 'Central',
}

const reverseWingEnumMapping = {
 Ledger: 'LEDGER_WING',
 Transportation: 'TRANSPORT_WING',
 Central: 'CENTRAL_WING',
}

function EditAdminFAQForm() {
 const { id } = useParams()
 const navigate = useNavigate()
 const [sections, setSections] = useState([]) // State to store sections from the database
 const [loading, setLoading] = useState(true)
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

 console.log('Sections', sections)

 useEffect(() => {
  getFAQSingleDetails()
 }, [])

 async function getFAQSingleDetails() {
  try {
   setLoading(true)
   const response = await apiClient.get(`/faqdetails/faqTableDataById/${id}`)
   const data = response.data
   form.setValue('question', data.question)
   form.setValue('answer', data.answer)
   form.setValue('wing', data.wing.name) // Set wing ID for dropdown
   form.setValue('active', data.faqStatus)
   form.setValue('section', data.section.id) // Prepopulate with section ID
   fetchSections(data.wing.name) // Fetch sections based on wing ID
  } catch (error) {
   setLoading(false)
   console.error('Failed to get data', error)
   toast.error('Failed to get data')
  }
 }

 // Function to fetch sections based on wing ID
 const fetchSections = async (wingId) => {
  if (!wingId) return // Avoid unnecessary API calls
  if (wingId == 'LEDGER_WING') {
   wingId = 1
  } else if (wingId == 'TRANSPORT_WING') {
   wingId = 2
  } else if (wingId == 'CENTRAL_WING') {
   wingId = 3
  }
  try {
   const response = await apiClient.get(`/faqdetails/byWing/${wingId}`)
   setSections(response.data) // Set fetched sections
   setLoading(false)
  } catch (error) {
   console.error('Error fetching sections:', error)
   toast.error('Failed to fetch sections. Please try again.')
   setLoading(false)
  }
 }

 async function onSubmit(values) {
  let wingIdforDB = 0
  if (values.wing == 'LEDGER_WING') {
   wingIdforDB = 1
  } else if (values.wing == 'TRANSPORT_WING') {
   wingIdforDB = 2
  } else if (values.wing == 'CENTRAL_WING') {
   wingIdforDB = 3
  }
  const updatedFAQ = {
   question: values.question,
   answer: values.answer,
   wingId: wingIdforDB, // Wing ID directly from the selection
   sectionId: values.section, // Section ID from selection
   isActive: values.active,
  }

  try {
   await apiClient.put(`/faqdetails/questionUpdate/${id}`, updatedFAQ)
   toast.success('FAQ updated successfully!')
   navigate('/pcdao/faq')
  } catch (error) {
   console.error('Error updating FAQ:', error)
   toast.error('Failed to update FAQ Form. Please try again.')
  }
 }

 if (loading) {
  return (
   <div className="text-center w-full">
    <p>Loading..</p>
   </div>
  )
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Edit FAQ Module
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-6 mb-7">
       <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Question:</FormLabel>
          <FormControl>
           <Input placeholder="Type Question here" {...field} />
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
          <FormLabel>Answer</FormLabel>
          <FormControl>
           <Textarea placeholder="Type here" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <div className="grid grid-cols-2 gap-2">
        <FormField
         control={form.control}
         name="wing"
         render={({ field }) => (
          <FormItem>
           <FormLabel>Wing</FormLabel>
           <FormControl>
            <Select
             onValueChange={(value) => {
              field.onChange(value)
              fetchSections(value) // Send wing ID directly to fetch sections
             }}
             value={field.value}
            >
             <SelectTrigger className="w-full">
              <SelectValue>{field.value || 'Select Wing'}</SelectValue>
             </SelectTrigger>
             <SelectContent>
              {Object.keys(wingEnumMapping).map((wingId) => (
               <SelectItem key={wingId} value={wingId}>
                {wingEnumMapping[wingId]}
               </SelectItem>
              ))}
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
           <FormLabel>Section</FormLabel>
           <FormControl>
            <Select
             onValueChange={(value) => field.onChange(value)}
             value={field.value}
            >
             <SelectTrigger className="w-full">
              <SelectValue>
               {sections.find((sec) => Number(sec.id) === Number(field.value))
                ?.title || 'Select Section'}
              </SelectValue>
             </SelectTrigger>
             <SelectContent>
              {sections.map((section) => (
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
       <FormField
        control={form.control}
        name="active"
        render={({ field }) => (
         <FormItem className="flex items-center gap-2">
          <FormControl>
           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>Active</FormLabel>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>
      <div className="flex justify-center">
       <Button type="submit" className="text-white bg-newprimaryColor">
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
