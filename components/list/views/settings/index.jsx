import React, {useState} from 'react';

import ListTemplatePicker from "./templates";
import ListAdvancedSettingsEditor from "./advanced";

const ListSettingsEditor = ({
    properties, isNew = false, onChange
}) => {
    const [showAdvancedOptions, setAdvancedOptions] = useState(false);

    const editorProps = {};
    if(properties)
        editorProps.properties = properties;

    return  showAdvancedOptions || !isNew ?
    <ListAdvancedSettingsEditor
        onChange={onChange}
        showTemplateSuggestion={isNew}
        onRequestTemplates={() => setAdvancedOptions(false)}
        {...editorProps}
    /> :
    <ListTemplatePicker
        onSelect={onChange}
        onRequestAdvanced={() => setAdvancedOptions(true)}
    />

};

export default ListSettingsEditor;