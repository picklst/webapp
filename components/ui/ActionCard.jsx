import React from "react";
import styled from '@emotion/styled'

import {useGlobalState} from "../../actions/states/Auth.ts";

import {AuthCard} from "../auth";

import Button from "./Button";
import Card from "./Cards";

const StyledCard = styled(Card)`
    margin-bottom: 1rem!important;
    p {
      font-size: 0.8rem;
      line-height: 1.25;
      margin-bottom: 0;
    }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  div {
    width: 15%;
    justify-content: center;
    display: flex;
  }
  h6 {
    width: auto;
    padding: 0 0.35rem;
    margin-bottom: 0;
  }
`;

export default ({
    module, button, icon, labels, cover,
    showModule, requireAuth = true, isHorizontal = false,
    onOpen, onClose
}) => {

    const [data] = useGlobalState('UserInfo');
    const isLoggedIn = !!data;

    const renderBody = () =>
    <React.Fragment>
        <TitleContainer>
            <div>{icon}</div>
            <h6 className="d-inline-block">{labels.title}</h6>
        </TitleContainer>
        <p className="mb-0">{labels.description}</p>
        {  module &&
            (
                showModule ? isLoggedIn || !requireAuth ? module :
                    <AuthCard labels={{ 'title': "You need to Login" }} variant="bottom-popup" onClose={onClose}/> :
                    <Button
                        brandAccent
                        className="mx-0 small mt-3"
                        text={labels.buttonText}
                        onClick={onOpen}
                    />
            )
        }
        {
            button &&
            <Button
                brandAccent
                className="mx-0 small mt-3"
                text={labels.buttonText}
                onClick={onOpen}
            />
        }
    </React.Fragment>;

    return isHorizontal ?
    <StyledCard p={0}>
        <div className="row mx-0">
            {   cover &&
                <div
                    style={{
                        backgroundImage: `url(${cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    className="col-4 px-0"
                />
            }
            <div className="col p-3">{renderBody()}</div>
        </div>
    </StyledCard> :
    <StyledCard p={0}>
        { cover && <img alt={name} className="w-100 rounded-top" src={cover} /> }
        <div className="p-3">{renderBody()}</div>
    </StyledCard>
}