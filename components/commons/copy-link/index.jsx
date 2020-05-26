import React from "react";
import styled from '@emotion/styled'
import { toast } from 'react-toastify';

import {CopyToClipboard} from 'react-copy-to-clipboard';

const LinkContainer = styled.div`
    display : flex;
    background-color: white;
    padding: 0.5rem;
    border-radius: 10px!important;
    border: 1.2px solid #2196F3;
    width: 100%;
    box-shadow: 2px 3px 10px rgba(0,0,0,0.3);
    input {
      width: 100%;
      background: transparent!important;
      border: none!important;
    }
    button{
      width: 32px;
      background: white;
      border: none!important;
      color: #666;
    }
`;

export default ({ url, children }) => {

    const handleCopy = () => {
        toast.success(
            "Copied to clipboard!",
            {
                autoClose: 1000,
                hideProgressBar: true,
                closeButton: false,
                position: toast.POSITION.BOTTOM_CENTER,
            }
        );
    };

    return children ?
        <CopyToClipboard text={url} onCopy={handleCopy}><div>{children}</div></CopyToClipboard> :
    <LinkContainer>
        <input onClick={(e) => e.currentTarget.select()} value={url} />
        <CopyToClipboard text={url} onCopy={handleCopy}>
            <button><i className="gg-clipboard" /></button>
        </CopyToClipboard>
    </LinkContainer>
}