import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import {DataTablePagination} from "./admin-pagination";

export function AdminCommonDataTable({columns, data, searchInputField, filterField, filterFieldName, filterCategoriesList, children}) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [sorting, setSorting] = React.useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting, columnVisibility, rowSelection, columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    // Clone children (DataToolbar) and pass `table` as a prop
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {table, searchInputField, filterField, filterFieldName, filterCategoriesList});
        }
        return child;
    });

    return (<div className="space-y-4">
        {childrenWithProps}
        <div className="overflow-y-auto rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (<TableHead
                            className="px-4 py-2 bg-newprimaryColor text-white font-raleway"
                            key={header.id}
                            colSpan={header.colSpan}
                        >
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>))}
                    </TableRow>))}
                </TableHeader>
                <TableBody className="bg-adminBreadCrumbsBg font-raleway">
                    {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (<TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (<TableCell className="px-4 py-2" key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>))}
                    </TableRow>))) : (<TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center bg-adminBreadCrumbsBg font-raleway"
                        >
                            No results.
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
        <DataTablePagination table={table}/>
    </div>);
}
