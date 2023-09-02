import React from "react";
import "./SideBar.styles.scss";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
type Props = {};

function SideBar({}: Props) {
  return (
    <div className="side-bar">
      <div>
        <HomeRoundedIcon sx={{ fontSize: "42px" }} />
        <span> Home</span>
      </div>
      <div>
        <PersonSearchRoundedIcon sx={{ fontSize: "42px" }} />
        <span>By Author</span>
      </div>
    </div>
  );
}

export default SideBar;
