import React, {useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"

import Button from "../../../ui/Button";
import { ReportModule } from "../../../misc/modules";
import OptionMenu from "../../../ui/OptionMenu";


export default ({ username, slug, userCanEdit }) => {

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
                    console.log('clicked');
                }
            });
            options.push({
                optionBody: <div className="text-danger font-weight-bold">Delete</div>,
                label: "Delete List",
            });
            options.push({
                optionBody: <div>Pin this </div>,
                label: "Pin this List",
            });
            options.push({
                optionBody: <div>Archive</div>,
                label: "Archive List",
            });
        } else {
            options.push({
                optionBody: <div className="text-danger font-weight-bold">Report Inappropriate</div>,
                label: "Report List",
                module: <ReportModule
                    slug={slug}
                    username={username}
                    onComplete={() => setMenu(false)}
                />
            });
        }

        options.push({
            optionBody: <div>Share</div>,
            label: "Share List",
        });

        options.push({
            optionBody: <div>Copy Link</div>,
            label: "Copy Link to List",
        });

        options.push({
            optionBody: <div>Embed Link</div>,
            label: "Embed List",
        });

        return options;

    };

    return <React.Fragment>
        <Button
            text={<FontAwesomeIcon icon={faEllipsisH} />}
            className="no-shadow p-0 plain-button"
            onClick={() => setMenu(true)}
        />
        { showMenu ? <OptionMenu title="List Actions" onClose={() => setMenu(false)} options={getMenuOptions()} /> : null }
    </React.Fragment>

};