import React, {createRef, useEffect, useState} from 'react';

import '../../styles/topbar.sass';


import SearchBox from "./topbar/search";
import Logo from "./topbar/logo";
import AccountBox from "./topbar/account";
import AccountDropDown from "./topbar/account/dropdown";


const Topbar = () => {


    const [space, setSpacing] = useState('8vh');
    useEffect(() => {
        if(topbarRef && topbarRef.current)
            setSpacing(topbarRef.current.clientHeight);
    });


    const topbarRef = createRef();

    return <React.Fragment>
        <div
            ref={topbarRef}
            id="topbar"
            style={{ position: "fixed", top: 0, zIndex: 5000 }}
        >
            <div className="row m-0">
                <div className="col-12 col-sm-3 col-md-6 col-xl-3 d-flex align-items-center justify-content-center">
                    <Logo />
                    <div className="d-none d-md-block ml-3">
                        <SearchBox />
                    </div>
                </div>
                <div className="col-xl-4 d-none d-xl-flex align-items-center">

                </div>
                <div className="col d-none d-sm-flex justify-content-end align-items-center">
                    <div className="d-none d-md-block mr-2">
                        <AccountBox />
                    </div>
                    <div className="mx-2">
                        <AccountDropDown />
                    </div>
                </div>
            </div>
            </div>
        <div style={{ height: space }} />
    </React.Fragment>

};

export default Topbar;