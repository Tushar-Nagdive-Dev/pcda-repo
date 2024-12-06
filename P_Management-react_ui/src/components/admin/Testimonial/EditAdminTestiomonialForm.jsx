import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'react-router-dom';
import apiClient from '../../../auth/ApiClient'; // Adjust path as needed
import { toast } from 'react-toastify';

function EditAdminTestimonialForm() {
  const { id } = useParams(); // Get testimonial ID from the URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(), // Add your schema validation here
    defaultValues: {
      profile_picture: '',
      name: '',
      position: '',
      testimonial_brief: '',
      status: '',
      new: false,
    },
  });

  const { reset } = form;

  // Fetch testimonial data by ID
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/testimonial/${id}`);
        const testimonial = response.data;

        // Map API data to form fields
        reset({
          name: testimonial.name,
          position: testimonial.position,
          testimonial_brief: testimonial.testimonialBrief,
          status: testimonial.status === 'ACTIVE' ? 'Active' : 'In-Active',
          new: testimonial.isNew,
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching testimonial:', err);
        setError('Failed to load testimonial data.');
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id, reset]);

  const onSubmit = (values) => {
    console.log('Form submitted:', values);
    // Add API call to update the testimonial here
  };

  if (loading) {
    return <div>Loading testimonial...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
      <h3 className="font-raleway text-2xl text-center font-bold">
        Edit Testimonial
      </h3>
      <div className="flex flex-col space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="md:max-lg:space-y-1 space-y-6 mb-7">
              <FormField
                control={form.control}
                name="profile_picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">Profile Picture:</FormLabel>
                    <FormControl>
                      <Input id="picture" type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-titleColor text-base font-raleway">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-titleColor text-base font-raleway">Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="testimonial_brief"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">Testimonial Brief</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="In-Active">In-Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="new"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </>
                    </FormControl>
                    <FormLabel className="text-titleColor text-base font-raleway">New</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default EditAdminTestimonialForm;
