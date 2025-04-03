import EmailSignInForm from "@/components/owner-form/EmailSignInForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhoneSignInForm from "@/components/owner-form/PhoneSignInForm";
import { BriefcaseBusiness } from "lucide-react";

function LoginPage() {
  return (
    <div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-white py-6 px-6 rounded-tr-md flex items-center gap-2">
        <BriefcaseBusiness /> <span>Đăng nhập doanh nghiệp</span>
      </h1>
      <Tabs defaultValue="email" className="w-[76%] mx-auto mt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="email" className="">
            Email
          </TabsTrigger>
          <TabsTrigger value="phone">Số điện thoại</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <EmailSignInForm />
        </TabsContent>
        <TabsContent value="phone">
          <PhoneSignInForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default LoginPage;
