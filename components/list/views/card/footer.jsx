import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEye, faPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../ui/Button";

const Container = styled.div`
  border-top: 1px solid rgba(0,0,0,0.2);
  background-color: #FAFAFA;
  margin-top: 1rem;
  display: flex;
`;

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`;

const ActionWrap = styled.div`
  font-weight: 300;
  color: #333;
  font-size: 1rem;
  span
  {
    padding-left: 0.5rem;
  }
`;

export default ({ }) => {

    return <Container className="rounded-bottom">
        <ActionsContainer>
            <div>
                <Button
                    className="no-shadow plain-button"
                    text={
                        <ActionWrap>
                            <FontAwesomeIcon icon={faStar} />
                            <span>Star</span>
                        </ActionWrap>
                    }
                />
            </div>
            <div>
                <Button
                    className="no-shadow plain-button"
                    text={
                        <ActionWrap>
                            <FontAwesomeIcon icon={faEye} />
                            <span>Watch</span>
                        </ActionWrap>
                    }
                />
            </div>
            <div>
                <Button
                    className="no-shadow plain-button"
                    text={
                        <ActionWrap>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Add to Collection</span>
                        </ActionWrap>
                    }
                />
            </div>
        </ActionsContainer>
    </Container>
};