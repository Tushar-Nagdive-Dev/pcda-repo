import React from 'react';
import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const ivrs = [
    {
        phone_number: "XXX XXX XX34",
        tpin: "XX XX XX",
        language: "Hindi",
        created_date: "08 Dec 2024",
    },
    {
        phone_number: "XXX XXX XX34",
        tpin: "XX XX XX",
        language: "English",
        created_date: "08 Dec 2024",
    },
]

function UserIvrsTable(props) {
    return (
        <div className="w-full flex flex-col space-y-8 px-1">
            <div className="w-full flex justify-between items-center">
                <p className="font-raleway text-xl font-semibold">User Manual</p>
                <Button
                    variant={"destructive"}
                    className="text-lg"
                >
                    Register/Update
                </Button>
            </div>

            {/* Table */}
            <Table className="!rounded-xl">
                <TableHeader className="bg-newprimaryColor text-white text-lg">
                    <TableRow>
                        <TableHead className="font-raleway">Sr. No.</TableHead>
                        <TableHead className="font-raleway">Phone Number</TableHead>
                        <TableHead className="font-raleway">TPIN</TableHead>
                        <TableHead className="font-raleway">Langauge</TableHead>
                        <TableHead className="font-raleway">Created Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-adminBreadCrumbsBg text-titleColor text-lg">
                    {ivrs.map((row, index) => (
                        <TableRow key={row.phone_number}>
                            <TableCell className="font-raleway">{index + 1}</TableCell>
                            <TableCell className="font-raleway">{row.phone_number}</TableCell>
                            <TableCell className="font-raleway">{row.tpin}</TableCell>
                            <TableCell className="font-raleway">{row.language}</TableCell>
                            <TableCell className="font-raleway">{row.created_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default UserIvrsTable;