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
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import { Modal } from "react-bootstrap";
import Cookies from 'js-cookie';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import { Spinner } from "react-bootstrap";
import SaveIcon from '@material-ui/icons/Save';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import TextField from '@material-ui/core/TextField';
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

export default function FormList() {
  const classes = useStyles();
  const Navigate = useNavigate();
  const [dataList, setDataList] = useState([])
  const [show, setShow] = useState(false);
  const [employee_id, setEmployee_id] = useState('')
  const [g_department_id, setG_department_id] = useState('')
  const [openingsetting, setOpeningsetting] = useState(false)
  const [successfully, setSuccessfully] = useState(false)
  const [listdepartment, setlistdepartment] = useState('')
  const [form_uid, setForm_uid] = useState('')
  const [listpersion, setListpersion] = useState([]);
  const [listallemployee, setListallemployee] = useState([]);
  const [listshowemployee, setListshowemployee] = useState([])
  const [listcartdata, setListcartdata] = useState([])
  const [number, setNumber] = useState()
  const [showtimeline, setShowtimeline] = useState(false)
  const [showSave, setShowSave] = useState(false);
  const [isLoading, setIsLoading,] = useState(false);
  const [dataLavel, setDataLavel] = useState([])
  const [dataUser, setDataUser] = useState([])
  const { setId, setshowformEditScreen } = useContext(LoginContext)
  let users = Cookies.get("user");
  let data = JSON.parse(users)
  // let user_id = data?.user?.user_id
  const handleClosedel = () => {
    setShow(false);
  }
  const handleClosetimeline = () => {
    setShowtimeline(false)
  }
  const handleCloseOpenting = () => {
    setOpeningsetting(false)

  }
  const Successfully = () => {
    setSuccessfully(false)
  }
  const handleOpen = () => {
    setShowSave(true)
  };

  const handleClose = () => {
    setShowSave(false)
  };
  const handleShow = () => setShow(true);
  const handleShowTimeline = () => setShowtimeline(true)
  const OnloadFormData = () => {
    axios.get('api/form/forms/').then((data) => {
      setDataList([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnLoadCount = () => {
    axios.get('/api/setting/all-approve').then((data) => {
      console.log("Count=", data)
    }).catch((err) => {
      console.log(err)
    })
  }
  // const OnloadstatusFormData = () => {
  //   axios.get(`/api/setting/Select-FormStatus/${user_id}/0`).then((data) => {
  //     setCount([...data?.data?.counts][0].counts)

  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }
  const OnlaodDepartment = () => {
    axios.get('/api/setting/all-department').then((data) => {
      setlistdepartment([...data?.data?.results])
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
  const OnloadInformationsTimeline = (form_id) => {
    axios.get(`/api/form/get-approval-data/${form_id}`).then((data) => {
      setDataLavel([...data?.data?.approvals])
      setDataUser([...data?.data?.users])
    }).catch((err) => {
      console.log(err)
    })

  }
  // const OnFindForm_id = (e_id) => {
  //   let lavel = dataLavel.filter((e) => e.form_id == e_id)
  //   console.log("lavel=",lavel)
  //   setListLavel([...lavel])
  // }
  const onEditform = (id) => {
    setId(id)
    setshowformEditScreen(true)
  }
  const onGoViewApproved = (id) => {
    Navigate(`/ViewApproved/${id}`)
  }

  const Onsetting = (form_id) => {
    // let infordata = {
    //   employee_id: e
    // }
    setForm_uid(form_id)
    // console.log("form_id=",id)
    // setcreated_by_id(e)
    // axios.post('/api/setting/all-employee-in-department', infordata).then((data) => {
    //   setListdata([...data?.data?.results])
    // }).catch((err) => {
    //   console.log(err)
    // })
  }

  const OnOptions = (e) => {
    setEmployee_id(e)
  }
  const OnOptionschoose_number = (e) => {
    setNumber(e)

  }
  const OnOptionsDepart = (e) => {
    setG_department_id(e)
    let list = listallemployee.filter((el) => el.department_id == e)
    setListshowemployee([...list])
  }

  const Oncreate = () => {
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
      form_id: form_uid,
      details: listpersion
    }
    axios.post('/api/approval-setting/create-approval', createdate).then((data) => {
      setShow(false);
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
  const CreateSenddate = (get_form_id, approval_id, formstatus) => {
    if (approval_id == null) {
      setOpeningsetting(true)

    } else {
      if (formstatus > 0) {
        setSuccessfully(true)
      } else {
        setShowSave(true)
        setIsLoading(true)
        let informdata = {
          form_id: get_form_id,
          approval_uid: approval_id
        }
        axios.post('/api/setting/insert-setting', informdata).then((data) => {
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
    OnlaodDepartment()
    OnloadAllEmployee();
    OnLoadCount();
  }, [])
  return (
    <>
      <Modal show={openingsetting} onHide={handleCloseOpenting} style={{ paddingTop: 50 }} size="sm">
        <Modal.Header closeButton>
          <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10, color: '#FF7733' }}>Warning</span>
        </Modal.Header>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <WarningIcon style={{ color: '#FF7733', marginLeft: 40, marginTop: 20, fontSize: 40 }} />
          <small style={{ fontSize: 30, marginRight: 30, marginTop: 20 }}>Please setting</small>
        </div>
      </Modal>

      <Modal show={successfully} onHide={Successfully} style={{ paddingTop: 50 }} size="sm">
        <Modal.Header closeButton>
          <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10, color: '#FF7733' }}>Successfully To Send</span>
        </Modal.Header>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <CheckCircleIcon style={{ color: '#2eb85c', marginLeft: 40, marginTop: 20, fontSize: 40 }} />
          <small style={{ fontSize: 30, marginRight: 35, marginTop: 20 }}>Successfully....</small>
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
      <Modal show={showtimeline} onHide={handleClosetimeline} style={{ paddingTop: 50 }} size="lg">
        <Modal.Header closeButton>
          <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10 }}>Timeline </span>
        </Modal.Header>
        <Timeline align="alternate">
          {dataLavel && dataLavel.map((item, index) => {
            // console.log("listLavel=",item)
            return (<>
              <TimelineItem key={index}>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    Create date:{moment(item?.created_at).format('DD-MM-YYYY HH:mm:ss')}
                  </Typography>
                  {
                    item?.levels == 0 ? (
                      <>
                        <Typography color="textSecondary" style={{ marginLeft: 10 }} >
                          Created Form..
                        </Typography>

                      </>
                    ) : item?.levels == 1 ? (
                      <>
                        {
                          item?.formstatus == 0 || item?.formstatus == 1 ? (
                            <>
                              <Typography color="textSecondary" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 10 }} >
                                Waiting..
                              </Typography>

                            </>
                          ) : (
                            <>
                              <Typography color="textSecondary" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 10 }} >
                                Approve
                              </Typography>
                            </>
                          )
                        }
                      </>
                    ) : item?.levels == 2 ? (
                      <>
                      </>
                    ) : item?.levels == 3 ? (
                      <>
                      </>
                    ) : item?.levels == 4 ? (
                      <>
                      </>
                    ) : item?.levels == 5 ? (
                      <>
                      </>
                    ) : null
                  }
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    {
                      item?.levels == 0 ? (
                        <>
                          <AccessAlarmIcon />

                        </>
                      ) : item?.levels == 1 ? (
                        <>
                          {
                            item?.formstatus == 0 || item?.formstatus == 1 ?
                              (
                                <>
                                  <AccessAlarmIcon />
                                </>
                              ) : (
                                <>
                                  <CheckCircleOutlineIcon />
                                </>
                              )
                          }
                        </>
                      ) : item?.levels == 2 ? (
                        <>
                          {
                            item?.formstatus == 0 || item?.formstatus == 1 ?
                              (
                                <>
                                  <AccessAlarmIcon />
                                </>
                              ) : (
                                <>
                                  <CheckCircleOutlineIcon />
                                </>
                              )
                          }

                        </>
                      ) : item?.levels == 3 ? (
                        <>
                          {
                            item?.formstatus == 0 ?
                              (
                                <>
                                  <AccessAlarmIcon />
                                </>
                              ) : (
                                <>
                                  <CheckCircleOutlineIcon />
                                </>
                              )
                          }

                        </>
                      ) : item?.levels == 4 ? (
                        <>
                          {
                            item?.formstatus == 0 ?
                              (
                                <>
                                  <AccessAlarmIcon />
                                </>
                              ) : (
                                <>
                                  <CheckCircleOutlineIcon />
                                </>
                              )
                          }

                        </>
                      ) : item?.levels == 5 ? (
                        <>
                          {
                            item?.formstatus == 0 ?
                              (
                                <>
                                  <AccessAlarmIcon />
                                </>
                              ) : (
                                <>
                                  <CheckCircleOutlineIcon />
                                </>
                              )
                          }

                        </>
                      ) : null
                    }

                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <ComponentCell
                      item={item}
                      dataUser={dataUser}
                    />
                  </Paper>
                </TimelineContent>
              </TimelineItem>

            </>)
          })}
        </Timeline>
      </Modal>
      <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="lg">
        <Modal.Header closeButton>
          {/* {JSON.stringify(listpersion)} */}

          <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10 }}>
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
                onChange={(e) => OnOptions(e.target.value)}
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
            onClick={() => { Oncreate() }}
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
     
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <h5 style={{color:'#007bff',fontWeight:'bold'}}>Filles</h5>
          <ArrowForwardIosIcon style={{ fontSize: 15, marginTop: 6, fontWeight: 'bold',color:'#007bff' }} />
          <h5>Personal Document</h5> 
        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
          
        <TextField id="outlined-search" label="Search field" type="search" variant="outlined"  size="small" style={{color:'white'}} />
        </div>
        <div style={{ width: '100%', marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ backgroundColor: 'white', borderRadius: 10, width: '70%', marginRight: 10, maxHeight: 300, overflowY: 'scroll', overflowX: 'hidden' }}>
            <Table className={classes.table} size="small" aria-label="a dense table" style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
              <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
                <TableRow>
                  <TableCell align='left' style={{fontSize:20}}>Name</TableCell>
                  <TableCell align='left' style={{fontSize:20}}>Last Modified</TableCell>
                  <TableCell align='left' style={{fontSize:20}}>Status</TableCell>
                  <TableCell align="right" style={{fontSize:20}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dataList && dataList.map((data, index) => {
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => { handleShowTimeline(); OnloadInformationsTimeline(data?.form_id) }}>
                            <FileCopyIcon style={{marginRight:10,color:'#007bff',fontWeight:'bold'}}/>
                            {data?.form_name}
                            </TableCell>
                          <TableCell>{moment(data?.created_at).format('DD-MM-YYYY')}</TableCell>

                          {
                            data?.formstatus == 0 ? (
                              <>
                                <TableCell style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                  <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { handleOpen() }}>
                                    <small style={{ color: 'white', cursor: 'pointer' }} >Created</small>
                                  </div>

                                </TableCell>
                              </>) : null
                          }
                          {
                            data?.formstatus == 1 ? (
                              <>
                                <TableCell style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                  <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                    <small style={{ color: 'white' }}>Requested</small>
                                  </div>

                                </TableCell>
                              </>) : null
                          }
                          {
                            data?.formstatus == 2 ? (
                              <>
                                <TableCell style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                  <div style={{ backgroundColor: '#f9b115', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                    <small style={{ color: 'white' }}>In Progress</small>
                                  </div>

                                </TableCell>
                              </>) : null
                          }
                          {
                            data?.formstatus == 4 ? (
                              <>
                                <TableCell style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                  <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                    <small style={{ color: 'white' }}>Rejected</small>
                                  </div>

                                </TableCell>
                              </>) : null
                          }
                          {
                            data?.formstatus == 6 ? (
                              <>
                                <TableCell style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                  <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                    <small style={{ color: 'white' }}>Draft</small>
                                  </div>

                                </TableCell>
                              </>) : null
                          }
                          {
                            data?.formstatus == 3 ? (
                              <>
                                <TableCell style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                  <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                    <small style={{ color: 'white' }}>Approved</small>
                                  </div>

                                </TableCell>
                              </>) : null
                          }

                          <TableCell align="right">
                            <MoreHorizIcon style={{ cursor: 'pointer' }} />
                            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                              <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }}
                                onClick={() => { onEditform(data?.form_id) }}
                              >
                                <small style={{ color: 'white' }}>edit</small>
                              </div>
                              <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer', marginRight: 5 }}
                                onClick={() => { Onsetting(data?.form_id); handleShow() }}
                              >
                                <small style={{ color: 'white' }} >Setting</small>
                              </div>
                              <div style={{ backgroundColor: '#33D7FF', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer', marginRight: 5 }}
                                onClick={() => { CreateSenddate(data?.form_id, data?.approval_id, data?.formstatus) }}>
                                <small style={{ color: 'white' }} >
                                  Send
                                </small>
                              </div>
                            </div> */}
                          </TableCell>
                        </TableRow>
                      </>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
          <div style={{ border: '1px solid #ccc', backgroundColor: 'white', borderRadius: 10, width: '30%' }}>
            <span style={{ marginLeft: 10, fontSize: 20, fontWeight: 20 }}>Timeline</span>
          </div>



        </div>


      </div>


    </>
  )

}
function ComponentCell({ item, dataUser }) {
  const filter = dataUser.filter((el) => el.level_uid == item?.level_uid);
  return (<>
    {
      filter.map((data, index) => {
        return (
          <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 10 }} key={index}>
              <AccountCircleIcon style={{ fontSize: 40 }} />

              <Typography style={{ marginLeft: 10, marginBottom: 10, marginTop: 5 }}>{data?.create_employee_name}</Typography>
            </div>
          </>

        )
      })
    }
  </>)
}

