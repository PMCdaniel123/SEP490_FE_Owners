"use client";

import { Card, Typography, Empty, Tabs, Divider, Timeline, Spin } from "antd";
import { FeedbackProps, ResponseBookingProps, ResponseProps } from "@/types";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CommentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Image from "next/image";
import { BASE_URL } from "@/constants/environments";
import { SendHorizontal } from "lucide-react";
import { Textarea } from "../ui/textarea";
import Cookies from "js-cookie";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface ThisProps {
  selectedBooking: ResponseBookingProps | null;
  ownerId: string | null | undefined;
  refetchBooking: () => void;
}

function FeedbackSection({
  selectedBooking,
  ownerId,
  refetchBooking,
}: ThisProps) {
  const [feedback, setFeedback] = useState<FeedbackProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [ownerResponse, setOwnerResponse] = useState<ResponseProps | null>(
    null
  );
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [description, setDescription] = useState<string>("");
  const token =
    typeof window !== "undefined" ? Cookies.get("owner_token") : null;

  useEffect(() => {
    if (!selectedBooking || !ownerId) return;
    setLoading(true);
    refetchBooking();

    const getFeedback = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/feedbacks/${selectedBooking.feedbackIds[0]}`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải phản hồi.");
        }

        const data = await response.json();
        fetchOwnerResponse(data.id);
        setFeedback(data);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setLoading(false);
      }
    };

    getFeedback();
  }, [selectedBooking, ownerId, refetchBooking]);

  const fetchOwnerResponse = async (feedbackId: number) => {
    try {
      setLoadingResponse(true);
      const response = await fetch(
        `${BASE_URL}/response-feedbacks/feedback/${feedbackId}`
      );

      if (!response.ok && response.status !== 404) {
        throw new Error("Có lỗi xảy ra khi tải phản hồi từ doanh nghiệp.");
      }

      const data = await response.json();
      setOwnerResponse(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setOwnerResponse(null);
    } finally {
      setLoadingResponse(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  const sendOwnerResponse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/owner-response-feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          feedbackId: feedback?.id,
          description,
          title: "Phản hồi feedback số #" + feedback?.id,
          ownerId: Number(ownerId),
          images: [],
        }),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tạo phản hồi.");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Gửi phản hồi thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });

      if (feedback?.id) {
        await fetchOwnerResponse(feedback.id);
      }
      refetchBooking();
      setDescription("");
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
  };

  return selectedBooking ? (
    <Card className="shadow-md border-0 rounded-md">
      {selectedBooking.feedbackIds.length > 0 ? (
        <>
          {selectedBooking.feedbackIds.length > 1 && (
            <Tabs className="mb-4">
              <TabPane
                tab={`Phản hồi ${selectedBooking.feedbackIds[0]}`}
                key={selectedBooking.feedbackIds[0].toString()}
              />
            </Tabs>
          )}

          {feedback && (
            <div className="mb-4 bg-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <Text strong className="text-[#8B5E3C]">
                  Thông tin phản hồi
                </Text>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <Text strong>Mã đặt chỗ:</Text>
                  <Text className="ml-2">
                    ĐC{Number(selectedBooking.id).toString().padStart(4, "0")}
                  </Text>
                </div>
                <div>
                  <Text strong>Tiêu đề:</Text>
                  <Text className="ml-2">
                    {feedback.title || "Không có tiêu đề"}
                  </Text>
                </div>
              </div>
            </div>
          )}

          <Card className=" border-0 overflow-hidden">
            <div className="mb-6">
              <Title level={4} className="text-gray-800 mb-0">
                Phản hồi của khách hàng KH
                {Number(feedback?.userId).toString().padStart(4, "0")}
              </Title>
            </div>

            <Timeline
              items={[
                {
                  color: "blue",
                  dot: <CommentOutlined style={{ fontSize: "16px" }} />,
                  children: (
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="mb-2">
                        <Text strong>Ngày gửi:</Text>
                        <Text className="ml-2">
                          {dayjs(feedback?.createdAt)
                            .locale("vi")
                            .format("DD/MM/YYYY HH:mm")}
                        </Text>
                      </div>
                      <div className="mb-4">
                        <Text strong>Không gian làm việc:</Text>
                        <Text className="ml-2">{feedback?.workspaceName}</Text>
                      </div>
                      <Divider className="my-2" />
                      <div className="mb-4">
                        <Text strong>Nội dung phản hồi:</Text>
                        <Paragraph className="mt-2 whitespace-pre-line">
                          {feedback?.description}
                        </Paragraph>
                      </div>

                      {feedback?.imageUrls &&
                        feedback?.imageUrls.length > 0 && (
                          <div>
                            <Text strong className="block mb-2">
                              Hình ảnh đính kèm:
                            </Text>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                              {feedback?.imageUrls.map((url, index) => (
                                <div
                                  key={index}
                                  className="aspect-square overflow-hidden rounded-md"
                                >
                                  <Image
                                    src={url}
                                    alt={`Feedback image ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ),
                },
                ...(ownerResponse?.description
                  ? [
                      {
                        color: "green",
                        dot: (
                          <CheckCircleOutlined style={{ fontSize: "16px" }} />
                        ),
                        children: (
                          <div className="bg-green-50 p-4 rounded-md mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <Text strong>Phản hồi từ chủ không gian</Text>
                              <Text className="text-gray-500 text-sm">
                                {dayjs(ownerResponse.createdAt)
                                  .locale("vi")
                                  .format("DD/MM/YYYY HH:mm")}
                              </Text>
                            </div>
                            <Divider className="my-3" />
                            <Paragraph className="whitespace-pre-line">
                              {ownerResponse.description}
                            </Paragraph>
                          </div>
                        ),
                      },
                    ]
                  : loadingResponse
                  ? [
                      {
                        color: "gray",
                        children: (
                          <div className="flex justify-center items-center p-4">
                            <Spin size="small" />
                            <Text className="ml-2">Đang tải phản hồi...</Text>
                          </div>
                        ),
                      },
                    ]
                  : [
                      {
                        color: "yellow",
                        children: (
                          <div className="flex flex-col gap-2 p-4 bg-yellow-50 rounded-md mb-4">
                            <Text strong className="block">
                              Phản hồi:
                            </Text>
                            <Textarea
                              placeholder="Nhập phản hồi từ chủ không gian..."
                              className="py-6 px-4 rounded-md file:bg-seventh"
                              onChange={(e) => setDescription(e.target.value)}
                              rows={4}
                            />
                            <button
                              disabled={!description}
                              className="flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
                              onClick={sendOwnerResponse}
                            >
                              {loading ? (
                                <LoadingOutlined style={{ color: "white" }} />
                              ) : (
                                <span className="font-bold flex items-center gap-2">
                                  Gửi <SendHorizontal size={18} />
                                </span>
                              )}
                            </button>
                          </div>
                        ),
                      },
                    ]),
              ]}
            />
          </Card>
        </>
      ) : (
        <Empty
          description="Không có phản hồi nào cho đặt chỗ này"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Card>
  ) : (
    <Card className="shadow-md border-0 h-screen flex items-center justify-center">
      <Empty
        description="Chọn một đơn đặt chỗ để xem phản hồi"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </Card>
  );
}

export default FeedbackSection;
