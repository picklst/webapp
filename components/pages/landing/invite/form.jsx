import React, {useEffect, useState} from "react";

import TextInput from "../../../forms/TextInput";
import { Button } from "../../../ui";
import {APIRequest} from "../../../../utils";

export default ({ isRequesting, onSubmission }) => {

    const [slotsLeft, setSlotsLeft] = useState(0);

    const fetchSlotsInfo = () => {
        const query = `{ dailySlotsLeft }`;
        APIRequest({ query, requireAuth: false }).then((data) => {
            setSlotsLeft(data.dailySlotsLeft);
        }).catch((errors) => {
            console.error("failed to fetch slot status");
        })
    };

    useEffect(fetchSlotsInfo, []);

    const handleRequestInvite = async (e) => {
        e.preventDefault();
        const email = e.currentTarget['email'].value;
        if(typeof onSubmission === "function")
            onSubmission(email);
    };

    const renderForm =
    <form onSubmit={handleRequestInvite} className="w-100">
        <div className="row m-0 text-center w-100">
            <div className="col-md-8 d-flex align-items-center text-left justify-content-end">
                <TextInput
                    label="email"
                    placeholder="Your Email Address"
                    hideLabel
                    name="email"
                    className="w-100"
                    type="email"
                    isRequired
                    isDisabled={isRequesting}
                />
            </div>
            <div className="col d-flex align-items-center justify-content-md-start justify-content-center">
                <Button
                    type="submit"
                    brandAccent
                    text={!isRequesting ? "Request Your Invite" : <i className="gg-loadbar py-2" /> }
                    className="rounded-pill my-3 my-md-0"
                />
            </div>
        </div>
    </form>;

    return <div className="row m-0">
        <div className="col-lg-9 d-flex align-items-center h-100 p-0">
            <div>
                <div className="row mx-0 mb-2">
                    <div className="col-4 d-md-none d-flex p-2 align-items-center">
                        <img
                            className="illus"
                            style={{ marginLeft: '-15vw', marginTop: '-5vh' }}
                            src={require('../../../../images/assets/illustrations/invite-bird.png')}
                            alt="invite"
                        />
                    </div>
                    <div className="col pl-4 pr-0 d-flex align-items-center">
                        <h2 className="line-height-1">We are on a <span className="d-inline-block">Invite-Only Beta!</span></h2>
                    </div>
                </div>
                <div className="p-2 px-md-4">
                    <p>
                        We have just started off in this long journey, and are working hard for the public launch soon.
                        Currently, the access to the Picklst platform is limited exclusively for invited enthusiasts.
                    </p>
                    <p>
                        The <strong>First 1000</strong> early-birds to join us now will not only get exclusive
                        access to the brand new platform, but will <strong>forever enjoy special privileges❤️</strong>, such
                        as being the only 1000 users to ever have a <strong>ad-free experience</strong> in the future.
                    </p>
                    <div className="font-weight-bold">{slotsLeft} Slots Available Now.</div>
                    <div className="d-flex justify-content-center my-4">
                         {renderForm}
                    </div>
                    <div className="small">
                        <div>
                            ** To avoid exploitation & to ensure that everyone gets a chance to request invite, we are
                            <b> limiting invites to a maximum of 50 users per day</b> for the first few days.
                        </div>
                        <div>
                            *** We will be refreshing quota's daily at 12PM Noon, and sending out invites strictly
                            on a first-come-first-serve basis.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-12 p-2 d-lg-flex d-none p-md-0 mt-4 mt-md-0 align-items-center justify-content-center">
            <img className="illus" src={require('../../../../images/assets/illustrations/invite-bird.png')} alt="invite" />
        </div>
    </div>;
}