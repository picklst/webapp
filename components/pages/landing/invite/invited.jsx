import React from "react";

import Button from "../../../ui/Button";

export default ({ email }) => {
    return <div className="row m-0">
        <div className="col-md-4 d-md-block d-none">
            <img className="w-100" src={require('../../../../images/assets/illustrations/message-sent.png')} alt="invite mail sent"/>
        </div>
        <div className="col-md-8 p-0">
            <div className="row m-0">
                <div className="col-4 d-md-none d-flex p-0 align-items-center">
                    <img className="w-100" src={require('../../../../images/assets/illustrations/message-sent.png')} alt="invite mail sent"/>
                </div>
                <div className="col p-1 d-flex align-items-center">
                    <div>
                        <h2 className="line-height-1">You have been Invited!</h2>
                        <h6>Thank you so much for joining us early in this journey.</h6>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <p>
                    You have been selected for the exclusive beta program of Picklst.
                    We shall personally sent you a welcome email to you with your invite code.
                    <b> Please check your mailbox</b> ({email}) for the invite code.
                </p>
                <p>
                    We hope you would love Picklst, and are working hard to make it even better for you.
                    We especially wish to listen to you about your experience here, please do help us improve by
                    sharing your <a href="/feedback">valuable feedback here</a>.
                </p>
                <div className="small mb-2">Didn't get your invite code?</div>
                <Button text="Resend Invite Code" className="blue-button" />
            </div>
        </div>
    </div>
}