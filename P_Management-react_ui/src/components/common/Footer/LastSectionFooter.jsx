import React from "react";
import { Separator } from "@/components/ui/separator"

function LastSectionFooter() {
    return (
        <div
            className="w-full h-fulls bg-mainprimarycolor flex flex-col justify-center items-center py-3 text-footermenulistcolor space-y-2">
            <p className="text-footermenulistcolor text-xl font-bold">Disclaimer</p>
            <p className="text-footermenulistcolor text-justify px-custom">The information provided on this website is based on
                relevant Govt. orders, Army Instructions and Army Orders. However contents of this web site cannot be
                quoted as authority in any of the correspondence with the Office of the Principal Controller of Defence
                Accounts (Officers) or with any other organisation. No classified information will be provided or
                received through this web site. The copyright and ownership as regard to the domain name, contents and
                web design rests with the Principal Controller of Defence Accounts (Officers), Golibar Maidan, Pune,
                India - 411001.</p>
            <Separator className="my-4 bg-paragraphcolor/40 w-[95%]" />
            <p className="text-footermenulistcolor font-bold">PCDA(O) Pune</p>
        </div>
    );
}

export default LastSectionFooter;
