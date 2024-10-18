import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const router = useRouter();
  
  // Check if the current route is '/'
  if (router.pathname === "/") {
    return null; // Don't render the navbar if on the home page
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="w-full" justify="center">
        <NavbarBrand className="gap-3">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>

        {/* Nav items centered */}
        <div className="hidden lg:flex gap-4 justify-center ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg"
          onPress={() => window.location.href = '/'}
        >
          Logout
        </Button>
      </NavbarContent>
    </NextUINavbar>
  );
};
