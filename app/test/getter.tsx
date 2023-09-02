"use client";
import { useCallback, useEffect, useState } from "react";
//@ts-ignore
import { Database } from "../database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

const Getter = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient<Database>();
  const user = session?.user;
  const [userState, setUserState] = useState("None");
  const getProfile = useCallback(async () => {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, role`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setUserState(`${data}`);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile() {
    try {
      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        username: "Test name",
        updated_at: new Date().toISOString(),
        full_name: "Some full name",
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
    }
  }

  return (
    <div style={{ color: "white" }}>
      <div>Hello {userState}</div>
      <div>
        <button onClick={() => updateProfile()}>Button</button>
      </div>
    </div>
  );
};

export default Getter;
