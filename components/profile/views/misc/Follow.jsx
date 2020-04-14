import React from 'react';
import Button from "../../../ui/Button";

const FollowButton = ({ isFollower, onClick }) => {

    return <Button
        className="btn no-shadow btn-info px-4 rounded"
        text={ isFollower ? "Following" : "Follow" }
        onClick={onClick}
    />;

};

export default FollowButton;