import React from "react";
import { useState } from "react";
import { links } from "./data";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Sidebar.module.css";
import logo from "../Menu/ghit.png";
import { Link } from "react-router-dom";
export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <main className={styles.main_sec}>
                <button onClick={openSidebar} className={styles.sidebar_toggle}>
                    <MenuIcon />
                </button>
            </main>

            <aside
                className={
                    isSidebarOpen
                        ? `${styles.sidebar} ${styles.show_sidebar}`
                        : `${styles.sidebar}`
                }
            >
                <div className={styles.sidebar_header}>
                    <img src={logo} className={styles.logo} alt="GHIT" />
                    <button className={styles.close_btn} onClick={closeSidebar}>
                        <CloseIcon />
                    </button>
                </div>
                <ul className={styles.links}>
                    {links.map((link) => {
                        const { id, url, text, icon } = link;
                        return (
                            <li key={id}>
                                <Link to={url}>
                                    {icon}
                                    {text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </>
    );
}
