import React, { useRef, useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FormList() {
    const Navigate=useNavigate();
    const [dataList,setDataList]=useState([])

    const OnloadDucument=()=>{
        axios.get('/documents/api/input/documents').then((data)=>{
            setDataList([...data?.data?.result])
        }).catch((err)=>{
            console.log(err)
        })
    }
    const onDetailForm=(id)=>{
        Navigate(`/Form/${id}`);
    }
    const onEditform=(id)=>{
        Navigate(`/EditForm/${id}`)
    }
    useEffect(()=>{

        OnloadDucument();
    },[])
    return(
        <>
        {
            dataList && dataList.map((data,index)=>{
                return(
                    <div key={index} style={{display:'flex',flexDirection:'column'}}>
                        <div style={{display:'flex',flexDirection:'row'}}>
                        <small style={{cursor:'pointer'}} onClick={()=>{onDetailForm(data?.uid)}}>{data?.name_document}</small>
                        <small style={{marginLeft:20,cursor:'pointer'}} onClick={()=>{onEditform(data?.uid)}}>edit</small>

                        </div>
                        
                    {/* <small style={{cursor:"pointer"}} onClick={()=>{onDetailForm(data?.uid)}}>
                        {data?.name_document}
                         <br />
                        </small> */}
                    </div>
                )
            })
        }
        </>
    )

}
