import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {LoginValidation} from './LoginValidationSchema'

import {Button} from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import captchaDemoPic from '@/assets/images/captcha_demo.png'
import {Numpad, SignIn} from '@phosphor-icons/react'
import {InputWithIcon} from '../ui/inputwithicon'
import {KeyRound, UserRound} from 'lucide-react'
import {Navigate, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {setToken} from "../../auth/TokenExp.jsx";

function AdminLoginForm({onLoginSuccess}) {
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(LoginValidation),
        defaultValues: {
            userid: '',
            password: '',
            captcha: '', // Ensure this exists
        },
    })

    const [captchaImage, setCaptchaImage] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

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
                setError('Failed to load captcha. Please try again.')
                toast.error('Failed to load captcha. Please try again.')
            }
        } catch (err) {
            setError('Error fetching captcha. Please try again.')
            toast.error('Failed to load captcha. Please try again.')
        }
    }

    const onSubmit = async (values) => {
        const {userid, password, captcha} = values

        // console.log(userid)
        // console.log(password)
        // console.log(captcha)

        if (!captcha) {
            setError('Please enter the captcha.')
            toast.error('Please enter the captcha.')
            return
        }

        try {
            // Reset states to avoid residual messages
            setError('');
            setSuccess('');

            const response = await axios.post('http://localhost:8888/auth/login', {
                username: userid,
                password,
                captchaToken,
                captchaInput: captcha,
            })

            setSuccess(response.data.message)
            toast.success(response.data.message)
            setToken(response.data.token);
            navigate('/pcdao')
            // onLoginSuccess(true)
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.')
            toast.error(err.response?.data?.message || 'Login failed. Please try again.')
            setSuccess('')
            generateCaptcha() // Refresh captcha on failure
        }
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <InputWithIcon
                                        startIcon={KeyRound}
                                        placeholder="Enter Passsword"
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className="space-y-3">
                        {captchaImage ? (
                            <img src={captchaImage} alt="captcha code" className="h-full"/>
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
                    Sign In <SignIn size={24} color="#ffffff"/>
                </Button>
            </form>
        </Form>
    )
}

export default AdminLoginForm
