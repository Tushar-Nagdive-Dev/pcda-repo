import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../auth/ApiClient"; // Adjust the path as needed
import { toast } from "react-toastify";

function EditAdminTestimonialForm() {
  const { id } = useParams(); // Get testimonial ID from the URL
  const navigate = useNavigate(); // For redirecting after saving
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // To preview current image

  const form = useForm({
    resolver: zodResolver(), // Add your schema validation here
    defaultValues: {
      profile_picture: null,
      name: "",
      position: "",
      testimonial_brief: "",
      status: "",
      new: false,
    },
  });

  const { reset, setValue, watch } = form;

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
          status: testimonial.status === "ACTIVE" ? "Active" : "In-Active",
          new: testimonial.isNew,
        });

        // Set the current image for preview
        if (testimonial.imagePath) {
          setImagePreview(`/api/testimonial/image/${testimonial.imagePath}`);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonial:", err);
        setError("Failed to load testimonial data.");
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id, reset]);

  const onSubmit = async (values) => {
    const formData = new FormData();

    // Append form data for fields
    formData.append(
      "data",
      JSON.stringify({
        name: values.name,
        position: values.position,
        testimonialBrief: values.testimonial_brief,
        status: values.status === "Active" ? "ACTIVE" : "INACTIVE",
        isNew: values.new,
      })
    );

    // Append the file if selected
    const file = watch("profile_picture");
    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }

    try {
      const response = await apiClient.put(`/testimonial/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Testimonial updated successfully!");
      navigate("/admin/testimonials"); // Redirect to the testimonials list page
    } catch (err) {
      console.error("Error updating testimonial:", err);
      toast.error("Failed to update testimonial.");
    }
  };

  if (loading) {
    return <div>Loading testimonial...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
      <h3 className="font-raleway text-2xl text-center font-bold">Edit Testimonial</h3>
      <div className="flex flex-col space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="md:max-lg:space-y-1 space-y-6 mb-7">
              <FormField
                control={form.control}
                name="profile_picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Profile Picture:
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            field.onChange(e.target.files); // Pass file(s) to react-hook-form
                            const fileReader = new FileReader();
                            fileReader.onload = (event) => {
                              setImagePreview(event.target.result); // Update the preview
                            };
                            fileReader.readAsDataURL(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Current Profile"
                    className="max-w-xs max-h-40 rounded-md"
                  />
                </div>
              )}
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
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Testimonial Brief
                    </FormLabel>
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
                      <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-titleColor text-base font-raleway">New</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-center">
              <Button type="submit" className="w-fit text-white bg-newprimaryColor" size="lg">
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
