import React from "react";

import { ProfileCard, ProfileFeed } from "../../index";

export default ({ username }) => {

    return <div className="row mx-0 p-lg-4 p-md-2 p-0">
        <div className="col-md-2 px-2">
        </div>
        <div className="col-md-10 p-0">
            <ProfileCard
                username={username}
            />
            <div className="row m-0">
                <div className="col-md-9 p-0 my-3">
                    <ProfileFeed username={username} />
                </div>
            </div>

        </div>
    </div>;
}