import React from "react";
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive';

import {BetaInviteSlide, LandingCover, LandingFooter} from "../index";
import {FeaturedLists} from "../../discovery";
import {SearchBar} from "../../search";
import {Header} from "../../commons";
import Base from "../../core/Base";

const LandingTopbar = styled.div`
  background: linear-gradient(-45deg,#0CC1B0,#0AA5C3);
  padding: 1rem 0.5rem;
  justify-content: center;
  box-shadow: 5px 8px 10px rgba(0,0,0,0.5);
  img {
    max-height: 64px;
  }
`;


export default ({ }) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return  <Base meta={{ title: "A Friendlier Way to Discover & Share Lists" }}>
        <Header />
        {isMobile &&
            <LandingTopbar as="div">
                <div className="row m-0">
                    <div className="col-4 d-flex align-items-center p-0">
                        <img className="w-100" alt="Picklst" src={require('../../../images/assets/branding/logo-light.png')} />
                    </div>
                    <div className="col p-2">
                        <SearchBar/>
                    </div>
                </div>
            </LandingTopbar>
        }
        <LandingCover/>
        <FeaturedLists />
        <BetaInviteSlide />
        <LandingFooter />
    </Base>;
}