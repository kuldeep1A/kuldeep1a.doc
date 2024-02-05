import React, { useEffect, ChangeEvent, useState, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { signOutUser, signInUser, addedLink, pageCount, addComId, fetchIsVerified, authState } from "../function/function";
import { User } from "firebase/auth";

export default function Navigation() {
    const [isHome, setHome] = useState(true);
    const [iframeLink, setIframeLink] = useState("")
    const [pages, setPages] = useState(0)
    const [isVerified, setIsVerified] = useState(false)
    var _authState = useRef<User | null>(null);
    const [authCheck, setAuthCheck] = useState<User | null>(null)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const signIn = async () => {
        if (email !== "" && pass !== "") {
            await signInUser(email, pass);
        }
    }
    const handleClick: React.MouseEventHandler<HTMLInputElement> = async (event) => {
        await addedLink(iframeLink);
    };
    const handleClick1 = async (event: any) => {
        const _id = event.target.id
        await addComId(_id);
    };
    const handleClickn = async () => {
        await signOutUser()
    }
    useEffect(() => {
        const fetchData = async () => {
            const pages: number = await pageCount();
            const _isVerified: boolean = await fetchIsVerified();
            const newAuthState = await authState();
            setAuthCheck(newAuthState)
            setIsVerified(_isVerified)
            setPages(pages)
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
    }, [isHome, setHome, setIsVerified, isVerified, _authState])
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
                        !isHome ? <></> : authCheck !== null ?
                            <div className="doc-uploads">
                                <div className="submit">
                                    <div><label htmlFor="linkIframe">Publish Link</label></div>
                                    <div><input type="text" title="Link" id="linkIframe" value={iframeLink} required onChange={(e) => setIframeLink(e.target.value)} placeholder="Publish Link" /></div>
                                    <div><input type="submit" onClick={handleClick} /> <button className="signOut" onClick={handleClickn}>SignOut</button></div>
                                </div>
                            </div>
                            : <div className="onlylogin">
                                <span style={{ fontWeight: "bold" }}>Only Admin</span>
                                <div>
                                    <label htmlFor="email">Email: </label>
                                    <input id="email" type="email" autoComplete="current-password" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required /><br />
                                    <label htmlFor="password">Password: </label>
                                    <input id="password" type="password" autoComplete="current-password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)} required /><br />
                                    <input type="submit" onClick={signIn} />
                                </div>
                            </div>
                    }
                </div >
                <hr />
            </div>
            <Outlet />
        </div >
    );
}
