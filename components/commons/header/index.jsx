import React, {useEffect, useRef} from "react";
import { useMediaQuery } from 'react-responsive';
import styled from '@emotion/styled';

import { SearchBar } from "../../search";

import Logo from "./logo";
import AccountBox from "./account";
import AccountDropDown from "./account/dropdown";
import Overlays from "../../core/overlays";
import {usePreferenceState} from "../../../states";

const TopbarContainer = styled.div`
  width: 100%;
  background: white;
  padding: 0.5rem;
  box-shadow: 3px 5px 8px rgba(0,0,0,0.3);
  position: fixed;
  top: 0; 
  z-index: 5000;
  min-height: 7.5vh;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #0CC1B0;
`;

export default () => {
    const [space, setSpacing] = usePreferenceState('topbarHeight');
    const topbarRef = useRef();
    useEffect(() => {
        if(topbarRef && topbarRef.current)
            setSpacing(topbarRef.current.clientHeight);
    }, [topbarRef]);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 768px)'
    });

    return isDesktopOrLaptop ?
    <React.Fragment>
        <TopbarContainer
            as="header"
            ref={topbarRef}
        >
            <div className="row m-0 w-100">
                <div className="col-12 col-sm-3 col-md-6 col-xl-4 d-flex align-items-center justify-content-center">
                    <Logo />
                    <div className="d-none d-md-block ml-3">
                        <SearchBar />
                    </div>
                </div>
                <div className="col-xl-4 d-none d-xl-flex align-items-center">

                </div>
                <div className="col d-none d-sm-flex justify-content-end align-items-center">
                    <div className="d-none d-md-block mr-2">
                        <AccountBox />
                    </div>
                    <div className="mx-2">
                        <AccountDropDown />
                    </div>
                </div>
            </div>
        </TopbarContainer>
        <div style={{ height: space }} />
        <Overlays />
    </React.Fragment> : null;

};