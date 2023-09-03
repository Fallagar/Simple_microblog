import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
//@ts-ignore
import { Database } from "../database.types";
import RoleChange from "../../components/RoleChange/RoleChange";

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <RoleChange />;
}
