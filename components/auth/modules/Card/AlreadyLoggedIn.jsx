import React from 'react';
import Button from "../../../ui/Button";
import {useAuthState} from "../../../../states";

export default ({ isVerified, onComplete }) => {

    const [myUserData] = useAuthState('userInfo');

    return <div className="p-2">
        {
            myUserData &&
            <div>Hello {myUserData.firstName} {myUserData.lastName} ({myUserData.username})!</div>
        }
        {
            isVerified ?
            <div>
                <p>You are likely here due to some error from our part, sorry for the inconvenience.</p>
                <Button className="my-2 btn-block orange-button" text="Continue" onClick={onComplete} />
                <Button className="my-2 btn-block blue-button" text="Back Home" link="./" />
            </div> :
            <div>
                <p>Please wait while we are verifying your login session.</p>
            </div>
        }
    </div>

};