import React, { useState, useEffect, useRef  } from 'react'
import ListOfImages from '../components/ListOfImages';
import SearchImages from '../components/SearchImages';
import { Switch, Route, useHistory} from "react-router-dom";
import {setValueInLocalStorage} from '../components/Helpers';
import QueryModal from '../components/QueryModal';
import styled from 'styled-components';


const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 32px;
    left: 0;
    `;

const StyledHeader = styled.header`
    height: 2rem;
    background-color: black;
    color: white;
    text-align: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 84px;
    font-size: larger;
    padding: 0.2rem;
    cursor: pointer;
`;

const StyledQuerySection = styled.section`
    width: 100%;
    display: grid;
    place-items: center;
    div {
        display: flex;
        flex-direction: row;
        gap: 0.2rem;
    }
    input {
        height: 36px;
        width: 336px;
        border-radius: 4px;
        outline: none;
        border-style: none;
        border: 1px solid black;
        font-size: larger;
    }

    button {
        cursor: pointer;
    }
`;


export default function Home() {
    const [tag, setTag] = useState('');
    const [querys, setQuerys] = useState([]);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    let history = useHistory();

    const saveTagAfterQuery=(query)=>{
        setTag(query);
    }
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setTimeout(() => {
                    setVisible(false);
                }, 500);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref])

    const handleSearch = () => {
        history.push("/"+tag);
        setValueInLocalStorage('queryList', tag);
    }

    const handleOnChange=(e)=> {
        setVisible(true);
        setTag(e.target.value);
    }

    useEffect(() => {
        let res = localStorage.getItem('queryList');
        console.log(JSON.parse(res));
        setQuerys(JSON.parse(res));
    }, [setQuerys])

    return (
        <>
            <StyledHeader onClick={() => history.push('/')}>Search Image</StyledHeader>
            <StyledDiv>
                <StyledQuerySection>
                    <div>
                        <input ref={ref} value={tag} type="search" onChange={handleOnChange} />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </StyledQuerySection>
                {visible && <QueryModal saveTagAfterQuery={saveTagAfterQuery} querys={querys}/>}
            </StyledDiv>
            <Switch>
                <Route exact path="/:tag">
                    <SearchImages />
                </Route>
                <Route path="/">
                    <ListOfImages />
                </Route>
            </Switch>
        </>
    )
}
