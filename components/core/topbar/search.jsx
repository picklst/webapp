import React from "react";
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import TextInput from "../../forms/TextInput";
import Button from "../../ui/Button";

const Container = styled.div`
    display: flex;
    padding: 0.35rem 1rem;
    border-radius: 0.5rem;
    align-items: center;
    background-color: #ECEFF1;
    #topbar-search-box {
      background-color: transparent!important;
      border: none!important;
    }
`;

const SearchBox = ({ }) => {

    return <Container>
        <TextInput
            className="d-none d-md-flex mr-2"
            id="topbar-search-box"
            label="Search Picklst"
            name="search-bar"
            hideLabel
            minimal
        />
        <Button
            className="px-0"
            text={<FontAwesomeIcon icon={faSearch} />}
        />
    </Container>

};

export default SearchBox;