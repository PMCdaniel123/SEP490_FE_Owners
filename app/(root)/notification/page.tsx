"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle,
  Bell,
  Filter,
  CheckCheck,
  CircleArrowDown,
  UserRoundCheck,
  CircleArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/constants/environments";
import Loader from "@/components/loader/Loader";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { notificationEvents } from "@/components/owner-notification/owner-notification";

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  time: string;
  createdAt: number;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const { owner } = useSelector((state: RootState) => state.auth);
  const token =
    typeof window !== "undefined" ? Cookies.get("owner_token") : null;

  const getIconForTitle = (title: string) => {
    switch (title) {
      case "Đặt chỗ":
        return <CircleArrowDown size={16} className="text-primary" />;
      case "Xác thực tài khoản thành công":
        return <UserRoundCheck size={16} className="text-green-500" />;
      case "Xác thực tài khoản không thành công":
        return <UserRoundCheck size={16} className="text-red-500" />;
      case "Hoàn tiền":
        return <CircleArrowLeft size={16} className="text-red-500" />;
      default:
        return <CheckCircle size={16} className="text-gray-500" />;
    }
  };
  const fetchNotifications = useCallback(async () => {
    if (!owner) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/Owners/Ownernotification/${owner.id}`
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải thông báo.");
      }

      const data = await response.json();
      const fetchedNotifications = data.ownerNotificationDTOs
        .map(
          (notification: {
            ownerNotificationId: number;
            title: string;
            description: string;
            isRead: number;
            createAt: string;
          }) => ({
            id: notification.ownerNotificationId,
            title: notification.title,
            message: notification.description,
            read: notification.isRead === 1,
            time: dayjs(notification.createAt).format("HH:mm:ss, DD/MM/YYYY"),
            createdAt: new Date(notification.createAt).getTime(),
          })
        )
        .sort((a: Notification, b: Notification) => b.createdAt - a.createdAt);

      setNotifications(fetchedNotifications);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }, [owner]);

  const markAsRead = async (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    try {
      const response = await fetch(
        `${BASE_URL}/Owners/updateOwnernotification/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi đánh dấu thông báo đã đọc.");
      }
      const event = new CustomEvent(notificationEvents.MARKED_READ, {
        detail: { id },
      });
      window.dispatchEvent(event);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (token && owner) {
      fetchNotifications();
    }
  }, [owner, fetchNotifications, token]);

  useEffect(() => {
    const handleNotificationMarkedRead = (event: CustomEvent) => {
      const { id } = event.detail;
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    };

    window.addEventListener(
      notificationEvents.MARKED_READ,
      handleNotificationMarkedRead as EventListener
    );

    const notifyLoaded = () => {
      const event = new CustomEvent(notificationEvents.UPDATED);
      window.dispatchEvent(event);
    };

    if (!loading && notifications.length > 0) {
      notifyLoaded();
    }

    return () => {
      window.removeEventListener(
        notificationEvents.MARKED_READ,
        handleNotificationMarkedRead as EventListener
      );
    };
  }, [loading, notifications]);

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((notification) => !notification.read)
      : notifications;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Thông báo</h1>
          <button
            onClick={() =>
              setFilter((prevFilter) =>
                prevFilter === "all" ? "unread" : "all"
              )
            }
            className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <Filter size={16} />
            {filter === "all" ? "Chỉ chưa đọc" : "Tất cả"}
          </button>
        </div>
        <Separator className="mb-6" />

        {filteredNotifications.length > 0 ? (
          <div className="bg-white overflow-hidden grid grid-cols-2 gap-4 space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 shadow-md border-b rounded-md last:border-b-0 flex flex-col cursor-pointer transition-all hover:bg-gray-100 col-span-1 ${
                  notification.read ? "bg-gray-200" : "bg-white"
                }`}
                onClick={() =>
                  !notification.read && markAsRead(notification.id)
                }
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getIconForTitle(notification.title)}{" "}
                    {/* Render the icon */}
                    <h3 className="text-gray-800 text-base font-semibold w-4/5">
                      {notification.title}
                    </h3>
                  </div>
                  <p className="text-gray-800 text-sm">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {notification.read && (
                  <div className="flex justify-end mt-4">
                    <CheckCheck size={20} className="text-green-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md p-8 text-center">
            <Bell size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg font-semibold">
              Không có thông báo nào
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Bạn sẽ nhận được thông báo khi có cập nhật mới.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
