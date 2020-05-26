import React, {useState} from "react";
import styled from "@emotion/styled";
import Button from "../../ui/Button";
import {APIRequest} from "../../../utils";

const ActionButton = styled(Button)`
    padding: 0.25rem 0.5rem;
    height: 100%;
    background-color: ${({ isActive }) => isActive ? '#BBDEFB!important' : 'white!important' };
    color: ${({ isActive }) => isActive ? '#304FFE!important' : null };
    box-shadow: 0.5px 1px 5px rgba(0,0,0,0.3);
    &:hover, &:focus {
      background-color: #007bff!important;
      color: white;
    }
`;

export default ({ id, value }) => {

    const [currValue, setValue] = useState(value);

    const voteItem = async (variables) => {
        const query = `
        mutation vote_item($id: String!, $isNegative: Boolean){
          itemVote(id: $id, isNegative: $isNegative)
        }`;
        return await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return { success: true, data }
        }).catch((errors) => { return { success: false, errors } });
    };

    const unvoteItem = async (variables) => {
        const query = `
        mutation unvote_item($id: String!){
          itemUnvote(id: $id)
        }`;
        return  await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return { success: true, data }
        }).catch((errors) => { return { success: false, errors } });
    };

    const handleVoting = (val) => {
        if(currValue === 0 || val !== currValue)
        {
            voteItem({ isNegative: val === -1 , id }).then(({ success, data, errors}) => {
                if(success) { setValue(val); }
            });
        } else {
            unvoteItem({ id }).then(({ success, data, errors}) => {
                if(success) { setValue(0); }
            });
        }
    };

    return <div className="d-flex align-items-center">
        <ActionButton
            isActive={currValue === 1}
            text={<i className="gg-chevron-up" />}
            onClick={() => handleVoting(1)}
        />
        <ActionButton
            isActive={currValue === -1}
            text={<i className="gg-chevron-down" />}
            onClick={() => handleVoting(-1)}
        />
    </div>

}