import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../page/contexts/LoginContext";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from "axios";
import Cookies from 'js-cookie';

import SettingsIcon from "@material-ui/icons/Settings";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Home(props) {
  const Navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [listOpent, setListOpent] = useState(false);
  const [listopenForm, setListopenForm] = useState(false)
  const [role_id, setRole_id] = useState([])
  const [count, setCount] = useState('')
  const [hidden, setHidden] = useState('')
  const [listform, setListform] = useState([]);
  const { setDataList } = useContext(LoginContext)
  let users = Cookies.get("user");
  let data = JSON.parse(users)
  let user_id = data?.user?.user_id
  let user_name = data?.user?.name

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const onloadDepartment = () => {
    axios.get('/api/form/get-departments').then((data) => {
      setListform([...data?.data?.results])

    }).catch((err) => {
      console.log(err)
    })
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setListOpent(!listOpent);
  };
  const handleClickform = () => {
    setListopenForm(!listopenForm)
  }
  const OnloadStatus = () => {
    axios.get(`/api/form/get-role/${user_id}`).then((data) => {
      if (data.length == 0) {

      } else {
        setRole_id([...data?.data?.status][0].createstatus)
      }



    }).catch((err) => {
      console.log(err)
    })
  }
  const OnloadListViewrequest = () => {
    axios.get(`/api/setting/view-form-request/${user_id}`).then((data) => {

      setCount([...data?.data?.count][0].count)
      setRole_id(data?.data?.datastatus)
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnLogout = () => {
    setHidden(false)
    Cookies.remove('user');
    window.location.href = '/Login';
  }
  const onhidden = () => {
    console.log('hi')
    setHidden(!hidden)
  }
  const Ondepartment = (id) => {
    let data = {
      department_id: id
    }
    axios.post('/api/form/get-formBy-departments', data).then((data) => {
      setDataList([...data?.data?.results])
    }).catch((err) => {
      console.log(err)
    })
  }
  // const onloadapprover = () => {
  //   axios.get(`/api/req-setting/find-Request-Setting-By-Approver/${user_id}`).then((data) => {
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }
  useEffect(() => {
    OnloadListViewrequest()
    onloadDepartment();
    OnloadStatus();
  }, [])
  return (
    <>
      {
        hidden === true ? (
          <div style={{ display: 'flex', zIndex: 999, position: 'fixed', flexDirection: 'row', justifyContent: 'flex-end', height: 50, borderRadius: 5, width: '100%', position: 'absolute', marginTop: 64 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', cursor: 'pointer', backgroundColor: '#3f51b5', marginRight: 10, borderRadius: 2 }} onClick={() => { OnLogout() }} >
              <ExitToAppIcon style={{ marginLeft: 5, marginTop: 10, color: 'white' }} />
              <small style={{ marginLeft: 10, marginTop: 10, fontSize: 15, color: 'white', marginRight: 10 }} >Sign out</small>
            </div>
          </div>

        ) : null
      }
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="h6" noWrap>
                Phongsavanh Group
              </Typography>
              <Typography variant="h6" noWrap onClick={() => {
                onhidden()
              }} style={{ cursor: "pointer" }} >
                <AccountCircleIcon
                />
                <small style={{ marginLeft: 10 }}>{user_name}</small>
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>

          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => Navigate("/Index")} >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <small style={{ marginLeft: -20 }}>Home</small>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>

              <small style={{ marginLeft: -20 }}>Settings</small>
              <ListItemText />
            </ListItem>
            <Collapse in={listOpent} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={() => Navigate("/CreateForm")}>
                  <ListItemIcon>
                  </ListItemIcon>
                  <small style={{ marginLeft: -30 }}>Create Form</small>
                </ListItem>

                <ListItem button className={classes.nested} onClick={() => Navigate("/FormList")}>
                  <ListItemIcon>
                  </ListItemIcon>
                  <small style={{ marginLeft: -30 }}>List Form</small>
                </ListItem>
                <ListItem button className={classes.nested} onClick={() => Navigate("/AddEmployee")}>
                  <ListItemIcon>
                  </ListItemIcon>
                  <small style={{ marginLeft: -30 }}>Add employye</small>
                </ListItem>


              </List>
            </Collapse>
            {/* {
              role_id.length == 0 ? (<>
                <ListItem button onClick={handleClickform}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <small style={{ marginLeft: -20 }}>Department </small>
                  <ListItemText />
                </ListItem>

              </>) : null
            } */}
            <ListItem button onClick={handleClickform}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <small style={{ marginLeft: -20 }}>Department </small>
              <ListItemText />
            </ListItem>
            <Collapse in={listopenForm} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  listform && listform.map((item, index) => {
                    return (
                      <>
                        <ListItem key={index} button className={classes.nested} onClick={() => { Navigate(`/Department/${item?.department_id}`); Ondepartment(item?.department_id) }}>
                          <ListItemIcon>
                          </ListItemIcon>
                          <small style={{ marginLeft: -30 }}>{item?.department_name}</small>
                        </ListItem>
                      </>
                    )
                  })
                }

              </List>
            </Collapse>
            <ListItem button onClick={() => Navigate("/UserFormList")}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <small style={{ marginLeft: -30 }}>Request</small>
                <small style={{ color: 'red', fontWeight: 'bold', marginLeft: 5 }}>()</small>
              </div>
              <ListItemText />
            </ListItem>
            <ListItem button onClick={() => Navigate("/RequestForm")}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <small style={{ marginLeft: -30 }}>Created Form Request</small>
                <small style={{ color: 'red', fontWeight: 'bold', marginLeft: 5 }}>()</small>
              </div>
              <ListItemText />
            </ListItem>
            <ListItem button onClick={() => Navigate("/Doc_no")}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <small style={{ marginLeft: -30 }}>Document No</small>
                <small style={{ color: 'red', fontWeight: 'bold', marginLeft: 5 }}>()</small>
              </div>
              <ListItemText />
            </ListItem>
            <ListItem button onClick={() => Navigate("/ListFormFromRequest")}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <small style={{ marginLeft: -30 }}>Approved Form</small>
                <small style={{ color: 'red', fontWeight: 'bold', marginLeft: 5 }}>()</small>
              </div>
              <ListItemText />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>

  );
}
