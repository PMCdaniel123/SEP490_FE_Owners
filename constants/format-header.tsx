import React from "react";
import { Column, ColumnDef, HeaderContext } from "@tanstack/react-table";

// Generic function to extract header text safely
const getHeaderText = <TData, TValue>(
  header: ColumnDef<TData, TValue>["header"]
): string => {
  try {
    if (typeof header === "string") {
      return header;
    }

    if (typeof header === "function") {
      const headerElement = header({
        column: {} as Column<TData, TValue>,
      } as HeaderContext<TData, TValue>);

      if (typeof headerElement === "string") {
        return headerElement;
      }

      if (React.isValidElement(headerElement)) {
        return extractTextFromElement(headerElement);
      }
    }
  } catch (e) {
    console.warn("Failed to extract header text:", e);
  }

  return "Hành động";
};

// Extracts text from React elements safely
const extractTextFromElement = (element: React.ReactNode): string => {
  if (typeof element === "string") {
    return element;
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(element)) {
    const children = element.props.children;

    if (typeof children === "string") {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map(extractTextFromElement).join(" ");
    }
  }

  return "";
};

export default getHeaderText;