function ComponentActions({ Onsetting, handleShow, onEditform, OnloadFormData, OnloadInformationsTimeline, form_id, approval_id, CreateSenddate }) {

  // const CreateSenddate = (get_form_id, get_approval_uid) => {
  //   setIsLoading(true)
  //   setOpen(true)
  //   let informdata = {
  //     form_id: get_form_id,
  //     approval_uid: get_approval_uid
  //   }
  //   console.log("informdata=", informdata)
  //   axios.post('/api/setting/insert-setting', informdata).then((data) => {
  //     OnloadFormData();
  //     OnloadInformationsTimeline();
  //     setIsLoading(false)
  //     setOpen(false)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }


  return (
    <>
      <TableCell style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }}
            onClick={() => { onEditform(form_id) }}
          >
            <small style={{ color: 'white' }}>edit</small>
          </div>
          <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer', marginRight: 5 }}
            onClick={() => { Onsetting(form_id); handleShow() }}
          >
            <small style={{ color: 'white' }} >Setting</small>
          </div>
          <div style={{ backgroundColor: '#33D7FF', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer', marginRight: 5 }}
            onClick={() => {
              CreateSenddate(form_id, approval_id);
            }}>
            <small style={{ color: 'white' }} >
              Send

            </small>
          </div>
        </div>
      </TableCell>

    </>)
}

