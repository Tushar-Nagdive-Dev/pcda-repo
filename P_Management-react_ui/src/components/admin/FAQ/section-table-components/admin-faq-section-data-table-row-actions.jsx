import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminDeleteDialog from "../../AdminDeleteDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FAQSectionDataTableRowActions({ row }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 justify-center items-center">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger>
            <div className="rounded-full p-2 bg-newprimaryColor">
              <Pencil
                className="text-white w-4 h-4 cursor-pointer"
                onClick={() => navigate(`/admin/faq/edit-section/${row.getValue("section_name")}`)}
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
