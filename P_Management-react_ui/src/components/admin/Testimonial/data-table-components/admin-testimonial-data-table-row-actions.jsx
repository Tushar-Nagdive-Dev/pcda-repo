import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminDeleteDialog from "../../AdminDeleteDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye } from "@phosphor-icons/react";

export function TestimonialDataTableRowActions({ row }) {
  const navigate = useNavigate();
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
                onClick={() => navigate(`edit/${row.getValue("id")}`)}
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
              <AdminDeleteDialog>
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
  );
}
