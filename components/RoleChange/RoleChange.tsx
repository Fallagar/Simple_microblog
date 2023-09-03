"use client";

import React from "react";
import "./RoleChange.styles.scss";

type Props = {};

const RoleChange = (props: Props) => {
  function becomeAuthor() {
    fetch("/auth/api/role", {
      method: "POST",
      body: JSON.stringify({ role: "author" }),
    }).finally(() => window.location.reload());
  }
  function becomeCommentator() {
    fetch("/auth/api/role", {
      method: "POST",
      body: JSON.stringify({ role: "commentator" }),
    }).finally(() => window.location.reload());
  }

  return (
    <div className="role-change">
      <div>Please select role. Choose wisely...</div>
      <div>
        {" "}
        <button onClick={() => becomeAuthor()}>Become an Author</button>
        <button onClick={() => becomeCommentator()}>
          Become a Commentator
        </button>
      </div>
    </div>
  );
};

export default RoleChange;
