import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

export interface ButtonLinkProps {
    href: string, 
    variant?: "primary" | "outline",
    size?: "sm" | "md" | "lg",
    leftIcon?: IconType, 
    className?: string,
    children: React.ReactNode
}

export default function ButtonLink({ href, variant = "primary", size = "md", leftIcon, className, children }: ButtonLinkProps ) {
  return (
    <>
        <Link 
            href={href}
            className={clsx(
                "inline-flex items-center justify-center px-12 py-3",
                "font-bold tracking-wider",
                variant === "primary" ? 
                    "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-900" : 
                    "bg-transparent border border-gray-900 hover:bg-gray-900 active:bg-gray-800 hover:text-white",
                
                size === "sm" ? "text-sm" : size === "md" ? "text-lg" : "text-xl",
                
                className
            )}
        >
            {/* {
                LeftIcon ? (
                    <span className="mr-2">
                        <LeftIcon />
                    </span>
                ) : ''
            } */}
            {children}
        </Link>
    </>
  )
}
