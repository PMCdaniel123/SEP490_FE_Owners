"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface AuthItemProps {
  icon: LucideIcon;
  title: string;
  form: React.ReactElement<{ onSubmit: () => void }>;
}

function AuthItem({ icon: Icon, title, form }: AuthItemProps) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-md cursor-pointer bg-third p-8`}
    >
      <div className={`flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Icon size={28} />
          <span className={`font-semibold text-base`}>{title}</span>
        </div>
      </div>
      <div
        className="p-4 bg-white rounded-md border"
        onClick={(e) => e.stopPropagation()}
      >
        {React.cloneElement(form)}
      </div>
    </div>
  );
}

export default AuthItem;
