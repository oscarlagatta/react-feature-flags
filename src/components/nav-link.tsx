import type React from "react"
import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"

interface NavLinkProps {
    to: string
    children: React.ReactNode
    className?: string
    activeClassName?: string
    exact?: boolean
    [x: string]: any // For any additional props
}

export function NavLink({
                            to,
                            children,
                            className = "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                            activeClassName = "text-primary",
                            exact = false,
                            ...props
                        }: NavLinkProps) {
    const location = useLocation()
    const isActive = exact
        ? location.pathname === to
        : location.pathname.startsWith(to) && (to !== "/" || location.pathname === "/")

    return (
        <Link to={to} className={cn(className, isActive && activeClassName)} {...props}>
            {children}
        </Link>
    )
}

