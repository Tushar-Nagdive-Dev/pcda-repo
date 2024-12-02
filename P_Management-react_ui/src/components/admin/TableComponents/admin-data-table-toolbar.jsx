import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
// import {useState} from "react";
import {TrashIcon} from "lucide-react";
import {DataTableFacetedFilter} from "./admin-testimonial-data-table-faceted-filter.jsx";

// eslint-disable-next-line react/prop-types
export function DataTableToolbar({table, searchInputField, filterField, filterFieldName, filterCategoriesList}) {

    return (
        <div className="w-full flex flex-wrap flex-row-reverse items-center">
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <Input
                    placeholder="Search"
                    value={table.getColumn(searchInputField)?.getFilterValue() ?? ""}
                    onChange={(event) => {
                        table.getColumn(searchInputField)?.setFilterValue(event.target.value);
                    }}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn(filterField) && (
                    <DataTableFacetedFilter
                        column={table.getColumn(filterField)}
                        title={filterFieldName}
                        options={filterCategoriesList}
                    />
                )}
            </div>

            <div className="flex items-center gap-2">
                {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                    <Button variant="outline" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true"/>
                        Delete ({table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                ) : null}
            </div>
        </div>
    );
}
