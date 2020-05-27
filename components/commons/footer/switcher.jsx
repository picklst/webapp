import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link'

import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive';

import { useAuthState } from "../../../states";

const BottomBarWrapper = styled.div`
    position: ${(props) => props.isKeyboardOpen ? 'static' : 'fixed' };
    bottom: 0;
    z-index: 5000;
    left: 0;
    width: 100%;
    background: white;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-items: center;
    box-shadow: 3px -2px 8px rgba(0,0,0,0.2)!important;
    a {
      width: 20%;
      display: flex;
      font-size: calc(1rem + 0.5vw);
      align-items: center;
      justify-content: center;
      color: #666;
      border: none;
      background: none;
      &:focus, &hover, .active {
        color: #0CC1B0!important;
        outline: none!important;
      }
    }
    .active {
        color: #0CC1B0;
    }
`;

export default ({ tab, setTab }) => {

    const handleResize = () => {
        if(window)
        {
            const sum = window.innerWidth + window.innerHeight;
            setStatus(sumEdge>sum)
        }
    };
    const [isKeyboardOpen, setStatus] = useState(false);
    const [sumEdge, setSumEdge] = useState(null);

    useEffect(() => {
        if(window){
            if(sumEdge === null)
                setSumEdge(window.innerWidth + window.innerHeight);
            window.addEventListener('resize', handleResize)
        }
    });

    const [data] = useAuthState('userInfo');

    const [space, setSpacing] = useState('8vh');
    const footerBarRef = useRef();
    useEffect(() => {
        if(footerBarRef && footerBarRef.current)
            setSpacing(footerBarRef.current.clientHeight);
    }, [footerBarRef]);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const getProfileURL = () => data && data.username ? `/${data.username}` : "/login";

    return isMobile ?
    <React.Fragment>
        <div style={{ height: space }} />
        <BottomBarWrapper as="footer" ref={footerBarRef} isKeyboardOpen={isKeyboardOpen}>
            <Link href="/">
                <a className={tab==='feed' ? 'active' : null}><i className="gg-feed" /></a>
            </Link>
            <Link href="/discover">
                <a className={tab==='discover' ? 'active' : null}><i className="gg-search" /></a>
            </Link>
            <a onClick={() => setTab('create')}>
                <i className="gg-add-r" />
            </a>
            <Link href="/notifications">
                <a className={tab==='notifications' ? 'active' : null}><i className="gg-bell" /></a>
            </Link>
            <Link href={getProfileURL()}>
                <a className={tab==='profile' ? 'active' : null}><i className="gg-profile" /></a>
            </Link>
        </BottomBarWrapper>
    </React.Fragment> : null;
}