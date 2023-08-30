import React from 'react'
import "./FrontPage.css"
import Video from "../Assets/video.mp4"
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import { useState } from 'react';

const Frontpage = () => {
    const [value, setValue] = useState("")
    const [isValid , setIsvalid] = useState(false)
    
const checkvalue = () => {
    if(value.trim() == ""){
      alert("please fill the field");
   }else{
    setIsvalid(true)
    window.location.href("/weather/"+value)
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
     <input type="text" className="searchInput" value={value} onChange={(e) => setValue(e.target.value) }/>
    <Link to={`${isValid ? `/weather/${value}` : ""}`}  onClick={checkvalue}><span ><SearchIcon/></span></Link>
     </div> 
    </div>
   </div>
    </div>  
  )
}

export default Frontpage