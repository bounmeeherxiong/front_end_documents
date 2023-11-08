import React, { useState, useContext, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WarningIcon from '@material-ui/icons/Warning';
import { Modal } from "react-bootstrap";
import AppsIcon from '@material-ui/icons/Apps';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import ListAltIcon from '@material-ui/icons/ListAlt';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DvrIcon from '@material-ui/icons/Dvr';
import Collapse from "@material-ui/core/Collapse";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../page/contexts/LoginContext";

import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PaymentIcon from '@material-ui/icons/Payment';
import axios from "axios";
import Cookies from 'js-cookie';
import SettingsIcon from "@material-ui/icons/Settings";
import { CreateForm } from "../components/CreateForm";
import { EdiForm } from "../components/EdiForm";
import { ViewForm } from "../components/ViewForm";
import { UserusingForm } from "../components/UserusingForm";
import UserEditform from "../components/UserEditform";
import { UserCheckDoc_no } from "../components/UserCheckDoc_no";
import Badge from '@material-ui/core/Badge';

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
  paper: {
    marginRight: theme.spacing(2),
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


  const [role_id, setRole_id] = useState([])
  const [count, setCount] = useState('')
  const [countrequested, setCountrequested] = useState([])
  const [hidden, setHidden] = useState('')
  const [listform, setListform] = useState([]);
  const [openingsetting, setOpeningsetting] = useState(false)
  const [file, setFile] = useState();

  const [open1, setOpen1] = useState(false);
  const anchorRef = useRef(null);

  const {
    setDataList,
    open,
    setOpen,
    listOpent,
    setListOpent,
    listopenForm,
    setListopenForm,
    id,
    showformscreen,
    setShowformscreen,
    showformEditScreen,
    showViewFormScreen,
    showUserusingFormScreen,
    showUserEditFormScreen,
    showUserCheckFormScreen

  } = useContext(LoginContext)
  let users = Cookies.get("user");
  let data = JSON.parse(users)
  const handleCloseOpenting = () => {
    setOpeningsetting(false)

  }
  const opening = () => {
    setOpeningsetting(!openingsetting)
  }

  // let user_id = data?.user?.user_id
  let user_name = data?.name

  const handleToggle = () => {
    setOpen1((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen1(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen1(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open1);
  React.useEffect(() => {
    if (prevOpen.current === true && open1 === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open1;
  }, [open]);


  const Showfullscreen = () => {
    setShowformscreen(true)
  }

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
  const OnloadListViewrequest = () => {
    axios.get('/api/setting/view-form-request/').then((data) => {
      setCount([...data?.data?.count][0].count)
      setRole_id(data?.data?.datastatus)
    }).catch((err) => {
      console.log(err)
    })
  }
  const OnloadCountNumber = () => {
    axios.get('/api/setting/all-approve').then((data) => {
      setCountrequested([...data?.data?.results][0].requested)
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
  const handlePictureChange = (event) => {
    setFile(event.target.files);
    // const picture = event.target.files[0];
    // const selectedFiles = event.target.files;
    // const file_attachment = Array.from(selectedFiles);

    // setSelectedImage([{ name: file_attachment[0].name, positionX: 100, positionY: 0, width: 100, height: 100, type: 'image' }])
    // if (picture) {
    //     const pictureUrl = URL.createObjectURL(picture);
    //     setPictureUrl(pictureUrl);
    // }
};

const OnCreate = async () => {
  // setIsLoading(true);
  let images
  if (!file) {
      images = 0
  } else {
      let formData = new FormData();
      for (const key of Object.keys(file)) {
          formData.append("file_name", file[key]);
      }
      formData.append("file_name", file);
      let profileImageReturnName = await axios.post("/api/signature/insert", formData);
      images = Object.values(profileImageReturnName.data)[0][0]
  } 

  console.log("iamges=",images)


}
  useEffect(() => {
    OnloadListViewrequest()
    onloadDepartment();
    OnloadCountNumber();
  }, [])
  return (
    <>
      {showformscreen == true ? (
        <>
          <CreateForm />
        </>) : (showformEditScreen == true) ? (
          <>
            <EdiForm
              id={id}
            />
          </>) : (showViewFormScreen == true) ? (<>
            <ViewForm
              id={id}
            />
          </>) : (showUserusingFormScreen == true) ? (<>
            <UserusingForm
              id={id}

            />
          </>) : (showUserEditFormScreen == true) ? (<>
            <UserEditform
              id={id}
            />

          </>) : (showUserCheckFormScreen == true) ? (
            <>
              <UserCheckDoc_no
                id={id}
              />
            </>
          ) : (
        <>
          <Modal show={openingsetting} onHide={handleCloseOpenting} style={{ paddingTop: 50 }} size="lg">
            <Modal.Header closeButton>
              <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', width: '50%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <AccountCircleIcon style={{ fontSize: 50 }} />
                  <h4 style={{marginTop:15}}>Mr.
                    {user_name}
                  </h4>
                </div>
                <h5 style={{marginTop:15,cursor:'pointer'}} onClick={()=>{OnCreate()}}>Add</h5>
              </div>
            </Modal.Header>
            <div style={{width:'100%' }}>
              <div style={{border: '1px solid #ccc',borderRadius:3,display:'flex',marginLeft:10,marginRight:10,marginTop:10,marginBottom:10}}>
                <div style={{display:'flex',flexDirection:'column'}}>
                  <div style={{display:'flex',flexDirection:'row'}}>
                  <small style={{marginLeft:10,fontSize:20}}>My Signature</small>
                  <input style={{marginLeft:10}} type="file"    onChange={handlePictureChange}/>
                  </div>
                  <div style={{width:'80%',marginLeft:10,borderRadius:10,border: '1px solid #ccc',marginBottom:10,height:200}}>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
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
                  <Typography variant="h5" noWrap>
                    Phongsavanh Group
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Badge badgeContent={countrequested} color="secondary" style={{ marginRight: 50, marginTop: 10, cursor: 'pointer' }}>
                      <NotificationsNoneIcon />
                    </Badge>
                    <Typography variant="h6" noWrap
                      style={{ cursor: "pointer" }} >
                      <AccountCircleIcon
                      />
                      <Button
                        ref={anchorRef}
                        aria-controls={open1 ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        style={{ color: 'white' }}
                      >
                        {user_name}
                      </Button>

                    </Typography>
                  </div>
                  <Popper open={open1} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose} style={{ with: '50%' }}>
                            <MenuList autoFocusItem={open1} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              <MenuItem onClick={handleClose} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <AccountCircleIcon />
                                <span style={{ fontSize: 20, marginLeft: 10 }} onClick={() => { opening() }}>My Profiled</span>

                              </MenuItem>
                              <MenuItem onClick={() => { OnLogout() }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <ExitToAppIcon />
                                <span style={{ fontSize: 20, marginLeft: 10 }}>Logout</span>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
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
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem button onClick={() => Navigate("/Index")} >
                  <ListItemIcon>
                    <AppsIcon />
                  </ListItemIcon>
                  <span style={{ fontSize: 18, fontWeight: 'bold' }}>Dashboard</span>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={handleClick}>
                  <ListItemIcon>
                    <SettingsIcon />

                  </ListItemIcon>
                  <small style={{ fontSize: 18 }}>Settings</small>
                  <ListItemText />
                </ListItem>
                <Collapse in={listOpent} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}
                      onClick={() => { Showfullscreen() }}
                    >
                      <ListItemIcon >
                        <AddCircleIcon style={{ marginLeft: 40 }} />
                      </ListItemIcon>
                      <span style={{ fontSize: 15, marginLeft: 5 }}>Create Form</span>
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => Navigate("/FormList")}>
                      <ListItemIcon>
                        <FormatListNumberedIcon style={{ marginLeft: 40 }} />
                      </ListItemIcon>
                      <small style={{ fontSize: 15, marginLeft: 5 }} >List Form</small>
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => Navigate("/AddEmployee")}>
                      <ListItemIcon>
                        <GroupAddIcon style={{ marginLeft: 40 }} />
                      </ListItemIcon>
                      <small style={{ fontSize: 15, marginLeft: 5 }}>Add employye</small>
                    </ListItem>


                  </List>
                </Collapse>

                <ListItem button onClick={handleClickform}>
                  <ListItemIcon>


                    <RecentActorsIcon />
                  </ListItemIcon>
                  <small style={{ fontSize: 18 }}>Department </small>
                  <ListItemText />
                </ListItem>
                <Collapse in={listopenForm} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      listform && listform.map((item, index) => {
                        return (
                          <div key={index}>
                            <ListItem button className={classes.nested} onClick={() => { Navigate(`/Department/${item?.department_id}`); Ondepartment(item?.department_id) }}>
                              <ListItemIcon>
                              </ListItemIcon>
                              <small>{item?.department_name}</small>
                            </ListItem>
                          </div>
                        )
                      })
                    }

                  </List>
                </Collapse>
                <ListItem button onClick={() => Navigate("/UserFormList")}>
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <small style={{ fontSize: 18 }}>My Request</small>
                  </div>
                  <ListItemText />
                </ListItem>
                <ListItem button onClick={() => Navigate("/RequestForm")}>
                  <ListItemIcon>

                    {
                      countrequested > 0 ? (<>
                        <Badge badgeContent={countrequested} color="secondary">
                          <BarChartIcon />
                        </Badge>
                      </>) : (<>
                        <BarChartIcon />

                      </>)
                    }
                  </ListItemIcon>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <small style={{ fontSize: 18 }}>My Form Request</small>
                    {/* <small style={{ color: 'red', fontWeight: 'bold', marginLeft: 5 }}>({countrequested})</small> */}
                  </div>
                  <ListItemText />
                </ListItem>
                <ListItem button onClick={() => Navigate("/Doc_no")}>
                  <ListItemIcon>
                    <DvrIcon />
                  </ListItemIcon>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <small style={{ fontSize: 18 }}>Document No</small>
                  </div>
                  <ListItemText />
                </ListItem>
                <ListItem button onClick={() => Navigate("/ListFormFromRequest")}>
                  <ListItemIcon>
                    <PaymentIcon />
                  </ListItemIcon>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <small style={{ fontSize: 18 }}>My Approved</small>
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
      )
      }

    </>

  );
}
