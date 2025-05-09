import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { AdminLoginForm } from "@/components/form/admin-login-form";
import Video from "next-video";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-background relative  ">
      <div className="w-5/12 max-lg:w-full  p-5">
        <Button variant={"newly_secondary"} className="font-bold">
          <ArrowLeft />
          Back
          
        </Button>
        <Video src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} />
        <div className="flex flex-col  max-w-sm gap-4 mx-auto justify-center  h-5/6 mt-4 ">
          <Image
            src={"/logo.svg"}
            alt="Charcoin"
            width={376 / 2}
            height={115 / 2}
          />
          <h1>
            A global community passionate about investing while making a
            positive impact on the world.{" "}
          </h1>
          <hr />
          <AdminLoginForm />
          <hr />
        </div>
      </div>
      <div className="max-lg:hidden  w-full">
        {" "}
        <Image
          src={"/feature-image.png"}
          alt="Feature Image"
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-20 h-20 z-50 bg-primary absolute right-3 top-3"></div>
      <div className="w-20 h-20 z-50 bg-secondary absolute right-5 top-5"></div>
    </div>
  );
};

export default LoginPage;
