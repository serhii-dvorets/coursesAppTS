import React from "react";
import style from "./Header.module.scss";
import { Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  let location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className={style.container}>
      {isMainPage ? (
        <span>CHOOSE YOUR COURSE</span>
      ) : (
        <NavLink to={"/"}>
          <Button type="text">VIEW ALL COURSES</Button>
        </NavLink>
      )}
    </div>
  );
}
