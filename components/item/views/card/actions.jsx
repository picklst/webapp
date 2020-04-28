import Button from "../../../ui/Button";
import React, {useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"

import OptionMenu from "../../../ui/OptionMenu";


export default ({ userCanEdit, onEdit }) => {

    const [showMenu, setMenu] = useState(false);

    const getMenuOptions = () => {
        const options = [];

        if(userCanEdit)
        {
            options.push({
                optionBody: <div className="text-primary font-weight-bold">Edit</div>,
                label: "Edit List",
                onClick: () => {
                    setMenu(false);
                    onEdit()
                }
            });
            options.push({
                optionBody: <div className="text-danger font-weight-bold">Delete</div>,
                label: "Delete List",
            });
        }

        options.push({
            optionBody: <div>Share</div>,
            label: "Share Item",
        });

        options.push({
            optionBody: <div>Copy Link</div>,
            label: "Copy Link to Item",
        });

        options.push({
            optionBody: <div>Embed Link</div>,
            label: "Embed Item",
        });

        return options;
    };

    return <React.Fragment>
        <Button
            text={<FontAwesomeIcon icon={faEllipsisV} />}
            className="no-shadow p-0 plain-button"
            onClick={() => setMenu(true)}
        />
        { showMenu ?
            <OptionMenu
                title="Item Actions"
                onClose={() => setMenu(false)}
                options={getMenuOptions()}
            /> : null
        }
    </React.Fragment>
};