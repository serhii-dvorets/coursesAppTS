import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import style from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Header />
      </header>

      <main className={style.main}>
        <Outlet />
      </main>

      <footer className={style.footer}>
        <Footer />
      </footer>
    </div>
  );
}
