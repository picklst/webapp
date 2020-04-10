import React, {createRef, useEffect, useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import DropDown from "../ui/DropDown";
import Toggler from "../ui/Toggler";

import Card from "../ui/Cards";
import Button from "../ui/Button";

import '../../styles/topbar.sass';
import PopUp from "../ui/PopUp";
import AuthCard from "../../modules/auth/AuthCard";
import TextInput from "../forms/TextInput";


const Topbar = () => {

    const currentTheme = "light";

    const [isLoginCardOpen, toggleLoginCard] = useState(false);
    const renderLoginCard = () => {
        return <PopUp
            isOpen={isLoginCardOpen}
            onClose={toggleLoginCard}
            appElement=".app"
        >
            <AuthCard showLogin />
        </PopUp>
    };

    const [space, setSpacing] = useState('8vh');
    useEffect(() => {
        if(topbarRef && topbarRef.current)
            setSpacing(topbarRef.current.clientHeight);
    });

    const renderSettingsDropDown = () =>
    <Card p={3}>
        <Toggler
            small
            className="p-0"
            text={
                <div className="small">
                    {`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
                </div>
            }
        />
        <hr className="my-1" />
        <a href="#" className="d-block plain-link line-height-1 my-2">
            <small>Learn more about Picklst</small>
            <div className="mt-1">
                Help & Support
            </div>
        </a>
        <hr className="my-1" />
        <a href="#" className="d-block plain-link line-height-1 my-2">
            <small>We Care, We Protect</small>
            <div className="mt-1">
                Privacy Policy
            </div>
        </a>
    </Card>;

    const topbarRef = createRef();

    return <React.Fragment>
        <div
            ref={topbarRef}
            id="topbar"
            style={{ position: "fixed", top: 0, zIndex: 5000 }}
        >
            <div className="container p-0">
                <div className="row m-0">
                    <div className="col-3">
                        <img
                            src={require('../../images/assets/branding/logo-dark.png')}
                            style={{ maxHeight: '40px' }}
                        />
                    </div>
                    <div className="col-md-6 d-none d-md-flex align-items-center">
                        <TextInput
                            label="Search"
                            name="search-bar"
                            className="w-100"
                            hideLabel
                        />
                    </div>
                    <div className="col d-none d-md-flex justify-content-end align-items-center">
                        <Button
                            className="plain-button p-0 mr-2 no-shadow"
                            onClick={() => toggleLoginCard(true)}
                            text={
                                <div className="btn btn-outline-info">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            }
                        />
                        { isLoginCardOpen ? renderLoginCard() : null }
                        <DropDown
                            triggerComponent={
                                <div className="btn btn-outline-warning">
                                <span className="pr-3">
                                    <FontAwesomeIcon icon={faCog} />
                                </span>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            }
                            dropdownComponent={renderSettingsDropDown()}
                        />
                    </div>

                </div>
            </div>
        </div>
        <div style={{ height: space }} />
    </React.Fragment>

};

export default Topbar;