import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoginValidation } from "./LoginValidationSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "../ui/inputwithicon";
import { KeyRound, UserRound } from "lucide-react";
import { Numpad } from "@phosphor-icons/react";
import { Navigate, useNavigate } from "react-router-dom";

function LoginForm({ onLoginSuccess }) {

  const navigate = useNavigate();

  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      userid: "",
      password: "",
      captcha: "", // Ensure this exists
    },
  });
  

  // Fetch captcha when the component mounts
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = async () => {
    try {
      const response = await axios.get("http://localhost:8888/auth/generate");
      const { captchaImage, token } = response.data;

      if (captchaImage && token) {
        setCaptchaImage(captchaImage);
        setCaptchaToken(token);
      } else {
        setError("Failed to load captcha. Please try again.");
      }
    } catch (err) {
      setError("Error fetching captcha. Please try again.");
    }
  };

  const onSubmit = async (values) => {
    if (!values.captcha) {
      setError("Please enter the captcha.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8888/auth/login", {
        username: values.userid,
        password: values.password,
        captchaToken,
        captchaInput: values.captcha,
      });

      setSuccess(response.data.message);
      setError("");
      onLoginSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setSuccess("");
      generateCaptcha(); // Refresh captcha on failure
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 mb-7">
          {/* User ID Field */}
          <FormField
            control={form.control}
            name="userid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <InputWithIcon
                    startIcon={UserRound}
                    placeholder="Enter User ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputWithIcon
                    startIcon={KeyRound}
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Captcha Section */}
          <div className="space-y-3">
            {captchaImage ? (
              <img
                src={captchaImage}
                alt="captcha code"
                className="h-full"
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
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {/* Submit Button */}
        <Button type="submit" className="text-white w-full bg-statebluecolor">
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
