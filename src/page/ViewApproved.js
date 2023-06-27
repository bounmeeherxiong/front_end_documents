import React, { useRef, useEffect,useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FolderIcon from '@material-ui/icons/Folder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    root: {
      width: '100%',
      maxWidth: 200,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

export default function ViewApproved() {
    const classes = useStyles();
    const {id}=useParams();
    const Navigate=useNavigate();
    const [dataList,setDataList]=useState([])
    const [dataList1,setDataList1]=useState([])

    const [show, setShow] = useState(false); 
    const handleClosedel = () => {
        setShow(false);
      }
      const handleShow = () => setShow(true);
    const Onloaddata=()=>{
      axios.get(`/api/setting/View-User-Approved/${id}`).then((data)=>{
       
  
        setDataList([...data?.data?.result1])
        setDataList1([...data?.data?.result2])
      }).catch((err)=>{
        console.log(err)
      })
    }
    const OnViewForm=(id)=>{
        Navigate(`/ViewForm/${id}`);
    }
    const onEditform=(id)=>{
        Navigate(`/EditForm/${id}`)
    }
    useEffect(()=>{
      Onloaddata()
   

       
    },[])
    return(
        <>
        <div style={{width:'100%'}}>
            <div style={{backgroundColor:'#ebedef',width:'100%',height:50}}>
              asfas

            </div>

            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',marginTop:10}} >
                <div style={{display:'flex',flexDirection:'row',backgroundColor:'#ebedef',width:'50%',border: '1px solid #9da5b1',marginRight:10,borderRadius:5}}>
                  <div style={{backgroundColor:'#3399ff',width:100,height:100,marginLeft:10,marginTop:10,marginBottom:10,borderRadius:'50%'}}>
                    <FolderIcon style={{width:50,height:50,color:'white',marginLeft:25,marginTop:25}}/>
          
                  </div>
                  <div style={{display:'flex',flexDirection:'column',marginLeft:10,marginTop:25}}>
                    <small style={{fontWeight:'bold',fontSize:25}}>Request Form</small>
                    <small style={{fontWeight:'bold',fontSize:20}}>Created At: 2023-03-03</small>

                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column', backgroundColor:'#ebedef',width:'50%',border: '1px solid #9da5b1',marginLeftL:10 ,borderRadius:5}}>
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                    <div style={{backgroundColor:'#3399ff',width:100,height:100,marginLeft:10,marginTop:10,marginBottom:10,borderRadius:'50%'}}>
                      <img src={dataList[0]?.images} style={{width:100,height:100}} />
               
                    </div>
                    <div style={{display:'flex',flexDirection:'column',marginTop:20,marginLeft:10}}>
                                      <small style={{fontWeight:'bold',fontSize:20}}>{dataList[0]?.created_by_name}</small>
                                      <small style={{fontSize:15,fontWeight:'bold'}}>{dataList[0]?.updated_at}</small>
                    </div>
                     
                  </div>
                  <div style={{backgroundColor:'#9da5b1',width:3,height:120,borderRadius:5,marginLeft:58,marginTop:-10}}>
                  </div>
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',marginTop:-10}}>
                      <div style={{backgroundColor:'#3399ff',width:100,height:100,marginLeft:10,marginTop:10,marginBottom:10,borderRadius:'50%'}}>
                      <img src={dataList1[0]?.images} style={{width:100,height:100}} />
                      </div>
                      <div style={{display:'flex',flexDirection:'column',marginTop:20,marginLeft:10}}>
                        <small style={{fontWeight:'bold',fontSize:20}}>{dataList1[0]?.created_by_name}</small>
                        <small style={{fontSize:15,fontWeight:'bold'}}>{dataList1[0]?.updated_at}</small>
                      </div>
                  </div>
                  <div style={{backgroundColor:'#9da5b1',width:3,height:120,borderRadius:5,marginLeft:58,marginTop:-10}}>
                  </div>
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',marginTop:-10}}>
                      <div style={{backgroundColor:'#3399ff',width:100,height:100,marginLeft:10,marginTop:10,marginBottom:10,borderRadius:'50%'}}>
                      <AccountCircleIcon style={{width:50,height:50,color:'white',marginLeft:25,marginTop:25}}/>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',marginTop:20,marginLeft:10}}>
                        <small style={{fontWeight:'bold',fontSize:20}}>Mr bounmeeher bliaxiong</small>
                        <small style={{fontSize:15,fontWeight:'bold'}}>Date:2023-03-03</small>
                      </div>
                  </div>
                </div>
            </div>
         
         


        </div>



        </>
    )

}
