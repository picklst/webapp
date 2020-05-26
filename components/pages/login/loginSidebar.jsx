import React from "react";
import shortid from "shortid";
import styled from '@emotion/styled';
import {motion} from "framer-motion";

const whyPickList = require('../data/why_picklst');

const LoginSidebarContainer = styled.div`
   display: flex;
   align-items: center;
   padding: 1rem;
   height: 100%;
   background: #FFFDE7;
   color: black;
   .footer-links
   {
      color: #444;
      a {
        padding-right: 0.5rem;
        color: inherit;
        &:hover {
         text-decoration: none;
        }
      }
   }
`;

export default ({ }) => {
    return <LoginSidebarContainer>
        <motion.div
            initial={{ translateX: "5vh", opacity: 0.5 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness:100,
                damping: 20
            }}
        >
            <div className="p-lg-2">
                <h3>A Friendlier way to <div className="d-inline-block font-weight-bold">Discover & Share Lists.</div></h3>
                <div>The only social network that <div className="d-inline-block font-weight-bold">is to the point.</div></div>
            </div>
            <div className="mt-2">
                { whyPickList.map(i =>
                    <div key={shortid.generate()} className="d-flex m-0 mx-0 my-4">
                        <div className="d-flex justify-content-center align-items-center" style={{ minWidth: '75px' }}>
                            {   i.icon ?
                                <img
                                    style={{ height: '75px' }}
                                    src={require('../../../images/assets/illustrations/'+i.icon)}
                                    alt="icon"
                                /> : null
                            }
                        </div>
                        <div className="pl-2 d-flex align-items-center">{i.title}</div>
                    </div>
                )}
            </div>
            <div className="footer-links small">
                <a href="/about">About</a>
                <a href="/policies/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/feedback">Feedback</a>
            </div>
        </motion.div>
    </LoginSidebarContainer>;
}