import React, {useState} from 'react';

import { Button } from "../../../ui/";
import { ReportModule } from "../../../misc/modules";
import OptionMenu from "../../../ui/OptionMenu";
import {ShareCard} from "../../../commons";

import { ListDeleteButton } from "../../index";

export default ({ name, username, slug, userCanEdit, onEdit, onDelete }) => {

    const [showMenu, setMenu] = useState(false);
    const [showDelete, setDelete] = useState(false);

    const getMenuOptions = () => {
        const options = [];

        if(userCanEdit)
        {
            options.push({
                optionBody: <div className="text-primary font-weight-bold">Edit</div>,
                label: "Edit List",
                onClick: () => {
                    setMenu(false);
                    if(typeof onEdit === "function")
                        onEdit();
                }
            });
            options.push({
                optionBody: <div className="text-danger font-weight-bold">Delete</div>,
                label: "Delete List",
                onClick: () => {
                    setMenu(false);
                    setDelete(true);
                }
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
            optionBody: <div>Share </div>,
            label: "Share List",
            module: <ShareCard title={name} url={`https://picklst.com/${username}/${slug}`} />
        });

        return options;

    };

    return <React.Fragment>
        <Button
            text={<i className="gg-more-alt" />}
            className="no-shadow p-2 plain-button"
            onClick={() => setMenu(true)}
        />
        { showDelete &&
            <ListDeleteButton
                slug={slug}
                skipButton
                onCancel={() => setDelete(false)}
                onDelete={() => {
                    setDelete(false);
                    setMenu(false);
                    if(typeof onDelete === "function")
                        onDelete();
                }}
            />
        }
        {showMenu && <OptionMenu title="List Actions" onClose={() => setMenu(false)} options={getMenuOptions()} />}
    </React.Fragment>

};