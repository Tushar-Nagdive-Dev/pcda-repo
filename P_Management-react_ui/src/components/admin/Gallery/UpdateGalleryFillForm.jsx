import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'

import {
 TableCell,
 TableRow,
} from '@/components/ui/table'

import AdminFormTable from '../AdminFormTable.jsx'
import { PlusIcon, Trash2 } from 'lucide-react'
import AdminDeleteDialog from '../AdminDeleteDialog.jsx'
import { GalleryFormValidation } from './GalleryFormValidation.js'

const formColumns = [
 'Sr. No.',
 'Upload File',
 'Action',
]

function UpdateGalleryFillForm() {
 const form = useForm({
  resolver: zodResolver(GalleryFormValidation),
  defaultValues: {
   /* It dont need to store in useForm, use Customized as per your standard */
   event_name: '',
   type: '',
   active: '',
   gallery: [{ image: null, title: '', year: '', status: '' }],
  },
 })

 const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: 'gallery',
 })


 function onSubmit(values) {
  console.log(values)
 }

 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Gallery Master
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       <FormField
        control={form.control}
        name="event_name"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">Event Name:</FormLabel>
          <FormControl>
           <Input placeholder={'Enter event name'} {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">Type</FormLabel>
          <FormControl>
           <Select
            onValueChange={(value) => field.onChange(value)} // Update form value
            // defaultValue={field.value} // Set the default value
           >
            <SelectTrigger className="w-full">
             <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
             <SelectItem value="Image">
              Image
             </SelectItem>
             <SelectItem value="Video">
              Video
             </SelectItem>
            </SelectContent>
           </Select>
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="year"
        render={({ field }) => (
         <FormItem className="flex flex-col space-y-3">
          <FormLabel className="text-titleColor text-base font-raleway">Year</FormLabel>
          <FormControl>
           <Input
            type="number"
            placeholder="Year"
            {...field}
           />
          </FormControl>
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="active"
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
          <FormLabel className="text-titleColor text-base font-raleway">Active</FormLabel>
          <FormMessage />
         </FormItem>
        )}
       />

       <div className="flex flex-col space-y-3 items-center">
        <AdminFormTable columnNameList={formColumns}>
         {fields.map((field, index) => (
          <TableRow key={field.id}>
           {/* Sr. No. */}
           <TableCell>{index + 1}</TableCell>

           {/* Image Upload */}
           <TableCell>
            <Input
             type="file"
             id={`items.${index}.image`}
             {...form.register(`items.${index}.image`)}
             onChange={(e) =>
              form.setValue(
               `items.${index}.image`,
               e.target.files ? e.target.files[0] : null,
              )
             }
            />
           </TableCell>

           {/*/!* Title Input *!/*/}
           {/*<TableCell>*/}
           {/* <Input*/}
           {/*  id={`items.${index}.title`}*/}
           {/*  placeholder="Enter title"*/}
           {/*  {...form.register(`items.${index}.title`)}*/}
           {/* />*/}
           {/*</TableCell>*/}

           {/*/!* Year Input *!/*/}
           {/*<TableCell>*/}
           {/* <Input*/}
           {/*  type="number"*/}
           {/*  id={`items.${index}.year`}*/}
           {/*  placeholder="Year"*/}
           {/*  {...form.register(`items.${index}.year`)}*/}
           {/* />*/}
           {/*</TableCell>*/}

           {/*/!* Status Select *!/*/}
           {/*<TableCell>*/}
           {/* <Controller*/}
           {/*  control={form.control}*/}
           {/*  name={`items.${index}.status`}*/}
           {/*  render={({ field }) => (*/}
           {/*   <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
           {/*    <SelectTrigger className="w-full">*/}
           {/*     <SelectValue placeholder="Select Status" />*/}
           {/*    </SelectTrigger>*/}
           {/*    <SelectContent>*/}
           {/*     <SelectItem value="active">Active</SelectItem>*/}
           {/*     <SelectItem value="inactive">Inactive</SelectItem>*/}
           {/*    </SelectContent>*/}
           {/*   </Select>*/}
           {/*  )}*/}
           {/* />*/}
           {/*</TableCell>*/}

           {/* Delete Button */}
           <TableCell>
            <div className="w-fit rounded-full p-2 bg-red-500">
             <AdminDeleteDialog callback={() => remove(index)}>
              <Trash2 className="text-white w-4 h-4 cursor-pointer" />
             </AdminDeleteDialog>
            </div>
           </TableCell>
          </TableRow>
         ))}
        </AdminFormTable>

        {/* Add Item Button */}
        <button
         type="button"
         className="w-fit bg-titleColor/50 text-white px-4 py-2 rounded-md"
         onClick={() =>
          append({
           image: null,
           title: "",
           year: new Date().getFullYear(),
           status: "",
          })
         }
        >
         <PlusIcon size={18} />
        </button>
       </div>
      </div>
      <div className="w-full flex justify-center">
       <Button
        type="submit"
        className="w-fit text-white  bg-newprimaryColor"
        size="lg"
       >
        Submit
       </Button>
      </div>
     </form>
    </Form>
   </div>
  </div>
 )
}

export default UpdateGalleryFillForm