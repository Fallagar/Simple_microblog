import React from "react";
import Link from "next/link";
import "./SideBar.styles.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
type Props = {};

function SideBar({}: Props) {
  return (
    <div className="side-bar">
      <div>
        <HomeRoundedIcon sx={{ fontSize: "42px" }} />
        <Link href={"/"}>Home</Link>
      </div>
      <div>
        <PersonSearchRoundedIcon sx={{ fontSize: "42px" }} />
        <Link href={"/search"}>By Author</Link>
      </div>
    </div>
  );
}

export default SideBar;
