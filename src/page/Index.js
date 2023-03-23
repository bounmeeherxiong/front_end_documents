import React from 'react'
import PublishIcon from '@material-ui/icons/Publish';
import AddIcon from '@material-ui/icons/Add';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

const index = () => {
  return (
    <>
      <div>
        <small>All Files</small>
      </div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
        <div style={{backgroundColor:'#3f51b5', border: '1px solid #ccc',borderRadius:3,width:100,cursor:'pointer'}}>
          <PublishIcon style={{color:'#fff'}} />
          <small style={{color:'#fff'}}>Upload</small>
        </div>
        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:150,marginLeft:10,cursor:'pointer'}}>
          <AddIcon style={{color:'#fff'}} />
          <small style={{color:'#fff'}} >Create Folder</small>
        </div>
        <div style={{backgroundColor:'#3f51b5',border: '1px solid #ccc',borderRadius:3,width:150,marginLeft:10,cursor:'pointer'}}>
          <SystemUpdateAltIcon style={{color:'#fff'}} />
          <small style={{color:'#fff'}} >Download All Files</small>
        </div>
      </div>
    </>
  )
}
export default index
