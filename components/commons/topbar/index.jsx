import React, {useEffect, useRef} from "react";
import useScrollDirection from './scrollDirection';
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive';

import {BackButton} from "../index";
import {usePreferenceState} from "../../../states";

const MobileTopbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: ${({direction}) => direction === 'down' ? 'none' : 'flex'};
  align-items: center;
  background: white;
  padding: 0.5rem;
  z-index: 5000;
  box-shadow: 3px 5px 8px rgba(0,0,0,0.2);
  height: ${({direction}) => direction === 'down' ? 0 : null };
  min-height: 7.8vh;
`;

const BackButtonWrapper = styled.div`
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    --ggs: 1.3
  }
`;

const ContentWrapper = styled.div`
  font-weight: 600;
  font-size: calc(1rem + 0.5vw);
`;

const TitleWrapper = styled.div`
  font-weight: 600;
  font-size: 1rem;
`;

export default ({
    children, button, title,
    showTitle, showBackButton, showIcon, showLogoLeft, showLogo, disableBackButton, hideOnScrollDown
}) => {
    const [space, setSpacing] = usePreferenceState('topbarHeight');
    const scrollDirection = useScrollDirection({ initialDirection: 'up', thresholdPixels: 64 });

    const topbarRef = useRef();
    useEffect(() => {
        if(topbarRef && topbarRef.current)
            setSpacing(topbarRef.current.clientHeight);
    }, [topbarRef, scrollDirection]);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return isMobile ?
    <div>
        {   children ?
            <MobileTopbarContainer direction={hideOnScrollDown ? scrollDirection : null} ref={topbarRef} as="header">
                <div className="row w-100 m-0">
                    <div className="col p-0">
                        <ContentWrapper>{children}</ContentWrapper>
                    </div>
                    {button ? <div className="col-3 px-2">{button}</div> : null}
                </div>
            </MobileTopbarContainer> :
            showLogoLeft ?
            <MobileTopbarContainer direction={scrollDirection} ref={topbarRef} as="header">
                <div className="row m-0 w-100">
                    <div className="col-4 d-flex align-items-center justify-content-center px-2">
                        <a href="/" className="text-center w-100 d-block" title="Go to home page">
                            <img
                                alt="Logo"
                                src={require('../../../images/assets/branding/logo-dark.png')}
                                style={{ maxHeight: '36px' }}
                            />
                        </a>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end px-1">
                        {button ? button : null}
                    </div>
                </div>
            </MobileTopbarContainer> :
            <MobileTopbarContainer direction={scrollDirection} ref={topbarRef} as="header">
                <div className="row m-0 w-100">
                        <div className="col-2 d-flex align-items-center justify-content-center px-0">
                            {   showBackButton &&
                            <BackButtonWrapper><BackButton disabled={disableBackButton}/></BackButtonWrapper>
                            }
                            {
                                showIcon &&
                                <a href="/" className="text-center w-100 d-block" title="Go to home page">
                                    <img
                                        alt="Logo"
                                        src={require('../../../images/assets/branding/icon.png')}
                                        style={{ width: '36px' }}
                                    />
                                </a>
                            }
                        </div>
                        <div className="col px-1 d-flex align-items-center">
                            {showLogo &&
                            <a href="/" className="text-center w-100 d-block" title="Go to home page">
                                <img
                                    alt="Logo"
                                    src={require('../../../images/assets/branding/logo-dark.png')}
                                    style={{ maxHeight: '36px' }}
                                />
                            </a>
                            }
                            {   showTitle && <TitleWrapper>{title}</TitleWrapper> }
                        </div>
                        <div className="col-2 d-flex align-items-center px-0">
                            {button}
                        </div>
                    </div>
            </MobileTopbarContainer>
        }
        <div style={{ height: space }} />
    </div> : null;
}