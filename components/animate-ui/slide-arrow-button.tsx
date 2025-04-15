import React from "react";
import { ArrowRight, LucideIcon } from "lucide-react";

interface SlideArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  primaryColor?: string;
  icon?: LucideIcon;
}

export default function SlideArrowButton({
  text = "Get Started",
  primaryColor = "#6f3cff",
  className = "",
  icon: Icon,
  ...props
}: SlideArrowButtonProps) {
  return (
    <button
      className={`group relative rounded-xl border border-primary bg-white p-2 text-base font-semibold ${className}`}
      {...props}
    >
      <div
        className="absolute left-0 top-0 flex h-full w-11 items-center justify-end rounded-xl transition-all duration-200 ease-in-out group-hover:w-full"
        style={{ backgroundColor: primaryColor }}
      >
        <span className="mr-3 text-white transition-all duration-200 ease-in-out">
          {Icon ? <Icon size={20} /> : <ArrowRight size={20} />}
        </span>
      </div>
      <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold text-primary transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
        {text}
      </span>
    </button>
  );
}
