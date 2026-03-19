import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gradient:
          "border border-transparent text-white bg-[linear-gradient(120deg,#FF0066_0%,#8e0076_52%,#200048_100%)] shadow-[0_10px_24px_rgba(255,0,102,0.3)] hover:-translate-y-px",
        outline:
          "border border-[var(--line)] bg-transparent text-[var(--text)] hover:-translate-y-px hover:bg-white/[0.04]",
        ghost:
          "border border-transparent text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-white/[0.06]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "gradient",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
