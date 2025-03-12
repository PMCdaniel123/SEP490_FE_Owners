import FeedbackTable from "@/components/table/feedback-table";
import { feedbackList } from "@/constants/constant";
import { FeedbackTableColumns } from "@/constants/table-columns";

function FeedbackManagemet() {
  return (
    <div className="p-4 bg-white rounded-xl">
      <FeedbackTable columns={FeedbackTableColumns} data={feedbackList} />
    </div>
  );
}

export default FeedbackManagemet;
