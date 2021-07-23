
const getURL=(page_No, size)=> {
    console.log('called recent api');
    return `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=cc0bea3b7a7722f9e24d385e9935d3c2&per_page=${size}&page=${page_No}&format=json&nojsoncallback=1`;

}


const getImages=(server_id, id, secret, size_suffix='w')=> {
    return `https://live.staticflickr.com/${server_id}/${id}_${secret}_${size_suffix}.jpg`;
}

const getSearchURL=(tag, page_No, size)=>{
    console.log('called search api');
    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cc0bea3b7a7722f9e24d385e9935d3c2&tags=${tag}&per_page=${size}&page=${page_No}&format=json&nojsoncallback=1`;
}


const setValueInLocalStorage= async (key, value)=>{
    let temp = await getValueFromLocalStorage(key);
    console.log(temp);
    if(temp.includes(value)){
        return;
    }
    if(temp.length >= 5){
        temp.pop();
    }
    temp.unshift(value);
    return localStorage.setItem(key, JSON.stringify(temp));

}

const getValueFromLocalStorage= async (key)=>{
    let res = localStorage.getItem(key);
    if(res === null || res === undefined){
        res = [];
    }
    if(res.length > 0){
        return JSON.parse(res);
    }
    return res;
}


export{getURL, getImages, getSearchURL, setValueInLocalStorage, getValueFromLocalStorage};