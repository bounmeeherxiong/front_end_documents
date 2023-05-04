import React, { useState, useEffect } from "react";
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
import Testsize from "./page/Testsize"

axios.defaults.baseURL = api;
function App() {
  const [listItemCart, setListItemCart] = useState([])
  const OnloadListItemcard = () => {
    axios.get('/api/document/get-itemsCart').then((data) => {
      setListItemCart([...data?.data?.results])
    }).catch((err) => {

    })
  }

  useEffect(() => {


  }, []);
  return (
    <div>
      <LoginContext.Provider value={{listItemCart,OnloadListItemcard}}>
      <Router>
        <Home>
          <Routes>
            <Route exact path="/" element={< Index />}></Route>
            <Route exact path="/Index" element={< Index />}></Route>
            <Route exact path="/Form/:id" element={< Form />}></Route>
            <Route exact path="/EditForm/:id" element={< EditForm/>}></Route>
            <Route exact path="/Testsize" element={< Testsize/>}></Route>
            <Route exact path="/FormList" element={< FormList />}></Route>
            <Route exact path="/CreateForm" element={< CreateForm />}></Route>
            <Route exact path="/FormRecruitmentRequisition" element={< FormRecruitmentRequisition />}></Route>
          </Routes>
        </Home>
      </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
