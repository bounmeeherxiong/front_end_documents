import React, { useRef, useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { LoginContext } from "../page/contexts/LoginContext";
import { makeStyles } from '@material-ui/core/styles';
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
import moment from "moment";
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
export const Department = () => {
    const classes = useStyles();
    const { id } = useParams();
    const Navigate = useNavigate();
    const { dataList } = useContext(LoginContext)

    const onViewForm = (id) => {

        Navigate(`/UserusingForm/${id}`)
    }

    return (
        <>
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
            <div style={{ width: '100%', marginTop: 20, border: '1px solid #ccc', backgroundColor: 'white', borderRadius: 10 }}>
                <small style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>All Form</small>
                <TableContainer style={{ marginLeft: 10 }}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Form Name</TableCell>
                                <TableCell>Datetime</TableCell>
                                <TableCell>Created by</TableCell>
                                <TableCell>Status</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataList.length == 0 ? (<>


                                </>) : (
                                    <>
                                        {
                                            dataList && dataList.map((data, index) => {
                                                return (
                                                    <>
                                                        <TableRow key={index}>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell style={{ cursor: 'pointer',fontWeight:'bold' }} onClick={() => { onViewForm(data?.form_uid) }}>{data?.form_name}</TableCell>
                                                            <TableCell>{moment(data?.created_at).format('DD-MM-YYYY')}</TableCell>
                                                            <TableCell>{data?.username}</TableCell>
                                                            {
                                                                data?.formstatus == 3 ? (
                                                                    <>
                                                                        <TableCell style={{ cursor: 'pointer' }}>
                                                                            <div style={{ backgroundColor: '#3399ff', borderRadius: 5, display: 'flex', justifyContent: 'center', width: 70 }}>
                                                                                <small style={{ color: 'white' }}>Approved</small>
                                                                            </div>

                                                                        </TableCell>
                                                                    </>) : null
                                                            }

                                                        </TableRow>

                                                    </>
                                                )
                                            })
                                        }


                                    </>)
                            }




                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Form Name</TableCell>
                                <TableCell>Datetime</TableCell>
                                <TableCell>Created by</TableCell>
                                <TableCell>Status</TableCell>

                            </TableRow>
                        </TableHead>

                    </Table>
                </TableContainer>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <div>

              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <small style={{ fontSize: 25 }}>Pagination:</small>
                <Pagination count={10} variant="outlined" shape="rounded" />
              </div>

            </div>



        </>

    )
}
