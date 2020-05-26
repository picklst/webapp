import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const NameContainer = styled.span`
    display: inline-block;
    font-weight: 600;
`;

export default ({ firstName, lastName, isVerified }) =>
<NameContainer>
    {firstName} {lastName}
    {isVerified ?
        <span className="pl-1 text-primary">
            <FontAwesomeIcon icon={faCheckCircle}/>
        </span> : null
    }
</NameContainer>;