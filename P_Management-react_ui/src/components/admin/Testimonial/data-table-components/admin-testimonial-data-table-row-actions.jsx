import { Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdminDeleteDialog from '../../AdminDeleteDialog'
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from '@/components/ui/tooltip'
import { Eye } from '@phosphor-icons/react'
import apiClient from '../../../../auth/ApiClient.jsx'
import { toast } from 'react-toastify'

export function TestimonialDataTableRowActions({ row }) {
 const navigate = useNavigate()

 async function deleteItemlists() {
  try {
   const response = await apiClient.delete(`testimonial/${row.original.id}`)
   toast.success('Successfully deleted')
   navigate('/admin/testimonial')
  } catch (error) {
   console.error(error)
   toast.error('Failed to delete selected item')
  }
 }

 return (
  <div className="flex gap-2 justify-center items-center">
   <TooltipProvider delayDuration={300}>
    {/* <Tooltip>
          <TooltipTrigger>
            <div className="rounded-full p-2 bg-newprimaryColor">
              <Eye className="text-white w-4 h-4 cursor-pointer" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>View</p>
          </TooltipContent>
        </Tooltip> */}

    <Tooltip>
     <TooltipTrigger>
      <div className="rounded-full p-2 bg-newprimaryColor">
       <Pencil
        className="text-white w-4 h-4 cursor-pointer"
        onClick={() => navigate(`edit/${row.original.id}`)}
       />
      </div>
     </TooltipTrigger>
     <TooltipContent>
      <p>Edit</p>
     </TooltipContent>
    </Tooltip>

    <Tooltip>
     <TooltipTrigger>
      <div className="rounded-full p-2 bg-red-500">
       <AdminDeleteDialog callback={(clicked) => {
        if (clicked) {
         deleteItemlists()
        }
       }}>
        <Trash2 className="text-white w-4 h-4 cursor-pointer" />
       </AdminDeleteDialog>
      </div>
     </TooltipTrigger>
     <TooltipContent>
      <p>Delete</p>
     </TooltipContent>
    </Tooltip>
   </TooltipProvider>
  </div>
 )
}
