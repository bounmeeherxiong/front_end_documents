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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookies from 'js-cookie';
import Pagination from '@material-ui/lab/Pagination';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import { Spinner } from "react-bootstrap";
import { LoginContext } from "../page/contexts/LoginContext";
import SaveIcon from '@material-ui/icons/Save';
import WarningIcon from '@material-ui/icons/Warning';
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
export default function UserFormList() {
  const classes = useStyles();
  const Navigate = useNavigate();
  const [dataList, setDataList] = useState([])
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [listdata, setListdata] = useState([])
  const [employee_id, setEmployee_id] = useState('')
  const [showSave, setShowSave] = useState(false);
  const [number, setNumber] = useState()
  const [depart_id, setDepart_id] = useState('')
  const [g_department_id, setG_department_id] = useState('')
  const [listallemployee, setListallemployee] = useState([]);
  const [listshowemployee, setListshowemployee] = useState([])
  const [listpersion, setListpersion] = useState([]);
  const [listcartdata, setListcartdata] = useState([])
  const [employee_name, setEmployee_name] = useState('')
  const [created_by_id, setcreated_by_id] = useState('')
  const [created_by_name, setCreated_by_name] = useState('')
  const [listdepartment, setListdepartment] = useState([])
  const [openingsetting, setOpeningsetting] = useState(false)
  const [ducument_no, setDucument_no] = useState(false)
  const [listempl, setListempl] = useState([])
  const [form_uid, setForm_uid] = useState('')
  const [count, setCount] = useState([])
  const [signature,setSignature]=useState('')
  const [isLoading, setIsLoading,] = useState(false);
  const { setId, setShowUserEditFormScreen } = useContext(LoginContext)
  let users = Cookies.get("user");
  let data = JSON.parse(users)
  let user_id = data?.user?.user_id
  const handleClosedel = () => {
    setShow(false);
  }
  const handleClosedel1 = () => {
    setShow1(false);
  }
  const handleShow = () => setShow(true);

  const handleShow1 = () => { setShow1(true) }

  const OnloadFormData = () => {
    axios.get('/api/req/request-forms-user').then((data) => {
      console.log("req-timeline=", data)
      setDataList([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnloadstatusFormData = () => {
    axios.get(`/api/setting/Select-FormStatus/0`).then((data) => {
      // console.log("data=",[...data?.data?.count][0].counts)
      // setCount([...data?.data?.counts][0].counts)
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnloadAllEmployee = () => {
    axios.get('/api/setting/all-employee').then((data) => {
      setListallemployee([...data?.data?.results])
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
    // Navigate(`/UserEditFrom/${id}`)
    setId(id)
    setShowUserEditFormScreen(true)
  }
  const onGoViewApproved = (id) => {
    Navigate(`/ViewApproved/${id}`)
  }
  const Onsetting = (e, name, req_uid) => {
    setIsLoading(true);
    let infordata = {
      employee_id: e
    }
    setForm_uid(req_uid)
    setCreated_by_name(name)
    setcreated_by_id(e)
    axios.post('/api/setting/all-employee-in-department', infordata).then((data) => {
      setListdata([...data?.data?.results])
      setIsLoading(false);
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnInsertbyapproverperson = () => {
    setIsLoading(true)
    let infordatada = {
      req_id: form_uid,
      levels: 1,
      approver: employee_id,
      created_by: user_id,
      signature_status: 0,
      signature_uid: 0,
      request_status: 1,
      tokens: 'ExponentPushToken[oypPPJFY0j4BPAPGNHzMUB]',
      title: 'by test',
      subtitle: "testing",
      content: 'for me'
    }
    axios.post('/api/req-setting/insert', infordatada).then((data) => {
      setShow1(false)
      setIsLoading(false)
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
  const handleCloseOpenting = () => {
    setOpeningsetting(false)

  }
  const handleCloseDucument_on = () => {
    setDucument_no(false)
  }
  const handleClose = () => {
    setShowSave(false)
  };

  const OnOptionschoose_number = (e) => {
    setNumber(e)

  }
  const OnOptionsDepart = (e) => {
    setG_department_id(e)
    let list = listallemployee.filter((el) => el.department_id == e)
    setListshowemployee([...list])
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
  const Oncreateadd = () => {
    const list = listshowemployee.filter((el) => el.employee_id == employee_id)
    const name = [...list][0].employee_name
    const cloneDataEm = [...listcartdata]
    cloneDataEm.push(...list)
    setListcartdata([...cloneDataEm])
    const cloneData = [...listpersion]
    cloneData.push({ approver_id: employee_id })
    setListpersion([...cloneData])
  }
  const CreateEmployeeApproved = () => {
    setIsLoading(true)
    let createdate = {
      max_approval: number,
      req_id: form_uid,
      details: listpersion
    }
    axios.post('/api/approval-req-setting/create-approval', createdate).then((data) => {
      setShow1(false);
      setIsLoading(false)
      setNumber('');
      setListpersion('');
      setG_department_id('');
      setEmployee_id('');
      setListcartdata('')
      OnloadFormData();
    }).catch((err) => {
      console.log(err)
    })
  }
  const CreateSenddate = (req_id, approval_id, doc_no,signature_id) => {
    if(signature_id === null){
      return ;
    }

    if (doc_no === null) {
      setDucument_no(true)
    } else {
      if (approval_id === null) {
        setOpeningsetting(true)
      } else {
        setShowSave(true)
        setIsLoading(true)
        let informdata = {
          req_id: req_id,
          approver: approval_id,
          comment:'',
        }
        axios.post('/api/req-setting/insert-setting', informdata).then((data) => {
          setIsLoading(false)
          OnloadFormData();
          setShowSave(false)
        }).catch((err) => {
          console.log(err)

        })

      }
    }
  }
  useEffect(() => {
    OnloadFormData()
    OnloadstatusFormData();
    OnloadDepartment();
    OnloadAllEmployee();
  }, [])
  return (
    <>
      <div style={{ width: '100%' }}>
        <Modal show={ducument_no} onHide={handleCloseDucument_on} style={{ paddingTop: 50 }} size="sm">
          <Modal.Header closeButton>
            <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10, color: '#FF7733' }}>Warning</span>
          </Modal.Header>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <WarningIcon style={{ color: '#FF7733', marginLeft: 40, marginTop: 20, fontSize: 40 }} />
            <small style={{ fontSize: 30, marginRight: 30, marginTop: 20 }}>Please setting Ducument no</small>
          </div>
        </Modal>

        <Modal show={openingsetting} onHide={handleCloseOpenting} style={{ paddingTop: 50 }} size="sm">
          <Modal.Header closeButton>
            <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10, color: '#FF7733' }}>Warning</span>
          </Modal.Header>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <WarningIcon style={{ color: '#FF7733', marginLeft: 40, marginTop: 20, fontSize: 40 }} />
            <small style={{ fontSize: 30, marginRight: 30, marginTop: 20 }}>Please setting</small>
          </div>
        </Modal>
        <Modal show={showSave} onHide={handleClose} style={{ paddingTop: 50 }} size="sm">
        <Modal.Header closeButton>
          <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10, color: '#2eb85c' }}>Peding..</span>
        </Modal.Header>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          {!isLoading ? (
            <>
              <CheckCircleIcon style={{ color: '#2eb85c', marginLeft: 40, marginTop: 20, fontSize: 40 }} />
              <small style={{ fontSize: 30, marginRight: 35, marginTop: 20 }}>Successfully....</small>

            </>
          ) : (
            <>
              <CircularProgress style={{ marginLeft: 40, marginTop: 20, fontSize: 40 }} />
              <small style={{ fontSize: 30, marginRight: 30, marginTop: 20 }}>Waiting....</small>
            </>)
          }
        </div>
      </Modal>
        <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="lg">
          <Modal.Header closeButton>
            <span style={{ fontSize: 14, paddingTop: 10 }}>
              Setting </span>
          </Modal.Header>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
              <small style={{ fontWeight: 'bold', fontSize: 15, marginTop: 25 }}>Choose Department:</small>
              <div style={{ width: '60%' }}>
                <FormControl className={classes.formControl} style={{ width: '90%' }}>
                  <InputLabel id="demo-simple-select-label">Choose Department</InputLabel>
                  <Select
                    onChange={(e) => OnOptions(e.target.value)}
                    value={depart_id}
                  >
                    {
                      listdepartment && listdepartment.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item?.department_id}>{item?.department_name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: 10, marginTop: 10, width: '80%' }}>
              <small style={{ fontWeight: 'bold', fontSize: 15, marginTop: 20 }}>Choose Employee:</small>
              <div style={{ width: '50%', marginTop: -10 }}>
                <FormControl className={classes.formControl} style={{ width: '90%', marginRight: 10 }}>
                  <InputLabel id="demo-simple-select-label">Choose Employee</InputLabel>
                  <Select
                    onChange={(e) => OnOptions1(e.target.value)}
                    value={employee_id}
                  >
                    {
                      listempl && listempl.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item?.employee_id}>{item?.employee_name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10, marginRight: 15 }}>
            <Button
              style={{ marginBottom: 20, marginRight: 20 }}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon>send</SendIcon>}
              onClick={() => { Oncreate() }}
            >
              {!isLoading ? (
                <>
                  Send
                </>
              ) : (
                <>
                  {
                    <Spinner animation="border" variant="light" size='sm' />
                  }
                </>)
              }
            </Button>
          </div>
        </Modal>
        <Modal show={show1} onHide={handleClosedel1} style={{ paddingTop: 50 }} size="lg">
          <Modal.Header closeButton>
            <span style={{ fontSize: 20, paddingTop: 10, fontWeight: 'bold' }}>
              Setting </span>
          </Modal.Header>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginRight: 10 }}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Approved amout person</InputLabel>
                <Select
                  onChange={(e) => OnOptionschoose_number(e.target.value)}
                  value={number}
                >
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} style={{ marginTop: 10 }}>

                <InputLabel id="demo-simple-select-label">Choose Department</InputLabel>
                <Select
                  onChange={(e) => OnOptionsDepart(e.target.value)}
                  value={g_department_id}
                >
                  {
                    listdepartment && listdepartment.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.department_id}>{item?.department_name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} style={{ marginTop: 10 }}>
                <InputLabel id="demo-simple-select-label">Approved person</InputLabel>
                <Select
                  onChange={(e) => OnOptions1(e.target.value)}
                  value={employee_id}
                >
                  {
                    listshowemployee && listshowemployee.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.employee_id}>{item?.employee_name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            </div>
            <div style={{ width: '50%', marginTop: 20, border: '1px solid #ccc', backgroundColor: 'white', borderRadius: 10, marginRight: 20 }}>
              <small style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 10 }}>List Approved person</small>
              <TableContainer>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      listpersion.length == 0 ? (
                        <>
                          <div>
                            <small style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 100 }}>There are no data!</small>
                          </div>

                        </>) : (
                        <>
                          {
                            listcartdata && listcartdata.map((data, index) => {
                              return (
                                <>
                                  <TableRow key={index}>
                                    <TableCell style={{ width: 10 }}>{index + 1}</TableCell>
                                    <TableCell align="left">{data?.employee_name}</TableCell>

                                  </TableRow>
                                </>
                              )
                            })
                          }

                        </>
                      )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginLeft: 10, marginRight: 15 }}>
            <Button
              style={{ marginBottom: 20 }}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon>send</SendIcon>}
              onClick={() => { Oncreateadd() }}
            >
              Add Employee
            </Button>
            <Button
              style={{ marginBottom: 20 }}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SaveIcon>Save and new</SaveIcon>}
              onClick={() => { CreateEmployeeApproved() }}
            >
              {!isLoading ? (
                <>
                  Save&New
                </>
              ) : (
                <>
                  {
                    <Spinner animation="border" variant="light" size='sm' />
                  }
                </>)
              }
            </Button>
          </div>
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
              dataList.length == 0 ? (
                <>
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
                          <TableCell align="right">Ducument No</TableCell>
                          <TableCell align="right">Datetime</TableCell>
                          <TableCell>Checking Status</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          dataList && dataList.map((data, index) => {
                            return (

                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data?.title}</TableCell>
                                <TableCell align="right">{data?.doc_no}</TableCell>
                                <TableCell align="right">{moment(data?.created_at).format('DD-MM-YYYY')}</TableCell>
                                {
                                  data?.req_status == 0 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Created</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.req_status == 1 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>waiting</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.req_status == 2 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#f9b115', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Completed </small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.req_status == 3 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>requested</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.req_status == 4 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>In progress</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.req_status == 5 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>approved</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.req_status == 6 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>rejected </small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.req_status == 7 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>canceled </small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.req_status == 8 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>draft </small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                <TableCell style={{ cursor: 'pointer' }}>
                                  {
                                    data?.docno_status == 1 ? (<>
                                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }}>
                                          <small style={{ color: 'white' }}>edit</small>
                                        </div>
                                        <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer' }}>
                                          <small style={{ color: 'white' }} >Setting</small>
                                        </div>
                                      </div>
                                    </>) : (<>
                                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }} onClick={() => { onEditform(data?.req_uid) }}>
                                          <small style={{ color: 'white' }}>edit</small>
                                        </div>
                                        {
                                          data?.docno_status == 2 ? (<>
                                            <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer' }} onClick={() => { Onsetting(data?.created_by, data?.username, data?.req_uid); handleShow1() }}>
                                              <small style={{ color: 'white' }} >Setting</small>
                                            </div>

                                          </>) : (<>
                                            <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer' }} onClick={() => { Onsetting(data?.created_by, data?.username, data?.req_uid); handleShow() }}>
                                              <small style={{ color: 'white' }} >Setting</small>
                                            </div>
                                          </>)
                                        }
                                        <div style={{ backgroundColor: '#33D7FF', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer', marginRight: 5 }}
                                          onClick={() => { CreateSenddate(data?.req_uid, data?.approval_id, data?.doc_no,data?.signature_id) }}>
                                          <small style={{ color: 'white' }} >
                                          
                                            Send
                                          </small>
                                        </div>
                                      </div>
                                    </>)
                                  }
                                </TableCell>

                              </TableRow>


                            )
                          })
                        }

                      </TableBody>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Form Name</TableCell>
                          <TableCell align="right">Ducument No</TableCell>
                          <TableCell align="right">Datetime</TableCell>
                          <TableCell>Checking Status</TableCell>
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
