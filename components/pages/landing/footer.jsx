import React from "react";
import styled from '@emotion/styled';

const FooterWrapper = styled.div`
    background-color: #FAFAFA;
    padding: 1rem;
    color: #666;
    img {
      filter: grayscale(1);
      max-height: 45px;
    }
    .links a {
      color: inherit;
      text-decoration: none;
      display: inline-block;
      padding: 0.2rem 1rem;
      font-weight: 600;
      &:hover {
        text-decoration: none;
        color: #2979FF;
      }
    }
`;

export default ({ }) => {
    return <FooterWrapper>
        <div className="container-lg p-0">
            <div className="row m-0">
                <div className="col-xl-3 col-md-6 p-2 d-flex align-items-center justify-content-center">
                    <div className="text-center text-md-left">
                        <img src={require('../../../images/assets/branding/logo-dark.png')} alt="logo" /><br />
                        &copy; 2020 Picklst. All Rights Reserved. <br />
                        <span className="small line-height-1">
                            Icons & illustrations by <a className="plain-link" href="https://icons8.com">Icons8 & Ouch.pics</a>
                        </span>
                    </div>
                </div>
                <div className="col-xl-9 col-md-6 d-flex align-items-center justify-content-md-end justify-content-center">
                    <div className="text-center text-md-left links">
                        <a href="/about">About</a>
                        <a href="/terms">Terms</a>
                        <a href="/policies/privacy">Privacy</a>
                        <a href="/help">Help Center</a>
                        <a href="/feedback">Share Feedback</a>
                    </div>
                </div>
            </div>
        </div>
    </FooterWrapper>
};