import React, {useState} from "react";
import Lottie from 'react-lottie';
import styled from '@emotion/styled'
import {Button, PopUp} from "../../../ui";
import { ShareCard } from "../../../commons";

const animationData = require('../../../../images/assets/lottie/confetti');

const PublishedContainer = styled(PopUp)`
  width: 100vw;
  height: 100vh;
  background: white;
  img {
      width: 50%;
      max-width: 500px;
  }
`;
export default ({ username, slug, title, description, onClose }) => {

    const [confetti, showConfetti] = useState(true);

    return <PublishedContainer
        showTopbar
        isOpen
        appElement=".app"
        onClose={onClose}
    >
        <div className="d-flex align-items-center justify-content-center text-center p-2">
            <div className="p-2 position-relative">
                <img alt="published" src={require('../../../../images/assets/illustrations/thumbs-up.png')} />
                <h4 className="my-4">List Published</h4>
                {   confetti ?
                    <div className="position-absolute top-0 left-0 w-100">
                        <Lottie
                            isClickToPauseDisabled
                            eventListeners={[{ eventName: 'complete', callback: () => showConfetti(false), },]}
                            options={{
                                loop: false,
                                autoplay: true,
                                animationData: animationData,
                                rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
                            }}
                        />
                    </div> : null
                }
                <Button
                    brandAccent
                    text="View List"
                    className="w-100"
                    link={`/${username}/${slug}`}
                />

                <div className="p-2 mt-4">
                    <h6>Share this list with your friends</h6>
                    <ShareCard
                        title={title}
                        description={description}
                        url={`https://picklst.com/${username}/${slug}`}
                    />
                </div>
            </div>
        </div>
    </PublishedContainer>;
}
