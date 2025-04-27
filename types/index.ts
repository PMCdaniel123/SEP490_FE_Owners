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
  collapsed?: boolean;
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

export interface Details {
  id: string;
  detailName: string;
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
  details: Details[];
  pricesStr: string[];
  facilitiesStr: string[];
  policiesStr: string[];
  detailsStr: string[];
  imagesStr: string[];
  createdAt: string;
  updatedAt: string;
  code: string;
}

export interface TopRevenueWorkspace {
  workspaceId: string;
  workspaceName: string;
  revenue: number;
  totalBookings: number;
  shortTermPrice: number;
  longTermPrice: number;
  prices: {
    id: number;
    averagePrice: number;
    category: string;
    workspacePrices: string[];
  }[];
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
  workspaceID: number;
}
export interface WithdrawalProps {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  workspaceOwnerId: number;
  userId: number;
  walletId: number;
  bankName: string;
  bankNumber: string;
  bankAccountName: string;
  balance: string;
  managerResponse: string | null;
}

export interface WithdrawalRequest {
  title: string;
  description: string;
  workspaceOwnerId: number;
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

export interface BookingListProps {
  bookingId: string;
  start_Date: string;
  end_Date: string;
  price: string;
  status: string;
  created_At: string;
  userId: string;
  workspaceId: string;
}

export interface RevenuePerDay {
  day: string; // e.g., 'Mon'
  date: string; // e.g., '2025-03-21'
  revenue: number;
}

export interface RevenuePerMonth {
  month: string; // e.g. "01/2024"
  revenue: number;
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

export interface Feedback {
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
  id: number;
  email: string;
  phone: string;
  ownerName: string;
  registrationDate: string;
  sex: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  licenseName: string;
  licenseNumber: string;
  licenseAddress: string;
  googleMapUrl: string;
  charterCapital: string;
  licenseFile: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  avatar: string | null;
}

export interface VerifyOwnerProps {
  id: number;
  ownerId: number;
  userId: number;
  message: string;
  status: string;
  googleMapUrl: string;
  licenseName: string;
  licenseNumber: string;
  licenseAddress: string;
  charterCapital: number;
  licenseFile: string;
  ownerName: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  createdAt: string;
  updatedAt: string;
  registrationDate: string;
}

export interface WalletData {
  id: number;
  ownerWalletId: number;
  balance: number;
  status: string;
  bankName: string;
  bankAccountName: string;
  bankNumber: string;
  ownerId: number;
  ownerName: string;
  licenseName: string;
}

export interface WalletProps {
  bankName: string;
  bankAccountName: string;
  bankNumber: string;
}

export interface BankProps {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
}

export interface TransactionProp {
  transactionId: number;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
  beforeAmount: number;
  afterAmount: number;
}

export interface ResponseBookingProps {
  id: number;
  startDate: string;
  endDate: string;
  price: number;
  status: string;
  createdAt: string;
  userId: number;
  userName: string;
  workspaceId: number;
  workspaceName: string;
  feedbackIds: number[];
  hasOwnerResponse?: boolean;
}

export interface FeedbackProps {
  id: number;
  title: string;
  description: string;
  status: string;
  userId: number;
  ownerId: number;
  bookingId: number;
  workspaceId: number;
  workspaceName: string;
  createdAt: string;
  imageUrls: string[];
}

export interface ResponseProps {
  id: number;
  description: string;
  status: string;
  userId: number;
  ownerId: number;
  feedbackId: number;
  createdAt: string;
  imageUrls: string[];
}
