import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./page.module.scss";
import TopBar from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import { Providers } from "../redux/provider";
import supabase from "../utils/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloggr",
  description: "Indeed",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    role: string;
  };
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let info;

  if (user) {
    info = await supabase
      .from("profiles")
      .select(`role`)
      .eq("id", user?.id)
      .single();
    params.role = info?.data?.role || "";
  }

  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.layout}`}>
        <TopBar user={user} info={info?.data?.role} />

        <div className={` ${styles.layout_index_container}`}>
          <SideBar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
