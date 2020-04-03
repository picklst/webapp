import React, {useState} from 'react';

import ListSettingsEditor from "./settings";
import ListNameEditor from "./name";

import '../../../../styles/list/list-creator.sass';


const ListPropertiesManager = ({
    name: nm,
    properties: prop,
    isPreview,
    onUpdate
}) => {
    const [isNamed, setNamed] = useState(isPreview);
    const [name, setName] = useState(nm ? nm : null);
    const [isPropertiesSet, setPropertiesEditor] = useState(isPreview);
    const [properties, setProperties] = useState(prop ? prop : null);

    const handleSubmit = (properties) => {
        setProperties(properties);
        setPropertiesEditor(true);
        if(typeof onUpdate === "function")
            onUpdate({
                name,
                properties
            });
    };

    const handleSkip = () => {
        if(typeof onUpdate === "function")
            onUpdate({
                name,
                properties: {
                    isRanked: false,
                    isPublic: true,
                }
            });
    };

    return <div>
            <ListNameEditor
                name={name}
                isPreview={isNamed}
                isNew={!name}
                onRequestEdit={() => setNamed(false)}
                onSubmit={(name) =>  { setName(name); setNamed(true)}}
                onSkip={() => { setName('Untitled List'); setNamed(true); }}
            />
            { isNamed ?
                <ListSettingsEditor
                    properties={properties}
                    isPreview={isPropertiesSet}
                    isNew={!properties}
                    onRequestEdit={() => setPropertiesEditor(false)}
                    onSubmit={handleSubmit}
                    onSkip={handleSkip}
                /> : null
            }
    </div>
};

export default ListPropertiesManager;