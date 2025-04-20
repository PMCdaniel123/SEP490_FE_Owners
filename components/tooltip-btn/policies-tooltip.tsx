import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { BASE_URL } from "@/constants/environments";
import Loader from "../loader/Loader";

interface Policies {
  id: number;
  name: string;
  status: string;
  workspacePolicies: string[];
}

function PoliciesToolTip() {
  const [open, setOpen] = useState(false);
  const [policyList, setPolicyList] = useState<Policies[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      const fetchDetails = async () => {
        try {
          const response = await fetch(`${BASE_URL}/policies`);

          if (!response.ok) {
            throw new Error("Có lỗi xảy ra khi tải quy định chung.");
          }

          const data = await response.json();
          const details = data.policies || [];

          // Remove duplicates by name
          const uniqueDetails: Policies[] = [];
          const seenNames = new Set<string>();

          for (const detail of details) {
            if (!seenNames.has(detail.name)) {
              seenNames.add(detail.name);
              uniqueDetails.push(detail);
            }
          }

          setPolicyList(uniqueDetails.slice(0, 20));
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
            Các quy định có thể tham khảo
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
            {policyList.map((policy) => (
              <div
                key={policy.id}
                className="border border-primary rounded-lg p-4"
              >
                <p className="text-sm font-semibold text-fourth">
                  {policy.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}

export default PoliciesToolTip;
