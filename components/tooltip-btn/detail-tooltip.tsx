import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { BASE_URL } from "@/constants/environments";
import Loader from "../loader/Loader";

interface Details {
  id: number;
  name: string;
  status: string;
  workspaceDetails: string[];
}

function DetailToolTip() {
  const [open, setOpen] = useState(false);
  const [detailList, setDetailList] = useState<Details[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      const fetchDetails = async () => {
        try {
          const response = await fetch(`${BASE_URL}/details`);

          if (!response.ok) {
            throw new Error("Có lỗi xảy ra khi tải chi tiết.");
          }

          const data = await response.json();
          const details = data.details || [];

          // Remove duplicates by name
          const uniqueDetails: Details[] = [];
          const seenNames = new Set<string>();

          for (const detail of details) {
            if (!seenNames.has(detail.name)) {
              seenNames.add(detail.name);
              uniqueDetails.push(detail);
            }
          }

          setDetailList(uniqueDetails.slice(0, 20));
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

      fetchDetails();
    }
  }, [open]);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center gap-2 text-primary hover:text-secondary font-light text-xs"
      >
        <Info size={16} />
        <p>Tham khảo</p>
      </div>
      <Modal
        title={
          <p className="text-md font-bold text-primary">
            Các chi tiết không gian có thể tham khảo
          </p>
        }
        open={open}
        onCancel={() => setOpen(!open)}
        footer={null}
      >
        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {detailList.map((detail) => (
              <div
                key={detail.id}
                className="border border-primary rounded-md p-4"
              >
                <p className="text-sm font-semibold text-fourth">
                  {detail.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}

export default DetailToolTip;
