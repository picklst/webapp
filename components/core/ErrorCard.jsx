import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  min-height: 25vh;
  display: flex;
  align-items: center;
  opacity: 0.8;
  border-radius: 1rem;
  border: 5px dashed rgba(0,0,0,0.1);
  h3 { text-align: center }
`;

const ErrorCard = ({ message, code }) =>
<Container>
    <div className="w-100">
        <h3>Loading Failed.</h3>
        <div className="p-2">
            <li><b>Reason</b>: {message}</li>
            <li><b>Code</b>: {code}</li>
        </div>
    </div>
</Container>;

export default ErrorCard;
