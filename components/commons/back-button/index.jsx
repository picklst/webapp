import React from "react";
import Router from "next/router";
import styled from '@emotion/styled'

const StyledIcon = styled.i`
  --ggs: 1.25;
`;

export default ({ disabled }) => {

    return !disabled ?
    <a onClick={() => Router.back()} title="go back">
        <StyledIcon className="gg-chevron-left" />
    </a> :
    <a href="/" title="go to homepage">
        <img
            style={{ width: '50px', paddingRight: "0.5rem" }}
            alt="logo"
            src={require('../../../images/assets/branding/icon.png')}
        />
    </a>
}