import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Numpad } from '@phosphor-icons/react'
import { cdaAccountNoValidaton } from './UserFirstTimeValidation'
import { InputWithIcon } from '../../../ui/inputwithicon'
import { Input } from '../../../ui/input'

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'
import { toast } from 'react-toastify'
import axios from 'axios'
import UserMobileRegistration from './UserMobileRegistration.jsx'

function UserFirstTimeCreateAccount() {
 const navigate = useNavigate()
 const form = useForm({
  //   resolver: zodResolver(cdaAccountNoValidaton),
  defaultValues: {
   officer_name: '',
   cda_account_no: '',
   user_name: '',
   password: '',
   confirm_password: '',
   selection_question: '',
   answer: '',
   captcha: '',
  },
 })

 // Watch the 'selection_questions' field
 const isSelectedQuestions = form.watch('selection_question')
 const [captchaImage, setCaptchaImage] = useState('')
 const [captchaToken, setCaptchaToken] = useState('')
 const [isRegistredAccount, setRegistredAccount] = useState(false)

 // Fetch captcha when the component mounts
 useEffect(() => {
  generateCaptcha()
 }, [])

 const generateCaptcha = async () => {
  try {
   const response = await axios.get('http://localhost:8888/auth/generate')
   const { captchaImage, token } = response.data

   if (captchaImage && token) {
    setCaptchaImage(captchaImage)
    setCaptchaToken(token)
   } else {
    toast.error('Failed to load captcha. Please try again.')
   }
  } catch (err) {
   toast.error('Failed to load captcha. Please try again.')
  }
 }

 const onSubmit = async (values) => {
  const {
   officer_name,
   cda_account_no,
   user_name,
   password,
   confirm_password,
   selection_question,
   answer,
   captcha,
  } = values
  console.log(values)

  if (!captcha) {
   toast.error('Please enter the captcha.')
   return
  }

  setRegistredAccount(true)
 }
 return (
  <React.Fragment>
   {isRegistredAccount ? (
    <UserMobileRegistration />
   ) : (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-10">
     <h2 className="text-2xl font-raleway">First Time Login</h2>
     <Form {...form}>
      <form
       onSubmit={form.handleSubmit(onSubmit)}
       className="overflow-y-auto px-20 w-full h-[90svh]"
      >
       <div className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-3 mb-7">
        <FormField
         control={form.control}
         name="officer_name"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="font-raleway text-base ">
            Officer Name
           </FormLabel>
           <FormControl>
            <Input placeholder="Enter Officer Name" {...field} />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <FormField
         control={form.control}
         name="cda_account_no"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="font-raleway text-base ">
            Enter CDA A/C No:
           </FormLabel>
           <FormControl>
            <Input placeholder="Enter CDA A/C No" {...field} />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <FormField
         control={form.control}
         name="user_name"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="font-raleway text-base ">
            Enter User Name:
           </FormLabel>
           <FormControl>
            <Input placeholder="Enter User Name" {...field} />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <FormField
         control={form.control}
         name="password"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="font-raleway text-base ">
            Enter Password:
           </FormLabel>
           <FormControl>
            <Input type="password" placeholder="Enter Password:" {...field} />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <FormField
         control={form.control}
         name="confirm_password"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="font-raleway text-base ">
            Enter Confirm Password:
           </FormLabel>
           <FormControl>
            <Input
             type="password"
             placeholder="Enter Confirm Password:"
             {...field}
            />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <FormField
         control={form.control}
         name="selection_question"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="font-raleway text-base ">
            Select Security Questions
           </FormLabel>
           <FormControl>
            <Select
             onValueChange={(value) => field.onChange(value)} // Update form value
            >
             <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Security Questions" />
             </SelectTrigger>
             <SelectContent>
              <SelectItem value="What is your birth place?">
               What is your birth place?
              </SelectItem>
              <SelectItem value="What is your father name?">
               What is your father name?
              </SelectItem>
              <SelectItem value="What is your favourite sports person name?">
               What is your favourite sports person name?
              </SelectItem>
              <SelectItem value="What is your favourite sports name?">
               What is your favourite sports name?
              </SelectItem>
             </SelectContent>
            </Select>
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        {isSelectedQuestions && isSelectedQuestions.trim() !== '' ? (
         <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
           <FormItem>
            <FormLabel className="font-raleway text-base ">
             Enter Security Answer
            </FormLabel>
            <FormControl>
             <Input placeholder="Enter Security Answer" {...field} />
            </FormControl>
            <p className="text-sm text-red-500 font-raleway">
             Please note that answser is case sensitive.
            </p>
            <FormMessage />
           </FormItem>
          )}
         />
        ) : null}

        <div className="space-y-3">
         {captchaImage ? (
          <img
           src={captchaImage}
           alt="captcha code"
           className="max-h-20 w-full"
          />
         ) : (
          <p>Loading captcha...</p>
         )}
         <p
          className="text-statebluecolor cursor-pointer"
          onClick={generateCaptcha}
         >
          Refresh
         </p>
        </div>

        <FormField
         control={form.control}
         name="captcha"
         render={({ field }) => (
          <FormItem>
           <FormControl>
            <InputWithIcon
             startIcon={Numpad}
             placeholder="Enter Captcha"
             {...field}
            />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <Button type="submit" className="text-white w-full bg-statebluecolor">
         Submit <ArrowRight size={24} color="#ffffff" />
        </Button>
       </div>
      </form>
     </Form>
    </div>
   )}
  </React.Fragment>
 )
}

export default UserFirstTimeCreateAccount
