import React, {useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rnd } from 'react-rnd';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import BorderAllIcon from '@material-ui/icons/BorderAll';
import InputIcon from '@material-ui/icons/Input';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Modal } from "react-bootstrap";
export default function Form() {

  const {id}=useParams();
  const [datatable,setDatatable]=useState([])
  const [datatable1,setDatatable1]=useState([])
  const [datatable2,setDatatable2]=useState([])
  const [tableRow, setTableRow] = useState('')
  const [tableColumn, setTableColumn] = useState('')
  const [show, setShow] = useState(false);
  const [uselable,setUselable]=useState([])
  const [usecheckbox,setUsecheckbox]=useState([])
  const [usetextlist,setUsetextlist]=useState([])
  const [getindex,setGetindex]=useState('')
  const [countRow,setCountRow]=useState('')
  const [countRow1,setCountRow1]=useState('')
  const [index1,setIndex1]=useState('')
  const [index2,setIndex2]=useState('')
  const [bold,setBold]=useState(false)
  const [editlable,setEditlable]=useState('')
  const [showdeltable,setShowdeltable]=useState(true)
  const [showdeltable1,setShowdeltable1]=useState(false)
  const [showdeltable2,setShowdeltable2]=useState(false)
  const [listtext,setListText]=useState([])
  const [datacheckbox,setDatacheckbox]=useState([])
  const [listtextw,setListTextw]=useState([])
  const [fontSize,setFontSize]=useState('')
  const [data,setdata]=useState([])
  const [editcheckboxvalues,setEditcheckboxvalues]=useState('')
  const [datalable,setDatalable]=useState([])
  const [usetable,setUsetable]=useState([])
  const [tablechidren,setTablechidren]=useState([])
  const [usetable1,setUsetable1]=useState([])
  const [tablechidren1,setTablechidren1]=useState([])
  const [usetable2,setUsetable2]=useState([])
  const [tablechidren2,setTablechidren2]=useState([])
  const [inputValues,setInputValues]=useState('')
  const [inputValues1,setInputValues1]=useState('')
  const [inputValues2,setInputValues2]=useState('')
  const [inputValues3,setInputValues3]=useState('')
  const [checkboxValues, setCheckboxValues] = useState({});

  const [showsave,setShowsave]=useState(false);
  const [widthsize,setWidthsize]=useState('')
  const [widthsize1,setWidthsize1]=useState('')
  const [heightsize,setHeightsize]=useState('')
  const [heightsize1,setHeightsize1]=useState('')
  const [tables, setTables] = useState([[]])
  const [tables1, setTables1] = useState([[]])
  const [tables2, setTables2] = useState([[]])
  const [tables3, setTables3] = useState([[]])
  const [tables4, setTables4] = useState([[]])
  const [saveAs,setSaveAs]=useState('')

  const OnloadListData=()=>{
    axios.get(`/documents/api/input/gettransaction_id/${id}`).then((data)=>{
      setUsetable([...data?.data?.datatable])
      setUsetable1([...data?.data?.datatable1])
      setUsetable2([...data?.data?.datatable2])
      setCountRow([...data?.data?.datatable][0].countrow)
     
      if([...data?.data?.datatable].length == 0){

      }else{

        setTablechidren(JSON.parse([...data?.data?.datatable][0].body_table))
      }

      if([...data?.data?.datatable1].length == 0)
      {

      }else{
        setCountRow1([...data?.data?.datatable1][0].countrow)
        setTablechidren1(JSON.parse([...data?.data?.datatable1][0].body_table))
      }
      if([...data?.data?.datatable2].length == 0){
     
      }else{ 
      setTablechidren2(JSON.parse([...data?.data?.datatable2][0].body_table))
      }
      setUselable([...data?.data?.datalable])
      setUsecheckbox([...data?.data?.datacheckbox])
      console.log("usecheckbox=",[...data?.data?.datacheckbox])
      setUsetextlist([...data?.data?.datatextlis])
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handleClosedel = () => {
    setShow(false);
  }
  const handleCloseSavle=()=>{
    setShowsave(false)
  }
  const OnCreate=()=>{
    setShowsave(false)
     let informdata={
      informdatatable:datatable,
      informdatatable1:datatable1,
      informdatatable2:datatable2,
      informdatalable:datalable,
      informdatalisttext:listtext,
      informdatachekbox:datacheckbox,
      datasave:saveAs,
      datainformations:tables,
      datainformations1:tables1,
      datainformations2:tables2
     }
    axios.post("/documents/api/input/create",informdata).then((data)=>{
    }).catch((err)=>{
      console.log(err)
    })
}
  
  const onCreateTable = () => {
    if(datatable.length == 0){
      setShow(false)
      setShowdeltable(true)
      if (!tableRow || !tableColumn) return
      const newItemtable = {
        name:'',
        positionX: 0,
        positionY: 0,
        width: 749,
        height: 200,
        countrow:tableRow,
        type: 'table',
      }
      const cloneData = [...datatable]
      cloneData.push(newItemtable)
      setDatatable([...cloneData])
      let item=[];
      for(let i=0;i< tableColumn;i++){
        let row=tableRow
        let data;
        if(row == 2){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
        }else if(row == 3){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
        }else if(row == 4){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
        }else if(row == 5){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 6){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 7){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 8){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 9){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 10){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }
        item.push(data)
      }
      setTables(item)

    }else if(datatable1.length ==0){
      setShow(false)
      
      if (!tableRow || !tableColumn) return
      const newItemtable1 = {
        name:'',
        positionX: 0,
        positionY: 0,
        width: 749,
        height: 200,
        type: 'table',
        countrow:tableRow,
      }
      const cloneData = [...datatable1]
      cloneData.push(newItemtable1)
      setDatatable1([...cloneData])
      let item1=[];
      for(let i=0;i< tableColumn;i++){
        let row=tableRow
        let data;
        if(row == 2){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  }]
        }else if(row == 3){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
        }else if(row == 4){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
        }else if(row == 5){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 6){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 7){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 8){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 9){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 10){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }
        item1.push(data)
      }
      setTables1(item1)
    }else if(datatable2.length == 0){
      setShow(false)
     
      if (!tableRow || !tableColumn) return
      const newItemtable2 = {
        name:'',
        positionX: 0,
        positionY: 0,
        width: 749,
        height: 200,
        type: 'table',
        countrow:tableRow,
      }
      const cloneData = [...datatable2]
      cloneData.push(newItemtable2)
      setDatatable2([...cloneData])
      let item2=[];
      for(let i=0;i< tableColumn;i++){
        let row=tableRow
        let data;
        if(row == 2){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  }]
       
        }else if(row == 3){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
        }else if(row == 4){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
        }else if(row == 5){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 6){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 7){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 8){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 9){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }else if(row == 10){
          data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50 }]
       
        }
        item2.push(data)
      }
      setTables2(item2)
    }
    }

  const Onclickrow=()=>{
    console.log("2row")
    console.log("row=",countRow)
    const array=tablechidren.map((item)=>{
      return item
    })
    let list=[];
    let data;
    for(let i=0;i<1;i++){
      if(countRow == 2){
      data=[{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  }]
      }else if(countRow == 3){
      data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  }]
      }else if(countRow == 4){
        data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 }]
      }else if(countRow == 5){

      }else if(countRow == 6){

      }

      list.push(data)
    }
    const result=[...array,...list]
   setTablechidren([...result])
  }
  const Onclickrow1=()=>{
    const array=tablechidren1.map((item)=>{
      return item
    })
   
    let list=[];
    let data;
    for(let i=0;i<1;i++){
      if(countRow1==2)
      {
      data=[{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  }]
      }else if(countRow1 == 3){
      data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  }]
      }else if(countRow1 == 4){
        data=[{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50  },{ name:'',value: '1',cols: 1,rows: 1,width:100,height:50},{ name:'',value: '1',cols: 1,rows: 1,width:80,height:50 }]
      }else if(countRow1== 5){

      }else if(countRow1 == 6){

      }
      list.push(data)
    }
    const result=[...array,...list]
   setTablechidren1([...result])
  }
  const allsave=()=>{
    let data={
      tableposition:usetable,
      tableposition1:usetable1,
      tableposition2:usetable2,
      lableposition:uselable,
      chidrentable:tablechidren,
      chidrentable1:tablechidren1,
      chidrentable2:tablechidren2,
      usetextlist:usetextlist,
      usecheckbox:usecheckbox
    }
    console.log("data=",data)
  }
  

  const changeText = (value, key, index) => {
    const object = { ...usetextlist[index] };
    object[key] = value;
    const cloneData = [...usetextlist];
    cloneData[index] = { ...object };
    setUsetextlist([...cloneData]);
  };
  const changeText2 = (value, key, index2,index1) => {
    setInputValues(value)
    const cloneTables = [...tablechidren]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren]
    setTablechidren([...cloneData])
  };
  const changeText3 = (value, key, index2,index1) => {
    setInputValues1(value)
    const cloneTables = [...tablechidren]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren]
    setTablechidren([...cloneData])
  };
  const changeText5 = (value, key, index2,index1) => {
    setInputValues2(value)
    const cloneTables = [...tablechidren1]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren1]
    setTablechidren1([...cloneData])
  };
  const changeText6 = (value, key, index2,index1) => {
    setInputValues3(value)
    const cloneTables = [...tablechidren1]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren1]
    setTablechidren1([...cloneData])
  };
  const changeTextwidth = (value, key, index2,index1) => {
    setWidthsize(value)
    const cloneTables = [...tablechidren]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren]  
    setTablechidren([...cloneData])
  };
  const changeTextwidth1 = (value, key, index2,index1) => {
    setWidthsize1(value)
    const cloneTables = [...tablechidren1]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren1]  
    setTablechidren1([...cloneData])
  };
  const changeTextheight = (value, key, index2,index1) => {
    setHeightsize(value)
    const cloneTables = [...tablechidren]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren]  
    setTablechidren([...cloneData])
  };
  const changeTextheight1 = (value, key, index2,index1) => {
    setHeightsize1(value)
    const cloneTables = [...tablechidren1]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren1]  
    setTablechidren1([...cloneData])
  };
  const DeleteChangeText=(index,index1)=>{
    const cloneTables=[...tablechidren]
    const deleteObject=cloneTables[index1]
    deleteObject.splice(index,1);
    const cloneData = [...tablechidren]
    setTablechidren([...cloneData])
  }
  const DeleteChangeText1=(index,index1)=>{
    const cloneTables=[...tablechidren1]
    const deleteObject=cloneTables[index1]
    deleteObject.splice(index,1);
    const cloneData = [...tablechidren1]
    setTablechidren1([...cloneData])
  }
  const changeLable=(value,key,getindex)=>{
    setEditlable(value)
    const object = { ...uselable[getindex] };
    object[key] = value;
    const cloneData = [...uselable];
    cloneData[getindex] = { ...object };
    setUselable([...cloneData]);
  
  }
  const changeFontSize=(value,key,getindex)=>{
    setFontSize(value)
    const object={...uselable[getindex]};
    object[key]=value;
    const cloneData=[...uselable];
    cloneData[getindex]={...object};
    setUselable([...cloneData]);
  }
  const TextBoldTrue=(getindex)=>{
    setBold(true)
    let key='fontWeight'
    let value='bold'
    const object={...uselable[getindex]};
    object[key]=value;
    const cloneData=[...uselable];
    cloneData[getindex]={...object};
    setUselable([...cloneData]);
      
  }
  const TextBoldFalse=(getindex)=>{
    setBold(false)
    let key='fontWeight'
    let value=''
    const object={...uselable[getindex]};
    object[key]=value;
    const cloneData=[...datalable];
    cloneData[getindex]={...object};
    setUselable([...cloneData]);
}
const deletelable=(index)=>{
  const cloneData=[...uselable]
  cloneData.splice(index,1)
  setUselable([...cloneData])
}

  const onDragStoptable = (e, d, index) => {
    const cloneDatas = [...usetable]
    const cloneData = { ...usetable[index] }
    cloneData.positionX = d.x;
    cloneData.positionY = d.y
    cloneDatas[index] = cloneData
    setUsetable([...cloneDatas])
}
const onDragStoptable1 = (e, d, index) => {
  const cloneDatas = [...usetable1]
  const cloneData = { ...usetable1[index] }
  cloneData.positionX = d.x;
  cloneData.positionY = d.y
  cloneDatas[index] = cloneData
  setUsetable1([...cloneDatas])
}
const onDragStoptable2 = (e, d, index) => {
  const cloneDatas = [...usetable2]
  const cloneData = { ...usetable2[index] }
  cloneData.positionX = d.x;
  cloneData.positionY = d.y
  cloneDatas[index] = cloneData
  setUsetable2([...cloneDatas])
}
const onDragStopcheckbox = (e, d, index) => {
  const cloneDatas = [...usecheckbox]
  const cloneData = { ...usecheckbox[index] }
  cloneData.positionX = d.x;
  cloneData.positionY = d.y
  cloneDatas[index] = cloneData
  setUsecheckbox([...cloneDatas])
}
    const OnClickCheckbox=(index)=>{
      console.log("dataindex=",index)
    
      setGetindex(index)
      const cloneData=usecheckbox[index]
      setEditcheckboxvalues(cloneData.name)
      const copy=[...usecheckbox]
      
   
 
      
    }
  const Onclicktextlist=(index)=>{
    const cloneData=usetextlist[index]
    cloneData.index=index
    setListTextw([cloneData])
   
  }
  
  const deletechange=(index)=>{
    const cloneData = [...usetextlist]
    const cloneData1=[...usetextlist]
    cloneData.splice(index,1)
    cloneData1.splice(index,1)
    setUsetextlist([...cloneData])
    setListTextw([...cloneData1])
  }
  const changeTextForsize = (value, key, index) => {
    const object = { ...usetextlist[index] };
    object[key] = value;
    const cloneData = [...usetextlist];
    cloneData[index] = { ...object };
    setUsetextlist([...cloneData]);
    setListTextw([cloneData[index]]);
  };
  const changeTexttable = (value, key, index1,index2) => {
    const cloneTables = [...tablechidren]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren]
    setTablechidren([...cloneData])
  };
  const changeTexttable1 = (value, key, index1,index2) => {
    const cloneTables = [...tablechidren1]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren1]
    setTablechidren1([...cloneData])
  };
  const changeTexttable2 = (value, key, index1,index2) => {
    const cloneTables = [...tablechidren2]
    const datarow=cloneTables[index1]
    const object=datarow[index2]
    object[key]=value;
    const cloneData = [...tablechidren2]
    setTablechidren2([...cloneData])
  };
  const handleCheckboxChange = (e,key,index) => {
    const {checked } = e.target;
    const clonecheckbox=[...usecheckbox]
    const object=clonecheckbox[index]
    console.log("Obkect=",object)
    object[key]=checked;
    const cloneData=[...usecheckbox]
    console.log("cloneData=",cloneData)
    setUsecheckbox([...cloneData])

  
  }
  const changeCheckbox=(value,key,getindex)=>{
    setEditcheckboxvalues(value)
    const object = { ...usecheckbox[getindex] };
    object[key] = value;
    const cloneData = [...usecheckbox];
    cloneData[getindex] = { ...object };
    setUsecheckbox([...cloneData]);
  }
  const deletecheckbox=(index)=>{
    setEditcheckboxvalues('')
    const cloneData=[...usecheckbox]
    cloneData.splice(index,1)
    setUsecheckbox([...cloneData])
  }


  const deletetable=(index)=>{
    const cloneData=[...usetable]
    cloneData.splice(index,1)
    setUsetable([...cloneData])
  }
  const deletetable1=(index)=>{
    const cloneData=[...usetable1]
    cloneData.splice(index,1)
    setUsetable1([...cloneData])
  }

