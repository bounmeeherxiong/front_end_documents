import React, { useRef, useEffect,useState } from "react";
import { Rnd } from 'react-rnd';
import TocIcon from '@material-ui/icons/Toc';
import AddIcon from '@material-ui/icons/Add';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Resizetable from "./Resizetable";
import ColumnResizer from "react-table-column-resizer";
import axios from "axios";
export default function CreateForm() {
  const [drag, setDrag] = useState({iniMouse:466,iniSize:171});
    const [tableRow, setTableRow] = useState(0)
    const [tableColumn, setTableColumn] = useState(0)
    const [data, setData] = useState([])
    const [datalist,setDatalist]=useState([])
    const [inputValues,setInputValues]=useState('')
    const [inputValues1,setInputValues1]=useState('')
    const [arraydata,setArraydata]=useState([])
    const [getdata,setGetdata]=useState([{ namess:'',valuess: '1',col: 1,rowss: 1,widthss:100 },{  namess:'',valuess: '1',col: 1,rowss: 1,widthss:100 }])
    

    const [getarray,setGetarray]=useState({name:'',value: '1',cols: 1,rows: 1,width:100})

    const [tables, setTables] = useState(
      [
        [
          {
            name:'',
            value: '1',
            cols: 1,
            rows: 1,
            width:100
          },
          {
            name:'',
            value: '2',
            cols: 1,
            rows: 1,
            width:100
          },
        ],
        [
          {
            name:'',
            value: '1',
            cols: 1,
            rows: 1,
            width:100
          },
          {
            name:'',
            value: '2',
            cols: 1,
            rows: 1,
            width:100
          },
          {
            name:'',
            value: '3',
            cols: 1,
            rows: 1,
            width:100
          },
        ],
        
        
      ]
    )
    const [tables1, setTables1] = useState([[]])
    const [listable1,setListable1]=useState([])
    const [listable2,setListable2]=useState([])
   
    
    const [listdata,setListdata]= useState([{dataInput:''}])
    const [datatable,setDatatable]=useState([{name:''}])
    const [listtext,setListText]=useState([])
    const [gwidth,setGwidth]=useState('')
    const [gheight,setGheight]=useState('')
    const [show,setShow]=useState(false)
    const [count,setCount]=useState(3)
    const [getindex,setGetindex]=useState('')
    const [getindex1,setGetindex1]=useState('')
    const [listTextw1,setListTextw1]=useState([])
    const [vales,setvales]=useState([])
 

   
        
   
    
    const onDragStop = (e, d, index) => {
        const cloneDatas = [...data]
        const cloneData = { ...data[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setData([...cloneDatas])
    }
    const onDragStop1 = (e, d, index) => {
      const cloneDatas = [...data]
      const cloneData = { ...data[index] }
      cloneData.positionX = d.x;
      cloneData.positionY = d.y
      cloneDatas[index] = cloneData
      setData([...cloneDatas])
  }
    const changeText = (value, key, index1,index) => {

      // const cloneTables = {...tables[index1]}
     
      // const object=cloneTables[index]
      // console.log("dataRow=",object)
      
  
      // object[key]=value
      // const cloneData=[...tables]
      // console.log("cloneData=",cloneData)

      const cloneTables = [...tables]
      const datarow=cloneTables[index1]
      const object=datarow[index]
      console.log("object=",object)
      object[key]=value;
      const cloneData = [...tables]
      console.log("cloneData=",cloneData)
      setTables([...cloneData])

      
      
      

     
  
     
      // const cloneTables = [...tables]
      // const datarow=cloneTables[index1]
      // const object=datarow[index]
      
      // object[key]=value;
      // const cloneData = [...tables]
  
      // setTables([...cloneData])


  

    };


    const changeText1 = (value, key, index1,index) => {

      // console.log("index=",index)
      // console.log("index1=",index1)
      // console.log("key=",key)
      // // const cloneTables = [...tables1]
      // // const datarow=cloneTables[index1]
      // // console.log("datarow1=",datarow)
      // // const object=datarow[index]
      // // console.log("object1=",object)
      // // object[key]=value;
      // // const cloneData=[...datarow]
      // // console.log("cloneData1=",cloneData)
      // // cloneData[index]={...object};
      // // setArraydata([[...cloneData]])

        
      // const cloneTables = [...tables1]

      // const datarow=cloneTables[index1]
      
      // const object=datarow[index]
      // console.log("object=",object)
     
      // object[key]=value;
      // console.log("vv=",object[key]=value)
      // const cloneData = [...tables1]
      // console.log("cloneData=",cloneData)
      
  
      // setTables1([...cloneData])

      const cloneTables = [...tables1]
      const datarow=cloneTables[index1]
      const object=datarow[index]
      console.log("object=",object)
      object[key]=value;
      const cloneData = [...tables1]
      console.log("cloneData=",cloneData)
      setTables1([...cloneData])
   

    };
    const arr = [
      {id: 1, status: 'active', name: 'John'},
      {id: 2, status: 'active', name: 'Jane'},
      {id: 3, status: 'inactive', name: 'Bob'},
      {id: 4, status: 'inactive', name: 'Alice'}
    ];
    
    const objArr = arr.reduce((acc, curr) => {
      if (!acc[curr.status]) {
        acc[curr.status] = [];
      }
      acc[curr.status].push({id: curr.id, name: curr.name});
      return acc;
    }, []);
    
    console.log("objArr=",objArr[0]);

    const changeText2 = (value, key, getindex,getindex1) => {
     
      setInputValues(value)

      const cloneTables = [...tables1]
      const datarow=cloneTables[getindex1]
      const object=datarow[getindex]
      console.log("object=",object)
      object[key]=value;
      const cloneData = [...tables1]
      console.log("cloneData=",cloneData)
      setTables1([...cloneData])
      setInputValues('')
   

    };
    const changeText3 = (value, key, getindex,getindex1) => {
      setInputValues1(value)
      const cloneTables = [...tables1]
      const datarow=cloneTables[getindex1]
      // datarow.shift(1)
      // datarow.splice(1)
      const object=datarow[getindex]
      object[key]=value;
      const cloneData = [...tables1]
      setTables1([...cloneData])
      setInputValues1('')

    };
    const DeleteChangeText=(getindex,getindex1)=>{
      console.log("index=",getindex)
      console.log("getindex1=",getindex1)
      
      // const cloneTables=[...tables1]
      // const deleteObject=cloneTables[getindex1]
      // deleteObject.splice(getindex,1);
      // const cloneData = [...tables1]
      // setTables1([...cloneData])


    }
    // let objArray = [{name: 'John', age: 30}, {name: 'Jane', age: 25}, {name: 'Bob', age: 40}];
    // let indexToDelete = 1; // index of the object to delete

    // objArray.splice(indexToDelete, 2); // remove the object at indexToDelete

    // console.log("objArray=",objArray); // Output: [{name: 'John', age: 30}, {name: 'Bob', age: 40}]

    const changeTextForsize = (value, key, getindex,getindex1) => {
      const cloneTables = [...tables1]
      console.log('cloneTables=',cloneTables)
      const datarow=cloneTables[getindex1]
      console.log("datarow=",datarow)
      const object=datarow[getindex]
      console.log("object=",object)
      object[key]=value;
      const cloneData=[...datarow]
      console.log("cloneData=",cloneData)
      cloneData[getindex]={...object};
      setArraydata([[...cloneData]])

      // const object = { ...listTextw1[index] };
      // object[key] = value;
      // const cloneData = [...listtext];
      // cloneData[index] = { ...object };
      // setListText([...cloneData]);
      // setListTextw([cloneData[index]]);
    };

    const Onclicktextlist=(index1,index)=>{
      setGetindex(index)
      setGetindex1(index1)
      const cloneTables = [...tables1]
      const datarow=cloneTables[index1]
      const object=datarow[index]
      setListTextw1([object])
    }
    const OnclickTable=(index,index1)=>{
      console.log("index=",index)
      console.log("index1=",index1)
      setGetindex(index)
      setGetindex1(index1)
    }

    const addMored=()=>{
      let list;

      tables.map((data,index)=>{
            list=data
      })

      const newArray = [...list, getarray];
      console.log("newArray=",newArray)
      setTables([[...newArray]])


      }
      const addMored1=()=>{
            let list=[];
            for(let i =0;i<tableRow ;i++){
              const newObj = { name:'',value: '1',cols: 1,rows: 1,width:100 };
              list.push(newObj)
            }
            setTables1([[...list]])
            setListable1([...list])
            setListable2([...list])
            // let informdata={
            //   data:list
            // }
            // axios.post('/documents/api/input/creatresizetable',informdata).then((data)=>{
            //   OnloadDucument();
            // }).catch((err)=>{
            //   console.log(err)
            // })
        
        }
      const addMoreCol=()=>{
        
        let list =[];
        
        let item=[];
        // // const cloneTables = [...tables1[0]]
        // // console.log("clone=",cloneTables)
        // // // let array;
        // // // tables1.map((item)=>{
        // // //   array=item
        // // // })
        // //   const arr =tables1.map((data)=>{
        // //     return data
        // //    })
        // //    console.log("arr=",arr[0])
        // // console.log("array=",array)
        // const cloneTables = [...tables1[0]];
        // console.log("cloneTables=",cloneTables)
        // // const newObj = [{ name:'',value: '1',cols: 1,rows: 1,width:100 }];
        // // console.log('newOb=',newObj)
   

       
      //  axios.get('/documents/api/input/list').then((data)=>{
      //   setvales([...data?.data?.result])
     
          
      //   })
      //   console.log("x=",vales)
        // for(let i=0 ; i< tableColumn; i++){
        //   const newObj = { name:'',value: '1',cols: 1,rows: 1,width:100 };
        //   list.push(newObj)
        // }
    
        for(let i = 0 ; i< tableColumn; i++){
          let row=tableRow
          let data;
          if(row == 2){
            data=[{ name:'',value: '1',cols: 1,rows: 1,width:50 },{ name:'',value: '1',cols: 1,rows: 1,width:50 }]
            
          }else if(row == 3){
            data=[{ name:'',value: '1',cols: 1,rows: 1,width:50 },{ name:'',value: '1',cols: 1,rows: 1,width:50 },{ name:'',value: '1',cols: 1,rows: 1,width:50 }]
          
          }else if(row == 4){
            data=[{ name:'',value: '1',cols: 1,rows: 1,width:50 },{ name:'',value: '1',cols: 1,rows: 1,width:50 },{ name:'',value: '1',cols: 1,rows: 1,width:50 },{ name:'',value: '1',cols: 1,rows: 1,width:50 }]
          
          }
          item.push(data)
        }
        setTables1(item)
      }

      const OnloadDucument=()=>{
        axios.get('/documents/api/input/list').then((data)=>{
          console.log("daltalll=",[...data?.data?.result])
         
          // setTables1([...data?.data?.result])
          //  setDatalist([...data?.data?.result])
        }).catch((err)=>{
            console.log(err)
        })
    }
      useEffect(()=>{
        OnloadDucument()
      },[])

    

    const OnAddText = () => {
      setListText([...listtext,{name: "",positionX: "",positionY: "",width: "",height: ""
      }]);
    };

    const onCreateTable = () => {
        if (!tableRow || !tableColumn) return
        const newItem = {
          name:'',
          positionX: 0,
          positionY: 0,
          width: 749,
          height: 200,
          type: 'table',
          text: 'none',
          rowCount: tableRow,
          columnCount: tableColumn
        }
        const cloneData = [...data]
        cloneData.push(newItem)
        setData([...cloneData])
      }

      
    return(
        <>
        <div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
        <div style={{backgroundColor:'#3f51b5', border: '1px solid #ccc',borderRadius:3,width:100,cursor:'pointer'}}>
          <TocIcon style={{color:'#fff'}} />
          <small style={{color:'#fff'}} onClick={()=>{OnAddText()}} >Add Text</small>
        </div>
        <div style={{backgroundColor:'#3f51b5', border: '1px solid #ccc',borderRadius:3,width:100,cursor:'pointer'}}>
          <TocIcon style={{color:'#fff'}} />
          <small style={{color:'#fff'}} onClick={()=>{OnAddText()}} >Add lable</small>
        </div>
        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:150,marginLeft:10,cursor:'pointer'}} onClick={()=>{onCreateTable()}}>
          <AddIcon style={{color:'#fff'}} />
          <small style={{color:'#fff'}} >Create Table</small>
        </div>
        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:150,marginLeft:10,cursor:'pointer'}}>
          <SystemUpdateAltIcon style={{color:'#fff'}} />
          <small style={{color:'#fff'}} >Download All Files</small>
        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',marginLeft:10}}>
            <div>
                <input value={tableRow} onChange={e => setTableRow(e.target.value)} placeholder='Row' style={{width:60}}/>
            </div>
            <div style={{marginLeft:10}}>
                <input value={tableColumn} onChange={e => setTableColumn(e.target.value)} style={{width:60}} placeholder='Column'/>
            </div>
        </div>
        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:150,marginLeft:10,cursor:'pointer'}} >
          <small style={{color:'#fff'}} onClick={addMored1} >add lines</small>
        </div>
        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:150,marginLeft:10,cursor:'pointer'}}>
          <small style={{color:'#fff'}} onClick={addMoreCol} >Col</small>
        </div>

      </div>
       <div style={{height:20}}>
       </div>
       <div>
        {/* {JSON.stringify(listtext)} */}
        {/* {JSON.stringify(arraydata)}<br/> */}
       
        
       
        {/* {JSON.stringify(dataList)} */}
        {/* {JSON.stringify(datatable)} */}
      </div>
      <div style={{paddingTop:20}}>
          {JSON.stringify(tables1)}
      </div>
      <div>
      
      <table style={{border:'1px solid gray'}}>
        {
        tables && tables.map((item,index1)=>{
          return(
            <>
            <tr key={index1} style={{width:`${item.width}px`,border:'1px solid gray'}}>
              {
                item.map((data,index)=>{
                 
                  return(
                    <>
                    <td key={index} style={{border:'1px solid gray',width:`${data.width}px`}}  colSpan={data?.cols} rowSpan={data?.rows}>
                      <input
                      value={data?.cols}
                      onChange={(e)=>{changeText(e.target.value,'cols',index1,index)}}
                      />

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
      <div style={{height:20}}>

      </div>
      

      <table style={{border:'1px solid gray'}}>
        {
        tables1 && tables1.map((item,index1)=>{
          return(
            <>
           
            <tr key={index1} style={{width:`${item.width}px`,border:'1px solid gray'}}>
              {
                item.map((data,index)=>{
                  return(
                    <>
                    <td key={index} style={{border:'1px solid gray',width:`${data.width}px`}}  colSpan={data.cols} rowSpan={data.rows}>
                      <input
                      value={data?.name}
                      onChange={(e)=>{changeText1(e.target.value,'name',index1,index)}}
                      onClick={()=>{OnclickTable(index,index1)}}
                      style={{width:"100%",height:'100%'}}
                      />
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
      <table>
        <tr>
          <td style={{border:'1px solid gray',height:10}}>
            <input />
          </td>
          <td style={{border:'1px solid gray'}}>
            <input />
          </td>
        </tr>
      </table>
      <div style={{height:20}}>

      </div>
      <div>
        <input
        value={inputValues}
        placeholder="rows"
        onChange={(e)=>changeText2(e.target.value,'rows',getindex,getindex1)}
        />
        <input
        placeholder="cols"
        value={inputValues1}
        onChange={(e)=>changeText3(e.target.value,'cols',getindex,getindex1)}
        />
      </div>
      <div style={{height:20}}>

      </div>
      <div>
        <small style={{cursor:'pointer'}} onClick={()=>{DeleteChangeText(getindex,getindex1)}}>delete</small>
      </div>
      <div style={{display:'flex',flexDirection:'column',marginLeft:10}}>
            {
                listTextw1 && listTextw1.map((e,index)=>{
                  return(
                    <>
                    <ComponentWidthAndHeigh
                    key={index}
                    changeTextForsize={changeTextForsize}
                    e={e}
                    getindex={getindex}
                    getindex1={getindex1}
                 
                    />
                    </>
                  )
                })
              }
      </div>   
      </div>
      </div>
        
        </>
    )

}
function RowComponent({changeText1,data,index1,index}) {
  return(
    <>
            <input
                 value={data?.name}
                 onChange={(e) => changeText1(e.target.value, "name", index,index1)}
         
       
            />
    </>
  )

}
function RowComponentTD({changeText1,data,index1,index}) {
  return(
    <>
            <input
                 value={data?.name}
                 onChange={(e) => changeText1(e.target.value, "name", index,index1)}
         
       
            />
    </>
  )

}
function ComponentWidthAndHeigh({changeTextForsize,e,getindex,getindex1}) {
  return(
    <>
            
            <input
                 placeholder="Name"
                 value={e?.name}
                 onChange={(e) => {changeTextForsize(e.target.value , "name", getindex,getindex1)}}
                 style={{
                  width:140,
                  height:25,
                  marginLeft:10
                 }} 
            />
            
    </>
  )

}