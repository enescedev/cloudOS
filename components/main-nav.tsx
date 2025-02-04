"use client"

import * as React from "react"
import Link from "next/link"
import { Terminal, Code2, Chrome, MessageSquare, Layout, Database, User, Settings, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string; icon: React.ReactNode }[] = [
  {
    title: "Terminal",
    href: "/terminal",
    description: "Access your cloud terminal environment",
    icon: <Terminal className="w-4 h-4" />,
  },
  {
    title: "VSCode",
    href: "/vscode",
    description: "Integrated development environment",
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    title: "Firefox",
    href: "/browser",
    description: "Embedded web browser",
    icon: <Chrome className="w-4 h-4" />,
  },
  {
    title: "AI Chat",
    href: "/chat",
    description: "AI-powered development assistant",
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    title: "GUI",
    href: "/gui",
    description: "Linux desktop environment",
    icon: <Layout className="w-4 h-4" />,
  },
  {
    title: "S3 Manager",
    href: "/s3",
    description: "Manage your cloud storage",
    icon: <Database className="w-4 h-4" />,
  },
]

export function MainNav() {
  return (
    <NavigationMenu className="flex-1">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home className="w-4 h-4 mr-2" />
              CloudOS
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <div className="flex items-center ml-auto gap-2">
        <NavigationMenuItem>
          <Link href="/profile" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <User className="w-4 h-4 mr-2" />
              Profile
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </div>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"