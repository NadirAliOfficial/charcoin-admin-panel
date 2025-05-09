import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Menu } from "@mynaui/icons-react";
import { useState } from "react";

export default function AnimatedMenuButton() {
  return (
    <Button
      className="flex flex-col gap-2 justify-center items-center tw:p-2"
      variant="ghost"
      size="icon"
    ></Button>
  );
}
