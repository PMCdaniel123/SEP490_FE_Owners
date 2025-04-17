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

export const resetPasswordSchema = z
  .object({
    email: z.string().email("Địa chỉ email không hợp lệ"),
    token: z
      .string()
      .min(6, "Token phải có 6 ký tự")
      .max(6, "Token phải có 6 ký tự"),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu xác nhận phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới và xác nhận không khớp nhau",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Mật khẩu hiện tại là bắt buộc."),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự."),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu xác nhận phải có ít nhất 6 ký tự."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
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
        message: "Sức chứa tối đa phải ≥ 1 người",
      }),
    cleanTime: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
        message: "Thời gian dọn dẹp phải ≥ 1 phút",
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

      return close.diff(open, "hour") >= 6;
    },
    {
      message: "Thời gian đóng cửa phải sau thời gian mở cửa ít nhất 6 giờ",
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
  title: z.string().nonempty("Vui lòng nhập tiêu đề yêu cầu"),
  description: z.string().nonempty("Vui lòng nhập mô tả yêu cầu"),
});

export const identifySchema = z.object({
  ownerName: z.string().min(3, "Họ và tên phải có ít nhất 3 ký tự"),
  registrationDate: z
    .string()
    .nonempty("Vui lòng chọn ngày đăng kí doanh nghiệp")
    .refine((val) => {
      const registD = new Date(val);
      const today = new Date();
      const diff = today.getDate() - registD.getDate();

      return diff > 0;
    }, "Ngày đăng kí không thể ở tương lai"),
  sex: z.string().nonempty("Vui lòng chọn giới tính hợp lệ"),
  facebook: z.string().url("Vui lòng nhập đường dẫn hợp lệ").or(z.literal("")),
  instagram: z.string().url("Vui lòng nhập đường dẫn hợp lệ").or(z.literal("")),
  tiktok: z.string().url("Vui lòng nhập đường dẫn hợp lệ").or(z.literal("")),
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

export const socialSchema = z.object({
  facebook: z.string().url("Vuiź nhập đường dẫn hợp lệ").or(z.literal("")),
  instagram: z.string().url("Vuiź nhập đường dẫn hợp lệ").or(z.literal("")),
  tiktok: z.string().url("Vuiź nhập đường dẫn hợp lệ").or(z.literal("")),
});

export const walletSchema = z.object({
  bankAccountName: z
    .string()
    .min(3, "Tên chủ tài khoản ngân hàng phải có ít nhất 3 ký tự"),
  bankNumber: z
    .string()
    .min(3, "Số tài khoản ngân hàng phải có ít nhất 3 ký tự"),
  bankName: z.string({
    required_error: "Vui lòng chọn tên ngân hàng",
  }),
});
