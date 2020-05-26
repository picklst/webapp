import React from "react";
import {ProfileCard, ProfileFeed} from "../../profile";
import {Footer, Header, Topbar} from "../../commons";
import {Button} from "../../ui";
import {useAuthState} from "../../../states";

export default ({ username }) => {

    const [myUserData] = useAuthState('userInfo');

    const isOwnPage = myUserData && username === myUserData.username;

    return  <React.Fragment>
        <Header title={`@${username}`} />
        <div>
            <Topbar
                showTitle
                showIcon
                title={`@${username}`}
                button={
                    isOwnPage ?
                        <Button
                            className="plain-button p-2"
                            text={<i className="gg-menu" />}
                            link="/settings"
                        /> : null
                }
            />
            <div>
                <div className="row mx-0 p-lg-4 p-md-2 p-0">
                    <div className="col-md-2 px-2">
                    </div>
                    <div className="col-md-10 p-0">
                        <ProfileCard username={username} />
                        <div className="row m-0">
                            <div className="col-md-9 p-0 my-3">
                                <ProfileFeed username={username} />
                            </div>
                        </div>

                    </div>
                </div>
                <Footer currentTab={isOwnPage ? "profile" : null} />
            </div>
        </div>
    </React.Fragment>;
}