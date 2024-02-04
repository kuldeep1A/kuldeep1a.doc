import React, { useEffect, useState } from "react";
import { fetchLink } from "../function/function";
interface GenerateIframeProps {
    page_id: string;
}

export const GenerateIframe: React.FC<GenerateIframeProps> = ({ page_id }) => {
    const [link, setLink] = useState("")
    useEffect(() => {
        const fetchL = async (page_id: string) => {
            const _link = await fetchLink(page_id)
            setLink(_link)
        }
        fetchL(page_id)
    }, [setLink, link, page_id])
    return (
        <div className="main-docs">
            {link === "" ? <></> : <iframe width="100%" height="100%" title="p-1-docs" src={`${link}`} />}
        </div>
    );
}