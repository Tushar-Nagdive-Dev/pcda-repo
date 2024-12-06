import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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

import { TableCell, TableRow } from '@/components/ui/table';
import AdminFormTable from '../AdminFormTable.jsx';
import { PlusIcon, Trash2 } from 'lucide-react';
import AdminDeleteDialog from '../AdminDeleteDialog.jsx';
import { GalleryFormValidation } from './GalleryFormValidation.js';
import apiClient from '../../../auth/ApiClient.jsx';
import { useParams, useNavigate } from "react-router-dom";


const formColumns = ['Sr. No.', 'Upload File', 'Action'];

function UpdateGalleryFillForm() {
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const form = useForm({
    resolver: zodResolver(GalleryFormValidation),
    defaultValues: {
      event_name: '',
      type: '',
      year: new Date().getFullYear(),
      active: false,
      gallery: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'gallery',
  });

  // Fetch gallery and files on mount
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        // Fetch gallery details
        const { data: gallery } = await apiClient.get(`/gallery/${id}`);
        form.reset({
          event_name: gallery.eventName,
          type: gallery.type.toLowerCase(),
          year: gallery.year,
          active: gallery.isActive,
        });

        // Fetch file paths
        const { data: files } = await apiClient.get(`/gallery/${id}/files`);
        setFileList(files);

        // Populate gallery array with existing files
        replace(files.map((file) => ({ image: null, filePath: file })));
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchGalleryData();
  }, [id, form, replace]);

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Append updated files
      values.gallery.forEach((item, index) => {
        if (item.image) {
          formData.append(`files[${index}]`, item.image);
        }
      });

      // Append gallery metadata
      const updatedGallery = {
        eventName: values.event_name,
        type: values.type.toUpperCase(),
        year: values.year,
        isActive: values.active,
      };

      formData.append('gallery', new Blob([JSON.stringify(updatedGallery)], { type: 'application/json' }));

      // Update gallery via PUT API
      await apiClient.put(`/gallery/${id}`, updatedGallery);

      alert('Gallery updated successfully!');
    } catch (error) {
      console.error('Error updating gallery:', error);
      alert(error.response?.data || 'Failed to update gallery.');
    }
  };

  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
      <h3 className="font-raleway text-2xl text-center font-bold">Gallery Master</h3>
      <div className="flex flex-col space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="md:max-lg:space-y-1 space-y-6 mb-7">
              {/* Event Name */}
              <FormField
                control={form.control}
                name="event_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">Event Name:</FormLabel>
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
                    <FormLabel className="text-titleColor text-base font-raleway">Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
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
                    <FormLabel className="text-titleColor text-base font-raleway">Year</FormLabel>
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
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-titleColor text-base font-raleway">Active</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gallery Files */}
              <div className="flex flex-col space-y-3 items-center">
                <AdminFormTable columnNameList={formColumns}>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      {/* Sr. No. */}
                      <TableCell>{index + 1}</TableCell>

                      {/* Image Upload */}
                      <TableCell>
                        {field.filePath ? (
                          <a href={field.filePath} target="_blank" rel="noopener noreferrer">
                            Existing File
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

                      {/* Delete Button */}
                      <TableCell>
                        <AdminDeleteDialog callback={() => remove(index)}>
                          <Trash2 className="text-white w-4 h-4 cursor-pointer" />
                        </AdminDeleteDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </AdminFormTable>

                {/* Add Item Button */}
                <button
                  type="button"
                  className="w-fit bg-titleColor/50 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    append({ image: null, filePath: '', title: '', year: '', status: '' })
                  }
                >
                  <PlusIcon size={18} />
                </button>
              </div>
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

export default UpdateGalleryFillForm;
