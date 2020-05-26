import React from "react";
import shortid from "shortid";
import styled from '@emotion/styled'
import TextInput from "../../../forms/TextInput";
import {Button} from "../../../ui";


const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    transition: 0.5s all;
    border-radius: ${props => props.focused ? '2rem' : '0.5rem' };
    box-shadow: ${props => props.focused ? '2px 5px 15px rgba(0,0,0,0.3)' : null};
    background-color: ${props => props.focused ? 'white' : '#ECEFF1' };
    width: 100%;
`;

const SearchBox = styled(TextInput)`
  width: 100%;
  input {
    background-color: transparent!important;
    border: none!important;
    padding-right: 0;
    width: 100%;
  }
`;

const SearchButton = styled(Button)`
  position: absolute;
  display: block;
  right: 0;
  padding: 0.5rem;
  transition: 0.5s all;
  background-color: ${props => props.focused ? 'white!important' : '#ECEFF1!important' };
`;

export default ({
    value, isFocused, autofocus,
    onFocus, onBlur, onChange
}) =>
<Container focused={isFocused}>
    <SearchBox
        id={shortid.generate()}
        label="Search Picklst"
        name="search-box"
        hideLabel
        minimal
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        autoFocus={autofocus}
        autoComplete="off"
    />
    <SearchButton
        focused={isFocused}
        text={<i className="gg-search" />}
        link={`/search?q=${value}`}
    />
</Container>;