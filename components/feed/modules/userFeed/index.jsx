import React, {useEffect, useState} from "react";

import {fetchUserFeedAPI} from "../../api";
import {APIRequest} from "../../../../utils";

import { UserFeed } from '../../views';
import {Waypoint} from "react-waypoint";
import {Button} from "../../../ui";

export default ({ }) => {
    const [isLoading, setLoading] = useState(false);
    const [stories, setStories] = useState([]);
    const [nextMarkers, setNetMarkers] = useState({
        "createList": true,
        "contributeItem": true
    });
    const [cursors, setCursors] = useState({
        "createListAfterCursor": null,
        "contributeItemAfterCursor": null,
    });


    const fetchFeed = () => {
        if (canLoadMore()){
            setLoading(true);
            const fields = [];
            if(nextMarkers["createList"])
                fields.push('user_createList');
            if(nextMarkers["contributeItem"])
                fields.push('user_contributeItem');
            const query = fetchUserFeedAPI({fields});
            const variables = {
                count: 1,
                createListAfterCursor: cursors['createListAfterCursor'],
                contributeItemAfterCursor: cursors['contributeItemAfterCursor']
            };
            APIRequest({ query, variables, requireAuth: true }).then((data) => {
                if(data && data.feed)
                    generateFeedStories(data.feed);
            }).catch((errors) => {

            });
        }
    };

    const generateFeedStories = ({ userActivities, }) => {
        const feedStories = [];
        const cursors = {};
        const nextMarkers = {};
        if(userActivities.createList){
            if(userActivities.createList.hasNext)
                nextMarkers['createList'] = userActivities.createList.hasNext;
            if(userActivities.createList.lastCursor)
                cursors['createListAfterCursor'] = userActivities.createList.lastCursor;
            userActivities.createList.stories.forEach((i, index) => {
                feedStories.push({
                    type: "user_create_list",
                    list: i['list'],
                    user: i['user'],
                    timestamp: i['timestamp']
                })
            })
        }
        if(userActivities.contributeItem){
            if(userActivities.contributeItem.hasNext)
                nextMarkers['contributeItem'] = userActivities.contributeItem.hasNext;
            if(userActivities.contributeItem.lastCursor)
                cursors['contributeItemAfterCursor'] = userActivities.contributeItem.lastCursor;
            userActivities.contributeItem.stories.forEach((i, index) => {
                feedStories.push({
                    type: "user_contribute_item",
                    item: i['item'],
                    list: i['list'],
                    user: i['user'],
                    timestamp: i['timestamp']
                })
            })
        }
        feedStories.sort(function(a, b) {
            const x = a['timestamp'];
            const y = b['timestamp'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * -1;
        });
        setNetMarkers(nextMarkers);
        setCursors(cursors);
        setStories([...stories, ...feedStories]);
        setLoading(false);
    };

    useEffect(fetchFeed, []);

    const canLoadMore = () => Object.keys(nextMarkers).some(k => nextMarkers[k]);

    return <React.Fragment>
    <UserFeed stories={stories} />
    { isLoading &&
        <div className="d-flex align-items-center mt-5 justify-content-center">
            <h5>Loading more posts</h5>
        </div>
    }
    {   canLoadMore() && <div style={{ height: '40vmax' }}  />}
    {   canLoadMore() &&
        <Waypoint onEnter={fetchFeed} onLeave={fetchFeed} threshold={1.5}><div style={{ height: '10vh' }}  /></Waypoint>
    }
    {   !canLoadMore()  ?
        <div className="my-2 d-flex align-items-center justify-content-center p-2">
            <div className="text-center my-4 p-2">
                <img
                    src={require('../../../../images/assets/illustrations/cheers.png')}
                    className="w-100 p-3"
                    alt="all caught up"
                    style={{ maxWidth: "150px" }}
                />
                <h5>You're All Caught Up</h5>
                <p className="small">
                    You have seen all updates on your feed. Expand your feed by following users and topics.
                </p>
            </div>
        </div> :
        <div className="d-flex align-items-center justify-content-center p-4">
            <Button
                text="Load More"
                onClick={fetchFeed}
            />
        </div>
    }
    </React.Fragment>

}