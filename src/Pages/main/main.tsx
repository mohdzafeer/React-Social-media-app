import {getDocs,collection} from "firebase/firestore";
import {database} from "../../config/firebase"
import { useEffect, useState } from "react";
import { Posts } from "./post";

export interface posts{
    id:string,
    userId:string,
    username:string,
    title:string,
    description:string,
}

export const Main=()=>{

    const [postlist,setpostlist]=useState<posts[] | null>(null)
    const postref =collection(database,"posts");
    
    const getpost=async()=>{
        const data=await getDocs(postref)
        setpostlist(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as posts[]);
    }
    useEffect(()=>{
        getpost();
    },[])
    return <div className="allposts">
        {postlist?.map((post)=>
        <div className="post">
            <Posts post={post}/>
        </div>
        )}
    </div>
}