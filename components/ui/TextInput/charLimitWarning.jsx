import React from "react";
import styled from '@emotion/styled'

const WarningContainer = styled.div`
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ ratio }) => ratio > 0.8 ? 'red' : ratio > 0.5 ? 'orange' : 'green'};
    padding: 0.5rem;
    text-align: right;
`;

export default ({ show, currentLength, charLimit }) => {

    return currentLength && charLimit && show ?
    <WarningContainer className="col-4" ratio={currentLength/charLimit}>
        {currentLength}/{charLimit}
    </WarningContainer> : null

}