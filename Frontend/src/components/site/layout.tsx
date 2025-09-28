import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <main className="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
