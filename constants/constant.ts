import {
  Feedback,
  MenuItemProps,
  NewCustomerItemProps,
  ReviewItemProps,
  TimeItemProps,
  TopWorkspace,
} from "@/types";

export const menuItems: MenuItemProps[] = [
  { name: "Trang chủ", path: "/" },
  { name: "Giới thiệu", path: "/about-us" },
  { name: "Không gian", path: "/workspace" },
  { name: "Liên hệ", path: "/contact" },
  // { name: "Tải WorkHive", path: "/download" },
];

export const topWorkspace: TopWorkspace[] = [
  {
    id: "1",
    title: "Workspace 1",
    booking: "20",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Bàn cá nhân",
  },
  {
    id: "2",
    title: "Workspace 2",
    booking: "22",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Văn phòng",
  },
  {
    id: "3",
    title: "Workspace 3",
    booking: "12",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Phòng hội thảo",
  },
  {
    id: "4",
    title: "Workspace 4",
    booking: "20",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Bàn cá nhân",
  },
  {
    id: "5",
    title: "Workspace 5",
    booking: "22",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Văn phòng",
  },
  {
    id: "6",
    title: "Workspace 6",
    booking: "12",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Phòng hội thảo",
  },
  {
    id: "7",
    title: "Workspace 7",
    booking: "20",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Bàn cá nhân",
  },
  {
    id: "8",
    title: "Workspace 8",
    booking: "22",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Văn phòng",
  },
  {
    id: "9",
    title: "Workspace 9",
    booking: "12",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Phòng hội thảo",
  },
  {
    id: "10",
    title: "Workspace 10",
    booking: "12",
    price: "100000",
    image: "/logo.png",
    amount: 10000000,
    roomType: "Phòng hội thảo",
  },
];

export const newCustomers: NewCustomerItemProps[] = [
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn A",
    location: "Hà Nội, Việt Nam",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn B",
    location: "Hà Nội, Việt Nam",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn C",
    location: "Hà Nội, Việt Nam",
  },
];

export const reviews: ReviewItemProps[] = [
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn A",
    date: "14/02/2025",
    rating: 5,
    review:
      "Không gian làm việc rất chuyên nghiệp và yên tĩnh, phù hợp để tập trung hoàn toàn vào công việc",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn B",
    date: "14/02/2025",
    rating: 4,
    review:
      "Không gian làm việc rất chuyên nghiệp và yên tĩnh, phù hợp để tập trung hoàn toàn vào công việc",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn C",
    date: "14/02/2025",
    rating: 3,
    review:
      "Không gian làm việc rất chuyên nghiệp và yên tĩnh, phù hợp để tập trung hoàn toàn vào công việc",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn D",
    date: "14/02/2025",
    rating: 5,
    review:
      "Không gian làm việc rất chuyên nghiệp và yên tĩnh, phù hợp để tập trung hoàn toàn vào công việc",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn E",
    date: "14/02/2025",
    rating: 4,
    review: "Một nơi làm việc đáng trải nghiệm với môi trường chuyên nghiệp",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn F",
    date: "14/02/2025",
    rating: 5,
    review: "Tuyệt vời! Không gian thoải mái và tiện ích đầy đủ",
  },
];

export const policies = [
  "Không mang đồ ăn thức uống từ bên ngoài vào",
  "Không mang theo động vật",
  "Không gây ồn ào xung quanh",
  "Không khói thuốc",
];

export const timeList: TimeItemProps[] = [
  {
    id: "1",
    startDate: "00:00 02/03/2025",
    endDate: "01:00 02/03/2025",
    status: "1",
  },
  {
    id: "2",
    startDate: "04:00 02/03/2025",
    endDate: "05:00 02/03/2025",
    status: "2",
  },
  {
    id: "3",
    startDate: "08:00 02/03/2025",
    endDate: "09:00 02/03/2025",
    status: "1",
  },
  {
    id: "4",
    startDate: "13:00 02/03/2025",
    endDate: "15:00 02/03/2025",
    status: "2",
  },
  {
    id: "5",
    startDate: "18:00 02/03/2025",
    endDate: "21:00 02/03/2025",
    status: "1",
  },
  {
    id: "6",
    startDate: "22:00 02/03/2025",
    endDate: "23:00 02/03/2025",
    status: "2",
  },
  {
    id: "7",
    startDate: "00:00 03/03/2025",
    endDate: "01:00 03/03/2025",
    status: "1",
  },
  {
    id: "8",
    startDate: "04:00 03/03/2025",
    endDate: "05:00 03/03/2025",
    status: "2",
  },
  {
    id: "9",
    startDate: "08:00 03/03/2025",
    endDate: "09:00 03/03/2025",
    status: "1",
  },
  {
    id: "10",
    startDate: "13:00 03/03/2025",
    endDate: "15:00 03/03/2025",
    status: "2",
  },
  {
    id: "11",
    startDate: "18:00 03/03/2025",
    endDate: "21:00 03/03/2025",
    status: "1",
  },
  {
    id: "12",
    startDate: "22:00 03/03/2025",
    endDate: "23:00 03/03/2025",
    status: "2",
  },
  {
    id: "13",
    startDate: "00:00 04/03/2025",
    endDate: "01:00 04/03/2025",
    status: "1",
  },
  {
    id: "14",
    startDate: "04:00 04/03/2025",
    endDate: "05:00 04/03/2025",
    status: "2",
  },
  {
    id: "15",
    startDate: "08:00 04/03/2025",
    endDate: "09:00 04/03/2025",
    status: "1",
  },
];



export const feedbackList: Feedback[] = [
  {
    id: "1",
    customerId: "1",
    workspaceId: "1",
    content:
      "Contenttttttttttttttt ttttttttttttttttttttttttttt tttttttttttttttttttttttttttttttttttttttttt tttttttttttttttttt 1",
    image: "/trasua.png",
    createdAt: "04/03/2025",
  },
  {
    id: "2",
    customerId: "2",
    workspaceId: "2",
    content:
      "Contenttttttttttttttt ttttttttttttttttttttttttttt tttttttttttttttttttttttttttttttttttttttttt tttttttttttttttttt 2",
    image: "/trasua.png",
    createdAt: "04/03/2025",
  },
  {
    id: "3",
    customerId: "3",
    workspaceId: "3",
    content:
      "Contenttttttttttttttt ttttttttttttttttttttttttttt tttttttttttttttttttttttttttttttttttttttttt tttttttttttttttttt 3",
    image: "/trasua.png",
    createdAt: "04/03/2025",
  },
];
