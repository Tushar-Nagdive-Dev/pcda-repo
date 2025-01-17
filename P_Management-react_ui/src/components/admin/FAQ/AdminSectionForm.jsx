import React from 'react'
import { Controller, useForm } from 'react-hook-form'
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

import { faqformValidation } from './FAQSectionFormValidation.js'
import apiClient from '../../../auth/ApiClient.jsx'
import { toast } from 'react-toastify'

function AdminSectionForm({callFun}) {
 const form = useForm({
  resolver: zodResolver(faqformValidation),
  defaultValues: {
   section_name: '',
   wing: '',
   active: false,
  },
 })

 async function onSubmit(values) {
  try {
   const payload = {
    wingType: values.wing, // Match DTO field name
    sectionName: values.section_name, // Match DTO field name
    isActive: values.active, // Match DTO field name
   }

   const response = await apiClient.post('/faqdetails/addSection', payload)
   if (response.status === 201) {
    // alert('Section added successfully!');
    toast.success('FAQ Section added successfully!');
    callFun();
    form.reset() // Reset form after successful submission
   }
  } catch (error) {
   console.error('Error adding section:', error)
   //    alert('Failed to add section. Please try again.');
   toast.error('Failed to add FAQ section');
  }
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Add FAQ Section
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       <FormField
        control={form.control}
        name="section_name"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Section Name:
          </FormLabel>
          <FormControl>
           <Input placeholder={'Enter section name'} {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

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
           >
            <SelectTrigger className="w-full">
             <SelectValue placeholder="Select Wing" />
            </SelectTrigger>
            <SelectContent>
             <SelectItem value="LEDGER_WING">Ledger</SelectItem>
             <SelectItem value="TRANSPORT_WING">Transportation</SelectItem>
             <SelectItem value="CENTRAL_WING">Central</SelectItem>
            </SelectContent>
           </Select>
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="active"
        render={({ field }) => (
         <FormItem className="flex gap-2 items-center">
          <FormControl>
           <>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
           </>
          </FormControl>
          <FormLabel className="text-titleColor text-base font-raleway">
           Active
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

export default AdminSectionForm
