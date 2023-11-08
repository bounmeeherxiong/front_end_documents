import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
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
import AddIcon from '@material-ui/icons/Add';
import { Spinner } from "react-bootstrap";
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

export const AddEmployee = () => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [listdata, setListdata] = useState([])
    const [employee_id, setEmployee_id] = useState('')
    const [employee_name, setEmployee_name] = useState('')
    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading,] = useState(false);
    let users = Cookies.get("user");
    let data_user = JSON.parse(users)
    let user_id = data_user?.user?.user_id

    const handleShow = () => setShow(true);
    const Onsetting = (e) => {
        let infordata = {
            employee_id: e,
        }
        axios.post('/api/setting/all-employee-in-department', infordata).then((data) => {
            setListdata([...data?.data?.results])
        }).catch((err) => {
            console.log(err)
        })
        // axios.post('/api/no/create-setting-doc',infordata).then((data)=>{

        // }).catch((err)=>{
        //     console.log(err)
        // })
    }
    const OnOptions = (e) => {
        setEmployee_id(e)
        let list = listdata.filter((el) => el.employee_id.includes(e))
        setEmployee_name([...list][0].employee_name)
    }

    const handleClosedel = () => {
        setShow(false);
    }
    const CreateRole_id = () => {
        setIsLoading(true);
        let infordata = {
            employee_id: employee_id,
            status: 1
        }
        console.log("infordata=",)
        axios.post('/api/no/create-setting-doc', infordata).then((data) => {
            setShow(false);
            OnloadUserRole();
            setEmployee_id('')
            setIsLoading(false);
        }).catch((err) => {

            console.log(err)
        })
    }
    const OnloadUserRole = () => {
        axios.get('/api/no/Get-All-User-Role').then((data) => {
            setUserList([...data?.data?.results])
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        OnloadUserRole()
    }, [])
    return (
        <div style={{ width: '100%', marginTop: 20, display: 'flex', flexDirection: 'column' }}>
            <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="lg">
                <Modal.Header closeButton>
                    <span style={{ fontSize: 25, fontWeight: 'bold', paddingTop: 10 }}>
                        Setting </span>
                </Modal.Header>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
                    <FormControl className={classes.formControl} style={{ width: '80%', marginRight: 10 }}>
                        <InputLabel id="demo-simple-select-label">Employee </InputLabel>
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
                    <Button
                        style={{ marginTop: 10, marginRight: 10 }}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick={() => { CreateRole_id() }}
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10, marginRight: 15 }}>

                </div>


            </Modal>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ebedef' }}>
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/" className={classes.link}>
                            <HomeIcon className={classes.icon} />
                            <small style={{ color: '#2106f3' }}>Home</small>

                        </Link>
                        <Typography color="textPrimary" className={classes.link}>
                            <GrainIcon className={classes.icon} />
                            <small style={{ color: '#2106f3' }}>Employee</small>
                        </Typography>

                    </Breadcrumbs>

                </div>
                <div>
                    <Button
                        style={{}}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<AddIcon />}
                        onClick={() => { Onsetting(user_id); handleShow() }}

                    >
                        add employee
                    </Button>
                </div>

            </div>
            <div style={{ width: '100%', marginTop: 20, border: '1px solid #ccc', backgroundColor: 'white', borderRadius: 10 }}>
                <small style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>All Employee</small>
                {
                    userList.length == 0 ? (<>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: 10, marginBottom: 20 }}>
                            <small style={{ fontSize: 40, fontWeight: 'bold', color: "#2106f3" }}>There are no data!</small>
                        </div>

                    </>) : (<>
                        <TableContainer style={{ marginLeft: 10 }}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Datetime</TableCell>
                                        <TableCell>Created by</TableCell>

                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userList && userList.map((item, index) => {
                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{item?.employee_name}</TableCell>
                                                    <TableCell>{moment(item?.moment).format('MM-DD-YYYY')}</TableCell>
                                                    <TableCell>{item?.createdby_name}</TableCell>
                                                    <TableCell style={{ cursor: 'pointer' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                                                            <div style={{ backgroundColor: '#e55353', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 50, cursor: 'pointer' }}
                                                            >
                                                                <small style={{ color: 'white' }} >delete</small>
                                                            </div>


                                                        </div>

                                                    </TableCell>
                                                </TableRow>

                                            </>
                                        )
                                    })}
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Form Name</TableCell>
                                        <TableCell>Datetime</TableCell>
                                        <TableCell>Created by</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </>)
                }


            </div>
            {
                userList.length == 0 ? (<></>) : (<>
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
    )
}
