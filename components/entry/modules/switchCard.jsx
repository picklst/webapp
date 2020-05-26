import React, {useEffect, useState} from "react";
import {clearAllBodyScrollLocks} from "body-scroll-lock";

import {ActionCard} from "../../ui";
import {FeatureSwitch} from "../views";
import {APIRequest} from "../../../utils";

export default ({ isEnabled: isEnabledProp, slug, }) => {

    const [isEnabled, setEnabled] = useState(isEnabledProp);

    const updateList = async (variables) => {
        const query = `
        mutation update_list($slug: String!, $input: ListInput!){
          listUpdate(list: { slug: $slug }, input: $input)
          {
            returning {
              id
            }
          }
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleSwitching = (acceptEntries) => {
        const variables = {
            slug,
            input: {
                properties: {
                    acceptEntries
                }
            }
        };
        updateList(variables).then(({ success, data, errors}) => {
            if(success) {
                setEnabled(acceptEntries);
                setOpen(false);
            }
        })
    };

    const [isOpen, setOpen] = useState(false);
    useEffect(() => { !isOpen ? clearAllBodyScrollLocks() : null}, [isOpen]);

    return isEnabled ? <ActionCard
        labels={{
            title: "Disable Public Entries",
            description: "This list is currently accepting public entries. You can turn off this feature to stop accepting any new entries.",
            buttonText: "Disable"
        }}
        showModule={isOpen}
        icon={<i className="gg-play-pause"/>}
        module={
            <FeatureSwitch
                onClose={() => setOpen(false)}
                onSwitch={handleSwitching}
                isEnabled={isEnabled}
            />
        }
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
    /> :
    <ActionCard
        cover={require('../../../images/illustrations/covers/brainstorm.png')}
        labels={{
            title: "Accept Public Entries",
            description: "You can accept public entries to this list by turning this feature on.",
            buttonText: "Get Started"
        }}
        showModule={isOpen}
        icon={<i className="gg-play-list-add"/>}
        module={
            <FeatureSwitch
                onClose={() => setOpen(false)}
                onSwitch={handleSwitching}
                isEnabled={isEnabled}
            />
        }
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
    />
}