"use client";

import Link from "next/link";
import React from "react";
import "./TopBar.styles.scss";

interface IProps {
  user: any;
  info: any;
}

const TopBar: React.FC<IProps> = ({ user, info }) => {
  function logout() {
    fetch("/auth/api/logout", {
      method: "POST",
    }).finally(() => window.location.reload());
  }

  return (
    <div className="top-bar">
      <div>Bloggr </div>
      <div>
        {user && (
          <>
            <span>Welcome, {user?.email}!</span>
            {info !== "no_role" ? (
              <span>
                &nbsp;Everyone is waiting for a new{" "}
                {info === "author" ? "post" : "comment"} from our favourite{" "}
                <strong>{info.toUpperCase()}</strong>
              </span>
            ) : (
              <span>
                &nbsp;Everyone is waiting for a new content from you. But first
                you need to choose a role...
              </span>
            )}
          </>
        )}
        {!user && (
          <>
            <span>Welcome, traveller!</span>
            <span>&nbsp;Everyone is waiting for your wise insights!</span>
          </>
        )}
      </div>
      <div>
        {!user ? (
          <button>
            <Link href={"/auth"}>Login</Link>
          </button>
        ) : (
          <button onClick={() => logout()}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
