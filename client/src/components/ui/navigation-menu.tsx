import * as React from "react"

interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> { }

export function NavigationMenu({ className, children, ...props }: NavigationMenuProps) {
    return (
        <nav className={className} {...props}>
            {children}
        </nav>
    )
}

