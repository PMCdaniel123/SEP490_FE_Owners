import { newCustomers } from "@/constants/constant";
import NewCustomerItem from "./new-customer-item";

function NewCustomers() {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-md p-4">
      <h1 className="font-bold mt-4">Khách hàng mới</h1>
      {newCustomers.map((customer, index) => (
        <NewCustomerItem
          key={index}
          avatar={customer.avatar}
          name={customer.name}
          location={customer.location}
        />
      ))}
    </div>
  );
}

export default NewCustomers;
