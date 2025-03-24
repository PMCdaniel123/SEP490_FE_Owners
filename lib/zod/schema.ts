import dayjs from "dayjs";
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Tên người đăng nhập phải có ít nhất 3 ký tự"),
  email: z.string().email("Địa chỉ email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const phoneSchema = z.object({
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
});

export const emailSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
});

export const ownerPhoneSchema = z.object({
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const ownerEmailSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const passwordSchema = z.object({
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const workspaceSchema = z
  .object({
    name: z.string().min(3, "Tên không gian phải có ít nhất 3 ký tự"),
    openTime: z.string().nonempty("Vui lòng chọn thời gian mở cửa"),
    closeTime: z.string().nonempty("Vui lòng chọn thời gian đóng cửa"),
    is24h: z.number().min(0).max(1),
    category: z.string({
      required_error: "Vui lòng loại không gian hợp lệ",
    }),
    area: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Diện tích phải lớn hơn 0 m²",
    }),
    capacity: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
        message: "Sức chứa tối đa phải >= 1 người",
      }),
    cleanTime: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
        message: "Thời gian dọn dẹp phải >= 1 phút",
      }),
    description: z.string().min(3, "Mô tả không gian phải có ít nhất 3 ký tự"),
    shortTermPrice: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Giá theo giờ phải lớn hơn 0",
      }),
    longTermPrice: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Giá theo ngày phải lớn hơn 0",
      }),
    facilitiesStr: z.array(z.string(), {
      required_error: "Vui lòng nhập ít nhất một tiện ích",
    }),
    policiesStr: z.array(z.string(), {
      required_error: "Vui lòng nhập ít nhất một chính sách",
    }),
    imagesStr: z.array(z.string(), {
      required_error: "Vui lòng tải lên ít nhất một hình ảnh",
    }),
    newImages: z.array(z.instanceof(File)).optional(),
    status: z.string({
      required_error: "Vui lòng chọn trạng thái hợp lệ",
    }),
  })
  .refine(
    (data) => {
      const open = dayjs(data.openTime, "HH:mm");
      const close = dayjs(data.closeTime, "HH:mm");

      return close.diff(open, "hour") >= 1;
    },
    {
      message: "Thời gian đóng cửa phải sau thời gian mở cửa ít nhất 1 giờ",
      path: ["closeTime"],
    }
  );

export const amenitySchema = z.object({
  name: z.string().min(3, "Tên tiện ích phải có ít nhất 3 ký tự"),
  category: z.string().min(1, "Phân loại không được để trống"),
  description: z.string().min(3, "Mô tả tiện ích phải có ít nhất 3 ký tự"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Giá phải lớn hơn 0",
  }),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Số lượng phải lớn hơn 0",
  }),
  imgUrl: z.union([
    z.string().url("Vui lòng tải lên một hình ảnh hợp lệ"),
    z.instanceof(File, { message: "Vui lòng tải lên một hình ảnh hợp lệ" }),
  ]),
  status: z.string({
    required_error: "Vui lòng chọn trạng thái hợp lệ",
  }),
});

export const beverageSchema = z.object({
  name: z.string().min(3, "Tên món phải có ít nhất 3 ký tự"),
  category: z.string().min(1, "Phân loại không được để trống"),
  description: z.string().min(3, "Mô tả món phải có ít nhất 3 ký tự"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Giá phải lớn hơn 0",
  }),
  imgUrl: z.union([
    z.string().url("Vui lòng tải lên một hình ảnh hợp lệ"),
    z.instanceof(File, { message: "Vui lòng tải lên một hình ảnh hợp lệ" }),
  ]),
  status: z.string({
    required_error: "Vui lòng chọn trạng thái hợp lệ",
  }),
});

export const promotionSchema = z
  .object({
    code: z.string().min(3, "Mã code phải có ít nhất 3 ký tự"),
    description: z.string().min(3, "Mô tả phải có ít nhất 3 ký tự"),
    discount: z
      .string()
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 100,
        {
          message: "% phải lớn hơn 0 và nhỏ hơn 100",
        }
      ),
    startDate: z
      .string()
      .nonempty("Vui lòng chọn ngày bắt đầu")
      .refine((val) => new Date(val) > new Date(), {
        message: "Ngày bắt đầu không thể là ngày trong quá khứ",
      }),
    endDate: z.string().nonempty("Vui lòng chọn ngày kết thúc"),
    status: z.string({
      required_error: "Vui lòng chọn trạng thái hợp lệ",
    }),
    workspaceId: z.number().min(1, "Vui lòng chọn không gian"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
    path: ["endDate"],
  });
export const withdrawalSchema = z.object({
  number: z.string().nonempty("Vui lòng nhập số tài khoản ngân hàng"),
  bank: z.string().nonempty("Vui lòng tên ngân hàng"),
  money: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Giá phải lớn hơn 0",
  }),
});

export const identifySchema = z.object({
  identityName: z.string().min(3, "Họ và tên phải có ít nhất 3 ký tự"),
  identityNumber: z
    .string()
    .min(12, "Số căn cước công dân phải có 12 chữ số")
    .max(12, "Số căn cước công dân phải có 12 chữ số")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Số căn cước công dân phải có 12 chữ số",
    }),
  dateOfBirth: z.string().nonempty("Vui lòng chọn ngày sinh"),
  sex: z.string({
    required_error: "Vui lòng chọn giới tính hợp lệ",
  }),
  nationality: z.string().nonempty("Vui lòng nhập quốc tịch"),
  placeOfOrigin: z.string().nonempty("Vui lòng nhập quê quán"),
  placeOfResidence: z.string().nonempty("Vui lòng nhập nơi thường trú"),
  identityExpiredDate: z.string().nonempty("Vui lòng chọn ngày hết hạn"),
  identityCreatedDate: z.string().nonempty("Vui lòng chọn ngày tạo cccd"),
  identityFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Vui lòng tải lên một file hợp lệ",
    })
    .refine((file) => file && file.size < 5 * 1024 * 1024, {
      message: "File phải nhỏ hơn 5MB",
    }),
  facebook: z.string().url("Vui lòng nhập đường dẫn hợp lệ"),
  instagram: z.string().url("Vui lòng nhập đường dẫn hợp lệ"),
  tiktok: z.string().url("Vui lòng nhập đường dẫn hợp lệ"),
  licenseName: z.string().nonempty("Vui lòng nhập tên doanh nghiệp"),
  licenseNumber: z.string().nonempty("Vui lòng nhập mã số doanh nghiệp"),
  licenseAddress: z
    .string()
    .nonempty("Vui lòng nhập địa chỉ trụ sở chính của doanh nghiệp"),
  googleMapUrl: z.string().nonempty("Vui lòng nhập đường dẫn hợp lệ"),
  charterCapital: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Vốn tiền lệ phải lớn hơn 0",
    }),
  licenseFile: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Vui lòng tải lên một file hợp lệ",
    })
    .refine((file) => file && file.size < 5 * 1024 * 1024, {
      message: "File phải nhỏ hơn 5MB",
    }),
});
