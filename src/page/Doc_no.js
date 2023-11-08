import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import moment from "moment";
import { Modal } from "react-bootstrap";
import Cookies from 'js-cookie';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import { LoginContext } from "../page/contexts/LoginContext";
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

export const Doc_no = () => {
  const classes = useStyles();
  const Navigate = useNavigate();
  const [dataList, setDataList] = useState([])
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [listdata, setListdata] = useState([])
  const [employee_id, setEmployee_id] = useState('')
  const [depart_id, setDepart_id] = useState('')
  const [employee_name, setEmployee_name] = useState('')
  const [created_by_id, setcreated_by_id] = useState('')
  const [created_by_name, setCreated_by_name] = useState('')
  const [listdepartment, setListdepartment] = useState([])
  const [listempl, setListempl] = useState([])
  const [form_uid, setForm_uid] = useState('')
  const [count, setCount] = useState([])
  let users = Cookies.get("user");
  let data = JSON.parse(users)
  let user_id = data?.user?.user_id
  const { setId, setShowUserCheckFormScreen } = useContext(LoginContext)
  const handleClosedel = () => {
    setShow(false);
  }
  const handleClosedel1 = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleShow1 = () => { setShow1(true) }

  const OnloadFormData = () => {
    axios.get(`/api/no/Get-All-Request-DocNumber`).then((data) => {
      console.log("Loading=", data)
      setDataList([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })

  }
  const OnloadstatusFormData = () => {
    axios.get(`/api/setting/Select-FormStatus/${user_id}/0`).then((data) => {

    }).catch((err) => {
      console.log(err)
    })
  }
  const OnloadDepartment = () => {
    axios.get('/api/no/get-department').then((data) => {
      setListdepartment([...data?.data?.results])
    }).catch((err) => (
      console.log(err)
    ))
  }

  const onEditform = (id) => {


    // Navigate(`/UserCheckDoc_no/${id}`)
    setId(id)
    setShowUserCheckFormScreen(true)
  }
  const onGoViewApproved = (id) => {
    Navigate(`/ViewApproved/${id}`)
  }

  const Onsetting = (e, name, req_uid) => {
    let infordata = {
      employee_id: e
    }
    setForm_uid(req_uid)
    setCreated_by_name(name)
    setcreated_by_id(e)
    axios.post('/api/setting/all-employee-in-department', infordata).then((data) => {
      setListdata([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })

  }
  const OnOptions = (e) => {
    setDepart_id(e)
    axios.get(`/api/no/Get-Employee-By-DepartmentID/${e}`).then((data) => {
      setListempl([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
    // let list=listdata.filter((el)=>el.employee_id.includes(e))
    //   setEmployee_name([...list][0].employee_name)
  }
  const OnOptions1 = (e) => {
    setEmployee_id(e)
  }

  const Oncreate = () => {
    let createdata = {
      req_id: form_uid,
      employee_id: employee_id,
    }
    axios.post('/api/no/Insert-Request-Numbers', createdata).then((data) => {
      console.log(data)
      setShow(false)
      OnloadFormData()
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    OnloadFormData()
    OnloadstatusFormData();
    OnloadDepartment();
  }, [])
  return (
    <>

      <div style={{ width: '100%' }}>
        <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="sm">
          <Modal.Header closeButton>
            <span style={{ fontSize: 14, paddingTop: 10 }}>
              Setting </span>
          </Modal.Header>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
            <div>
              <small style={{ fontWeight: 'bold', fontSize: 15 }}>Approved by:</small>
              <select
                onChange={(e) => OnOptions(e.target.value)}
                value={depart_id}
              >
                <option>====select===</option>
                {
                  listdepartment && listdepartment.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item?.department_id}>{item?.department_name}</option>

                      </>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
            <div>
              <small style={{ fontWeight: 'bold', fontSize: 15 }}>Approved by:</small>
              <select
                onChange={(e) => OnOptions1(e.target.value)}
                value={employee_id}
              >
                <option>====select===</option>
                {
                  listempl && listempl.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item?.employee_id}>{item?.employee_name}</option>

                      </>
                    )
                  })
                }
              </select>

            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10, marginRight: 15 }}>
            <button
              style={{
                border: '1px solid #ccc',
                borderRadius: 3,
                paddingLeft: 20, paddingRight: 20,
                backgroundColor: '#3f51b5',
                color: '#fff'
              }}
              onClick={() => { Oncreate() }}
            >Save</button>
          </div>
        </Modal>

        <Modal show={show1} onHide={handleClosedel1} style={{ paddingTop: 50 }} size="sm">
          <Modal.Header closeButton>
            <span style={{ fontSize: 14, paddingTop: 10 }}>
              Setting </span>
          </Modal.Header>
          {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
            <div>
              <small style={{ fontWeight: 'bold', fontSize: 15 }}>Approved by:</small>
              <select
                onChange={(e) => OnOptions(e.target.value)}
                value={employee_id}
              >
                <option>====select===</option>
                {
                  listdata && listdata.map((item, index) => {
                    return (
                      <>
                        <option key={index} value={item?.employee_id}>{item?.employee_name}</option>

                      </>
                    )
                  })
                }
              </select>

            </div>

          </div> */}
          {/* <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10, marginRight: 15 }}>
            <button
              style={{
                border: '1px solid #ccc',
                borderRadius: 3,
                paddingLeft: 20, paddingRight: 20,
                backgroundColor: '#3f51b5',
                color: '#fff'
              }}
              onClick={() => { Oncreate() }}
            >Save</button>
          </div> */}

        </Modal>
        <Breadcrumbs aria-label="breadcrumb" style={{ backgroundColor: '#ebedef' }}>
          <Link color="inherit" href="/" className={classes.link}>
            <HomeIcon className={classes.icon} />
            <small style={{ color: '#2106f3' }}>Home</small>
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <GrainIcon className={classes.icon} />
            <small style={{ color: '#2106f3' }}>Informations</small>
          </Typography>

        </Breadcrumbs>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ background: '#2eb85c', width: 200, height: 200, borderRadius: 5 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Created</small>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10, marginRight: 10, cursor: 'pointer' }}>({count})</small>
              </div>
              <div style={{ width: '100%', backgroundColor: 'white', height: 2, marginTop: 10 }}></div>
              <FolderIcon style={{ width: 150, height: 150, color: 'white', marginLeft: 25, marginTop: 0 }} />
            </div>
            <div style={{ background: '#e55353', width: 200, height: 200, borderRadius: 5, marginLeft: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Requested</small>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10, marginRight: 10, cursor: 'pointer' }}>(0)</small>
              </div>
              <div style={{ width: '100%', backgroundColor: 'white', height: 2, marginTop: 10 }}></div>
              <FolderIcon style={{ width: 150, height: 150, color: 'white', marginLeft: 25, marginTop: 0 }} />
            </div>

            <div style={{ background: '#f9b115', width: 200, height: 200, borderRadius: 5, marginLeft: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>In Progress</small>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10, marginRight: 10, cursor: 'pointer' }}>(0)</small>
              </div>
              <div style={{ width: '100%', backgroundColor: 'white', height: 2, marginTop: 10 }}></div>
              <FolderIcon style={{ width: 150, height: 150, color: 'white', marginLeft: 25, marginTop: 0 }} />
            </div>
            <div style={{ background: '#3399ff', width: 200, height: 200, borderRadius: 5, marginLeft: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Draft</small>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10, marginRight: 10, cursor: 'pointer' }}>(0)</small>
              </div>
              <div style={{ width: '100%', backgroundColor: 'white', height: 2, marginTop: 10 }}></div>
              <FolderIcon style={{ width: 150, height: 150, color: 'white', marginLeft: 25, marginTop: 0 }} />
            </div>
            <div style={{ background: '#33D7FF', width: 200, height: 200, borderRadius: 5, marginLeft: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Approved</small>
                <small style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10, marginRight: 10, cursor: 'pointer' }}>(0)</small>
              </div>
              <div style={{ width: '100%', backgroundColor: 'white', height: 2, marginTop: 10 }}></div>
              <FolderIcon style={{ width: 150, height: 150, color: 'white', marginLeft: 25, marginTop: 0 }} />
            </div>

          </div>
          <div style={{ width: '100%', marginTop: 20, border: '1px solid #ccc', backgroundColor: 'white', borderRadius: 10 }}>
            <small style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>All Form</small>
            {
              dataList.length == 0 ? (<>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: 10, marginBottom: 20 }}>
                  <small style={{ fontSize: 40, fontWeight: 'bold', color: "#2106f3" }}>There are no data!</small>
                </div>
              </>) : (<>
                <TableContainer style={{ marginLeft: 10 }}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Form Name</TableCell>
                        <TableCell>Datetime</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        dataList && dataList.map((data, index) => {
                          return (
                            <>
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data?.title}</TableCell>
                                <TableCell>{moment(data?.created_at).format('DD-MM-YYYY')}</TableCell>

                                {
                                  data?.createdstatus == 1 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#f9b115', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Requested</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.createdstatus == 2 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Completed....</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                <TableCell style={{ cursor: 'pointer' }}>
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }} onClick={() => { onEditform(data?.req_id) }}>
                                      <small style={{ color: 'white' }}>View</small>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            </>
                          )
                        })
                      }
                    </TableBody>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Form Name</TableCell>
                        <TableCell>Datetime</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                  </Table>
                </TableContainer>


              </>)
            }

          </div>
          {
            dataList.length == 0 ? (<>
            </>) : (<>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <small style={{ fontSize: 25 }}>Pagination:</small>
                  <Pagination count={10} variant="outlined" shape="rounded" />
                </div>

              </div>
            </>)
          }
        </div>

      </div>



    </>
  )
}