const onDragStoplable= (e, d, index) => {
  const cloneDatas = [...uselable]
  const cloneData = { ...uselable[index] }
  cloneData.positionX = d.x;
  cloneData.positionY = d.y
  cloneDatas[index] = cloneData
  setUselable([...cloneDatas])
}
const onClickOnElement = (index) => {
  setGetindex(index)
  const cloneData = uselable[index]
  setEditlable(cloneData.name)
  setFontSize(cloneData.font)

}


  const onAddNewItem = () => {

    setDatalable([...datalable,{name:'Text', positionX: 0, positionY: 0, width: 0, height: 0,font:'20px',fontWeight:'',type: 'lable'}])
  }
  const OnAddText = () => {
    setListText([...listtext,{name: "",positionX: 100,positionY: 100,width: 200,height: 40,type:'text'}]);
  };
  const Onclicktable=(index)=>{
    setShowdeltable(true)
    setShowdeltable1(false)
    setShowdeltable2(false)
    setGetindex(index)
  }
  const Onclicktable1=(index)=>{
    setShowdeltable(false)
    setShowdeltable1(true)
    setShowdeltable2(false)

    setGetindex(index)
  }
  const Onclicktable2=(index)=>{
    setShowdeltable(false)
    setShowdeltable1(false)
    setShowdeltable2(true)
    setGetindex(index)
  }
  const OnclickTablefirst=(index2,index1)=>{
    setIndex1(index1)
    setIndex2(index2)
  }
  const onDragStopinput=(e,d,index)=>{
    const cloneDatas=[...listtext]
    const cloneData={...listtext[index]}
    cloneData.positionX=d.x;
    cloneData.positionY=d.y
    cloneDatas[index]=cloneData
    setListText([...cloneDatas])
  }



  useEffect(()=>{
    OnloadListData()
  },[])
  return(
    <>
        <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="sm">
              <Modal.Header closeButton>
                <span style={{ fontSize: 14, paddingTop: 10 }}>
                  Create table </span>
              </Modal.Header>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginTop:10}}>
                  <div>
                    <small>Enter Row and Column</small>
                      <input 
                      placeholder="Row"
                      value={tableRow} 
                      onChange={e => setTableRow(e.target.value)} 
                      style={{width:60,marginLeft:10}}/>
                  </div>
                  <div style={{marginRight:10}}>
                      <input value={tableColumn} 
                      placeholder="Column"
                      onChange={e => setTableColumn(e.target.value)} 
                      style={{width:60,marginLeft:10}} />
                  </div>
              </div>
              <div style={{display:'flex',justifyContent:'flex-end',paddingTop:10,marginLeft:10}}>
                <button
               style={{
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    paddingLeft: 20, paddingRight: 20,
                    backgroundColor: '#3f51b5',
                    color:'#fff'
                }} 
                onClick={()=>{onCreateTable()}}
                >Create Table</button>
              </div>
      
            </Modal>
            <Modal show={showsave} onHide={handleCloseSavle} style={{ paddingTop: 50 }} size="sm">
              <Modal.Header closeButton>
                <span style={{ fontSize: 14, paddingTop: 10 }}>
                  Save As</span>
              </Modal.Header>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginTop:10}}>
                  <div>
                    <small>Form Name:</small>
                      <input 
                      placeholder="Form Name"
                      value={saveAs}
                      onChange={e=>setSaveAs(e.target.value)}
                      style={{width:200,marginLeft:10}}/>
                  </div>
 
              </div>
              <div style={{display:'flex',justifyContent:'flex-end',paddingTop:10,marginLeft:10}}>
                <button
               style={{
                    border: '1px solid #ccc',
                    borderRadius: 3,
                    paddingLeft: 20, paddingRight: 20,
                    backgroundColor: '#3f51b5',
                    color:'#fff'
                }} 
                onClick={()=>{OnCreate()}}
                >Save</button>
              </div>
              <div style={{height:5}}>

              </div>
            </Modal>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',position:'fixed',top:65,left:264,right:25,zIndex:999,height:50,backgroundColor:'white'}}>
              <div style={{backgroundColor:'#3f51b5', border: '1px solid #ccc',borderRadius:3,width:80,cursor:'pointer',height:30,marginTop:10}} onClick={()=>{OnAddText()}}>
                <InputIcon style={{color:'#fff'}} />
                <small style={{color:'#fff',marginLeft:5,fontWeight:'bold'}} >Input</small>
              </div>
              <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:80,marginLeft:10,cursor:'pointer',height:30,marginTop:10}} 
              
              >
                <BorderAllIcon style={{color:'#fff'}} />
                <small style={{color:'#fff',marginLeft:5,fontWeight:'bold'}} >Table</small>
              </div>
      
              <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:100,marginLeft:10,cursor:'pointer',height:30,marginTop:10}}>
                <TextFormatIcon style={{color:'#fff'}} />
                <small style={{color:'#fff',fontWeight:'bold'}} >Text</small>
              </div>
  
              <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:100,marginLeft:10,cursor:'pointer',height:30,marginTop:10}}>
                <CheckBoxIcon style={{color:'#fff'}} />
                <small style={{color:'#fff'}}  >CheckBox</small>
              </div>
         
              <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:80,marginLeft:10,cursor:'pointer',height:30,marginTop:10}} onClick={()=>allsave()}>
                <SaveIcon style={{color:'#fff'}} />
                <small style={{color:'#fff'}}  >Save</small>
              </div>
      </div>
        <div style={{height:20}}>
        </div>

        <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start',backgroundColor:'yellow',marginTop:10}} >
            <div style={{width: '86%',height: 2000,border: '1px solid #000',backgroundColor:'white'}}>
                {/* {JSON.stringify(usecheckbox)} */}
                {/* {JSON.stringify(checkboxValues)} */}
                {/* {JSON.stringify(usetable2)} */}



            {
            usetable && usetable.map((el,index)=>{
             
              return(
                <div key={index}>
                <Rnd
                default={{
                  x: el.positionX,
                  y: el.positionY,
                 
                }}
                onDragStop={(e, d) => onDragStoptable(e, d, index)}
                onClick={()=>{Onclicktable(index)}}
              >
      
                
            <table style={{border:'1px solid gray'}}>
              {
                  tablechidren && tablechidren.map((item,index1)=>{
                    return(
                      <>
                      <tr key={index1} style={{width:`${item.width}px`,border:'1px solid gray'}}>
                        {
                          item.map((data,index2)=>{
                            return(
                              <>
                              <td key={index2} style={{border:'1px solid gray',width:`${data.width}px`}}  colSpan={data.cols} rowSpan={data.rows}>
                         
                                      <textarea value={data?.name}  
                                        onChange={(e)=>{changeTexttable(e.target.value,'name',index1,index2)}} 
                                        onClick={()=>{OnclickTablefirst(index1,index2)}}
                                        style={{border:'none',width:'100%',height:`${data?.height}px`}} />
                              </td>
                              </>
                            )
                          })
                        }
                      </tr>
                      </>
                    )
                  })
              }
            </table>
              </Rnd>
              </div>
              )
            })
          }
          {
            usetable1 && usetable1.map((el,index)=>{
              return(
                <div key={index}>
                <Rnd
                default={{
                  x: el.positionX,
                  y: el.positionY,
                 
                }}
                onDragStop={(e, d) => onDragStoptable1(e, d, index)}
                onClick={()=>{Onclicktable1(index)}}
              >
      
                
            <table style={{border:'1px solid gray'}}>
              {
                  tablechidren1 && tablechidren1.map((item,index1)=>{
                    return(
                      <>
                      <tr key={index1} style={{width:`${item.width}px`,border:'1px solid gray'}}>
                        {
                          item.map((data,index2)=>{
                            return(
                              <>
                              <td key={index2} style={{border:'1px solid gray',width:`${data.width}px`}}  colSpan={data.cols} rowSpan={data.rows}>
                         
                                      <textarea value={data?.name}  
                                        onChange={(e)=>{changeTexttable1(e.target.value,'name',index1,index2)}} 
                                        onClick={()=>{OnclickTablefirst(index1,index2)}}
                                        style={{border:'none',width:'100%',height:`${data?.height}px`}} />
                              </td>
                              </>
                            )
                          })
                        }
                      </tr>
                      </>
                    )
                  })
              }
            </table>
              </Rnd>
              </div>
              )
            })
          }
          {
            usetable2 && usetable2.map((el,index)=>{
         
              return(
                <div key={index}>
                <Rnd
                default={{
                  x: el.positionX,
                  y: el.positionY,
                 
                }}
                onDragStop={(e, d) => onDragStoptable2(e, d, index)}
                // onClick={()=>{Onclicktable(index)}}
            
              >
      
                
            <table style={{border:'1px solid gray'}}>
              {
                  tablechidren2 && tablechidren2.map((item,index1)=>{
                    return(
                      <>
                      <tr key={index1} style={{width:`${item.width}px`,border:'1px solid gray'}}>
                        {
                          item.map((data,index2)=>{
                            return(
                              <>
                              <td key={index2} style={{border:'1px solid gray',width:`${data.width}px`}}  colSpan={data.cols} rowSpan={data.rows}>
                         
                                      <textarea value={data?.name}  
                                        onChange={(e)=>{changeTexttable2(e.target.value,'name',index1,index2)}} 
                                        // onClick={()=>{OnclickTable(index,index1)}}
                                        style={{border:'none',width:'100%',height:`${data?.height}px`}} />
                              </td>
                              </>
                            )
                          })
                        }
                      </tr>
                      </>
                    )
                  })
              }
            </table>
              </Rnd>
              </div>
              )
            })
          }
          {               
              uselable && uselable.map((el,index)=>{ 
                return (
                  <Rnd
                    key={index}
                    default={{
                      x: el.positionX,
                      y: el.positionY,
                    
                    }}
                    onDragStop={(e, d) => onDragStoplable(e, d, index)}
                    onClick={() => onClickOnElement(index)}
                  >
                     <small style={{fontSize:el.font,fontWeight:el.fontWeight}}>{el.name}</small>
                  </Rnd>
                )
                
              })
            }
            {
              usecheckbox && usecheckbox.map((el,index)=>{
                return (
                  <Rnd
                    key={index}
                    default={{
                      x: el.positionX,
                      y: el.positionY,
              
                    }}
                    onDragStop={(e, d) => onDragStopcheckbox(e, d, index)}
                    onClick={()=>OnClickCheckbox(index)}
                  >
                    <div style={{display:'flex',flexDirection:'row'}}>
                      <input 
                      type="checkbox"
                      value={el?.name}
                      onChange={(e)=>{handleCheckboxChange(e,'check',index)}}
                      style={{cursor:'pointer'}} />
                      <small style={{marginLeft:5}}>{el.name}</small>
                
                      </div>
                  </Rnd>
                )
                
              })

            }
            {
              usetextlist && usetextlist.map((e,index)=>{
              return(
                < Rnd 
                default={{
                  x: e.positionX,
                  y: e.positionY,

                }}
                >
                <RowComponent
                index={index}
                changeText={changeText}
                e={e}
                Onclicktextlist={Onclicktextlist}
                />      
                </Rnd>
              )
            })
            }
            {
            listtext && listtext.map((e,index)=>{
                return(
                  < Rnd 
                  default={{
                    x: e.positionX,
                    y: e.positionY,
                  }}
                  onDragStop={(e, d) => onDragStopinput(e, d, index)}
                  >
                  <RowComponent
                  index={index}
                  changeText={changeText}
                  Onclicktextlist={Onclicktextlist}
                  e={e}
                  />
                  </Rnd>
                  
                )
              })
              } 
            </div>
            <div style={{display:'flex',flexDirection:"column",position:'fixed',zIndex:999,right:25}}>
            <div style={{display:'flex',flexDirection:'column',marginLeft:10}}>
              {
                listtextw.length == 0 ?(
                <>
                < ComponentWidthAndHeighCopy />
                </>
                ):(
                <>
                {
                listtextw && listtextw.map((e,index)=>{
                  return(
                    <>
                    <ComponentWidthAndHeigh
                    key={index}
                    changeTextForsize={changeTextForsize}
                    deletechange={deletechange}
                    e={e}
                    index={e.index}
                    />
                    </>
                  )
                })
              }
            
                </>)
              }
           </div>
           <div style={{display:'flex',flexDirection:'column',marginLeft:10,marginTop:10}}>
                  <CompoentStyleForLable 
                  editlable={editlable}
                  fontSize={fontSize}
                  changeLable={changeLable}
                  changeFontSize={changeFontSize}
                  TextBoldTrue={TextBoldTrue}
                  TextBoldFalse={TextBoldFalse}
                  bold={bold}
                  getindex={getindex}
                  deletelable={deletelable}
                  />
            </div>
            <div style={{display:'flex',flexDirection:'column',marginLeft:10}}>
                 <CompoentStyleForCheckBox 
                  editcheckboxvalues={editcheckboxvalues}
                  changeCheckbox={changeCheckbox}
                  getindex={getindex}
                  deletecheckbox={deletecheckbox}
                  />
            </div>
           <div style={{display:'flex',flexDirection:'column',marginLeft:10}}>
              
              {
                showdeltable == true ? (<>
                       <small style={{fontWeight:'bold',marginLeft:10,fontSize:12}}>Style for Table 1</small>
                        <input
                        value={inputValues}
                        placeholder="column"
                        onChange={(e)=>changeText2(e.target.value,'rows',index1,index2)}
                        style={{marginLeft:10,marginTop:5,width:140,height:25,}}
                        />
                        <input
                        placeholder="row"
                        value={inputValues1}
                        onChange={(e)=>changeText3(e.target.value,'cols',index1,index2)}
                        style={{marginLeft:10,marginTop:5,width:140,height:25,}}
                        />
                        <input
                        placeholder="width"
                        value={widthsize}
                        onChange={(e)=>changeTextwidth(e.target.value,'width',index1,index2)}
                        style={{marginLeft:10,marginTop:5,width:140,height:25,}}
                        />
                        <input
                        placeholder="height"
                        value={heightsize}
                        onChange={(e)=>changeTextheight(e.target.value,'height',index1,index2)}
                        style={{marginLeft:10,marginTop:5,width:140,height:25,}}
                        />
                        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:140,marginLeft:10,cursor:'pointer',marginTop:5}} onClick={()=>{Onclickrow()}}>
                          <AddIcon style={{color:'#fff'}} />
                        <small style={{color:'#fff',fontWeight:'bold'}}>Add lines</small>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
              
                        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:70,marginLeft:10,cursor:'pointer'}} onClick={()=>{DeleteChangeText(index1,index2)}}>
                          <DeleteIcon style={{color:'#fff'}} />
                          <small style={{color:'#fff',fontWeight:'bold'}}>Row</small>
                        </div>
                        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:70,marginRight:10,cursor:'pointer'}} onClick={()=>{deletetable(getindex)}}>
                          <DeleteIcon style={{color:'#fff'}} />
                          <small style={{color:'#fff',fontWeight:'bold'}}>Table</small>
                        </div>

                        </div>
                 
                </>):null
              }
                {
                showdeltable1 == true ? (<>
                        <small style={{fontWeight:'bold',marginLeft:10,fontSize:12}}>Style for Table 2</small>
                        <input
                        value={inputValues2}
                        placeholder="Columns"
                        onChange={(e)=>changeText5(e.target.value,'rows',index1,index2)}
                        style={{marginLeft:10,marginTop:5,width:140,height:25,}}
                        />
                        <input
                        placeholder="Rows"
                        value={inputValues3}
                        onChange={(e)=>changeText6(e.target.value,'cols',index1,index2)}
                        style={{marginLeft:10,marginTop:5,width:140,height:25,}}
                        />
                        <input
                        placeholder="Width"
                        value={widthsize1}
                        onChange={(e)=>changeTextwidth1(e.target.value,'width',index1,index2)}
                        style={{marginLeft:10,marginTop:5,width:140,height:25,}}
                        />
                        <input
                        placeholder="Height"
                        value={heightsize1}
                        onChange={(e)=>changeTextheight1(e.target.value,'height',index1,index2)}
                        style={{marginLeft:10,marginTop:5,width:140,height:25,}}
                        />
                        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:140,marginLeft:10,cursor:'pointer',marginTop:5}} onClick={()=>{Onclickrow1()}}>
                          <AddIcon style={{color:'#fff'}} />
                        <small style={{color:'#fff',fontWeight:'bold'}}>Add lines</small>
                        </div>
                      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:70,marginLeft:10,cursor:'pointer'}} onClick={()=>{DeleteChangeText1(index1,index2)}}>
                          <DeleteIcon style={{color:'#fff'}} />
                          <small style={{color:'#fff',fontWeight:'bold'}}>Row</small>
                        </div>
                        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:70,marginRight:10,cursor:'pointer'}} onClick={()=>{deletetable1(getindex)}}>
                          <DeleteIcon style={{color:'#fff'}} />
                          <small style={{color:'#fff',fontWeight:'bold'}}>Table</small>
                        </div>

                      </div>

           
                
                </>):null
              }

            </div>
            </div>
        </div>
        
    </>
  )
 
 
}
function RowComponent({changeText,Onclicktextlist,e,index}) {
  return(
    <>
            <input
                placeholder="......................................................................................................................................................................"
                 value={e?.name}
                 onChange={(e) => changeText(e.target.value, "name", index)}
                 onClick={()=>{Onclicktextlist(index)}} 
                 style={{
                  width:`${e.width}px`,
                  height:`${e.height}px`,
                  border: 'none',
                 }} 
            />
    </>
  )
}
function ComponentWidthAndHeigh({changeTextForsize,e,index,deletechange}) {
  return(
    <>
            <small style={{fontWeight:'bold',marginLeft:10,fontSize:12,marginTop:10}}>Style for Text</small>
            <input
                 placeholder="width"
                 value={e.width}
                 onChange={(e) => {changeTextForsize(e.target.value , "width", index)}}
                 style={{
                  width:140,
                  height:25,
                  marginLeft:10
                 }} 
            />
             <input
                placeholder="height"
                 value={e.height}
                 onChange={(e) => {changeTextForsize(e.target.value , "height", index)}}
                 style={{
                  width:140,
                  height:25,
                  marginLeft:10,
                  marginTop:10
                 }} 
            />
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:140,marginLeft:10,cursor:'pointer',marginTop:5}} onClick={()=>{deletechange(index)}}>
                          <DeleteIcon style={{color:'#fff'}} />
                          <small style={{color:'#fff',fontWeight:'bold'}}>Delete for text</small>
                  </div>

            </div>
      
    </>
  )

}
function ComponentWidthAndHeighCopy() {
  return(
    <>
            <small style={{fontWeight:'bold',marginLeft:10,fontSize:14}}>Style for Input</small>
            <input
                 placeholder="width"
                 style={{
                  width:140,
                  height:25,
                  marginLeft:10
                 }} 
            />
             <input
                placeholder="height"
                 style={{
                  width:140,
                  height:25,
                  marginLeft:10,
                  marginTop:10
                 }} 
            />
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:140,marginLeft:10,cursor:'pointer',marginTop:5}}>
                          <DeleteIcon style={{color:'#fff'}} />
                          <small style={{color:'#fff',fontWeight:'bold'}}>Delete for text</small>
                  </div>
            </div>
      
    </>
  )
}
function CompoentStyleForLable({editlable,fontSize,changeLable,getindex,changeFontSize,TextBoldTrue,TextBoldFalse,bold,deletelable}){
  return(
    <>
      <small style={{fontWeight:'bold',marginLeft:10,fontSize:14}}>Style for Text</small>
      <input
      value={editlable}
      placeholder="Edit Lable"
      onChange={(e)=>changeLable(e.target.value,'name',getindex)}
      style={{
        width:140,
        height:25,
        marginLeft:10
      }}
      />
      <input
      value={fontSize}
      placeholder="fontSize"
      onChange={(e)=>changeFontSize(e.target.value,'font',getindex)}
      style={{
        width:140,
        height:25,
        marginLeft:10,
        marginTop:5
      }}
      />
      {
        bold == false ?(
        <>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:50,marginLeft:10,cursor:'pointer',marginTop:5}}>
             <small style={{fontWeight:'bold',fontSize:20,cursor:'pointer',marginLeft:10,color:'#fff'}} onClick={()=>{TextBoldTrue(getindex)}}>B</small>
          </div>
          <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:80,marginLeft:10,marginRight:10,cursor:'pointer',marginTop:5}} onClick={()=>{deletelable(getindex)}}>
              <DeleteIcon style={{color:'#fff'}} />
              <small style={{color:'#fff',fontWeight:'bold'}}>Delete</small>
          </div>
            
        </div>
 
       
        </>
        ):(
        <>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:50,marginLeft:10,cursor:'pointer',marginTop:5}}>
             <small style={{fontWeight:'bold',fontSize:20,cursor:'pointer',marginLeft:10,color:'#fff'}} onClick={()=>{TextBoldFalse(getindex)}}>B</small>
          </div>
          <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:80,marginLeft:10,cursor:'pointer',marginTop:5}} onClick={()=>{deletelable(getindex)}}>
              <DeleteIcon style={{color:'#fff'}} />
              <small style={{color:'#fff',fontWeight:'bold'}}>Delete</small>
          </div>
            
        </div>


        </>
        )
      }
    </>
  )
}
function CompoentStyleForCheckBox({editcheckboxvalues,changeCheckbox,getindex,deletecheckbox}){
  return(
    <>
      <small style={{fontWeight:'bold',marginLeft:10,fontSize:14}}>Style for CheckBox</small>
      <input
      value={editcheckboxvalues}
      placeholder="Edit Checkbox"
      onChange={(e)=>changeCheckbox(e.target.value,'name',getindex)}
      style={{
        width:140,
        height:25,
        marginLeft:10,
      }}
      />
      <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:140,marginLeft:10,cursor:'pointer',marginTop:5}} onClick={()=>{deletecheckbox(getindex)}}>
        <DeleteIcon style={{color:'#fff'}} />
        <small style={{color:'#fff',fontWeight:'bold'}}>Delete checkBox</small>
      </div>
   
    </>
  )
}
