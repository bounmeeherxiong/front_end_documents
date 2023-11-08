import React, { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "react-bootstrap";
import Cookies from 'js-cookie';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { Spinner } from "react-bootstrap";
import { LoginContext } from "../page/contexts/LoginContext";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';



import moment from "moment";
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

export default function RequestForm() {
  const classes = useStyles();
  const Navigate = useNavigate();

  const [isLoading, setIsLoading,] = useState(false);
  const [g_department_id, setG_department_id] = useState('')
  const [show, setShow] = useState(false);
  const [showsecond, setShowsecond] = useState(false)
  const [form_uid, setForm_uid] = useState('')
  const [employee_id, setEmployee_id] = useState('')
  const [app_id, setApp_id] = useState('')
  const [created_by_name, setCreated_by_name] = useState('')
  const [listdata, setListdata] = useState([])
  const [isdisabled, setIsdisabled] = useState(true)
  const [ischeckstatus, setIscheckstatus] = useState(0)
  const [listshowemployee, setListshowemployee] = useState([])
  const [openingsetting, setOpeningsetting] = useState(false)
  const [datalist, setDatalist] = useState([])
  const [levels, setLevels] = useState([])
  const [checkerr, setCheckerr] = useState('')
  const [conditions, setConditions] = useState(false)
  const [showSave, setShowSave] = useState(false);
  const [status, setStatus] = useState('')
  const [isdisabled1, setIsdisabled1] = useState(false)
  const [isdisabled2, setIsdisabled2] = useState(false)
  const [isdisabled3, setIsdisabled3] = useState(false)
  const [isdisabled4, setIsdisabled4] = useState(true)
  const [listdepartment, setlistdepartment] = useState('')
  const [listallemployee, setListallemployee] = useState([]);
  const [number, setNumber] = useState()
  const [listpersion, setListpersion] = useState([]);
  const [listcartdata, setListcartdata] = useState([])
  const [createSetting, setCreateSetting] = useState('')
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [dataLavel, setDataLavel] = useState([])
  const [listLavel, setListLavel] = useState([])
  const [dataUser, setDataUser] = useState([])
  const [errsetting, setErrsetting] = useState(false)
  const { setId, setShowViewFormScreen } = useContext(LoginContext)
  const handleClosedel = () => {
    setShow(false);
    setIsdisabled(true)
    setIsdisabled1(false)
    setIsdisabled2(false)
    setIsdisabled3(false)
    setCreateSetting('')

  }
  const handleShow = () => setShow(true);
  const hadleShowSecond = () => setShowsecond(true);
  const Onsetting = (form_id, app_id) => {
    console.log("dataApp=",app_id)
    
    setForm_uid(form_id)
    setApp_id(app_id)
  }
  const handleCloseOpenting = () => {
    setErrsetting('')
    setOpeningsetting(false)

  }
  const OnFirstConditions = () => {
    setConditions(false)
  }
  const OnSecondConditions = () => {
    setConditions(true)
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseEnter1 = () => {
    setIsHovered1(true);
    // setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };
  const handleOpen = () => {
    setShowSave(true)
  };

  const handleClose = () => {
    setShowSave(false)
  };

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
  const OnloadListViewrequest = () => {
    axios.get('/api/setting/view-form-request').then((data) => {
      console.log("dataList=", data)
      setDatalist([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnOptionschoose_number = (e) => {
    setNumber(e)

  }
  const OnOptionsDepart = (e) => {
    setG_department_id(e)
    let list = listallemployee.filter((el) => el.department_id == e)
    setListshowemployee([...list])
  }
  const Check_user = () => {
    // axios.get('/api/setting/get-level').then((data) => {
    //   if(data.length == 0){

    //   }else{
    //     setLevels([...data?.data?.results][0].levels)
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  const OnLoadCount = () => {
    axios.get('/api/setting/all-approve').then((data) => {

    }).catch((err) => {
      console.log(err)
    })
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


  const CreateSenddate = (get_form_id, approval_id, formstatus) => {
    console.log(approval_id)
    if (approval_id == null) {
      setOpeningsetting(true)
    } else {
      setShowSave(true)
      setIsLoading(true)
      let informdata = {
        form_id: get_form_id,
        approval_uid: approval_id
      }
      axios.post('/api/setting/insert-setting', informdata).then((data) => {
        OnloadListViewrequest();
        setIsLoading(false)
        setShowSave(false)
      }).catch((err) => {
        console.log(err)
      })
    }
    // const get_approval_uid = await axios.get(`/api/setting/get-setting-approval/${get_form_id}`).then((data) => {
    //   const approvalId = data?.data?.results[0]?.approval_id;
    //   return approvalId;
    // }).catch((err) => {
    //   console.log(err)
    // })
    // if (approvalId == null) {
    //   setErrsetting(true)
    //   OnloadListViewrequest();
    // } else {
    // setShowSave(true)
    // setIsLoading(true)
    // let informdata = {
    //   form_id: get_form_id,
    //   approval_uid: approvalId
    // }
    // axios.post('/api/setting/insert-setting', informdata).then((data) => {
    //   OnloadListViewrequest()
    //   setIsLoading(false)
    //   setShowSave(false)
    // }).catch((err) => {
    //   console.log(err)
    // })
    // }
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
      setListcartdata('');
      OnloadListViewrequest();
    }).catch((err) => {
      console.log(err)
    })
  }
  const Creatappoved = () => {
    let dataApp = {
      form_id: form_uid,
    }
    console.log("dataApp=",dataApp)
    axios.post('/api/setting/update-To-Approved-Status', dataApp).then((data) => {
      OnloadListViewrequest()
      setIsdisabled1(false)
      setIsdisabled2(false)
      setIsdisabled3(false)
      setShow(false)
      setCreateSetting('')
    }).catch((err) => {
      console.log(err)
    })
  }
  const CreatRejected = () => {
    if (!status) {
      setCheckerr('2023')
      return;
    }
    let datainf = {
      form_id: form_uid,
      formstatus: status
    }
    axios.post('/api/setting/update-To-Approved-Status', datainf).then((data) => {
      OnloadListViewrequest()
      setShow(false)
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnOptions = (e) => {
    setEmployee_id(e)

  }
  const OnViewForm = (id) => {
    setId(id)
    setShowViewFormScreen(true)
  }
  const onEditform = (id) => {
    Navigate(`/EditForm/${id}`)
  }
  const handlechange = e => {
    if (e.target.checked) {

      setIscheckstatus(2)
    } else {
      console.log("ture")
    }
  }
  const handlechangedes = e => {
    if (e.target.checked) {
      setCreateSetting(1)
      setIsdisabled2(true)
      setIsdisabled3(true)
    } else {
      setIsdisabled2(false)
      setIsdisabled3(false)
      setCreateSetting('')
    }
  }
  const handlechangedes1 = e => {

    if (e.target.checked) {
      setIsdisabled1(true)
      setIsdisabled3(true)
      setCreateSetting(2)
      setStatus(4)
    } else {
      setIsdisabled1(false)
      setIsdisabled3(false)
    }
  }

  const handlechangedes2 = e => {
    if (e.target.checked) {
      setCreateSetting(2)
      setIsdisabled1(true)
      setIsdisabled2(true)
      setIsdisabled4(false)

    } else {
      setIsdisabled1(false)
      setIsdisabled2(false)
      setIsdisabled4(true)
    }
  }

  const OnloadInformationsTimeline = (form_id) => {
    axios.get(`/api/form/get-approval-data/${form_id}`).then((data) => {
      console.log("OnloadInformationsTimeline=", data)
      setDataLavel([...data?.data?.approvals])
      setDataUser([...data?.data?.users])
    }).catch((err) => {
      console.log(err)
    })
  }
  // const OnFindForm_id = (e_id) => {
  //   let lavel = dataLavel.filter((e) => e.form_id == e_id)
  //   setListLavel([...lavel])
  // }
  useEffect(() => {
    OnloadListViewrequest()
    Check_user()
    OnlaodDepartment();
    OnloadAllEmployee()
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
      <div style={{ width: '100%' }}>
        <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="lg">
          <Modal.Header closeButton>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  cursor: 'pointer',
                  // // backgroundColor: isHovered ? 'lightblue' : 'white',
                  color: isHovered ? 'red' : 'green',
                  textDecorationLine: isHovered ? 'underline' : '',
                  cursor: 'pointer',
                }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => { OnFirstConditions() }}
                >
                  Setting </span>
                {
                  conditions == false ? (<>
                    <ArrowDropUpIcon style={{ fontSize: 50, marginTop: -15, marginLeft: 15 }} />

                  </>) : null
                }

              </div>

              <span style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginLeft: 10,
                cursor: 'pointer'
              }}>||</span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginLeft: 10,
                  color: isHovered1 ? 'red' : '',
                  textDecorationLine: isHovered1 ? 'underline' : '',
                }}
                  onMouseEnter={handleMouseEnter1}
                  onMouseLeave={handleMouseLeave1}
                  onClick={() => { OnSecondConditions() }}
                >
                  Timelines </span>
                {
                  conditions == true ? (<>
                    <ArrowDropUpIcon style={{ fontSize: 50, marginTop: -15, marginLeft: 15 }} />

                  </>) : null
                }
              </div>

            </div>
          </Modal.Header>
          {
            conditions == false ? (
              <>
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <div style={{ marginLeft: 10 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          disabled={isdisabled1}
                          onChange={handlechangedes}
                        />
                      }
                      label="Your want to  Approved this form "
                    />
                  </div>
                  <div style={{ marginLeft: 90 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={isdisabled2}
                          onChange={handlechangedes1}
                          color="primary"
                        />
                      }
                      label="Your want to  Rejected this form "
                    />
                  </div>
                </div>
                <div style={{ width: '100%', border: '0.1px solid #ccc', backgroundColor: 'gray' }}></div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div style={{ marginLeft: 10 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={isdisabled3}
                          color="primary"
                          onChange={handlechangedes2}
                        />
                      }
                      label="Setting the next approved person"
                    />
                  </div>
                </div>
                <div style={{ width: '100%', border: '0.1px solid #ccc', backgroundColor: 'gray' }}></div>
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
                        <MenuItem value='4'>4</MenuItem>
                        <MenuItem value='5'>5</MenuItem>
                        <MenuItem value='5'>6</MenuItem>
                        <MenuItem value='5'>7</MenuItem>
                        <MenuItem value='5'>8</MenuItem>
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
                                  <small style={{ fontSize: 20, fontWeight: 'bold', color: "#2106f3", marginLeft: 100, }}>There are no data!</small>
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
                    disabled={isdisabled4}
                    onClick={() => { Oncreate() }}
                  >
                    Add Employee
                  </Button>
                  {
                    createSetting == 1 ? (
                      <>
                        <Button
                          style={{ marginBottom: 20 }}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          endIcon={<SaveIcon>Save and new</SaveIcon>}
                          onClick={() => { Creatappoved() }}
                        >
                          {!isLoading ? (
                            <>
                              Save & Close1
                            </>
                          ) : (
                            <>
                              {
                                <Spinner animation="border" variant="light" size='sm' />
                              }
                            </>)
                          }
                        </Button>
                      </>) : null
                  }
                  {
                    createSetting == 2 ? (
                      <>
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
                              Save & Close
                            </>
                          ) : (
                            <>
                              {
                                <Spinner animation="border" variant="light" size='sm' />
                              }
                            </>)
                          }
                        </Button>

                      </>) : null
                  }
                  {
                    createSetting == 3 ? (
                      <>
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
                              Save & Close
                            </>
                          ) : (
                            <>
                              {
                                <Spinner animation="border" variant="light" size='sm' />
                              }
                            </>)
                          }
                        </Button>

                      </>) : null
                  }
                </div>
              </>
            ) : (
              <>
                <Timeline align="alternate">
                  {dataLavel && dataLavel.map((item, index) => {
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

              </>
            )
          }
        </Modal>
        <Breadcrumbs aria-label="breadcrumb" style={{ backgroundColor: '#ebedef' }}>
          <Link color="inherit" href="/" className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <GrainIcon className={classes.icon} />
            Requested
          </Typography>
        </Breadcrumbs>

        <div style={{ width: '100%', marginTop: 20, border: '1px solid #ccc', backgroundColor: 'white', borderRadius: 10 }}>
          <small style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Request</small>
          {
            datalist.length == 0 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: 10, marginBottom: 20 }}>
                  <small style={{ fontSize: 40, fontWeight: 'bold', color: "#2106f3" }}>There are no data!</small>
                </div>
              </>) : (<>
                <TableContainer style={{ borderRadius: 10 }} >
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead style={{ backgroundColor: '#ebedef' }}>
                      <TableRow >
                        <TableCell>#</TableCell>
                        <TableCell>Form Name</TableCell>
                        <TableCell>Datetime</TableCell>
                        <TableCell>Created by</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        datalist && datalist.map((item, index) => {

                          return (
                            <>
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item?.form_name}</TableCell>
                                <TableCell>{moment(item?.created_at).format('DD-MM-YYYY')}</TableCell>
                                <TableCell style={{ cursor: 'pointer' }}>{item?.created_by_name}</TableCell>

                                {
                                  item?.formstatus == 1 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }} >
                                        <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 80 }} >

                                          <small style={{ color: 'white' }}>Requested</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  item?.formstatus == 2 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#f9b115', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} >
                                          <small style={{ color: 'white' }}>In Progress</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  item?.formstatus == 3 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} >
                                          <small style={{ color: 'white' }}>Approved</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  item?.formstatus == 4 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} >
                                          <small style={{ color: 'white' }}>Rejected</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  item?.formstatus == 6 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} >
                                          <small style={{ color: 'white' }}>Draft</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                <TableCell style={{ cursor: 'pointer' }}>
                                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }}
                                      // onClick={() => OnViewForm(item?.form_id)}
                                      onClick={() => OnViewForm(item?.form_id)}
                                    >
                                      <small style={{ color: 'white' }}>View</small>
                                    </div>
                                    <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer' }}
                                      onClick={() => { Onsetting(item?.form_id, item?.approval_id); handleShow(); OnloadInformationsTimeline(item?.form_id) }}>
                                      <small style={{ color: 'white' }} >Setting</small>
                                    </div>
                                    <div style={{ backgroundColor: '#33D7FF', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer', marginRight: 5 }}
                                      onClick={() => {
                                        CreateSenddate(item?.form_id, item?.approval_id, item?.formstatus);
                                      }}>
                                      <small style={{ color: 'white' }} >
                                        Send

                                      </small>
                                    </div>
                                  </div>
                                </TableCell>

                              </TableRow>
                            </>
                          )
                        })
                      }
                    </TableBody>
                    <TableHead style={{ backgroundColor: '#ebedef' }}>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Form Name</TableCell>
                        <TableCell>Datetime</TableCell>
                        <TableCell>Created by</TableCell>
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
          datalist.length == 0 ? (<></>) : (<>
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




      </div >



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
