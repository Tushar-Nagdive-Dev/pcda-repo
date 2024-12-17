import React, { useState } from 'react'
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
import UserFirstTimeCreateAccount from './UserFirstTimeCreateAccount'
import UserFirstTimeEmail from './UserFirstTimeEmail'

function UserFirstTimeLogin() {
 const [isSetCDA, setIsSetCDA] = useState(false)
 const navigate = useNavigate()
 const form = useForm({
  resolver: zodResolver(cdaAccountNoValidaton),
  defaultValues: {
   cda_account_no: '',
  },
 })

 const onSubmit = async (values) => {
  const { cda_account_no } = values
  console.log(cda_account_no)
  setIsSetCDA(true)
 }
 return (
  <React.Fragment>
   {isSetCDA ? (
    <UserFirstTimeEmail />
   ) : (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-10">
     <h2 className="text-2xl font-raleway">First Time Login</h2>
     <Form {...form}>
      <form
       onSubmit={form.handleSubmit(onSubmit)}
       className="overflow-y-auto px-20 w-full"
      >
       <div className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-4 mb-7">
        <FormField
         control={form.control}
         name="cda_account_no"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="font-raleway text-base ">
            Enter CDA A/C No:
           </FormLabel>
           <FormControl>
            <InputWithIcon
             startIcon={Numpad}
             placeholder="Enter CDA A/C No"
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

export default UserFirstTimeLogin
