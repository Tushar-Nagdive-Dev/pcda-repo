import { Phone, Star } from "@phosphor-icons/react";
import React from "react";

function ContactDetailsCard({ person_name, role, contact_number }) {
  return (
    <div className="flex flex-col p-3 bg-white text-paragraphcolor gap-2 overflow-y-auto">
      <p className="relative px-4 text-secondaryGrey font-bold">{person_name}</p>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center px-4">
          <Star size={24} color="#0D6EFD" />
          <p className="text-sm uppercase">{role}</p>
        </div>
        <div className="flex gap-2 items-center px-4">
          <Phone size={24} color="#0D6EFD" />
          <p className="text-sm uppercase">{contact_number}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactDetailsCard;
