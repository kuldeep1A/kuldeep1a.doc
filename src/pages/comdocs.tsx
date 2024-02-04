import React from "react";
import { GenerateIframe } from "../component/genPage";

interface ComDocsProps {
    _page_id: string;
}
export const ComDcos: React.FC<ComDocsProps> = ({ _page_id }) => {
    return (
        <div>
            <GenerateIframe page_id={_page_id} />
        </div>
    );
}