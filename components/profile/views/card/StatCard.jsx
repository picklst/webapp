import React from 'react';

export default  ({ followersCount, listsCount, followingCount }) => {
    const renderStatCard = ({ value, label }) =>
        <div className="mx-3 mx-md-2 text-center">
            <div className="h4 mb-0">{value}</div>
            <b>{label}</b>
        </div>;

    return <React.Fragment>
        { renderStatCard({ value: listsCount, label: 'Lists' })}
        { renderStatCard({ value: followersCount, label: 'Followers' })}
        { renderStatCard({ value: followingCount, label: 'Following' })}
    </React.Fragment>
};