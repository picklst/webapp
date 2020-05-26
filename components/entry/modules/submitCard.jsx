import React, {useEffect, useState} from "react";

import {APIRequest} from "../../../utils";

import { ActionCard } from "../../ui";
import {SubmitForm} from '../views';
import {clearAllBodyScrollLocks} from "body-scroll-lock";

export default ({ slug }) => {

    const [isSubmitting, setSubmitting] = useState(false);
    const [hasSubmitted, setSubmitted] = useState(false);

    const contributeItem = async (variables) => {
        const query = `
          mutation contribute_item($slug: String!, $object: ItemInput!){
              listEntrySubmit(list: { slug : $slug}, object: $object)
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleCreate = (data) => {
        setSubmitting(true);
        const variables = {
            slug,
            object: data
        };
        contributeItem(variables).then(({ success, data, errors}) => {
            setSubmitting(false);
            if(success) {
                setSubmitted(true);
            }
        })
    };

    const [isOpen, setOpen] = useState(false);
    useEffect(() => { !isOpen ? clearAllBodyScrollLocks() : null}, [isOpen]);

    return <ActionCard
        cover={require('../../../images/illustrations/covers/workshop.png')}
        labels={{
            title: "Add to this List",
            description: "You can contribute to this list by submitting your entry.",
            buttonText: "Submit Entry"
        }}
        showModule={isOpen}
        icon={<i className="gg-play-list-add"/>}
        module={
            <SubmitForm
                onSubmit={handleCreate}
                isSubmitting={isSubmitting}
                hasSubmitted={hasSubmitted}
                onClose={() => setOpen(false)}
            />
        }
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
    />
}