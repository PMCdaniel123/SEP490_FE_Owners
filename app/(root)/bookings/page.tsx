import BookingTable from "@/components/table/booking-table";
import { bookingList } from "@/constants/constant";
import { BookingTableColumns } from "@/constants/table-columns";

function BookingManagement() {
  return (
    <div className="p-4 bg-white rounded-xl">
      <BookingTable columns={BookingTableColumns} data={bookingList} />
    </div>
  );
}

export default BookingManagement;
