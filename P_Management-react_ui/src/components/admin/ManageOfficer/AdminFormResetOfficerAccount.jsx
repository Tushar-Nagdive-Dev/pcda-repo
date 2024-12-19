import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function AdminFormResetOfficerAccount() {
 const { id } = useParams()
 const navigate = useNavigate()
 const [isFormSubmitted, setIsFormSubmitted] = useState(false)
 const [generatedPassword, setGeneratedPassword] = useState(null)
 const form = useForm({
  // resolver: zodResolver(),
  defaultValues: {
   officer_name: '',
   account_no: '',
   password: '',
  },
 })

 useEffect(() => {
  /* API Call to get data of officer */
  fetchOfficerData()
 }, [])

 useEffect(() => {
  /* First inital page will set random password field */
  form.setValue('password', generatePassword())
 }, [])

 /* Generate Password */
 function generatePassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'

  // Ensure at least one character from each category
  const uppercaseChar = uppercase[Math.floor(Math.random() * uppercase.length)]
  const lowercaseChar = lowercase[Math.floor(Math.random() * lowercase.length)]
  const digitChar = digits[Math.floor(Math.random() * digits.length)]

  // Combine all character pools
  const allChars = uppercase + lowercase + digits

  // Fill the rest of the password length with random characters
  const remainingChars = Array.from(
   { length: 5 },
   () => allChars[Math.floor(Math.random() * allChars.length)]
  ).join('')

  // Shuffle the password to randomize character order
  const password = (uppercaseChar + lowercaseChar + digitChar + remainingChars)
   .split('')
   .sort(() => Math.random() - 0.5)
   .join('')

  return password
 }

 async function fetchOfficerData() {
  try {
   const response = await apiClient.get('') // Adjusted endpoint
   const data = response.data
   if (response.status === 200) {
    form.setValue('officer_name', data.officer_name)
    form.setValue('account_no', data.account_no)
   }
  } catch (error) {
   console.error(error.message)
  }
 }

 const generatePasswordAction = () => {
  form.setValue('password', generatePassword())
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
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg space-y-6">
   <div className="max-w-[750px] w-full flex flex-col mx-auto">
    <h3 className="font-raleway text-2xl text-center font-bold px-5 py-3 bg-newprimaryColor text-white border border-transparent">
     Password Reset
    </h3>
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className='border border-t-0 border-adminTextColor px-5 py-3'>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       <div className="w-full flex flex-col space-y-4 my-2">
        <div className="flex justify-between">
         <Label className="text-titleColor font-raleway text-base">
          Officer Name:
         </Label>
         <Label className="text-titleColor font-raleway text-base">ABC</Label>
        </div>
        <div className="flex justify-between">
         <Label className="text-titleColor font-raleway text-base">
          Account Number:
         </Label>
         <Label className="text-titleColor font-raleway text-base">
          AHBS2A2
         </Label>
        </div>
        <FormField
         control={form.control}
         name="password"
         render={({ field }) => (
          <FormItem className="flex items-center justify-between gap-3">
           <Label className="text-titleColor text-base font-raleway">
            Password:
           </Label>
           <div className="flex gap-2">
            <FormControl>
             <Input
              {...field}
              placeholder="Enter Random Password"
              className="max-w-[300px]"
             />
            </FormControl>
            <button
             className="px-3 py-2 rounded-md text-white bg-newprimaryColor"
             onClick={generatePasswordAction}
            >
             Generate
            </button>
           </div>
           <FormMessage />
          </FormItem>
         )}
        />
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
         setIsFormSubmitted(false)
         // Reset the file input manually
         const fileInput = document.getElementById('document')
         if (fileInput) {
          fileInput.value = ''
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

export default AdminFormResetOfficerAccount
