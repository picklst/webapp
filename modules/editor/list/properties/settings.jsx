import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import ListTemplatePicker from "./templates";
import ListAdvancedSettingsEditor from "./advanced";
import Button from "../../../../components/ui/Button";

const ListSettingsEditor = ({
      properties: p,
      isPreview = false, isNew = false,
      onSubmit, onSkip, onRequestEdit
}) => {
    const [showAdvancedOptions, setAdvancedOptions] = useState(false);
    const [properties, setProperties] = useState(p);

    const listProperties = () => {
        if(properties)
        {
            return <div className="mt-2">
                { properties.isPrivate ? <div className="badge badge-warning p-2 mr-1 mb-1">Private 🤫</div> : null }
                { properties.isRanked ? <div className="badge badge-warning p-2 mr-1 mb-1">Ranked 🔢</div> : <div className="badge badge-warning p-2 mr-1 mb-1">Unranked 📚</div> }
                { properties.isVotable ? <div className="badge badge-warning p-2 mr-1 mb-1">Votable 🙋‍♂️</div> : null }
                { properties.collaboration ? <div className="badge badge-warning p-2 mr-1 mb-1">Collaborative 👯</div> : '' }
            </div>
        }
    };

    const editorProps = {};
    if(properties)
        editorProps.properties = properties;

    return <div className="my-2">
    {
        !isPreview ?
            <React.Fragment>
                {
                    showAdvancedOptions || !isNew ?
                        <ListAdvancedSettingsEditor
                            onChange={setProperties}
                            showTemplateSuggestion={isNew}
                            onRequestTemplates={() => setAdvancedOptions(false)}
                            {...editorProps}
                        /> :
                        <ListTemplatePicker
                            onSelect={setProperties}
                            onRequestAdvanced={() => setAdvancedOptions(true)}
                        />
                }
                <div className="pl-3 mt-2 pb-4">
                    {
                        isNew && !properties ?
                            <Button
                                text="Skip"
                                onClick={() => onSkip()}
                                className="rounded-pill mr-2 px-4 py-2 grey-button"
                            /> :
                            <Button
                                text={isNew ? "Proceed" : "Save"}
                                onClick={() => onSubmit(properties)}
                                className="rounded-pill mt-2 px-4 py-2 blue-button"
                            />
                    }
                </div>
            </React.Fragment>
        : <div className="px-3 pt-2">
            <div className="text-primary position-relative font-weight-bold">
                Properties
                <Button
                    onClick={onRequestEdit}
                    text={
                        <span className="text-primary small">
                            <FontAwesomeIcon icon={faPen} /> Edit
                        </span>
                    }
                    className="small no-shadow py-1 px-0 position-absolute right-0 plain-button"
                />
            </div>
            <div>{listProperties()}</div>
        </div>
    }
    </div>

};

export default ListSettingsEditor;