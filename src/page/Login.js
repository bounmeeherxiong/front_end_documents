import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { isMobile } from "react-device-detect";
import { Spinner } from "react-bootstrap";
export default function Login() {
    const [name,setName]=useState('')
    const [lastname,setLastname]=useState('')
    const [username_rg,setUsername_rg] = useState('')
    const [password_rg,setPassword_rg]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [cookies,setCookies]=useCookies(['user'])
    const [show,setShow]=useState(false)
    const [datalist,setDatalist]=useState([])
    const [role_id,setRole_id]=useState('')
    const [isLoading, setIsLoading,] = useState(false);
    const OnLogin=()=>{
        setIsLoading(true);
        let datainform={
            username: username,
            password_hash: password
        }
        axios.post('/api/loging-in/login',datainform).then((data)=>{
        
            setCookies('user',data?.data)
            setIsLoading(false);
            window.location.href = '/';
        }).catch((err)=>{
            console.log(err)
        })
    }
    const OnloadRole_id=()=>{
        // axios.get('/accounting/api/role/allRole').then((data)=>{
        //     setDatalist([...data?.data?.result])
           
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    // const OnSumit=()=>{
    //     let datainform={
    //         name:name,
    //         surname:lastname,
    //         user_name:username_rg,
    //         password:password_rg,
    //         user_role:role_id,
    //         user_status:1
    //     }
    //     axios.post('/accounting/api/user/add',datainform).then((data)=>{
    //         console.log("datauses=",data)
    //         setShow(false)
    //         console.log(data)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    
    // }
    const Signin=()=>{
        setShow(false)
    }


    return (
        <div style={{
            
            flex: 1, display: 'flex', 
            paddingTop: 0,
            backgroundColor: '#f0f2f5', 
            height: 800,
            flexDirection: 'column', 
            alignItems: 'center',
            paddingTop: 100
        }}>
            {
                show== false ?(                  
                <>
            <div style={{
                padding: 20, 
                backgroundColor: '#fff',
                width: 500, 
                paddingBottom: 80,
                boxShadow: '0px 2px 5px 5px #E4E6E9',
                borderRadius: 10,
                paddingLeft: 90, 
                paddingRight: 90
            }}>
                <span style={{ fontWeight: 'bold', fontSize: 30,marginLeft:130 }}>Sign in</span>
                <div style={{ height: 20 }} />
                <span style={{ fontWeight: 'bold' }} >UserName</span>
                <input
                    style={{
                        width: '100%',
                        height: 45,
                        border: '1px solid #cccccc',
                        borderRadius: 5,
                        paddingLeft: 10, outline: 'none'
                    
                    }}
                    value={username}
                    onChange={(e)=>(setUsername(e.target.value))}
                  

                />
                <div style={{ height: 20 }} />
                <span style={{ fontWeight: 'bold' }}>Password</span>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <input
                    type="password"
                        style={{
                            width: '100%',
                            height: 45,
                            border: '1px solid #cccccc',
                            borderRadius: 5,
                            paddingLeft: 10, outline: 'none',
                            
                        
                        }}
                        value={password}
                        onChange={(e)=>(setPassword(e.target.value))}
                    />
                </div>
                <div style={{ height: 20 }} />

                <button style={{
                    width: '100%',
                    backgroundColor: '#1877F2', 
                    color: 'white',
                    fontFamily: 'Phetsarath OT',
                    borderRadius:5,
                    border:'none'
                }}
                onClick={()=>{OnLogin()}}
                >
                <small style={{fontWeight:'bold',fontSize:20}}> 
                {!isLoading ? (
                  <>
                      Sign in
                  </>
                ) : (
                  <>
                    {
                      <Spinner animation="border" variant="light" size='sm' />
                    }
                  </>)
                }
              
                </small>
                </button>
                <div style={{ height: 20 }} />
                {/* <span style={{ cursor:'pointer' }} onClick={()=>{OnRegister()}}>Create account</span> */}
            </div>

                </>
                ):null
            }
   

        </div>
    )
}

