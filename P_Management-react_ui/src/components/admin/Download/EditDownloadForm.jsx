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
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../../../auth/ApiClient' // Adjust the path as needed
import { toast } from 'react-toastify'

function EditDownloadForm() {
 const { id } = useParams() // Get testimonial ID from the URL
 const navigate = useNavigate() // For redirecting after saving
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
 const [imagePreview, setImagePreview] = useState('') // To preview current image

 const form = useForm({
  // resolver: zodResolver(), // Add your schema validation here
  defaultValues: {
   id: null,
   title: '',
   title_hindi: '',
   status: '',
   order: 1,
  },
 })

 const { reset, setValue, watch } = form

 // Fetch testimonial data by ID
//  useEffect(() => {
//   const fetchDownload = async () => {
//    try {
//     setLoading(true)
//     const response = await apiClient.get(`/testimonial/${id}`)
//     const testimonial = response.data

//     // Map API data to form fields
//     reset({
//      name: testimonial.name,
//      position: testimonial.position,
//      testimonial_brief: testimonial.testimonialBrief,
//      status: testimonial.status === 'ACTIVE' ? 'Active' : 'In-Active',
//      new: testimonial.isNew,
//     })

//     // Set the current image for preview
//     if (testimonial.imagePath) {
//      setImagePreview(`/api/testimonial/image/${testimonial.imagePath}`)
//     }

//     setLoading(false)
//    } catch (err) {
//     console.error('Error fetching testimonial:', err)
//     setError('Failed to load testimonial data.')
//     setLoading(false)
//    }
//   }

//   fetchTestimonial()
//  }, [id, reset])

 const onSubmit = async (values) => {
    console.log(values)
//   const formData = new FormData()

//   // Append JSON data
//   formData.append(
//    'data',
//    JSON.stringify({
//     name: values.name,
//     position: values.position,
//     testimonialBrief: values.testimonial_brief,
//     status: values.status === 'Active' ? 'ACTIVE' : 'INACTIVE',
//     isNew: values.new,
//    })
//   )

//   // Append file (optional)
//   const file = watch('profile_picture')
//   if (file && file.length > 0) {
//    formData.append('file', file[0])
//   }

//   try {
//    const response = await apiClient.put(`/testimonial/update/${id}`, formData, {
//     headers: {
//      'Content-Type': 'multipart/form-data', // Correct header
//     },
//    })

//    toast.success('Testimonial updated successfully!')
//    navigate('/pcdao/testimonials')
//   } catch (err) {
//    console.error('Error updating testimonial:', err)
//    toast.error('Failed to update testimonial.')
//   }
 }


 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Edit Download Module
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

       {/* Instead of url we need upload file (it optional) */}
       <div className="w-full flex flex-col space-y-1 my-2">
        <Label className="text-titleColor text-base font-raleway">
         Document:
        </Label>
        <Input id="document" type="file" onChange={handleFileChange} />
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

export default EditDownloadForm
