import React from "react";
import {BottomPopup, Button} from "../../ui";

export default ({ isEnabled, onSwitch, onClose }) => {

    const renderEnableModule =
        <div className="p-2">
            <h3>Public Entries</h3>
            <h6>How it Works?</h6>
            <ul className="small pl-2">
                <li>Any user can submit a item towards this list.</li>
                <li>
                    All entries would need approval from either the curator or
                    any of the collaborators of this list before it is shown in this list.
                </li>
                <li>
                    Once accepted, the contributor cannot remove or edit the entry.
                    Only the curator and collaborators of this list can make changes and remove the item from the list.
                </li>
            </ul>
            <Button
                text="Accept Public Entries"
                brandAccent
                onClick={() => onSwitch(true)}
            />
        </div>;

    const renderDisableModule =
        <div className="p-2">
            <h6>What happens if I disable?</h6>
            <ul className="small pl-2">
                <li>Users will not be now able to submit entries to this list.</li>
                <li>The curators and collaborators of this list will still be able to view and accept entries that are already received.</li>
                <li>You will be able to turn this feature back on any time.</li>
            </ul>
            <Button
                text="Disable Public Entries"
                className="bg-danger text-light"
                onClick={() => onSwitch(false)}
            />
        </div>;

    return <BottomPopup
        isOpen
        appElement=".app"
        onClose={onClose}
        title={`${isEnabled ? 'Disable' : 'Accept'} Public Entries`}
        className="bg-white"
    >
        <div className="row m-0 px-2 mb-2">
            <div className="col-md-4 d-flex justify-content-center align-items-center p-2">
                <img
                    alt="public entries"
                    style={{ maxHeight: "100px" }}
                    src={
                        isEnabled ? require('../../../images/assets/illustrations/come-back-later.png') :
                        require('../../../images/assets/illustrations/invite-bird.png')
                    }
                />
            </div>
            <div className="col p-2">
                {isEnabled ?  renderDisableModule : renderEnableModule}
            </div>
        </div>
    </BottomPopup>;
}