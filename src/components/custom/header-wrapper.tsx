import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headerWrapperVariants = cva("mb-6", {
  variants: {
    size: {
      xs: "text-xs space-y-0.5",
      sm: "text-sm space-y-1",
      md: "text-base space-y-2",
      lg: "text-lg space-y-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface HeaderWrapperProps
  extends VariantProps<typeof headerWrapperVariants> {
  children?: React.ReactNode;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  mainClassName?: string
}

const HeaderWrapper = ({
  children,
  title,
  description,
  actions,
  size,
  className,
  mainClassName
}: HeaderWrapperProps) => {
  return (
    <div className={cn(headerWrapperVariants({ size }), className)}>
      <div className={cn("flex justify-between items-center", mainClassName)}>
        <div>
          <h1
            className={cn(
              "font-semibold",
              size === "xs"
                ? "text-sm"
                : size === "sm"
                ? "text-lg"
                : size === "lg"
                ? "text-3xl"
                : "text-2xl"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions}
      </div>
      {children && <div className="pt-4">{children}</div>}
    </div>
  );
};

export { HeaderWrapper };