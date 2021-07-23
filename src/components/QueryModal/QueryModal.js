import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledUL = styled.ul`
    position: relative;
    list-style: none;
    margin-top: 0;
    width: 22%;
    margin-right: 4.5%;
    background-color: #fffafaf5;
    border-radius: 8px;
`;

const StyledLI = styled.li`
    margin-left: -33px;
    height: 28px;
    font-size: larger;
    cursor: pointer;
    &:hover {
        background-color: #d8d8d8f5;
    }
    
    button {
        position: relative;
        float: right;
        width: fit-content;
        height: 27px;
        outline: none;
        border-style: none;
        border: 1px solid red;
        color: red;
        cursor: pointer;
        border-radius: 8px;
        &:hover {
            background-color: red;
            color: white;
        }
    }
`;

function QueryModal({querys, saveTagAfterQuery}) {
    const history = useHistory();

    function handleClick(query){
        //redirect to query
        console.log('clicked on query');
        saveTagAfterQuery(query);
        history.push("/"+query);
    }

    const handleClearAllQuery=()=> {
        // clear query localStorage All querys
        localStorage.removeItem("queryList");

    }
    
    return (
        <StyledUL>
            {querys !== null && querys.length > 0 && querys.map((query, index) => (
                index <= 5 && <StyledLI onClick={() => handleClick(query)} key={uuidv4()}>{query}</StyledLI>
            ))}
            {querys !== null && <StyledLI key={uuidv4()}><button onClick={handleClearAllQuery}>clear</button></StyledLI>}
        </StyledUL>
    )
}

export default QueryModal
