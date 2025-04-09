"use client";

import { List, Card, Typography, Empty, Tag } from "antd";
import dayjs from "dayjs";
import { ResponseBookingProps } from "@/types";

const { Text } = Typography;

interface ThisProps {
  responseBooking: ResponseBookingProps[];
  selectedBooking: ResponseBookingProps | null;
  setSelectedBooking: React.Dispatch<
    React.SetStateAction<ResponseBookingProps | null>
  >;
}

function ResponseBooking({
  responseBooking,
  selectedBooking,
  setSelectedBooking,
}: ThisProps) {
  return (
    <div>
      <Card className="shadow-md border-0 overflow-hidden rounded-xl">
        <p className="mb-4 font-bold text-primary text-lg">
          Danh sách phản hồi đã gửi
        </p>

        {responseBooking.length === 0 ? (
          <Empty
            description="Không có phản hồi nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            dataSource={responseBooking}
            renderItem={(booking) => (
              <List.Item
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className={`cursor-pointer transition-all duration-200 rounded-md mb-2 ${
                  selectedBooking?.id === booking.id
                    ? "bg-primary/20"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="w-full py-3 px-2">
                  <div className="flex justify-between items-center mb-1">
                    <Text strong className="text-primary">
                      {booking.workspaceName}
                    </Text>
                    {booking.hasOwnerResponse ? (
                      <Tag color="green">Đã phản hồi</Tag>
                    ) : (
                      <Tag color="yellow">Chờ phản hồi</Tag>
                    )}
                  </div>
                  <div className="flex flex-col justify-between text-xs text-gray-500">
                    <span>
                      Mã đặt chỗ: ĐC
                      {Number(booking.id).toString().padStart(4, "0")}
                    </span>
                    <span>
                      Ngày đặt: {dayjs(booking.startDate).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
}

export default ResponseBooking;
