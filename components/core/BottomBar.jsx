import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

const BottomBarWrapper = styled.div`
    position: ${(props) => props.isKeyboardOpen ? 'static' : 'fixed' };
    bottom: 0;
    z-index: 6000;
    left: 0;
    width: 100%;
    background: white;
    padding: 1rem;
`;

const BottomBar = ({  }) => {

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

    return <BottomBarWrapper isKeyboardOpen={isKeyboardOpen} className="row m-0">
        <div className="col-3 m-0">
            <FontAwesomeIcon icon={faHome} size="lg" />
        </div>
        <div className="col-3 m-0">
            <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
        <div className="col-3 m-0">
            <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
        <div className="col-3 m-0">
            <FontAwesomeIcon icon={faUser} size="lg" />
        </div>
    </BottomBarWrapper>

};

export default BottomBar;