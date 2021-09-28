import React,{useState,useEffect,useParams} from 'react'
import axios from 'axios'

export default function Details() {
  var len=0;
    const[details,updatedetails]=useState([])

    const getdata=()=>{
axios.get(' http://localhost:3001/inputdata')
.then(res=>{
    axios.get(' http://localhost:3001/inputdata',{params:{id:res.data.length}})
    .then(result=>updatedetails(result.data))
})

    }

    useEffect(()=>{getdata()},[true])

    return (
        
        <div className='container mt-4'>
            <h3 className='text-dark text-center'>User Details</h3>
            {

             details.map((info,index)=>{
                 
                return(
                    <div key={index}>
                        <p><b>Fullname :</b> {info.fname} &nbsp; {info.lname}</p>
                        <p><b>Dob :</b> {info.dob}</p>
                        <p><b>Gender :</b> {info.gender}</p>
                        <p><b>Email :</b> {info.email}</p>
                        <p><b>Mobile :</b> {info.mobile}</p>
                        <p><b>State :</b> {info.state}</p>
                        <p><b>District :</b> {info.dist}</p>
                        <p><b>Address :</b> {info.address}</p>
                        <br /><br />
                    </div>
                )
            })}
            
        </div>
    )
}
