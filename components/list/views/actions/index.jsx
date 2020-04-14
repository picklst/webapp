import React, {useState} from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"

import BottomPopup from "../../../ui/BottomPopup";
import Button from "../../../ui/Button";
import { ReportModule } from "../../../misc/modules";

const ActionOption = styled.button`
    padding: 1rem;
    text-align: center;
    background: none!important;
    display: block;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    width: 100%;
    &:hover {
      background-color: #eee!important;
    }
    &:focus {
      outline: none;
      background-color: #eef!important;
    }
`;

const ActionWrapper = styled.div`
  padding: 1rem;
`;

export default ({ username, slug }) => {

    const [showMenu, setMenu] = useState(false);
    const [actionSelected, setAction] = useState(null);

    const renderOptions = () =>
    <React.Fragment>
        <ActionOption tabIndex={0} onClick={() => setAction({ value: 1, label: "Report List" })} >
            <div className="text-danger font-weight-bold">Report Inappropriate</div>
        </ActionOption>
        <ActionOption tabIndex={0} onClick={() => setAction({ value: 2, label: "Share List" })}>
            <div>Share</div>
        </ActionOption>
        <ActionOption tabIndex={0} onClick={() => setAction({ value: 3, label: "Copy Link to List" })}>
            <div>Copy Link</div>
        </ActionOption>
        <ActionOption tabIndex={0} onClick={() => setAction({ value: 4, label: "Embed List" })}>
            <div>Embed</div>
        </ActionOption>
    </React.Fragment>;

    const handleClose = () => {
        setAction(null);
        setMenu(false);
    };

    const renderAction = () => {
        switch (actionSelected.value) {
            case 1:
                return <ReportModule
                    slug={slug}
                    username={username}
                    onComplete={handleClose}
                />;
            case 2: break;
        }
    };

    return <React.Fragment>
        <Button
            text={<FontAwesomeIcon icon={faEllipsisH} />}
            className="no-shadow p-0 plain-button"
            onClick={() => setMenu(true)}
        />
        {
            showMenu ?
                <BottomPopup
                    className="bg-white"
                    onClose={handleClose}
                    title={!actionSelected ? "List Actions" : actionSelected.label}
                >
                {
                    !actionSelected ?
                        renderOptions()
                    : <ActionWrapper>
                        {renderAction()}
                    </ActionWrapper>
                }
                </BottomPopup> : null
        }
    </React.Fragment>

};