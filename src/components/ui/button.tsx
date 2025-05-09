import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        newly_secondary:
          "bg-secondary hover:bg-secondary/90 text-muted-foreground",
        newly_darken:
          "bg-[#3d3c44] hover:bg-[#3d3c44]/90 text-muted-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md text-base px-8",
        icon: "h-10 w-10",
        main_btn: "h-12 font-normal py-2 px-4",
      },
      rounded: {
        normal: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  iconProps?: React.SVGProps<SVGSVGElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, startIcon: StartIcon, endIcon: EndIcon, iconProps, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const iconSizeMap: Record<string, string> = {
      sm: "h-3 w-3",
      default: "h-4 w-4",
      lg: "h-4 w-4",
      icon: "h-6 w-6",
      main_btn: "h-5 w-5",
    };

    const iconSizeClass = iconSizeMap[size || "default"]; // Fallback to "default" if size is undefined

    
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }), "flex items-center gap-2")}
        {...props}
      >
        {/* Ensure only one direct child when using asChild */}
        {asChild ? (
          <span className="flex items-center gap-2">
            {StartIcon && <StartIcon {...iconProps} className={cn(iconSizeClass, iconProps?.className)} />}
            {children}
            {EndIcon && <EndIcon {...iconProps} className={cn(iconSizeClass, iconProps?.className)} />}
          </span>
        ) : (
          <>
            {StartIcon && <StartIcon {...iconProps} className={cn(iconSizeClass, iconProps?.className)} />}
            {children}
            {EndIcon && <EndIcon {...iconProps} className={cn(iconSizeClass, iconProps?.className)} />}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
