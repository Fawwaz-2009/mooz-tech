import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        updatedSize: "px-4 py-3 rounded-[8px] text-[20px]",
      },
      iconPosition: {
        none: "",
        left: "flex-row",
        right: "flex-row-reverse",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      iconPosition: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconPosition = "none", icon, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn("inline-flex items-center justify-center", buttonVariants({ variant, size, iconPosition, className }))}
        ref={ref}
        {...props}
      >
        {/* Ensure asChild doesn't break with multiple children */}
        {asChild ? (
          <span className="inline-flex items-center justify-center">
            {icon && iconPosition === "left" && <span className="w-5 h-5 flex items-center">{icon}</span>}
            <span className="flex items-center justify-center">{children}</span>
            {icon && iconPosition === "right" && <span className="w-5 h-5 flex items-center">{icon}</span>}
          </span>
        ) : (
          <>
            {icon && iconPosition === "left" && <span className="w-5 h-5 flex items-center">{icon}</span>}
            <span className="flex items-center justify-center">{children}</span>
            {icon && iconPosition === "right" && <span className="w-5 h-5 flex items-center">{icon}</span>}
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
