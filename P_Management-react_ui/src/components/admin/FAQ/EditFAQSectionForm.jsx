import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
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

function EditFAQSectionForm() {
 const { id } = useParams() // Retrieve ID from the URL
 const navigate = useNavigate()

 const form = useForm({
  resolver: zodResolver(faqformValidation),
  defaultValues: {
   section_name: '',
   wing: '',
   active: false,
  },
 })

 useEffect(() => {
  (async () => {
    try {
      await fetchSectionData();
    } catch (err) {
      console.error(err);
    }
  })();
 }, [])

 async function fetchSectionData() {
  try {
   const response = await apiClient.get('/faqdetails/getSectionTable')
   // Use response.data if apiClient is Axios
   const result = await response.data

   const getSingleData = result.filter((item) => Number(item.id) === Number(id))
   if (getSingleData.length > 0) {
    form.setValue('section_name', getSingleData[0].title)
    if(getSingleData[0].windId == 1) {
      form.setValue('wing', 'Ledger');
    }else if(getSingleData[0].windId == 2) {
      form.setValue('wing', 'Transportation');
    }else if(getSingleData[0].windId == 3) {
      form.setValue('wing', 'Central');
    }
    // form.setValue('wing', getSingleData[0])  //// TODO: WING NAME NEED TO BE SET!
    form.setValue('active', getSingleData[0].isActive)
   }
  } catch (error) {
   console.error("Couldn't fetch section data")
  //  toast.error("Couldn't fetch faq section data")
  }
 }

 const onSubmit = async (values) => {
  console.log('Form submitted with values:', values)
  console.log(
   `API URL: /faqdetails/updateTitle/${values.section_name}/${id}/${values.active}`
  )

  try {
   const response = await apiClient.put(
    `/faqdetails/updateTitle/${values.section_name}/${id}/${values.active}`
   )
   console.log('API Response:', response.data)
   navigate('/pcdao/faq/add-section') // Redirect on success
  } catch (error) {
   console.error(
    'Error updating section:',
    error.response?.data || error.message
   )
  }
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Edit FAQ Section
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       {/* Section Name Field */}
       <FormField
        control={form.control}
        name="section_name"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">
           Section Name:
          </FormLabel>
          <FormControl>
           <Input placeholder="Enter section name" {...field} />
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

       {/* Active Checkbox Field */}
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
        Save
       </Button>
      </div>
     </form>
    </Form>
   </div>
  </div>
 )
}

export default EditFAQSectionForm
