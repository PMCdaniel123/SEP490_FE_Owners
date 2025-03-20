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
      className={`flex flex-col gap-4 rounded-xl mb-4 cursor-pointer bg-third p-8`}
    >
      <div className={`flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Icon size={28} />
          <span className={`font-semibold text-lg`}>{title}</span>
        </div>
      </div>
      <div
        className="p-4 bg-white rounded-xl border mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        {React.cloneElement(form)}
      </div>
    </div>
  );
}

export default AuthItem;
