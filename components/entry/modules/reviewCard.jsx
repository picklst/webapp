import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';

import {APIRequest} from "../../../utils";
import {ActionCard} from "../../ui";
import { Reviewer } from '../views';
import {clearAllBodyScrollLocks} from "body-scroll-lock";

export default ({ hasEntries, isAccepting, slug, isMobile }) => {

    const [entries, setEntries] = useState([]);
    const [totalCount, setTotalCount] = useState(false);
    const [lastCursor, setLastCursor] = useState(null);
    const [hasNext, setHasNext] = useState(true);

    const fetchEntries = async (variables) => {
        const query = `query get_list_entries($slug: String!, $count: Int = 10, $after: String){
          listEntries(list: { slug: $slug}, count: $count, after: $after)
          {
            hasNext
            lastCursor
            totalCount   
            entries
            {
              id
              timestamp
              item
              {
                id
                name
                comment
                url
                media
                {
                  url
                  type
                }
              }
              contributor
              {
                username
                firstName
                lastName
                isVerified
                avatarURL
              }
            }
          }
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleFetch = () => {
        if(hasNext)
        {
            if(hasEntries)
            {
                const variables = { slug, };
                if(lastCursor)
                    variables['after'] = lastCursor;
                fetchEntries(variables).then(({ success, data, errors}) => {
                    if(success) {
                        setHasNext(data.listEntries.hasNext);
                        setLastCursor(data.listEntries.lastCursor);
                        setTotalCount(data.listEntries.totalCount);
                        setEntries([...entries, ...data.listEntries.entries]);
                    }
                })
            }
        }
    };

    useEffect(() => handleFetch(), []);

    const reviewEntry = async (variables) => {
        const query = `
        mutation review_list_entry($isApproved: Boolean!, $entryID: String!, $position: Int){
          listEntryReview(isApproved: $isApproved, entryID: $entryID, position: $position)
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleReview = ({ isApproved, id: entryID, index }) => {
        reviewEntry({ entryID, isApproved }).then(({ success, data, error}) => {
            if(success)
            {
                toast.success(
                    `The entry has been ${isApproved ? 'approved' : 'rejected'}.`,
                    {
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
                const d = entries;
                d[index]['isApproved'] = isApproved;
                setEntries([...d]);
            } else {
                toast.error(
                    `An unknown error occurred. Please Try Again`,
                    {
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
            }
        })
    };

    const generateTitle = () =>
    <React.Fragment>
        Review Entries
        {
            totalCount && totalCount > 0 ?
                <div className="d-inline rounded badge-warning ml-1 py-0 px-2">{totalCount}</div> : null
        }
    </React.Fragment>;

    const generateDescription = () => {
        return totalCount > 0 ?
            `Review and approve ${totalCount} ${!totalCount || totalCount > 1 ? 'entries that were' : 'entry that was'} received for this list.`
            : `No entries to this list require review right now.`
    };

    const [isOpen, setOpen] = useState(false);
    useEffect(() => { !isOpen ? clearAllBodyScrollLocks() : null}, [isOpen]);

    return isAccepting ?
    <ActionCard
        isHorizontal={isMobile}
        labels={{
            title: generateTitle(),
            description: generateDescription(),
            buttonText: "Review Entries"
        }}
        showModule={isOpen}
        icon={<i className="gg-play-list-check" />}
        module={
            entries && entries.length > 0 &&
            <Reviewer
                onReview={handleReview}
                entries={entries}
                onClose={() => setOpen(false)}
            />
        }
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
    /> : null;

};