import React, { useState, useEffect,useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { api } from "./page/contexts/api";
import Home from "./template/home";
import Form from "./page/Form";
import Index from "./page/Index";
import axios from "axios";
import { LoginContext } from "./page/contexts/LoginContext";
import FormRecruitmentRequisition from "./page/FormRecruitmentRequisition";
import CreateForm from "./page/CreateForm";
import FormList from "./page/FormList";
import EditForm from "./page/EditForm";
import Formmain from "./page/Formmain";
import RequestForm from "./page/RequestForm";
import ViewForm from "./page/ViewForm";
import ViewApproved from "./page/ViewApproved";
import Cookies from 'js-cookie';
import Login from "./page/Login";
import setAuthToken from "./setAuthToken"
import { Department } from "./page/Department";
import { UserusingForm } from "./page/UserusingForm";
import UserFormList from "./page/UserFormList";
import { UserEditFrom } from "./page/UserEditFrom";
import { AddEmployee } from "./page/AddEmployee";
import { Doc_no } from "./page/Doc_no";
import { UserCheckDoc_no } from "./page/UserCheckDoc_no";
import { ListFormFromRequest } from "./page/ListFormFromRequest";
import Viewdetailform from "./page/Viewdetailform";
axios.defaults.baseURL = api;
function App() {
  const [listItemCart, setListItemCart] = useState([])
  const [list,setList]=useState([])
  const [dataList,setDataList]=useState([])
  const OnloadListItemcard = () => {
    axios.get('/api/document/get-itemsCart').then((data) => {
      setListItemCart([...data?.data?.results])
    }).catch((err) => {
    })
  }
  useEffect(() => {
 
  }, []);
  let users = Cookies.get("user");
  if(!users){
    return(
      <Login/>
    )
  }else{
    let data = JSON.parse(users)
    if (data.token) {
      setAuthToken(data.token)
    }
  } 
  
  return (
    <div>
      <LoginContext.Provider value={{listItemCart,OnloadListItemcard,dataList,setDataList}}>
      <Router>
        <Home>
          <Routes>
            <Route exact path="/" element={< Index />}></Route>
            <Route exact path="/Index" element={< Index />}></Route>
            <Route exact path="/Form/:id" element={< Form />}></Route>
            <Route exact path="/EditForm/:id" element={< EditForm/>}></Route>
            <Route exact path="/Viewdetailform/:id" element={< Viewdetailform/>}></Route>
            <Route exact path="/Department/:id" element={< Department/>}></Route>
            <Route exact path="/UserEditFrom/:id" element={< UserEditFrom />}></Route>
            <Route exact path="/UserCheckDoc_no/:id" element={< UserCheckDoc_no />}></Route>
            <Route exact path="/FormList" element={< FormList />}></Route>
            <Route exact path="/AddEmployee" element={< AddEmployee />}></Route>
            <Route exact path="/Doc_no" element={< Doc_no />}></Route>
            <Route exact path="/UserFormList" element={< UserFormList />}></Route>
            <Route exact path="/CreateForm" element={< CreateForm />}></Route>
            <Route exact path="/Formmain" element={< Formmain />}></Route>
            <Route exact path="/RequestForm" element={< RequestForm />}></Route>
            <Route exact path="/ViewForm/:id" element={< ViewForm />}></Route>
            <Route exact path="/UserusingForm/:id" element={< UserusingForm />}></Route>
            <Route exact path="/ViewApproved/:id" element={< ViewApproved />}></Route>
            <Route exact path="/FormRecruitmentRequisition" element={< FormRecruitmentRequisition />}></Route>
            <Route exact path="/ListFormFromRequest" element={< ListFormFromRequest />}></Route>
          </Routes>
        </Home>
      </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
