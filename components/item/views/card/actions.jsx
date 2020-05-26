import Button from "../../../ui/Button";
import React, {useState} from "react";

import OptionMenu from "../../../ui/OptionMenu";
import {DeleteButton} from "../../modules";
import {ReportModule} from "../../../misc/modules";

export default ({ id, slug, index, totalItems, userCanEdit, onEdit, onDelete }) => {

    const [showMenu, setMenu] = useState(false);
    const [showDelete, setDelete] = useState(false);

    const getMenuOptions = () => {
        const options = [];

        if(userCanEdit)
        {
            options.push({
                optionBody: <div className="text-primary font-weight-bold">Edit</div>,
                label: "Edit Item",
                onClick: () => {
                    setMenu(false);
                    if(typeof onEdit === "function")
                        onEdit()
                }
            });
            if(totalItems > 1)
                options.push({
                    optionBody: <div className="text-danger font-weight-bold">Delete</div>,
                    label: "Delete Item",
                    onClick: () => {
                        setMenu(false);
                        setDelete(true);
                    }
                });
        } else {
            options.push({
                optionBody: <div className="text-danger font-weight-bold">Report Inappropriate</div>,
                label: "Report Item",
                module: <ReportModule
                    slug={slug}
                    onComplete={() => setMenu(false)}
                />
            });
        }



        return options;
    };

    return <React.Fragment>
        <Button
            text={<i className="gg-more-vertical-alt" />}
            className="no-shadow p-2 plain-button"
            onClick={() => setMenu(true) }
        />
        { showDelete &&
        <DeleteButton
            id={id}
            slug={slug}
            index={index}
            skipButton
            allowSave
            onCancel={() => setDelete(false)}
            onDelete={(i) => {
                setDelete(false);
                setMenu(false);
                if(typeof onDelete === "function")
                    onDelete(i);
            }}
        />
        }
        { showMenu ?
            <OptionMenu
                title="Item Actions"
                onClose={() => setMenu(false)}
                options={getMenuOptions()}
            /> : null
        }
    </React.Fragment>
};