import React from "react";
import styled from '@emotion/styled';

const PropertyBadge = styled.div`
  display: inline-block;
  background-color: #FDD835;
  padding: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
`;

export default ({ properties }) => {

    return properties ?
    <div className="small mt-2">
        { properties.isPrivate ? <PropertyBadge>Private 🤫</PropertyBadge> : null }
        <PropertyBadge>{ properties.isRanked ? "Ranked 🔢" : "Unranked 📚"}</PropertyBadge>
        { properties.isVotable ? <PropertyBadge>Votable 🙋‍♂️</PropertyBadge> : null }
        { properties.collaboration ? <PropertyBadge>Collaborative 👯</PropertyBadge> : '' }
    </div> : null

}