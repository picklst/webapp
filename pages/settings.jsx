import Base from "../components/core/Base";
import {UserSettingsPane} from "../components/auth/modules";
import React from "react";
import {Header} from "../components/commons";

export default ({ }) => {

    return <Base meta={{ title: "Settings" }}>
        <Header />
        <div>
            <div className="container mt-md-4 p-0">
                <UserSettingsPane />
            </div>
            <div className="my-4 text-center p-2">
                <div>Picklst is in Beta.</div>
                <span className="small">Only Limited Settings & Features Work Now.</span>
            </div>
        </div>
    </Base>

};