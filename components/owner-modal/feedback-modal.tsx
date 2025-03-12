/* eslint-disable @next/next/no-img-element */
import {
  customerList,
  feedbackList,
  workspaceList,
} from "@/constants/constant";
import {
  CustomerProps,
  FeedbackProps,
  formatCurrency,
  WorkspaceProps,
} from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Ruler, Sofa, Users } from "lucide-react";

function FeedbackModal({ feedbackId }: { feedbackId: string }) {
  const [feedback, setFeedback] = useState<FeedbackProps | null>(null);
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [workspace, setWorkspace] = useState<WorkspaceProps | null>(null);

  useEffect(() => {
    if (!feedbackId) {
      return;
    }
    setFeedback(feedbackList[Number(feedbackId) - 1]);
    setCustomer(
      customerList[Number(feedbackList[Number(feedbackId) - 1].id) - 1]
    );
    setWorkspace(
      workspaceList[Number(feedbackList[Number(feedbackId) - 1].id) - 1]
    );
  }, [feedbackId]);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <Image
          src={customer?.avatar || "/logo.png"}
          height={60}
          width={60}
          alt={customer?.name || ""}
          className="rounded-full object-cover border"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-primary">
            {customer?.name}
          </p>
          <p className="text-xs text-fifth">{feedback?.createdAt}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 border rounded-md p-4 mt-4">
        <p className="text-fourth">{feedback?.content}</p>
        <Image
          src={feedback?.image || "/logo.png"}
          height={100}
          width={200}
          alt={"feedback"}
          className="rounded-md object-cover"
        />
      </div>
      <div className="mt-4">
        <Card className="rounded-md shadow-md py-0 gap-2">
          <div className="relative">
            <img
              src={workspace?.images[0] || "/logo.png"}
              alt={workspace?.name || ""}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
              {formatCurrency(Number(workspace?.shortTermPrice))} -{" "}
              {formatCurrency(Number(workspace?.longTermPrice))}
            </div>
          </div>
          <CardContent className="mb-4">
            <h3 className="text-lg font-semibold">{workspace?.name}</h3>
            <p className="text-gray-600 text-sm truncate whitespace-nowrap">
              {workspace?.address}
            </p>
            <div className="flex items-center text-gray-600 text-sm mt-2 justify-between">
              <span className="flex items-center">
                <Users className="mr-1" size={16} /> {workspace?.capacity} người
              </span>
              <span className="flex items-center">
                <Ruler className="mr-1" size={16} /> {workspace?.area} m2
              </span>
              <span className="flex items-center">
                <Sofa className="mr-1" size={16} />{" "}
                {Number(workspace?.category) === 2
                  ? "Văn phòng"
                  : Number(workspace?.category) === 3
                  ? "Phòng họp"
                  : Number(workspace?.category) === 4
                  ? "Phòng hội thảo"
                  : "Bàn cá nhân"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FeedbackModal;
