import { LucideIcon } from "lucide-react";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export interface MenuItemProps {
  name: string;
  path: string;
}

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface TopWorkspace {
  id: string;
  title: string;
  booking: string;
  price: string;
  image: string;
  amount: number;
  roomType: string;
}

export interface WorkspaceNotRating {
  title: string;
  address: string;
  price: string;
  image: string;
  roomCapacity: number;
  roomType: string;
  roomSize: number;
}

export interface NewCustomerItemProps {
  avatar: string;
  name: string;
  location: string;
}

export interface ReviewItemProps {
  avatar: string;
  name: string;
  date: string;
  rating: number;
  review: string;
}

export interface LabelIconProps {
  icon: LucideIcon;
  label: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CustomerProps {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  sex: string;
  dateOfBirth: string;
}

export interface Image {
  id: string;
  imgUrl: string;
}

export interface Price {
  id: string;
  category: string;
  price: number;
}

export interface Facilities {
  id: string;
  facilityName: string;
}

export interface Policies {
  id: string;
  policyName: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  capacity: string;
  category: string;
  status: string;
  cleanTime: string;
  area: string;
  ownerId: string;
  openTime: string;
  closeTime: string;
  is24h: number;
  shortTermPrice: string;
  longTermPrice: string;
  prices: Price[];
  facilities: Facilities[];
  policies: Policies[];
  images: Image[];
  pricesStr: string[];
  facilitiesStr: string[];
  policiesStr: string[];
  imagesStr: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AmenityProps {
  id: string;
  name: string;
  description: string;
  price: string;
  imgUrl: string;
  quantity: string;
  category: string;
  status: string;
  ownerId: string;
}

export interface BeverageProps {
  id: string;
  name: string;
  description: string;
  price: string;
  imgUrl: string;
  category: string;
  status: string;
  ownerId: string;
}

export interface PromotionProps {
  id: number;
  code: string;
  discount: string;
  startDate: string;
  endDate: string;
  status: string;
  workspaceId: number;
}
export interface WithdrawalProps {
  id: string;
  number: string;
  bank: string;
  money: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IdentifyProps {
  id: string;
  name: string;
  number: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  placeOfOrigin: string;
  placeOfResidence: string;
  dateOfExpiry: string;
  dateOfCreation: string;
  file: string;
}

export interface SocialProps {
  id: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  other: string;
}

export interface LicenseProps {
  id: string;
  name: string;
  number: string;
  address: string;
  charterCapital: string;
  file: string;
}

export interface PhoneProps {
  id: string;
  phone: string;
}

export interface TimeItemProps {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface OwnerEmailSignInProps {
  email: string;
  password: string;
}

export interface OwnerPhoneSignInProps {
  phone: string;
  password: string;
}

export interface BookingProps {
  bookingId: string;
  start_Date: string;
  end_Date: string;
  price: string;
  status: string;
  created_At: string;
  payment_Method: string;
  userId: string;
  workspaceId: string;
  promotionId: string;
  amenities: {
    amenityId: string;
    quantity: string;
    amenityName: string;
    image: string;
    unitPrice: string;
  }[];
  beverages: {
    beverageId: string;
    quantity: string;
    beverageName: string;
    image: string;
    unitPrice: string;
  }[];
}

export interface FeedbackProps {
  id: string;
  customerId: string;
  workspaceId: string;
  content: string;
  image: string;
  createdAt: string;
}

export interface BookingAmenityProps {
  amenityId: number;
  amenityName: string;
  unitPrice: number;
  img_Url: string;
  description: string;
  category: string;
  numberOfBooking: number;
}

export interface BookingBeverageProps {
  beverageId: number;
  beverageName: string;
  unitPrice: number;
  img_Url: string;
  description: string;
  category: string;
  numberOfBooking: number;
}

export interface OwnerProps {
  identityName: string;
  identityNumber: string;
  dateOfBirth: string;
  sex: string;
  nationality: string;
  placeOfOrigin: string;
  placeOfResidence: string;
  identityExpiredDate: string;
  identityCreatedDate: string;
  identityFile: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  licenseName: string;
  licenseNumber: string;
  licenseAddress: string;
  googleMapUrl: string;
  charterCapital: string;
  licenseFile: string;
}
