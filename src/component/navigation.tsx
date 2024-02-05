import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { addedLink, pageCount, addComId, fetchIsVerified } from "../function/function";

export default function Navigation() {
    const [isHome, setHome] = useState(true);
    const [iframeLink, setIframeLink] = useState("")
    const [pages, setPages] = useState(0)
    const [isVerified, setIsVerified] = useState(false)
    const handleClick: React.MouseEventHandler<HTMLInputElement> = async (event) => {
        await addedLink(iframeLink);
    };
    const handleClick1 = async (event: any) => {
        const _id = event.target.id
        await addComId(_id);
    };
    useEffect(() => {
        const fetchData = async () => {
            const pages: number = await pageCount();
            const _isVerified: boolean = await fetchIsVerified();
            setIsVerified(_isVerified)
            setPages(pages)
            console.log("conf: ", isVerified)
        }
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

        fetchData();
    }, [isHome, setHome, setIsVerified, isVerified])
    return (
        <div className="main">
            <div className="nav">
                <div className="nav-docs">

                    <div className="nav-icon">
                        <img src="./image-icon/docs.svg" alt="home" /></div>
                    <div className="doc-pages">
                        <span >{isHome ? <></> : <Link to="/"><h1>Docx</h1></Link>}</span>
                        <div>
                            <ul>
                                {Array.from({ length: pages }, (_, index) => (
                                    <li key={index}><Link id={`p-xe-w3-k1-db-${index + 1}`} onClick={handleClick1} to={`com-p-xe-w3-k1-db-${index + 1}`} title={`page-${index + 1}`}>p{`${index + 1}`}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {
                        !isHome ? <></> : isVerified ?
                            <div className="doc-uploads">
                                <div className="submit">
                                    <div><label htmlFor="linkIframe">Publish Link</label></div>
                                    <div><input type="text" title="Link" id="linkIframe" value={iframeLink} required onChange={(e) => setIframeLink(e.target.value)} placeholder="Publish Link" /></div>
                                    <div><input type="submit" onClick={handleClick} /></div>
                                </div>
                            </div>
                            : <></>
                    }
                </div >
                <hr />
            </div>
            <Outlet />
        </div >
    );
}
