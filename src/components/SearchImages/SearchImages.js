import React, { useState, useRef, useCallback, useEffect } from 'react'
import useRecentImages from '../Hooks/useRecentImages';
import { getImages } from '../Helpers';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import ImageModal from '../ImageModal';
import Spinner from '../Spinner';

const StyledUL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: fit-content;
    gap: 1rem;
    margin: 0 4rem;
    margin-top: 7rem;
    list-style: none;
    padding: 0;
`;

const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
`;


function SearchImages() {
    const [pageNumber, setPageNumber] = useState(1);
    let { tag } = useParams();
    const {photos, hasMore, loading, error} = useRecentImages(tag, pageNumber, 20);
    const observer = useRef();
    const [showImageModal, setShowImageModal] = useState(false);
    const [setImageData, setSetImageData] = useState({});
    
    const lastPhotoElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        
    }, [tag])

    const showModal=(URL, alt)=>{
        console.log("click handler");
        setShowImageModal(true);
        setSetImageData({
            URL,
            alt
        })
    }

    const closeModal=()=> {
        setShowImageModal(false);
    }



    return (
        <>
        <StyledUL>
            {showImageModal && <ImageModal URL={setImageData.URL} alt={setImageData.alt} closeModal={closeModal}/>}
            {photos.map((photo, index) => {
                if (photos.length === index + 1) {
                    return <li key={uuidv4()} ref={lastPhotoElementRef}>
                        <img onClick={() => showModal(getImages(photo.server, photo.id, photo.secret), photo.title)} src={getImages(photo.server, photo.id, photo.secret)} alt={photo.title} />
                    </li>
                } else {
                    return <li key={uuidv4()}>
                        <img onClick={() => showModal(getImages(photo.server, photo.id, photo.secret), photo.title)} src={getImages(photo.server, photo.id, photo.secret)} alt={photo.title} />
                    </li>
                }

            })}
        </StyledUL>
          <StyledLoader>
            {loading && <Spinner />}
            <div>{error && 'Error'}</div>
        </StyledLoader>
      </>
    )
}

export default SearchImages
