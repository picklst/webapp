import React, {useState} from 'react';
import dynamic from "next/dynamic";
import styled from 'styled-components';

import {useGlobalState} from "../../../../actions/states/Auth.ts";
const ListEditor =  dynamic(import("../../../../modules/editor/ListEditor"));
const ListRequester = dynamic(() => import("../../index").then(mod => mod.ListRequester));

import Button from "../../../ui/Button";

const Wrapper = styled.div`
  min-height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
    text-align: center;
    font-size: calc(1rem + 0.8vw);
    margin-top: 10vh;
    margin-bottom: 20vh;
`;

export default ({ username }) => {
    const [isOpen, setOpen] = useState(false);
    const [myUserData] = useGlobalState('UserInfo');

    const isOwnFeed = myUserData && username === myUserData.username;

    return isOwnFeed ?
        <Wrapper>
            <Content>
                <div>
                    Looks like you have not made any lists...
                    Create your first list now!
                </div>
                <Button
                    className="btn btn-primary ml-2 mt-4 px-4 rounded"
                    text="Make A List"
                    onClick={() => setOpen(true)}
                />
            </Content>
            {
                isOpen ?
                    <ListEditor
                        isNew
                        onExit={() => setOpen(false)}
                    /> : null
            }
        </Wrapper> :
        <Wrapper>
            <Content>
                <div>
                    Oops! @{username} is yet to publish a list.
                    But, you can ask for a list now.
                </div>
                <Button
                    className="btn btn-primary ml-2 mt-4 px-4 rounded"
                    text="Request A List"
                    onClick={() => setOpen(true)}
                />
            </Content>
            {
                isOpen ?
                    <ListRequester
                        username={username}
                        onComplete={() => setOpen(false)}
                        onClose={() => setOpen(false)}
                    />
                : null
            }
        </Wrapper>
};