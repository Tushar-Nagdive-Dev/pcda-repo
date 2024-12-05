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
import { Label } from '@/components/ui/label'
import apiClient from '../../../auth/ApiClient.jsx'
import { toast } from 'react-toastify'
import { TestimonialValidation } from './TestimonialFormValidation.js'
import { useNavigate } from 'react-router-dom'

// import { NewsandNotificationValidation } from "./NewsAndNotificationFormValidation";

function AdminTestiomonialFillForm() {
 const navigate = useNavigate()
 const form = useForm({
  resolver: zodResolver(TestimonialValidation),
  defaultValues: {
   imageId: '',
   name: '',
   position: '',
   testimonial_brief: '',
   status: '',
   isActive: '',
  },
 })
 const [selectedFile, setSelectedFile] = useState(null)

 const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0])
 }

 async function onSubmit(values) {
  console.log(values)

  if (!selectedFile) {
   toast.error('Please provide a file.');
   return;
 }

 // Construct the Testimonial object
 const testimonial = {
   name: values.name,
   position: values.position,
   testimonialBrief: values.testimonial_brief,
   status: values.status === 'Active' ? 'ACTIVE' : 'INACTIVE',
   isActive: values.isActive || false,
 };

  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify(testimonial)], { type: 'application/json' }));
  formData.append('file', selectedFile);

  try {
      const response = await apiClient.post('/testimonial/upload', formData, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
      });

      console.log('Response:', response.data);
      toast.success('Testimonial uploaded successfully!');
      navigate('/success'); // Navigate to a success page or list view after submission
   } catch (error) {
      console.error('Error uploading testimonial:', error);
      toast.error('Failed to upload testimonial. Please try again.');
   }
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Add Testimonial
   </h3>
   <div className="w-full flex flex-col space-y-3">
    <div className="w-full flex flex-col space-y-1">
     <Label className="text-titleColor text-base font-raleway">Profile Picture:</Label>
     <Input id="picture" type="file" onChange={handleFileChange} />
    </div>
    {/*<div className="w-full flex flex-col space-y-1">*/}
    {/* <Label className="text-titleColor text-base font-raleway">Testimonial Id:</Label>*/}
    {/* <Input type="text" onChange={handleIdChange} placeholder="Enter Testimonial Id" />*/}
    {/*</div>*/}
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       {/*<FormField*/}
       {/* control={form.control}*/}
       {/* name="profile_picture"*/}
       {/* render={({ field }) => (*/}
       {/*  <FormItem>*/}
       {/*   <FormLabel className="text-titleColor text-base font-raleway">Profile Picture:</FormLabel>*/}
       {/*   <FormControl>*/}
       {/*    <Input id="picture" type="file" {...field} />*/}
       {/*   </FormControl>*/}
       {/*   <FormMessage />*/}
       {/*  </FormItem>*/}
       {/* )}*/}
       {/*/>*/}
       <div className="grid grid-cols-2 gap-2 w-full">
        <FormField
         control={form.control}
         name="name"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">Name</FormLabel>
           <FormControl>
            <Input placeholder="Enter Name" {...field} />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="position"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">Position</FormLabel>
           <FormControl>
            <Input placeholder="Enter Position" {...field} />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
       </div>

       <FormField
        control={form.control}
        name="testimonial_brief"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">Testiomonial Brief</FormLabel>
          <FormControl>
           <Textarea placeholder="Type here" {...field} />
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
          <FormLabel className="text-titleColor text-base font-raleway">Status</FormLabel>
          <FormControl>
           <Select
            onValueChange={(value) => field.onChange(value)} // Update form value
            // defaultValue={field.value} // Set the default value
           >
            <SelectTrigger className="w-[180px]">
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
        name="isActive"
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
          <FormLabel className="text-titleColor text-base font-raleway">New</FormLabel>
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

export default AdminTestiomonialFillForm
