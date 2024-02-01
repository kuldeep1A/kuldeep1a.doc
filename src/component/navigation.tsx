import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Navigation() {
    const [isHome, setHome] = useState(true);
    useEffect(() => {
        if (window.location.pathname === "/") {
            setHome(true)
        } else {
            setHome(false)
        }
        window.addEventListener("click", () => {
            if (window.location.pathname === "/") {
                setHome(true)
            } else {
                setHome(false)
            }
        })
    }, [isHome, setHome])
    return (
        <div className="main">
            <div className="nav">
                <div className="nav-docs">
                    {isHome ? <></> : <Link to="/"><h1>Docx</h1></Link>}
                    <div className="nav-icon"><img src="./image-icon/docs.svg" alt="home" /></div>
                    <div className="doc-pages">
                        <div>
                            <ul>
                                <li><Link to="./p1" title="p1">p1</Link></li>
                                <li><Link to="./p2" title="p2">p2</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="doc-uploads">
                        <div>
                            <input type="file" />
                        </div>
                    </div>
                </div >
                <hr />
            </div>
            <Outlet />
        </div>

    );
}
