import React from 'react'
import styled from 'styled-components';
import { XSquare } from 'react-feather';

const StyledDiv = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(47, 47, 47, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        
    }
    span {
        position: absolute;
        top: 4rem;
        right: 6rem;
        cursor: pointer;
        color: white;
    }
`;
function ImageModal({URL, alt, closeModal}) {
    return (
        <StyledDiv>
            <span onClick={closeModal}><XSquare /></span>
            <img src={URL} alt={alt} />
        </StyledDiv>
    )
}

export default ImageModal
