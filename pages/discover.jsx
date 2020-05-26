import Base from "../components/core/Base";
import React from "react";

import { Discover } from "../components/pages";
import {Header, Footer, Topbar} from "../components/commons";
import {SearchBar} from "../components/search";

export default ({ }) => {

    const renderTopbar =
    <div className="p-2">
        <SearchBar />
    </div>;

    return <Base meta={{ title: "Discover Lists" }}>
        <Header />
        <Topbar>{renderTopbar}</Topbar>
        <Discover />
        <Footer currentTab="discover" />
    </Base>;
};