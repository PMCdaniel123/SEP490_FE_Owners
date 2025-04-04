import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-xl font-bold text-brown-700 text-[#835101] pb-3 relative inline-block">
      {children}
      <span className="absolute bottom-0 left-0 transform w-1/2 border-b-4 border-black rounded-sm"></span>
    </h2>
  );
}
