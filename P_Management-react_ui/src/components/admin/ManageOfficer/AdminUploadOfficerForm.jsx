import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AdminUploadOfficerForm() {
 const navigate = useNavigate()
 const [selectedFile, setSelectedFile] = useState(null)
 const [isFormSubmitted, setIsFormSubmitted] = useState(false)
 const [progress, setProgress] = useState(13)

 const form = useForm({
  // resolver: zodResolver(),
  defaultValues: {
   csv_file: '',
  },
 })

 useEffect(() => {
  const timer = setTimeout(() => setProgress(100), 500)
  return () => clearTimeout(timer)
 }, [isFormSubmitted])

 const handleFileChange = (event, field) => {
  const uploadFile = event.target.files[0]

  if (uploadFile) {
   // Check file type
   if (uploadFile.type !== 'text/csv' && !uploadFile.name.endsWith('.csv')) {
    toast.error('Only CSV files are allowed.')
    setSelectedFile(null)
    return
   }

   // Check file size (e.g., 10MB limit)
   const maxSize = 10 * 1024 * 1024 // 10MB in bytes
   if (uploadFile.size > maxSize) {
    toast.error('File size must be less than 10MB.')
    setSelectedFile(null)
    return
   }

   setSelectedFile(uploadFile)
  }
 }

 const onSubmit = async (values) => {
  console.log(values)

  setIsFormSubmitted(true)

  // API For upload csv
  // try {

  // } catch (error) {
  //  console.error('Error uploading file:', error)
  //  toast.error('Failed to upload document. Please try again.')
  // }
 }
 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">Upload</h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       <div className="w-full flex flex-col space-y-4 my-2">
        <FormField
         control={form.control}
         name="csv_file"
         render={({ field }) => (
          <FormItem>
           <Label className="text-titleColor text-base font-raleway">
            Select File:
           </Label>
           <Input
            id="document"
            type="file"
            accept=".csv"
            onChange={(e) => handleFileChange(e, field)}
           />
           <FormMessage />
          </FormItem>
         )}
        />
        {isFormSubmitted && <>Progress: <Progress value={progress} className="w-[60%]" /></>}
       </div>
      </div>
      <div className="w-full flex justify-center gap-3">
       <Button
        type="submit"
        className="w-fit text-white bg-newprimaryColor"
        size="lg"
       >
        Submit
       </Button>
       <Button
        type="button"
        className="w-fit text-adminTextColor border border-newprimaryColor bg-transparent"
        size="lg"
        onClick={() => {
         form.reset({
          csv_file: '',
         })
         setSelectedFile(null)
         setIsFormSubmitted(false);
         // Reset the file input manually
         const fileInput = document.getElementById('document');
         if (fileInput) {
           fileInput.value = '';
         }
        }}
       >
        Reset
       </Button>
      </div>
     </form>
    </Form>
   </div>
  </div>
 )
}

export default AdminUploadOfficerForm
