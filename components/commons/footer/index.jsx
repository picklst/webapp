import React, {useState} from "react";
import dynamic from "next/dynamic";

import Switcher from "./switcher";

const ListEditor =  dynamic(() => import("../../list").then(mod => mod.ListEditor));

export default ({ currentTab }) => {

    const [tab, setTab] = useState(currentTab);
    const [showCreator, setShowCreator] = useState(false);

    const handleSwitchTab = (tab) => {
        if(tab === 'create') setShowCreator(true);
        else setTab(tab);
    };

    return  <React.Fragment>
        <Switcher tab={tab} setTab={handleSwitchTab} />
        { showCreator ? <ListEditor isNew onExit={() => setShowCreator(false)} /> : null }
    </React.Fragment>

};