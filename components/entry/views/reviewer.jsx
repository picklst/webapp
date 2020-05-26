import React from "react";
import styled from '@emotion/styled'
import formatDistance from "date-fns/formatDistance";

import {BottomPopup, Button, Card} from "../../ui";
import {UserBadge} from "../../profile";
import {ItemCard} from "../../item";

const ReviewEntriesPopup = styled(BottomPopup)`
  background-color: white;
`;

export default ({
    entries,
    onReview, onClose
}) => {

    const renderApprovedBadge =
        <div className="d-flex align-items-center text-success">
            <i className="gg-check-o"/> <div className="pl-2">You approved this entry</div>
        </div>;

    const renderRejectedBadge =
        <div className="d-flex align-items-center text-danger">
            <i className="gg-close-o"/> <div className="pl-2">You rejected this entry</div>
        </div>;

    const renderActions = (id, index) =>
        <React.Fragment>
            <Button
                text="Approve"
                onClick={() => onReview({isApproved: true, id, index})}
                brandAccent
            />
            <Button
                text="Reject"
                onClick={() => onReview({isApproved: false, id, index})}
                className="bg-danger text-light"
            />
        </React.Fragment>;

    return <ReviewEntriesPopup
        isOpen
        appElement=".app"
        onClose={onClose}
        title="Review Entries"
    >
        <div className="p-2">
            {
                entries && entries.length > 0 ?
                    entries.map((i, index) =>
                        <Card key={i.id} p={3} className="my-2 bg-white">
                            <div className="d-flex align-items-center">
                                <UserBadge {...i.contributor} />
                                <div className="ml-1 d-inline small">
                                    {formatDistance(new Date(i.timestamp), new Date(), { addSuffix: true })}
                                </div>
                            </div>
                            <div className="p-1 my-3">
                                <ItemCard hideOptionMenu {...i.item} />
                            </div>
                            {
                                i.isApproved ? renderApprovedBadge :
                                    i.isApproved === false ?  renderRejectedBadge : renderActions(i.id, index)
                            }
                        </Card>
                    ) : null
            }
        </div>
    </ReviewEntriesPopup>;
}