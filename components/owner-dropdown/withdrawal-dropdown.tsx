import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Modal } from "antd";
import { WithdrawalProps } from "@/types";
import WithdrawalModal from "../owner-modal/withdrawal-modal";

function WithdrawalDropdown({ request }: { request: WithdrawalProps }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="py-2">
          <li
            className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Eye size={16} /> <span>Xem thông tin chi tiết</span>
          </li>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal
        title={
          <p className="text-xl font-bold text-primary">Thông tin chi tiết</p>
        }
        open={isOpen}
        onCancel={() => setIsOpen(!isOpen)}
        footer={null}
      >
        <WithdrawalModal request={request} />
      </Modal>
    </>
  );
}

export default WithdrawalDropdown;
