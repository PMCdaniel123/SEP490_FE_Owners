"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { identifySchema } from "@/lib/zod/schema";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

function IdentifyForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof identifySchema>>;
}) {
  return (
    <div className="flex flex-col w-full gap-6">
      <Separator className="mt-4 bg-primary" />
      <div className="sm:col-span-2 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="identityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-fourth font-bold text-base ml-6">
                  Họ và tên
                </FormLabel>
                <FormControl>
                  <Input
                    className="py-6 px-4 rounded-md file:bg-seventh"
                    placeholder="Nhập họ và tên..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="sm:col-span-2 flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="identityNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-fourth font-bold text-base ml-6">
                Số CCCD
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 px-4 rounded-md file:bg-seventh"
                  placeholder="Nhập số CCCD..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-2 items-start justify-between gap-6 grid sm:grid-cols-2">
        <div className="sm:col-span-2 flex flex-col gap-2 w-full">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-fourth font-bold text-base ml-6">
                  Ngày sinh
                </FormLabel>
                <FormControl>
                  <Input
                    className="py-6 px-4 rounded-md file:bg-seventh"
                    placeholder="Nhập ngày sinh..."
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="sm:col-span-1 flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-fourth font-bold text-base ml-6">
                Giới tính
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="py-6 px-4 rounded-md w-full">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                      value="Nam"
                    >
                      Nam
                    </SelectItem>
                    <SelectItem
                      className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                      value="Nữ"
                    >
                      Nữ
                    </SelectItem>
                    <SelectItem
                      className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                      value="Khác"
                    >
                      Khác
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-1 flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-fourth font-bold text-base ml-6">
                Quốc tịch
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 px-4 rounded-md file:bg-seventh"
                  placeholder="Nhập quốc tịch..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="placeOfOrigin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-fourth font-bold text-base ml-6">
                Quê quán
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 px-4 rounded-md file:bg-seventh"
                  placeholder="Nhập quê quán..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="placeOfResidence"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-fourth font-bold text-base ml-6">
                Nơi thường trú
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 px-4 rounded-md file:bg-seventh"
                  placeholder="Nhập nơi thường trú..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-1 flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="identityExpiredDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-fourth font-bold text-base ml-6">
                Ngày hết hạn
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 px-4 rounded-md file:bg-seventh"
                  placeholder="Nhập ngày hết hạn..."
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-1 flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="identityCreatedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-fourth font-bold text-base ml-6">
                Ngày tạo thẻ
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 px-4 rounded-md file:bg-seventh"
                  placeholder="Nhập ngày tạo thẻ..."
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="identityFile"
          render={({ field: { onChange, ref, value } }) => (
            <FormItem>
              <FormLabel className="text-fourth font-bold text-base ml-6">
                File (Vui lòng tải file PDF)
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-4 border rounded-md">
                  <label
                    htmlFor="images"
                    className="cursor-pointer py-3 px-5 bg-primary text-white rounded-s-md text-center flex gap-2 items-center"
                  >
                    <FileText /> Chọn file PDF
                  </label>
                  <Input
                    className="py-3 px-4 rounded-md file:bg-seventh border h-[50px] hidden"
                    id="images"
                    type="file"
                    accept="application/pdf"
                    ref={ref}
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                  <span className="text-gray-500 text-sm truncate max-w-[400px]">
                    {value?.name || "Chưa có file pdf nào được chọn"}
                  </span>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default IdentifyForm;
