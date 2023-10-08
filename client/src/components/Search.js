import React,{useState, useEffect} from 'react';
import axios from 'axios';  

import Images from './ImageGallery';


const checkIndexed = async()=>{
    console.log("Checking")
    var indexed = false;
    const user = localStorage.getItem("email")
    axios.get("http://localhost:3001/user", {
    params: { email: user }, // Assuming user.email is the email you want to send as a query parameter
    }).then((res)=>{
        console.log(res)
        indexed = res.data.indexed
        return indexed
        }).catch((err)=>{console.log(err)});
    
}


const SearchBar =({setFiles})=>{
    const [query, setQuery] = useState("")
    const [_ids, setIds] = useState(null)
    
    const [indexed, setIndexed] = useState(false)
    

    useEffect(()=>{
        const fetchData = async ()=>{
            const isIndexed = await checkIndexed()
            setIndexed(isIndexed)
        }

        fetchData()
    },[])
    
    

    const handleSearch = async (e)=>{
        if (setQuery.length > 0){

            if ( indexed === false ){
                console.log("not indexed")
            }
            else{
                console.log(query)
                var res = await axios.get(
                    `http://127.0.0.1:8000/api/${query}`
                )
                
                console.log(res.data)
                setFiles(res.data)
                setIds(res.data)
                // var images = Images(_ids)
                // console.log(images)
            }
            
        }

    }


    return(
        <>
        <input type="search"
        placeholder="Search here"
        onChange={(e)=> setQuery(e.target.value)}
        value={query}>
        </input>
        <button onClick={handleSearch}>Search</button>

        {/* if indexed =  false , print no imges to search */}

        { indexed === false ? (
            <>
            <p>No images to search, please index </p>
            </>
        ):(
            <>
            </>
        )}


        { _ids === null ? (
            <>
            <p> nu</p>
            </>
        ) : (
            <>
            <Images email={localStorage.getItem("email")} _ids={_ids} />
            </>
        )}
        </>
    )
}


export default SearchBar