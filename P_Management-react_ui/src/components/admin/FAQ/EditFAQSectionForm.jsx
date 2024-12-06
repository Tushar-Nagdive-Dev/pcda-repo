import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { faqformValidation } from './FAQSectionFormValidation.js';
import apiClient from '../../../auth/ApiClient.jsx';

function EditFAQSectionForm() {
  const { id } = useParams(); // Retrieve ID from the URL
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(faqformValidation),
    defaultValues: {
      section_name: '',
      active: false,
    },
  });

  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    console.log(`API URL: /faqdetails/updateTitle/${values.section_name}/${id}/${values.active}`);

    try {
      const response = await apiClient.put(`/faqdetails/updateTitle/${values.section_name}/${id}/${values.active}`);
      console.log('API Response:', response.data);
      navigate('/admin/faq/add-section'); // Redirect on success
    } catch (error) {
      console.error('Error updating section:', error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
      <h3 className="font-raleway text-2xl text-center font-bold">Edit FAQ Section</h3>
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
              {/* Active Checkbox Field */}
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-titleColor text-base font-raleway">Active</FormLabel>
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
  );
}

export default EditFAQSectionForm;
