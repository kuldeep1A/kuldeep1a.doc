import React from "react";

interface GenerateIframeProps {
    page_id: string;
}

export const GenerateIframe: React.FC<GenerateIframeProps> = ({ page_id }) => {
    const _url = "dlfkj"
    return (
        <div className="main-docs">
            <iframe width="100%" height="100%" title="p-1-docs" src={`${_url}`} />
        </div>
    );
}