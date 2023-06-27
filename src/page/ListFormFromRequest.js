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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { Spinner } from "react-bootstrap";
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

export const ListFormFromRequest = () => {

  const classes = useStyles();
  const Navigate = useNavigate();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const [isLoading, setIsLoading,] = useState(false);
  const [show, setShow] = useState(false);
  const [form_uid, setForm_uid] = useState('')
  const [employee_id, setEmployee_id] = useState('')
  const [employee_name, setEmployee_name] = useState('')
  const [created_by_id, setcreated_by_id] = useState('')
  const [created_by_name, setCreated_by_name] = useState('')
  const [listdata, setListdata] = useState([])
  const [isdisabled, setIsdisabled] = useState(true)
  const [ischeckstatus, setIscheckstatus] = useState(0)
  const [isChecklavel, setIsChecklavel] = useState()
  const [datalist, setDatalist] = useState([])
  const [levels, setLevels] = useState([])
  const [checkerr, setCheckerr] = useState('')
  const [status, setStatus] = useState('')
  const [isdisabled1, setIsdisabled1] = useState(false)
  const [isdisabled2, setIsdisabled2] = useState(false)
  let users = Cookies.get("user");
  let data = JSON.parse(users)
  let user_id = data?.user?.user_id
  const handleClosedel = () => {
    setShow(false);
    setEmployee_id('')
    setIsdisabled(true)

  }
  const handleShow = () => setShow(true);
  const onloadapprover = () => {
    axios.get(`/api/req-setting/find-Request-Setting-By-Approver/${user_id}`).then((data) => {
      setDatalist([...data?.data?.results])
      setLevels([...data?.data?.results][0].levels)
      console.log([...data?.data?.results][0].levels)
    }).catch((err) => {
      console.log(err)
    })
  }

  const Onsetting = (e, user_name, form_uid) => {
    let infordata = {
      employee_id: e
    }
    setForm_uid(form_uid)
    setCreated_by_name(user_name)
    setcreated_by_id(e)
    axios.post('/api/setting/all-employee-by-group', infordata).then((data) => {
      setListdata([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })

  }
  // const OnloadListViewrequest = () => {
  //   axios.get(`/api/setting/view-form-request/${user_id}`).then((data) => {
  //     setDatalist([...data?.data?.results])
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }
  // const Check_user = () => {
  //   axios.get(`/api/setting/get-level/${user_id}`).then((data) => {
  //     setLevels([...data?.data?.results][0].levels)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }
  const Oncreate = () => {
    setIsLoading(true);
    let createdata = {
      req_id: form_uid,
      levels: 2,
      approver: employee_id,
      created_by: user_id,
      signature_status: 0,
      signature_uid: 4,
      request_status: 2,
    }

    axios.post('/api/req-setting/Insert-Level-Two-Of-Created-SettingRequest', createdata).then((data) => {
      setShow(false)
      setEmployee_id('')
      onloadapprover();
      setIsLoading(false);

    }).catch((err) => {
      console.log(err)
    })
  }
  const Creatappoved = () => {
    setIsLoading(true);
    if (!status) {
      setCheckerr('2023')
      return;
    }
    let datainf = {
      id: form_uid,
      req_status: status
    }
    axios.post('/api/req-setting/update-approve-status/', datainf).then((data) => {
      setIsLoading(false);
      onloadapprover()
      setShow(false)

    }).catch((err) => {
      console.log(err)
    })
  }
  const CreatRejected = () => {
    setIsLoading(true);
    if (!status) {
      setCheckerr('2023')
      return;
    }
    let datainf = {
      id: form_uid,
      req_status: status
    }
    axios.post('/api/req-setting/update-Rejected-Status', datainf).then((data) => {
      setIsLoading(false);
      onloadapprover()
      setShow(false)
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnOptions = (e) => {
    setEmployee_id(e)
    setIsdisabled(false)
    let list = listdata.filter((el) => el.employee_id.includes(e))
    setEmployee_name([...list][0].employee_name)
  }
  const OnViewForm = (id) => {
    Navigate(`/Viewdetailform/${id}`);
  }
  const onEditform = (id) => {
    Navigate(`/EditForm/${id}`)
  }
  const handlechange = e => {
    if (e.target.checked) {
      console.log(e.target.checked)
      setIscheckstatus(2)
    } else {
      console.log("true")
    }
  }
  const handlechangedes = e => {
    setCheckerr('')
    if (e.target.checked) {
      setIsdisabled2(true)
      setStatus(3)
    } else {
      setIsdisabled2(false)
    }
  }
  const handlechangedes1 = e => {
    setCheckerr('')
    if (e.target.checked) {
      setIsdisabled1(true)
      setStatus(4)

    } else {
      setIsdisabled1(false)
    }
  }

  useEffect(() => {
    onloadapprover()
  }, [])
  return (
    <>
      <div style={{ width: '100%' }}>
        {
          levels === 2 ? (
            <>
              <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="sm">
                <Modal.Header closeButton>
                  <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10 }}>
                    Setting </span>
                </Modal.Header>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute' }}>
                  {
                    checkerr === '2023' ? (<>
                      <small>fasfasfds</small>
                    </>) : null
                  }
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 20 }}>
                  <div style={{ marginTop: 9 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={isdisabled1}
                          color="primary"
                          onChange={handlechangedes}
                        />
                      }
                      label="Approved"
                    />
                  </div>
                  <div>
                    <FormGroup row style={{ marginTop: 10, marginRight: 30 }}>
                      <FormControlLabel
                        style={{ fontSize: 20 }}
                        control={
                          <Checkbox

                            disabled={isdisabled2}
                            onChange={handlechangedes1}
                            color="Secondary"

                          />}
                        label="Rejected"
                      />
                    </FormGroup>
                  </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10, marginRight: 15 }}>
                  {
                    isdisabled1 == true ? (<>
                      <Button
                        style={{ marginBottom: 20 }}
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={() => { CreatRejected() }}
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

                    </>) : (
                      <>

                        <Button
                          style={{ marginBottom: 20 }}
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.button}
                          startIcon={<SaveIcon />}
                          onClick={() => { Creatappoved() }}
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
                      </>)
                  }

                </div>


              </Modal>
            </>
          ) : (<>

            <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="lg">
              <Modal.Header closeButton>
                <span style={{ fontSize: 20, paddingTop: 10, fontWeight: 'bold' }}>
                  Setting </span>
              </Modal.Header>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <small style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginLeft: 30 }}>Approved by:</small>
                    <FormControl className={classes.formControl} style={{ width: '70%', marginRight: 30 }}>
                      <InputLabel id="demo-simple-select-label">Approved person</InputLabel>
                      <Select

                        onChange={(e) => OnOptions(e.target.value)}
                        value={employee_id}
                      >
                        {
                          listdata && listdata.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item?.employee_id}>{item?.employee_name}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>

                  </div>
                  <FormGroup row style={{ marginTop: 20, marginRight: 30 }}>
                    <FormControlLabel
                      disabled={isdisabled}
                      onChange={handlechange}
                      control={<GreenCheckbox />
                      }
                    />
                  </FormGroup>
                </div>
              </div>


              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 30, marginLeft: 10, marginRight: 15 }}>
                <Button
                  style={{ marginBottom: 20, marginRight: 35 }}
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


          </>)
        }
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
                          console.log("mmmmmmmmmmmm=", item)

                          return (
                            <>
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>{item?.form_name}</TableCell>
                                <TableCell>{moment(item?.created_at).format('DD-MM-YYYY')}</TableCell>
                                <TableCell style={{ cursor: 'pointer' }}>{item?.created_by_name}</TableCell>

                                {
                                  item?.request_status == 1 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }} >
                                        <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 80 }} >

                                          <small style={{ color: 'white' }}>Requested</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  item?.request_status == 2 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#f9b115', borderRadius: 5, display: 'flex', justifyContent:'center', width: 70 }} >
                                          <small style={{ color: 'white' }}>In Progress</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  item?.request_status == 3 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} >
                                          <small style={{ color: 'white' }}>Approved</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  item?.request_status == 4 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} >
                                          <small style={{ color: 'white' }}>Rejected</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  item?.request_status == 5 ? (
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
                                    <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }} onClick={() => OnViewForm(item?.req_id)}>
                                      <small style={{ color: 'white' }}>edit</small>
                                    </div>
                                    <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer' }}
                                      onClick={() => { Onsetting(item?.created_by, item?.created_by_name, item?.req_id); handleShow() }}>
                                      <small style={{ color: 'white' }} >Setting</small>
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




      </div>



    </>
  )

}
