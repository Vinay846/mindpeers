import {useState, useEffect} from 'react'
import { getURL, getSearchURL } from '../Helpers';
import usePrevious from '../Hooks/usePrevious';

function useRecentImages(tag='', pageNumber, size='20') {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const prevValue = tag;
    const prev = usePrevious(prevValue);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(isSearched(tag, pageNumber, size))
        .then(res => res.json())
        .then(res => {
            console.log(res.photos.photo);
            if(tag === prev){
                setPhotos(prevPhotos => {
                    return [...prevPhotos, ...res.photos.photo]
                });
            }else{
                setPhotos(res.photos.photo);
            }
            setHasMore(res.photos.photo.length > 0)
            setLoading(false);
        })
        return ()=> {
            // abort fetch here !!!
        }
    }, [pageNumber, size, tag, prev])

    return {loading, error, photos, hasMore}
}

export default useRecentImages


function isSearched(tag, page_No, size){
    if(tag !== ''){
        return getSearchURL(tag, page_No, size);
    }
    return getURL(page_No, size);
}