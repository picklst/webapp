import React from 'react';
import styled from '@emotion/styled'

import Button from "../../../ui/Button";

const Container = styled.div`
  background-color: #FAFAFA;
  margin-top: 1rem;
  display: flex;
  padding: 0.5rem
`;

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`;

const ActionButton = styled(Button)`
    padding: 0.25rem 0.5rem;
    height: 100%;
`;

const ActionWrap = styled.div`
  font-weight: 300;
  color: #333;
  font-size: calc(0.8rem + 1vw);
  display: flex;
  align-items: center;
  padding: 0.35rem;
  height: 100%;
  span
  { padding-left: 0.5rem; }
`;

export default ({ }) => {

    return <Container className="rounded-bottom">
        <ActionsContainer>
            <ActionButton text={<ActionWrap><i className="gg-play-list-add" /></ActionWrap>}/>
            <ActionButton text={<ActionWrap><i className="gg-play-list-add" /></ActionWrap>}/>
            <ActionButton text={<ActionWrap><i className="gg-play-list-add" /></ActionWrap>}/>
        </ActionsContainer>
    </Container>
};