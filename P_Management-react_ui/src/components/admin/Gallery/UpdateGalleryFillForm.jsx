import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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

import { TableCell, TableRow } from "@/components/ui/table";
import AdminFormTable from "../AdminFormTable.jsx";
import { PlusIcon, Trash2 } from "lucide-react";
import AdminDeleteDialog from "../AdminDeleteDialog.jsx";
import { GalleryFormValidation } from "./GalleryFormValidation.js";
import apiClient from "../../../auth/ApiClient.jsx";
import { useParams, useNavigate } from "react-router-dom";

const formColumns = ["Sr. No.", "File Name / Upload File", "Action"];

function UpdateGalleryFillForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    // resolver: zodResolver(GalleryFormValidation),
    defaultValues: {
      event_name: "",
      type: "",
      year: new Date().getFullYear(),
      active: false,
      gallery: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "gallery",
  });

  // Fetch gallery data and files
  useEffect(() => {
    const fetchGalleryData = async () => {
      setLoading(true);
      try {
        // Fetch gallery metadata
        const { data: gallery } = await apiClient.get(`/gallery/${id}`);
        const { data: files } = await apiClient.get(`/gallery/${id}/files`);

        form.reset({
          event_name: gallery.eventName,
          type: gallery.type.toLowerCase(),
          year: gallery.year,
          active: gallery.isActive,
        });

        // Replace gallery files in form
        replace(
          files.map((file) => ({
            filePath: file,
            image: null,
          }))
        );
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [id, form, replace]);

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
  
      // Append gallery metadata
      const updatedGallery = {
        eventName: values.event_name,
        type: values.type ? values.type.toUpperCase() : "IMAGE", // Default to IMAGE if null or empty
        year: values.year,
        isActive: values.active,
      };
  
      formData.append(
        "gallery",
        new Blob([JSON.stringify(updatedGallery)], { type: "application/json" })
      );
  
      // Append new files
      values.gallery.forEach((item) => {
        if (item.image) {
          formData.append("files", item.image);
        }
      });
  
      // Submit the form
      const response = await apiClient.put(`/gallery/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        alert("Gallery updated successfully!");
        navigate("/gallery");
      }
    } catch (error) {
      console.error("Error updating gallery:", error);
      alert("Failed to update gallery.");
    }
  };
  

  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
      <h3 className="font-raleway text-2xl text-center font-bold">
        Gallery Manager
      </h3>
      <div className="flex flex-col space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 mb-7">
              {/* Event Name */}
              <FormField
                control={form.control}
                name="event_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Event Name:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Type
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Image">Image</SelectItem>
                          <SelectItem value="Video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Year
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Year" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Active */}
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
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Active
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Gallery Files */}
              <div className="flex flex-col space-y-3">
                <AdminFormTable columnNameList={formColumns}>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {field.filePath ? (
                          <a
                            href={field.filePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                          >
                            View File
                          </a>
                        ) : (
                          <Input
                            type="file"
                            onChange={(e) =>
                              form.setValue(
                                `gallery.${index}.image`,
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <AdminDeleteDialog callback={() => remove(index)}>
                          <Trash2 className="text-red-500 cursor-pointer" />
                        </AdminDeleteDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </AdminFormTable>

                <Button
                  type="button"
                  className="bg-titleColor/50 text-white px-4 py-2 rounded-md"
                  onClick={() => append({ image: null, filePath: "" })}
                >
                  <PlusIcon size={18} />
                  Add Item
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="text-white bg-newprimaryColor"
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

export default UpdateGalleryFillForm;
