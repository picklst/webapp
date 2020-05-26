import React from "react";

import { UserFeedModule } from "../../feed";
import {Footer, Header, Topbar} from "../../commons";
import Base from "../../core/Base";

import { OnBoardingPopup } from '../../auth'

export default ({ }) =>
{

    return  <Base meta={{ title: "User Dashboard" }}>
        <Header />
        <Topbar showLogo />
        { <div>
            <div className="container p-0">
                <div className="row mx-0 mb-4">
                    <div className="d-none d-md-block col-md-3 px-0 mb-2 p-md-0 order-md-1 order-2">
                        <hr />
                    </div>
                    <div className="col-md-9 p-md-2 p-0 order-md-2 order-1">
                        <div className="row m-0">
                            <div className="col-lg-8 px-1">
                                <OnBoardingPopup />
                                <UserFeedModule/>
                            </div>
                            <div className="d-none d-lg-block col-lg-4 px-1">
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
        <Footer currentTab="feed" />
    </Base>
}