import React, {useState, useEffect, Fragment, useContext} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {LoginValidation} from './LoginValidationSchema'

import {Button} from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import captchaDemoPic from '@/assets/images/captcha_demo.png'
import {Numpad, SignIn} from '@phosphor-icons/react'
import {InputWithIcon} from '../ui/inputwithicon.jsx'
import {KeyRound, UserRound} from 'lucide-react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {setToken} from "../../auth/TokenExp.jsx";
import UserForgetPasswordForm from "./User/UserForgetPasswordForm.jsx";
import UserLoginWithOTP from "./User/Existing/UserLoginWithOTP.jsx";
import {DemoUserFlowContext} from "../../context/DemoUserFlowPurposeContext.jsx";

function AdminLoginForm() {
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(LoginValidation),
        defaultValues: {
            userid: '',
            password: '',
            captcha: '',
        },
    });
    const demouserloginctx = useContext(DemoUserFlowContext);

    const [captchaImage, setCaptchaImage] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')
    /* Update set value if account is exisiting, it will display login with otp */
    const [isExisting, setIsExisiting] = useState(false);
    /* set Phone number from backend when user is login */
    const [phoneNum, setPhoneNum] = useState('99xxxxxxxx99');

    useEffect(() => {

    }, [isExisting])


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
            return;
        }

        console.log("User Registered:", demouserloginctx.isRegisteredUser);

        if(demouserloginctx.isRegisteredUser) {
            setIsExisiting(true);
        } else {
            navigate("/twofa")
        }

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
        <React.Fragment>
            <div className="w-full h-full border-l-slate-200 border-l-2">
                <div
                    className="mx-auto flex w-full h-full flex-col justify-center md:max-lg:space-y-2 mid_hd_screen:max-full_hd_screen:space-y-3 space-y-6 sm:w-[450px]">

                    {isExisting ? (
                        <UserLoginWithOTP phoneNum={phoneNum}/>
                    ) : (
                        <React.Fragment>
                            <div className="text-left mb-5">
                                <div className="flex flex-col space-y-3">
                                    <h2 className="md:max-lg:text-xl mid_hd_screen:max-full_hd_screen:text-3xl text-4xl tracking-tight raleway-font">
                                        Login
                                    </h2>
                                </div>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div
                                        className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-4 mb-7">
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
                                        Sign In <SignIn size={24} color="#ffffff"/>
                                    </Button>
                                </form>
                            </Form>
                            <Link
                                to={"/forgotpassword"}
                                className="px-8 text-center text-sm text-statebluecolor raleway-font underline-offset-2"
                            >
                                Forgot Your Password?
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminLoginForm
