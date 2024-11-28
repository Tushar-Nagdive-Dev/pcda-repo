import React from "react";
import headerStyle from "./Header.module.css";

function NoteHeader() {
  return (
    <div className={`${headerStyle.note_header_section} px-custom py-2`}>
      <div className="flex gap-4">
        <p>
          <b>Key Updates:</b>
        </p>
        <marquee>
          <ul className="flex gap-5 w-full list-disc space-x-2">
            <li>
            Message to Army Officers regarding Income Tax Regime.
            </li>
            <li>
            Statement of Account for the month of October 2024 has been uploaded.
            </li>
            <li>
            Form 16 for the Financial Year 2023-24 (Assessment Year 2024-25) has been uploaded.
            </li>
          </ul>
        </marquee>
      </div>
    </div>
  );
}

export default NoteHeader;
