import React from "react";
import {NotificationsModule} from "../../notifications/modules";
import {Footer, Header, Topbar} from "../../commons";
import Base from "../../core/Base";

export default ({ }) => {

    return <Base meta={{ title: "Notifications" }}>
        <Topbar showBackButton showTitle title="Notifications" />
        <Header title="Notifications" />
        <div className="container px-0 mt-1 my-md-4">
            <div className="row m-0">
                <div className="col-md-4">

                </div>
                <div className="col-md-8 px-0">
                    <NotificationsModule />
                </div>
            </div>
        </div>
        <Footer currentTab="notifications" />
    </Base>;
}