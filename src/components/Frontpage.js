import React from 'react'
import "./FrontPage.css"
import Video from "../Assets/video.mp4"
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import { useState } from 'react';
const Frontpage = () => {
    const [Value, setValue] = useState("")
    const [isValid , setIsvalid] = useState(false)
    
const checkValue = () => {
    if(Value.trim() == ""){
alert("please fill the field");
   }else{
    setIsvalid(true)
    }
}
console.log(isValid)
  return (
    <div className="Container">
    <video width="320"  className="video"autoPlay  loop  muted>
     <source src={Video} type="video/mp4"/>
   </video>
   <div className="box">
   <video width="320"  autoPlay  loop  muted>
     <source src={Video} type="video/mp4"/>
     </video>
   
    <div className="searchBox">
    <h3>A weather App to Know the Weather from Anywhere</h3>
     <div>
     <input type="text" className="searchInput" value={Value} onChange={(e) => setValue(e.target.value) }/>
    <Link to={`${isValid ? `/weather/${Value}` : ""}`} ><span onClick={checkValue}><SearchIcon/></span></Link>
     </div> 
    </div>
   </div>
    </div>  
  )
}

export default Frontpage