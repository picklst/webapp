import React, {useState} from 'react';
import dynamic from "next/dynamic";
import styled from '@emotion/styled'

const ListRequester = dynamic(() => import("../../index").then(mod => mod.ListRequester));

import Button from "../../../ui/Button";
import {useAuthState} from "../../../../states";

const EmptyCover = styled.div`
  background-image: ${(props) => props.bg && `url("${props.bg}")`};
  background-size: cover;
  background-position: center;
  margin-bottom: 10vh;
`;

const Wrapper = styled.div`
    background: rgba(0,0,0,0.6);
    width: 100%;
    min-height: 35vmax;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`;

const Content = styled.div`
    max-width: 500px;
    padding: 1rem;
    p {
        font-size: calc(1.2rem + 0.5vw);
        font-weight: 600;
        line-height: 1.25;
        span {
          font-size: 120%;
          display: block;
          padding-bottom: 0.5rem;
        }
    }
`;

export default ({ username }) => {
    const [isOpen, setOpen] = useState(false);
    const [myUserData] = useAuthState('userInfo');

    const isOwnFeed = myUserData && username === myUserData.username;

    return isOwnFeed ?
        <EmptyCover bg={require('../../../../images/illustrations/covers/workshop.png')}>
            <Wrapper>
                <Content>
                    <p>
                        <span>Looks like you don't have any lists published...</span>
                        Create your first list now!
                    </p>
                </Content>
            </Wrapper>
        </EmptyCover> :
        <EmptyCover bg={require('../../../../images/illustrations/covers/404.png')}>
            <Wrapper>
                <Content>
                    <p className="mb-4">
                        <span>Oops! @{username} is yet to publish a list.</span>
                        But, you can ask for a list now.
                    </p>
                    <Button
                        brandAccent
                        text="Request A List"
                        onClick={() => setOpen(true)}
                    />
                </Content>
                {
                    isOpen &&
                    <ListRequester
                        username={username}
                        onComplete={() => setOpen(false)}
                        onClose={() => setOpen(false)}
                    />
                }
            </Wrapper>
        </EmptyCover>
};