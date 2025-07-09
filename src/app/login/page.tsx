"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { AdminLoginForm } from "@/components/form/admin-login-form";
import Video from "next-video";
import { Button } from "@/components/ui/button";
import WalletButton from "@/components/WalletButton"
import React, { useEffect } from "react";
import { AXIOS_INSTANCE } from "@/lib/utils";

const LoginPage = () => {
  const [show,setShow] = React.useState(false);

useEffect(()=>{
  async function login() {
    
          const response = await AXIOS_INSTANCE.post("/auth/login",{
            	"username":"admin",
	            "password":"password"
          },{
              withCredentials: true

          });
  }
  login()
})

  return (
    <div className="flex  bg-background relative min-h-screen overflow-auto">
      <div className="w-5/12 max-lg:w-full  p-5">
        <Button variant={"newly_secondary"} className="font-bold" onClick={() => window.history.back()}>
          <ArrowLeft />
          Back
        </Button>
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
          {!show?(<Button
            variant={"newly_secondary"} className="font-bold" style={{ width: "200px"}}
            onClick={() => setShow(!show)}
          >
            Login
            </Button>):null}
          {show?(<AdminLoginForm />):null}
          <WalletButton/>
          <hr />
        </div>
      </div>
      <div className="max-lg:hidden sticky top-0 w-full">
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
