import React, {useEffect, useRef, useState} from "react";
import styled from '@emotion/styled'
import {clearAllBodyScrollLocks} from "body-scroll-lock";

import {Button, PopUp} from "../../ui";

const SearchWindow = styled(PopUp)`
  overflow-y: auto;
  @media(max-width: 700px) {
    align-items: unset!important;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
  }
`;

const CloseButton = styled.div`
  width: 45px;  
`;

const SearchBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: white;  
  z-index: 900;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
`;

export default ({ showHeader, searchBox, children, onClose }) => {

    const [space, setSpacing] = useState('15vh');
    const topbarRef = useRef();

    useEffect(() => {
        if(topbarRef && topbarRef.current && topbarRef.current.clientHeight !== space)
            setSpacing(topbarRef.current.clientHeight);
    }, [children]);

    const handleClose = () => {
        clearAllBodyScrollLocks();
        onClose();
    };

    const renderCloseButton =
    <CloseButton className={showHeader ? "pt-2" : "d-flex align-items-center"}>
        <Button className="plain-button p-1" text={<i className="gg-close"/>} onClick={handleClose}/>
    </CloseButton>;

    return <SearchWindow
        isOpen
        appElement=".app"
        className="bg-light p-0"
        onClose={onClose}
        showTopbarOnMobile={false}
    >
        <SearchBarContainer
            ref={topbarRef}
            className="container-sm p-0"
        >
            <div className="p-2 d-flex">
                {renderCloseButton}
                <div className="w-100">
                    {showHeader &&
                    <div className="text-md-center p-2">
                        <h3 className="mb-0">Search</h3>
                        <p className="mb-0">Discover lists, search for topics, find people</p>
                    </div>
                    }
                    <div className="p-2">
                        {searchBox}
                    </div>
                </div>
            </div>
        </SearchBarContainer>
        <div style={{ height: space }} />
        {children}
    </SearchWindow>;
}