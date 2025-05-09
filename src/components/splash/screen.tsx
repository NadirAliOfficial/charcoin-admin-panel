import { SpinnerOne } from "@mynaui/icons-react";
import { Loader } from "lucide-react";
import Image from "next/image";

const SplashScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-col gap-4 items-center justify-center ">
      <Image
        alt="Charcoin"
        src={"/logo.svg"}
        className="w-64"
        width={376}
        height={115}
      />
      <Loader className="text-primary w-4 h-4 animate-spin" />
    </div>
  );
};

export { SplashScreen };
