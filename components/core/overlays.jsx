import React from "react";
import {BottomPopup} from "../ui";
import {FeedbackModule} from "../misc/modules";
import {useOverlayState} from "../../states";

export default ({ }) => {

    const [feedbackWindow, showFeedbackWindow] = useOverlayState('showFeedbackForm');

    return <React.Fragment>
        {   feedbackWindow ?
            <BottomPopup
                isOpen
                appElement=".app"
                onClose={() => showFeedbackWindow(false)}
                title="Give Feedback to Picklst"
                children={
                    <FeedbackModule />
                }
            /> : null
        }
    </React.Fragment>

}