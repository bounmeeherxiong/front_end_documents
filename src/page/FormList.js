import React, { useRef, useEffect, useState } from "react";
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
import MuiAlert from '@material-ui/lab/Alert';
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
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function FormList() {
  const classes = useStyles();
  const Navigate = useNavigate();
  const [dataList, setDataList] = useState([])
  const [show, setShow] = useState(false);
  const [listdata, setListdata] = useState([])
  const [employee_id, setEmployee_id] = useState('')
  const [employee_name, setEmployee_name] = useState('')
  const [created_by_id, setcreated_by_id] = useState('')
  const [created_by_name, setCreated_by_name] = useState('')
  const [form_uid, setForm_uid] = useState('')
  const [count, setCount] = useState([])
  const [isLoading, setIsLoading,] = useState(false);
  let users = Cookies.get("user");
  let data = JSON.parse(users)
  let user_id = data?.user?.user_id
  const handleClosedel = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const OnloadFormData = () => {
    axios.get(`/api/form/forms/${user_id}`).then((data) => {

      setDataList([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })

  }
  const OnloadstatusFormData = () => {
    axios.get(`/api/setting/Select-FormStatus/${user_id}/0`).then((data) => {

      setCount([...data?.data?.counts][0].counts)

    }).catch((err) => {
      console.log(err)
    })
  }

  const onDetailForm = (id) => {
    Navigate(`/Form/${id}`);
  }
  const onEditform = (id) => {

    Navigate(`/EditForm/${id}`)
  }
  const onGoViewApproved = (id) => {
    Navigate(`/ViewApproved/${id}`)
  }

  const Onsetting = (e, name, form_uid) => {
    let infordata = {
      employee_id: e
    }
    setForm_uid(form_uid)
    setCreated_by_name(name)
    setcreated_by_id(e)
    axios.post('/api/setting/all-employee-in-department', infordata).then((data) => {
      setListdata([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnOptions = (e) => {
    console.log("eee=", e)
    setEmployee_id(e)
    let list = listdata.filter((el) => el.employee_id.includes(e))
    setEmployee_name([...list][0].employee_name)
  }
  const handleChange = (event) => {
    setEmployee_id(event.target.value)
    console.log("data=", event.target.value)

    let list = listdata.filter((el) => el.employee_id.includes(event.target.value))
    setEmployee_name([...list][0].employee_name)
  };
  const Oncreate = () => {
    setIsLoading(true);
    let createdata = {
      form_id: form_uid,
      levels: 1,
      user_id: employee_id,
      user_name: employee_name,
      created_by: created_by_id,
      signature: 0,
      signature_uid: '',
      created_by_name: created_by_name,
      formstatus: 1,
      tokens: "ExponentPushToken[oypPPJFY0j4BPAPGNHzMUB]",
      title: "ແຈ້ງເຕື້ອນ",
      subtitle: "ມີເອກະສານເຂົ້າໃໝ",
      content: "ກະລຸນາເຂົ້າໄປອະນຸມັດ"
    }
    axios.post('/api/setting/insert-setting', createdata).then((data) => {
      setShow(false)
      OnloadFormData()
      setEmployee_id('')
      setIsLoading(false);
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    OnloadFormData()
    OnloadstatusFormData();
  }, [])
  return (
    <>

      <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="lg">
        <Modal.Header closeButton>
          <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10 }}>
            Setting </span>
        </Modal.Header>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
          <small style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, marginLeft: 10 }}>Approved by:</small>

          <FormControl className={classes.formControl} style={{ width: '80%', marginRight: 10 }}>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10, marginRight: 15 }}>
          <Button

            style={{ marginBottom: 20 }}
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
                <TableContainer>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
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
                        dataList && dataList.map((data, index) => {
                          return (
                            <>
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data?.form_name}</TableCell>
                                <TableCell>{moment(data?.created_at).format('DD-MM-YYYY')}</TableCell>
                                <TableCell>{data?.username}</TableCell>
                                {
                                  data?.formstatus == 0 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Created</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.formstatus == 1 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Requested</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.formstatus == 2 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#f9b115', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>In Progress</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.formstatus == 4 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#2eb85c', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Rejected</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.formstatus == 5 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Draft</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }
                                {
                                  data?.formstatus == 3 ? (
                                    <>
                                      <TableCell style={{ cursor: 'pointer' }}>
                                        <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }} onClick={() => { onGoViewApproved(data?.form_uid) }}>
                                          <small style={{ color: 'white' }}>Approved</small>
                                        </div>

                                      </TableCell>
                                    </>) : null
                                }

                                <TableCell style={{ cursor: 'pointer' }}>
                                  {data?.formstatus == 3 ? (<>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                      <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }} onClick={() => { onEditform(data?.form_uid) }}>
                                        <small style={{ color: 'white' }}>edit</small>
                                      </div>
                                      <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 40, marginRight: 5 }}>
                                        <small style={{ color: 'white' }}>cancel</small>

                                      </div>
                                      <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer' }}>
                                        <small style={{ color: 'white' }} >Setting</small>
                                      </div>


                                    </div>

                                  </>) : (<>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                      <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 30, marginRight: 5 }} onClick={() => { onEditform(data?.form_uid) }}>
                                        <small style={{ color: 'white' }}>edit</small>
                                      </div>
                                      <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 40, marginRight: 5 }} onClick={() => { onEditform(data?.form_uid) }}>
                                        <small style={{ color: 'white' }}>cancel</small>

                                      </div>
                                      <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer' }} onClick={() => { Onsetting(data?.created_by, data?.username, data?.form_uid); handleShow() }}>
                                        <small style={{ color: 'white' }} >Setting</small>
                                      </div>


                                    </div>

                                  </>)}
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


    </>
  )

}
