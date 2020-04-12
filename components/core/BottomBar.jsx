import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 6000;
    left: 0;
    width: 100%;
    background: white;
    padding: 0.5rem;
`;

const BottomBar = ({  }) => {

    return <Wrapper>
            <div className="row m-0">
                <div className="col-3 m-0">
                    <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="col-3 m-0">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className="col-3 m-0">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className="col-3 m-0">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>
    </Wrapper>

};

export default BottomBar;