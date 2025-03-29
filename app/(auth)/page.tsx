import EmailSignInForm from "@/components/owner-form/EmailSignInForm";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhoneSignInForm from "@/components/owner-form/PhoneSignInForm";
import { BriefcaseBusiness } from "lucide-react";

function LoginPage() {
  return (
    <div className="w-5xl mx-auto flex flex-col md:flex-row items-center justify-center min-h-[600px] border border-primary rounded-md shadow-2xl">
      <div className="relative w-full h-[600px] flex-1/2">
        <Image
          src="/signup.jpg"
          alt="logo"
          fill
          className="object-cover w-full h-full rounded-l-md"
          priority
        />
      </div>
      <div className="flex flex-col bg-white flex-1/2 h-[600px] rounded-r-md">
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
    </div>
  );
}

export default LoginPage;
