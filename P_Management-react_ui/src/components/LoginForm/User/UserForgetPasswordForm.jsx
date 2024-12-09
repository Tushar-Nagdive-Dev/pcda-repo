import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Button} from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {Numpad, SignIn} from '@phosphor-icons/react'
import {InputWithIcon} from '../../ui/inputwithicon.jsx'
import {KeyRound, UserRound} from 'lucide-react'
import {Navigate, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {setToken} from "../../../auth/TokenExp.jsx";
import {ForgetPasswordValidation} from "./UserForgetPasswordFieldValidation.js";

function UserForgetPasswordForm() {
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(ForgetPasswordValidation),
        defaultValues: {
            userid: '',
            captcha: '',
        },
    })

    const [captchaImage, setCaptchaImage] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')

    // Fetch captcha when the component mounts
    useEffect(() => {
        generateCaptcha()
    }, [])

    const generateCaptcha = async () => {
        try {
            const response = await axios.get('http://localhost:8888/auth/generate')
            const {captchaImage, token} = response.data

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
        const {userid, captcha} = values


        if (!captcha) {
            toast.error('Please enter the captcha.')
            return;
        }

        //navigate("/user");

        /* API Login for user */

        // try {
        //     // Reset states to avoid residual messages
        //     setError('');
        //     setSuccess('');
        //
        //     const response = await axios.post('http://localhost:8888/auth/login', {
        //         username: userid,
        //         password,
        //         captchaToken,
        //         captchaInput: captcha,
        //     })
        //
        //     setSuccess(response.data.message)
        //     toast.success(response.data.message)
        //     setToken(response.data.token);
        //     navigate('/pcdao')
        //     // onLoginSuccess(true)
        // } catch (err) {
        //     setError(err.response?.data?.message || 'Login failed. Please try again.')
        //     toast.error(err.response?.data?.message || 'Login failed. Please try again.')
        //     setSuccess('')
        //     generateCaptcha() // Refresh captcha on failure
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-4 mb-7">
                    <FormField
                        control={form.control}
                        name="userid"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>User Name</FormLabel>
                                <FormControl>
                                    <InputWithIcon
                                        startIcon={UserRound}
                                        placeholder="Enter User Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className="space-y-3">
                        {captchaImage ? (
                            <img src={captchaImage} alt="captcha code" className="max-h-24 w-full"/>
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
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <InputWithIcon
                                        startIcon={Numpad}
                                        placeholder="Enter Captcha"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="text-white w-full bg-statebluecolor">
                    Submit <SignIn size={24} color="#ffffff"/>
                </Button>
            </form>
        </Form>
    )
}

export default UserForgetPasswordForm
