import React from 'react';
import styled from '@emotion/styled'

import Base from "./Base";
import {LandingFooter} from "../pages";
import {Button} from "../ui";

import { Header } from '../commons'

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 85vh;
  .wrapper {
    max-width: 900px;
  }
  img {
    max-width: 100%;
    max-height: 50vw;
  }
  h1 {
    font-size: calc(1rem + 1.5vw);
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.2;
  }
`;

const ErrorPage = ({ title, heading, description }) => {

    return <Base
        meta={{ title: title }}
        hideFooter
    >
        <Header hideOnMobile />
        <ErrorContainer>
            <div className="row mx-0 wrapper">
                <div className="col-lg-6 col-md-4 p-2">
                    <img src={require('../../images/assets/illustrations/not-found.png')} alt="not found" />
                </div>
                <div className="col d-flex align-items-center">
                    <div>
                        <h1>{heading}</h1>
                        <p>{description}</p>
                        <Button text="Go Back" link="/" brandAccent />
                    </div>
                </div>
            </div>
        </ErrorContainer>
        <LandingFooter/>
    </Base>

};

export default ErrorPage;