import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rnd } from 'react-rnd';
import TextField from '@material-ui/core/TextField';
import InputIcon from '@material-ui/icons/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';
import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import { Modal } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Spinner } from "react-bootstrap";
import { LoginContext } from "../page/contexts/LoginContext";
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const UserCheckDoc_no = (props) => {
    const classes = useStyles();
    let componentRef = useRef(null)
    const { id } = props;
    const [datatable, setDatatable] = useState([])
    const [datatable1, setDatatable1] = useState([])
    const [datatable2, setDatatable2] = useState([])
    const [tableRow, setTableRow] = useState('')
    const [tableColumn, setTableColumn] = useState('')
    const [show, setShow] = useState(false);
    const [showcoments, setShowcoments] = useState(false)
    const [uselable, setUselable] = useState([])
    const [usecheckbox, setUsecheckbox] = useState([])
    const [usetextlist, setUsetextlist] = useState([])
    const [getindex, setGetindex] = useState('')
    const [countRow, setCountRow] = useState('')
    const [countRow1, setCountRow1] = useState('')
    const [countRow2, setCountRow2] = useState('')
    const [countRow3, setCountRow3] = useState('')
    const [isLoading, setIsLoading,] = useState(false);
    const [index1, setIndex1] = useState('')
    const [index2, setIndex2] = useState('')
    const [bold, setBold] = useState(false)
    const [editlable, setEditlable] = useState('')
    const [showdeltable, setShowdeltable] = useState(true)
    const [showdeltable1, setShowdeltable1] = useState(false)
    const [showdeltable2, setShowdeltable2] = useState(false)
    const [listtext, setListText] = useState([])
    const [datacheckbox, setDatacheckbox] = useState([])
    const [listtextw, setListTextw] = useState([])
    const [fontSize, setFontSize] = useState('')
    const [data, setdata] = useState([])
    const [editcheckboxvalues, setEditcheckboxvalues] = useState('')
    const [datalable, setDatalable] = useState([])
    const [usetable, setUsetable] = useState([])
    const [tablechidren, setTablechidren] = useState([])
    const [usetable1, setUsetable1] = useState([])
    const [usetable2, setUsetable2] = useState([])
    const [usetable3, setUsetable3] = useState([])
    const [tablechidren1, setTablechidren1] = useState([])
    const [tablechidren2, setTablechidren2] = useState([])
    const [tablechidren3, setTablechidren3] = useState([])
    const [inputValues, setInputValues] = useState('')
    const [inputValues1, setInputValues1] = useState('')
    const [inputValues2, setInputValues2] = useState('')
    const [inputValues3, setInputValues3] = useState('')
    const [inputValues4, setInputValues4] = useState('')
    const [inputValues5, setInputValues5] = useState('')
    const [showsave, setShowsave] = useState(false);
    const [widthsize, setWidthsize] = useState('')
    const [widthsize1, setWidthsize1] = useState('')
    const [heightsize, setHeightsize] = useState('')
    const [heightsize1, setHeightsize1] = useState('')
    const [conditions, setConditions] = useState(false)
    const [formstatus, setformstatus] = useState('')
    const [tables, setTables] = useState([[]])
    const [tables1, setTables1] = useState([[]])
    const [selectedImage, setSelectedImage] = useState([])

    const [countnumber, setcountnumber] = useState('')
    const [saveAs, setSaveAs] = useState('')
    const [textarea, setTextarea] = useState('')
    const {
        setShowUserCheckFormScreen,
    } = useContext(LoginContext)
    let users = Cookies.get("user");
    let data_user = JSON.parse(users)
    let user_id = data_user?.user?.user_id
    const OncloseViewformScreen = () => {
        setShowUserCheckFormScreen(false)
    };
    const handleshowcoments = () => { setShowcoments(true) }
    const handlePrint = () => {
        window.print();
    };
    const OnloadNumner = () => {
        axios.get('/api/no/get-auto-number').then((data) => {
            setcountnumber(data?.data?.data)

        }).catch((err) => {
            console.log(err)
        })
    }
    // /api/no/find-Request-By-Id

    const OnloadListData = () => {
        axios.get(`/api/req/find-Form-Id/${id}`).then((data) => {

            setUsetable([...data?.data?.GetTable_position_one])
            setUsetable1([...data?.data?.GetTable_positions_two])
            setUsetable2([...data?.data?.GetTable_positions_three])
            if ([...data?.data?.GetImage_positions].length == 0) {

            } else {
                setSelectedImage([...data?.data?.GetImage_positions])
            }
            if ([...data?.data?.GetTable_position_one].length == 0) {
            } else {
                setCountRow([...data?.data?.GetTable_position_one][0].countrow)
                setTablechidren(JSON.parse([...data?.data?.GetTable_position_one][0].body_table))
            }
            if ([...data?.data?.GetTable_positions_two].length == 0) {

            } else {
                setCountRow1([...data?.data?.GetTable_positions_two][0].countrow)
                setTablechidren1(JSON.parse([...data?.data?.GetTable_positions_two][0].body_table))
            }
            if ([...data?.data?.GetTable_positions_three].length == 0) {

            } else {
                setCountRow3([...data?.data?.GetTable_positions_three][0].countRow)
                setTablechidren3(JSON.parse([...data?.data?.GetTable_positions_three][0].body_table))
            }
            setUselable([...data?.data?.GetTable_label])
            setUsecheckbox([...data?.data?.GetTable_checkbox])
            setUsetextlist([...data?.data?.resuGetTable_sizeforinputlts])
        }).catch((err) => {
            console.log(err)
        })
    }
    const InsertComment = () => {
        let dataInFormations = {
            request_document_no_id: '0fcfb7ef-d21e-4f9f-837f-43aabe8a42db',
            req_id: id,
            comments: textarea,
            employee_id: user_id
        }
        axios.post('/api/commemt/insert-comment', dataInFormations).then((data) => {
            setShowcoments(false)
            OnloadListData()
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleClosedel = () => {
        setShow(false);
    }
    const handleCloseComments = () => {
        setShowcoments(false)
    }
    const OnUpdate = () => {
        setIsLoading(true);
        let informdataUpdate = {
            req_uid: id,
            UpdateDataCheckbox: usecheckbox,
            UpdateDataLable: uselable,
            UpdateSizeForInput: usetextlist,
            UpdatePositionsOne: usetable,
            DataTablepositionOneupdate: tablechidren,
            UpdatePositionsTwo: usetable1,
            DataTablepositiontwoupdate: tablechidren1,
            UpdatePositionsThree: '',
            DataTablepositionThreeupdate: '',
            doc_no: countnumber
        }
        axios.post("/api/no/update-request-and-docno", informdataUpdate).then((data) => {
            OnloadListData()
            setIsLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }
    const OnCreate = () => {
        setIsLoading(true);
        setShowsave(false)
        let informdata = {
            form_id: id,
            title: saveAs,
            req_status: 0,
            doc_no: 0,
            created_by: user_id,
            InsertDataCheckbox: usecheckbox,
            InsertDataLable: uselable,
            InsertPositionOne: usetable,
            DataTablepositionOne: tablechidren,
            InsertPositionsTwo: '',
            DataTablepositiontwo: '',
            InsertPositionsThree: '',
            DataTablepositionThree: '',
            InsertSizeForInput: usetextlist
        }
        axios.post("/api/req/insert-request-form", informdata).then((data) => {
            setIsLoading(false);
        }).catch((err) => {
            console.log(err)
        })
    }


    const Onclickrow = () => {

        const array = tablechidren.map((item) => {
            return item
        })
        let list = [];
        let data;
        for (let i = 0; i < 1; i++) {
            if (countRow == 2) {
                data = [{ name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
            } else if (countRow == 3) {
                data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
            } else if (countRow == 4) {
                data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }]
            } else if (countRow == 5) {

            } else if (countRow == 6) {

            }
            list.push(data)
        }
        const result = [...array, ...list]
        setTablechidren([...result])
    }
    const Onclickrow1 = () => {
        const array = tablechidren1.map((item) => {
            return item
        })

        let list = [];
        let data;
        for (let i = 0; i < 1; i++) {
            if (countRow1 == 2) {
                data = [{ name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
            } else if (countRow1 == 3) {
                data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
            } else if (countRow1 == 4) {
                data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }]
            } else if (countRow1 == 5) {

            } else if (countRow1 == 6) {

            }
            list.push(data)
        }
        const result = [...array, ...list]
        setTablechidren1([...result])
    }

    const changeText = (value, key, index) => {
        const object = { ...usetextlist[index] };
        object[key] = value;
        const cloneData = [...usetextlist];
        cloneData[index] = { ...object };
        setUsetextlist([...cloneData]);
    };
    const changeText2 = (value, key, index2, index1) => {
        setInputValues(value)
        const cloneTables = [...tablechidren]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren]
        setTablechidren([...cloneData])
    };
    const changeText3 = (value, key, index2, index1) => {
        setInputValues1(value)
        const cloneTables = [...tablechidren]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren]
        setTablechidren([...cloneData])
    };
    const changeText5 = (value, key, index2, index1) => {
        setInputValues2(value)
        const cloneTables = [...tablechidren1]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren1]
        setTablechidren1([...cloneData])
    };
    const changeText6 = (value, key, index2, index1) => {
        setInputValues3(value)
        const cloneTables = [...tablechidren1]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren1]
        setTablechidren1([...cloneData])
    };
    const changeTextwidth = (value, key, index2, index1) => {
        setWidthsize(value)
        const cloneTables = [...tablechidren]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren]
        setTablechidren([...cloneData])
    };
    const changeTextwidth1 = (value, key, index2, index1) => {
        setWidthsize1(value)
        const cloneTables = [...tablechidren1]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren1]
        setTablechidren1([...cloneData])
    };
    const changeTextheight = (value, key, index2, index1) => {
        setHeightsize(value)
        const cloneTables = [...tablechidren]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren]
        setTablechidren([...cloneData])
    };
    const changeText1 = (value, key, index1, index) => {
        const cloneTables = [...tables]
        const datarow = cloneTables[index1]
        const object = datarow[index]
        object[key] = value;
        const cloneData = [...tables]
        setTables([...cloneData])


    };
    const changeTextheight1 = (value, key, index2, index1) => {
        setHeightsize1(value)
        const cloneTables = [...tablechidren1]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren1]
        setTablechidren1([...cloneData])
    };
    const DeleteChangeText = (index, index1) => {
        const cloneTables = [...tablechidren]
        const deleteObject = cloneTables[index1]
        deleteObject.splice(index, 1);
        const cloneData = [...tablechidren]
        setTablechidren([...cloneData])
    }
    const DeleteChangeText1 = (index, index1) => {
        const cloneTables = [...tablechidren1]
        const deleteObject = cloneTables[index1]
        deleteObject.splice(index, 1);
        const cloneData = [...tablechidren1]
        setTablechidren1([...cloneData])
    }
    const changeuseLable = (value, key, getindex) => {
        setEditlable(value)
        const object = { ...uselable[getindex] };
        object[key] = value;
        const cloneData = [...uselable];
        cloneData[getindex] = { ...object };
        setUselable([...cloneData]);

    }
    const changeLable = (value, key, getindex) => {
        setEditlable(value)
        const object = { ...datalable[getindex] };
        object[key] = value;
        const cloneData = [...datalable];
        cloneData[getindex] = { ...object };
        setDatalable([...cloneData]);

    }
    const changeuseFontSize = (value, key, getindex) => {
        setFontSize(value)
        const object = { ...uselable[getindex] };
        object[key] = value;
        const cloneData = [...uselable];
        cloneData[getindex] = { ...object };
        setUselable([...cloneData]);
    }
    const changeFontSize = (value, key, getindex) => {
        setFontSize(value)
        const object = { ...datalable[getindex] };
        object[key] = value;
        const cloneData = [...datalable];
        cloneData[getindex] = { ...object };
        setDatalable([...cloneData]);
    }
    const TextBoldTrue = (getindex) => {
        setBold(true)
        let key = 'fontWeight'
        let value = 'bold'
        const object = { ...uselable[getindex] };
        object[key] = value;
        const cloneData = [...uselable];
        cloneData[getindex] = { ...object };
        setUselable([...cloneData]);

    }
    const TextBoldFalse = (getindex) => {
        setBold(false)
        let key = 'fontWeight'
        let value = ''
        const object = { ...uselable[getindex] };
        object[key] = value;
        const cloneData = [...datalable];
        cloneData[getindex] = { ...object };
        setUselable([...cloneData]);
    }
    const deletelable = (index) => {
        const cloneData = [...uselable]
        cloneData.splice(index, 1)
        setUselable([...cloneData])
    }

    const onDragStoptable = (e, d, index) => {
        const cloneDatas = [...datatable]
        const cloneData = { ...datatable[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setDatatable([...cloneDatas])
    }
    const onDragStoptableupdate = (e, d, index) => {
        const cloneDatas = [...usetable]
        const cloneData = { ...usetable[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setUsetable([...cloneDatas])
    }
    const onDragStoptable1 = (e, d, index) => {
        const cloneDatas = [...usetable1]
        const cloneData = { ...usetable1[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setUsetable1([...cloneDatas])
    }
    const onDragStoptable2 = (e, d, index) => {
        const cloneDatas = [...usetable2]
        const cloneData = { ...usetable2[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setUsetable2([...cloneDatas])
    }
    const onDragStopcheckboxupdate = (e, d, index) => {
        const cloneDatas = [...usecheckbox]
        const cloneData = { ...usecheckbox[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setUsecheckbox([...cloneDatas])
    }
    const onDragStopcheckbox = (e, d, index) => {
        const cloneDatas = [...datacheckbox]
        const cloneData = { ...datacheckbox[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setDatacheckbox([...cloneDatas])
    }
    const OnClickCheckbox = (index) => {
        setGetindex(index)
        const cloneData = usecheckbox[index]
        setEditcheckboxvalues(cloneData.name)
    }
    const Onclicktextlist = (index) => {
        const cloneData = usetextlist[index]
        cloneData.index = index
        setListTextw([cloneData])

    }

    const deletechange = (index) => {
        const cloneData = [...usetextlist]
        const cloneData1 = [...usetextlist]
        cloneData.splice(index, 1)
        cloneData1.splice(index, 1)
        setUsetextlist([...cloneData])
        setListTextw([...cloneData1])
    }
    const changeTextForsize = (value, key, index) => {
        const object = { ...usetextlist[index] };
        object[key] = value;
        const cloneData = [...usetextlist];
        cloneData[index] = { ...object };
        setUsetextlist([...cloneData]);
        setListTextw([cloneData[index]]);
    };
    const changeTexttable = (value, key, index1, index2) => {
        const cloneTables = [...tablechidren]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren]
        setTablechidren([...cloneData])
    };
    const changeTexttable1 = (value, key, index1, index2) => {
        const cloneTables = [...tablechidren1]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren1]
        setTablechidren1([...cloneData])
    };
    const changeTexttable2 = (value, key, index1, index2) => {
        const cloneTables = [...tablechidren2]
        const datarow = cloneTables[index1]
        const object = datarow[index2]
        object[key] = value;
        const cloneData = [...tablechidren2]
        setTablechidren2([...cloneData])
    };
    const changeCheckbox = (value, key, getindex) => {
        setEditcheckboxvalues(value)
        const object = { ...usecheckbox[getindex] };
        object[key] = value;
        const cloneData = [...usecheckbox];
        cloneData[getindex] = { ...object };
        setUsecheckbox([...cloneData]);

    }
    const deletecheckbox = (index) => {
        setEditcheckboxvalues('')
        const cloneData = [...usecheckbox]
        cloneData.splice(index, 1)
        setUsecheckbox([...cloneData])
    }


    const deletetable = (index) => {
        const cloneData = [...usetable]
        cloneData.splice(index, 1)
        setUsetable([...cloneData])
    }
    const deletetable1 = (index) => {
        const cloneData = [...usetable1]
        cloneData.splice(index, 1)
        setUsetable1([...cloneData])
    }

    const onDragStoplable = (e, d, index) => {
        const cloneDatas = [...datalable]
        const cloneData = { ...datalable[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setDatalable([...cloneDatas])
    }
    const onDragStoplableupdate = (e, d, index) => {
        const cloneDatas = [...uselable]
        const cloneData = { ...uselable[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setUselable([...cloneDatas])
    }
    const onClickOnElement = (index) => {
        setConditions(true)
        setGetindex(index)
        const cloneData = datalable[index]
        setEditlable(cloneData.name)
        setFontSize(cloneData.font)
    }
    const onClickOnElementupdate = (index) => {
        setConditions(false)
        setGetindex(index)
        const cloneData = uselable[index]
        setEditlable(cloneData.name)
        setFontSize(cloneData.font)

    }
    const Onclicktableindex = (index) => {
        setShowdeltable(true)
        setShowdeltable1(false)
        setShowdeltable2(false)
        setGetindex(index)
    }
    const onAddNewCheckbox = () => {

        // setShowcheckboxStyle(true)
        // if(!checkboxvalue) return
        const newcheckbox = { name: 'Checkbox', positionX: 0, positionY: 0, width: 50, height: 0, type: 'checkbox' }
        const cloneData = [...datacheckbox]
        cloneData.push(newcheckbox)
        setDatacheckbox([...cloneData])
        // setCheckboxvalue('')
    }

    const onAddNewItem = () => {

        setDatalable([...datalable, { name: 'Text', positionX: 0, positionY: 0, width: 0, height: 0, font: '20px', fontWeight: '', type: 'lable' }])
    }
    const OnAddText = () => {
        setListText([...listtext, { name: "", positionX: 100, positionY: 100, width: 200, height: 40, type: 'text' }]);
    };
    const Onclicktable = (index) => {
        setShowdeltable(true)
        setShowdeltable1(false)
        setShowdeltable2(false)
        setGetindex(index)
    }
    const Onclicktable1 = (index) => {
        setShowdeltable(false)
        setShowdeltable1(true)
        setShowdeltable2(false)

        setGetindex(index)
    }
    const Onclicktable2 = (index) => {
        setShowdeltable(false)
        setShowdeltable1(false)
        setShowdeltable2(true)
        setGetindex(index)
    }
    const OnclickTablefirst = (index2, index1) => {
        setIndex1(index1)
        setIndex2(index2)
    }
    const onDragStopinput = (e, d, index) => {
        const cloneDatas = [...listtext]
        const cloneData = { ...listtext[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setListText([...cloneDatas])
    }
    const onDragStopinputupdate = (e, d, index) => {
        const cloneDatas = [...usetextlist]
        const cloneData = { ...usetextlist[index] }
        cloneData.positionX = d.x;
        cloneData.positionY = d.y
        cloneDatas[index] = cloneData
        setUsetextlist([...cloneDatas])
    }
    useEffect(() => {
        OnloadListData()
        OnloadNumner()

    }, [])

    return (
        <div style={{ width: '100%', backgroundColor: '#ebedef' }}>
            <Modal show={showcoments} onHide={handleCloseComments} style={{ paddingTop: 50 }} size="lg">
                <Modal.Header closeButton>
                    <span style={{ fontSize: 14, paddingTop: 10 }}>
                        List Comment </span>
                </Modal.Header>
                <div style={{ width: '100%', marginTop: 20 }}>
                    <TextField
                        style={{ width: '95%', height: 300, marginLeft: 20 }}
                        id="outlined-multiline-static"
                        multiline
                        value={textarea}
                        onChange={(e) => setTextarea(e.target.value)}
                        defaultValue="Default Value"
                        variant="outlined"
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10 }}>
                    <Button
                        style={{ marginBottom: 20, marginRight: 35 }}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick={() => { InsertComment() }}
                    >
                        Send
                    </Button>

                </div>
            </Modal>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'fixed', top: 0, left: 10, right: 25, zIndex: 999, height: 50, backgroundColor: "#ebedef", width: "100%" }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <div style={{ borderRadius: 3, width: 80, marginLeft: 10, cursor: 'pointer', height: 30, marginTop: 10 }} onClick={() => { OnUpdate() }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<InputIcon />}
                            onClick={() => { OnUpdate() }}
                        >
                            {!isLoading ? (
                                <>
                                    Save
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
                    <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 100, marginLeft: 10, cursor: 'pointer', height: 30, marginTop: 10, marginRight: 20 }} onClick={() => { handleshowcoments() }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<CommentIcon />}
                            onClick={() => { handleshowcoments() }}
                        >
                            comments
                        </Button>
                    </div>
                    <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 100, marginLeft: 10, cursor: 'pointer', height: 33, marginTop: 10, display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
                        <small style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}  >{countnumber}</small>
                    </div>
                    <ReactToPrint
                        trigger={() =>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 80, marginLeft: 10, cursor: 'pointer', height: 30, marginTop: 10, marginRight: 10 }} >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<PrintIcon />}
                                >
                                    Print
                                </Button>
                            </div>
                        }
                        content={() => componentRef}
                    />
                    <div style={{ borderRadius: 3, width: 80, cursor: 'pointer', height: 30, marginTop: 10, marginRight: 40 }}>

                        <small>
                            <Button

                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<CloseIcon />}
                                onClick={() => { OncloseViewformScreen() }}
                            >
                                Close
                            </Button>
                        </small>
                    </div>

                </div>

            </div>
            <div style={{ height: 50 }}>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div ref={(el) => (componentRef = el)} style={{ display: 'flex', width: '210mm', height: 2000, backgroundColor: 'white', marginLeft: 10 }}>
                    {
                        datatable && datatable.map((el, index) => {
                            if (el.type === 'table') {
                                return (
                                    <Rnd
                                        key={index}
                                        default={{
                                            x: el.positionX,
                                            y: el.positionY,

                                        }}
                                        onDragStop={(e, d) => onDragStoptable(e, d, index)}
                                        onClick={() => { Onclicktable(index) }}
                                    >
                                        <table style={{ border: '1px solid gray' }}  >
                                            {
                                                tables && tables.map((item, index1) => {
                                                    return (
                                                        <>
                                                            <tr key={index1} style={{ border: '1px solid gray' }}>
                                                                {
                                                                    item.map((data, index) => {
                                                                        return (
                                                                            <>
                                                                                <td key={index} style={{ width: `${data.width}px`, border: '1px solid gray' }} colSpan={data.cols} rowSpan={data.rows}>
                                                                                    <textarea value={data?.name}
                                                                                        onChange={(e) => { changeText1(e.target.value, 'name', index1, index) }}
                                                                                        onClick={() => { OnclickTablefirst(index, index1) }}
                                                                                        style={{ border: 'none', width: '100%', height: `${data?.height}px` }} />
                                                                                </td>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </table>
                                    </Rnd>
                                )
                            }
                        })
                    }

                    {
                        usetable && usetable.map((el, index) => {
                            return (
                                <div key={index}>
                                    <Rnd
                                        default={{
                                            x: el.positionX,
                                            y: el.positionY,

                                        }}
                                        onDragStop={(e, d) => onDragStoptableupdate(e, d, index)}
                                        onClick={() => { Onclicktable(index) }}
                                    >
                                        <table style={{ border: '1px solid gray' }}>
                                            {
                                                tablechidren && tablechidren.map((item, index1) => {
                                                    return (
                                                        <>
                                                            <tr key={index1} style={{ width: `${item.width}px`, border: '1px solid gray' }}>
                                                                {
                                                                    item.map((data, index2) => {
                                                                        return (
                                                                            <>
                                                                                <td key={index2} style={{ border: '1px solid gray', width: `${data.width}px` }} colSpan={data.cols} rowSpan={data.rows}>
                                                                                    <textarea value={data?.name}
                                                                                        onChange={(e) => { changeTexttable(e.target.value, 'name', index1, index2) }}
                                                                                        onClick={() => { OnclickTablefirst(index1, index2) }}
                                                                                        style={{ border: 'none', width: '100%', height: `${data?.height}px` }} />
                                                                                </td>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </table>
                                    </Rnd>
                                </div>
                            )
                        })
                    }
                    {
                        usetable1 && usetable1.map((el, index) => {
                            return (
                                <div key={index}>
                                    <Rnd
                                        default={{
                                            x: el.positionX,
                                            y: el.positionY,
                                        }}
                                        onDragStop={(e, d) => onDragStoptable1(e, d, index)}
                                        onClick={() => { Onclicktable1(index) }}
                                    >
                                        <table style={{ border: '1px solid gray' }}>
                                            {
                                                tablechidren1 && tablechidren1.map((item, index1) => {
                                                    return (
                                                        <>
                                                            <tr key={index1} style={{ width: `${item.width}px`, border: '1px solid gray' }}>
                                                                {
                                                                    item.map((data, index2) => {
                                                                        return (
                                                                            <>
                                                                                <td key={index2} style={{ border: '1px solid gray', width: `${data.width}px` }} colSpan={data.cols} rowSpan={data.rows}>

                                                                                    <textarea value={data?.name}
                                                                                        onChange={(e) => { changeTexttable1(e.target.value, 'name', index1, index2) }}
                                                                                        onClick={() => { OnclickTablefirst(index1, index2) }}
                                                                                        style={{ border: 'none', width: '100%', height: `${data?.height}px` }} />
                                                                                </td>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </table>
                                    </Rnd>
                                </div>
                            )
                        })
                    }
                    {
                        usetable2 && usetable2.map((el, index) => {
                            return (
                                <div key={index}>
                                    <Rnd
                                        default={{
                                            x: el.positionX,
                                            y: el.positionY,

                                        }}
                                        onDragStop={(e, d) => onDragStoptable2(e, d, index)}
                                    // onClick={()=>{Onclicktable(index)}}

                                    >
                                        <table style={{ border: '1px solid gray' }}>
                                            {
                                                tablechidren2 && tablechidren2.map((item, index1) => {
                                                    return (
                                                        <>
                                                            <tr key={index1} style={{ width: `${item.width}px`, border: '1px solid gray' }}>
                                                                {
                                                                    item.map((data, index2) => {
                                                                        return (
                                                                            <>
                                                                                <td key={index2} style={{ border: '1px solid gray', width: `${data.width}px` }} colSpan={data.cols} rowSpan={data.rows}>

                                                                                    <textarea value={data?.name}
                                                                                        onChange={(e) => { changeTexttable2(e.target.value, 'name', index1, index2) }}
                                                                                        // onClick={()=>{OnclickTable(index,index1)}}
                                                                                        style={{ border: 'none', width: '100%', height: `${data?.height}px` }} />
                                                                                </td>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </table>
                                    </Rnd>
                                </div>
                            )
                        })
                    }
                    {
                        usetable3 && usetable3.map((el, index) => {
                            return (
                                <div key={index}>
                                    <Rnd
                                        default={{
                                            x: el.positionX,
                                            y: el.positionY,

                                        }}
                                        onDragStop={(e, d) => onDragStoptable2(e, d, index)}
                                    // onClick={()=>{Onclicktable(index)}}

                                    >
                                        <table style={{ border: '1px solid gray' }}>
                                            {
                                                tablechidren3 && tablechidren3.map((item, index1) => {
                                                    return (
                                                        <>
                                                            <tr key={index1} style={{ width: `${item.width}px`, border: '1px solid gray' }}>
                                                                {
                                                                    item.map((data, index2) => {
                                                                        return (
                                                                            <>
                                                                                <td key={index2} style={{ border: '1px solid gray', width: `${data.width}px` }} colSpan={data.cols} rowSpan={data.rows}>

                                                                                    <textarea value={data?.name}
                                                                                        onChange={(e) => { changeTexttable2(e.target.value, 'name', index1, index2) }}
                                                                                        // onClick={()=>{OnclickTable(index,index1)}}
                                                                                        style={{ border: 'none', width: '100%', height: `${data?.height}px` }} />
                                                                                </td>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </table>
                                    </Rnd>
                                </div>
                            )
                        })
                    }
                    {
                        uselable && uselable.map((el, index) => {
                            return (
                                <Rnd
                                    key={index}
                                    default={{
                                        x: el.positionX,
                                        y: el.positionY,

                                    }}
                                    onDragStop={(e, d) => onDragStoplableupdate(e, d, index)}
                                    onClick={() => onClickOnElementupdate(index)}
                                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                                >

                                    <small style={{ fontSize: el.font, fontWeight: el.fontWeight }}>{el.name}</small>
                                </Rnd>
                            )

                        })
                    }
                    {
                        datalable && datalable.map((el, index) => {
                            return (
                                <>
                                    <Rnd
                                        key={index}
                                        default={{
                                            x: el.positionX,
                                            y: el.positionY,
                                        }}
                                        onDragStop={(e, d) => onDragStoplable(e, d, index)}
                                        onClick={() => onClickOnElement(index)}
                                    >
                                        <small style={{ fontSize: el.font, fontWeight: el.fontWeight }}>{el.name}</small>
                                    </Rnd>
                                </>
                            )

                        })
                    }
                    {
                        usecheckbox && usecheckbox.map((el, index) => {
                            return (
                                <Rnd
                                    key={index}
                                    default={{
                                        x: el.positionX,
                                        y: el.positionY,

                                    }}
                                    onDragStop={(e, d) => onDragStopcheckboxupdate(e, d, index)}
                                    onClick={() => OnClickCheckbox(index)}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="checkbox" style={{ cursor: 'pointer' }} />
                                        <small style={{ marginLeft: 5 }}>{el.name}</small>

                                    </div>
                                </Rnd>
                            )

                        })

                    }
                    {
                        usetextlist && usetextlist.map((e, index) => {
                            return (
                                < Rnd
                                    default={{
                                        x: e.positionX,
                                        y: e.positionY,
                                    }}
                                    onDragStop={(e, d) => onDragStopinputupdate(e, d, index)}
                                >
                                    <RowComponent
                                        index={index}
                                        changeText={changeText}
                                        e={e}
                                        Onclicktextlist={Onclicktextlist}
                                    />
                                </Rnd>
                            )
                        })
                    }
                    {
                        datacheckbox && datacheckbox.map((el, index) => {
                            return (
                                <Rnd
                                    key={index}
                                    default={{
                                        x: el.positionX,
                                        y: el.positionY,

                                    }}
                                    onDragStop={(e, d) => onDragStopcheckbox(e, d, index)}
                                    onClick={() => OnClickCheckbox(index)}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="checkbox" style={{ cursor: 'pointer' }} />
                                        <small style={{ marginLeft: 5 }}>{el.name}</small>

                                    </div>

                                </Rnd>
                            )

                        })

                    }
                    {
                        listtext && listtext.map((e, index) => {
                            return (
                                < Rnd
                                    default={{
                                        x: e.positionX,
                                        y: e.positionY,
                                    }}
                                    onDragStop={(e, d) => onDragStopinput(e, d, index)}
                                >

                                    <RowComponent
                                        index={index}
                                        changeText={changeText}
                                        Onclicktextlist={Onclicktextlist}
                                        e={e}
                                    />
                                </Rnd>

                            )
                        })
                    }
                    {
                        selectedImage && selectedImage.map((e, index) => {
                            return (
                                <Rnd
                                    default={{
                                        x: e.positionX,
                                        y: e.positionY,
                                    }}

                                >

                                    <img key={index} src={e.images} alt="Selected Picture" style={{ width: `${e?.width}px`, height: `${e?.height}px` }} />
                                </Rnd>
                            )
                        })
                    }

                </div>
                <div style={{ width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                            {
                                listtextw.length == 0 ? (
                                    <>
                                        < ComponentWidthAndHeighCopy />
                                    </>
                                ) : (
                                    <>
                                        {
                                            listtextw && listtextw.map((e, index) => {
                                                return (
                                                    <>
                                                        <ComponentWidthAndHeigh
                                                            key={index}
                                                            changeTextForsize={changeTextForsize}
                                                            deletechange={deletechange}
                                                            e={e}
                                                            index={e.index}
                                                        />
                                                    </>
                                                )
                                            })
                                        }

                                    </>)
                            }
                        </div>
                        {
                            conditions == false ? (
                                <>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
                                        <CompoentStyleForUseLable
                                            editlable={editlable}
                                            fontSize={fontSize}
                                            changeuseLable={changeuseLable}
                                            changeuseFontSize={changeuseFontSize}
                                            TextBoldTrue={TextBoldTrue}
                                            TextBoldFalse={TextBoldFalse}
                                            bold={bold}
                                            getindex={getindex}
                                            deletelable={deletelable}
                                        />
                                    </div>

                                </>) : null
                        }

                        {
                            conditions == true ? (<>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
                                    <CompoentStyleForLable
                                        editlable={editlable}
                                        fontSize={fontSize}
                                        changeLable={changeLable}
                                        changeFontSize={changeFontSize}
                                        TextBoldTrue={TextBoldTrue}
                                        TextBoldFalse={TextBoldFalse}
                                        bold={bold}
                                        getindex={getindex}
                                        deletelable={deletelable}
                                    />
                                </div>

                            </>) : null
                        }
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                            <CompoentStyleForCheckBox
                                editcheckboxvalues={editcheckboxvalues}
                                changeCheckbox={changeCheckbox}
                                getindex={getindex}
                                deletecheckbox={deletecheckbox}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>

                            {
                                showdeltable == true ? (<>
                                    <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 12 }}>Style for Table 1</small>
                                    <input
                                        value={inputValues}
                                        placeholder="column"
                                        onChange={(e) => changeText2(e.target.value, 'rows', index1, index2)}
                                        style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                                    />
                                    <input
                                        placeholder="row"
                                        value={inputValues1}
                                        onChange={(e) => changeText3(e.target.value, 'cols', index1, index2)}
                                        style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                                    />
                                    <input
                                        placeholder="width"
                                        value={widthsize}
                                        onChange={(e) => changeTextwidth(e.target.value, 'width', index1, index2)}
                                        style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                                    />
                                    <input
                                        placeholder="height"
                                        value={heightsize}
                                        onChange={(e) => changeTextheight(e.target.value, 'height', index1, index2)}
                                        style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                                    />
                                    <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 140, marginLeft: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { Onclickrow() }}>
                                        <AddIcon style={{ color: '#fff' }} />
                                        <small style={{ color: '#fff', fontWeight: 'bold' }}>Add lines</small>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>

                                        <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 70, marginLeft: 10, cursor: 'pointer' }} onClick={() => { DeleteChangeText(index1, index2) }}>
                                            <DeleteIcon style={{ color: '#fff' }} />
                                            <small style={{ color: '#fff', fontWeight: 'bold' }}>Row</small>
                                        </div>
                                        <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 70, marginRight: 10, cursor: 'pointer' }} onClick={() => { deletetable(getindex) }}>
                                            <DeleteIcon style={{ color: '#fff' }} />
                                            <small style={{ color: '#fff', fontWeight: 'bold' }}>Table</small>
                                        </div>

                                    </div>

                                </>) : null
                            }
                            {
                                showdeltable1 == true ? (<>
                                    <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 12 }}>Style for Table 2</small>
                                    <input
                                        value={inputValues2}
                                        placeholder="Columns"
                                        onChange={(e) => changeText5(e.target.value, 'rows', index1, index2)}
                                        style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                                    />
                                    <input
                                        placeholder="Rows"
                                        value={inputValues3}
                                        onChange={(e) => changeText6(e.target.value, 'cols', index1, index2)}
                                        style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                                    />
                                    <input
                                        placeholder="Width"
                                        value={widthsize1}
                                        onChange={(e) => changeTextwidth1(e.target.value, 'width', index1, index2)}
                                        style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                                    />
                                    <input
                                        placeholder="Height"
                                        value={heightsize1}
                                        onChange={(e) => changeTextheight1(e.target.value, 'height', index1, index2)}
                                        style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                                    />
                                    <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 140, marginLeft: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { Onclickrow1() }}>
                                        <AddIcon style={{ color: '#fff' }} />
                                        <small style={{ color: '#fff', fontWeight: 'bold' }}>Add lines</small>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 70, marginLeft: 10, cursor: 'pointer' }} onClick={() => { DeleteChangeText1(index1, index2) }}>
                                            <DeleteIcon style={{ color: '#fff' }} />
                                            <small style={{ color: '#fff', fontWeight: 'bold' }}>Row</small>
                                        </div>
                                        <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 70, marginRight: 10, cursor: 'pointer' }} onClick={() => { deletetable1(getindex) }}>
                                            <DeleteIcon style={{ color: '#fff' }} />
                                            <small style={{ color: '#fff', fontWeight: 'bold' }}>Table</small>
                                        </div>

                                    </div>



                                </>) : null
                            }

                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

function RowComponent({ changeText, Onclicktextlist, e, index }) {
    return (
        <>
            <input
                placeholder="......................................................................................................................................................................"
                value={e?.name}
                onChange={(e) => changeText(e.target.value, "name", index)}
                onClick={() => { Onclicktextlist(index) }}
                style={{
                    width: `${e.width}px`,
                    height: `${e.height}px`,
                    border: 'none',
                }}
            />
        </>
    )
}
function ComponentWidthAndHeigh({ changeTextForsize, e, index, deletechange }) {
    return (
        <>
            <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 12, marginTop: 10 }}>Style for Text</small>
            <input
                placeholder="width"
                value={e.width}
                onChange={(e) => { changeTextForsize(e.target.value, "width", index) }}
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10
                }}
            />
            <input
                placeholder="height"
                value={e.height}
                onChange={(e) => { changeTextForsize(e.target.value, "height", index) }}
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10,
                    marginTop: 10
                }}
            />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 140, marginLeft: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { deletechange(index) }}>
                    <DeleteIcon style={{ color: '#fff' }} />
                    <small style={{ color: '#fff', fontWeight: 'bold' }}>Delete for text</small>
                </div>

            </div>

        </>
    )

}
function ComponentWidthAndHeighCopy() {
    return (
        <>
            <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 14 }}>Style for Input</small>
            <input
                placeholder="width"
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10
                }}
            />
            <input
                placeholder="height"
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10,
                    marginTop: 10
                }}
            />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 140, marginLeft: 10, cursor: 'pointer', marginTop: 5 }}>
                    <DeleteIcon style={{ color: '#fff' }} />
                    <small style={{ color: '#fff', fontWeight: 'bold' }}>Delete for text</small>
                </div>
            </div>

        </>
    )
}
function CompoentStyleForUseLable({ editlable, fontSize, changeuseLable, getindex, changeuseFontSize, TextBoldTrue, TextBoldFalse, bold, deletelable }) {
    return (
        <>
            <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 14 }}>Style for Text</small>
            <input
                value={editlable}
                placeholder="Edit Lable"
                onChange={(e) => changeuseLable(e.target.value, 'name', getindex)}
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10
                }}
            />
            <input
                value={fontSize}
                placeholder="fontSize"
                onChange={(e) => changeuseFontSize(e.target.value, 'font', getindex)}
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10,
                    marginTop: 5
                }}
            />
            {
                bold == false ? (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 50, marginLeft: 10, cursor: 'pointer', marginTop: 5 }}>
                                <small style={{ fontWeight: 'bold', fontSize: 20, cursor: 'pointer', marginLeft: 10, color: '#fff' }} onClick={() => { TextBoldTrue(getindex) }}>B</small>
                            </div>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 80, marginLeft: 10, marginRight: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { deletelable(getindex) }}>
                                <DeleteIcon style={{ color: '#fff' }} />
                                <small style={{ color: '#fff', fontWeight: 'bold' }}>Delete</small>
                            </div>

                        </div>


                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 50, marginLeft: 10, cursor: 'pointer', marginTop: 5 }}>
                                <small style={{ fontWeight: 'bold', fontSize: 20, cursor: 'pointer', marginLeft: 10, color: '#fff' }} onClick={() => { TextBoldFalse(getindex) }}>B</small>
                            </div>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 80, marginLeft: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { deletelable(getindex) }}>
                                <DeleteIcon style={{ color: '#fff' }} />
                                <small style={{ color: '#fff', fontWeight: 'bold' }}>Delete</small>
                            </div>

                        </div>


                    </>
                )
            }
        </>
    )
}

function CompoentStyleForLable({ editlable, fontSize, changeLable, getindex, changeFontSize, TextBoldTrue, TextBoldFalse, bold, deletelable }) {
    return (
        <>
            <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 14 }}>Style for Text</small>
            <input
                value={editlable}
                placeholder="Edit Lable"
                onChange={(e) => changeLable(e.target.value, 'name', getindex)}
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10
                }}
            />
            <input
                value={fontSize}
                placeholder="fontSize"
                onChange={(e) => changeFontSize(e.target.value, 'font', getindex)}
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10,
                    marginTop: 5
                }}
            />
            {
                bold == false ? (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 50, marginLeft: 10, cursor: 'pointer', marginTop: 5 }}>
                                <small style={{ fontWeight: 'bold', fontSize: 20, cursor: 'pointer', marginLeft: 10, color: '#fff' }} onClick={() => { TextBoldTrue(getindex) }}>B</small>
                            </div>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 80, marginLeft: 10, marginRight: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { deletelable(getindex) }}>
                                <DeleteIcon style={{ color: '#fff' }} />
                                <small style={{ color: '#fff', fontWeight: 'bold' }}>Delete</small>
                            </div>

                        </div>


                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 50, marginLeft: 10, cursor: 'pointer', marginTop: 5 }}>
                                <small style={{ fontWeight: 'bold', fontSize: 20, cursor: 'pointer', marginLeft: 10, color: '#fff' }} onClick={() => { TextBoldFalse(getindex) }}>B</small>
                            </div>
                            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 80, marginLeft: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { deletelable(getindex) }}>
                                <DeleteIcon style={{ color: '#fff' }} />
                                <small style={{ color: '#fff', fontWeight: 'bold' }}>Delete</small>
                            </div>

                        </div>


                    </>
                )
            }
        </>
    )
}

function CompoentStyleForCheckBox({ editcheckboxvalues, changeCheckbox, getindex, deletecheckbox }) {
    return (
        <>
            <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 14 }}>Style for CheckBox</small>
            <input
                value={editcheckboxvalues}
                placeholder="Edit Checkbox"
                onChange={(e) => changeCheckbox(e.target.value, 'name', getindex)}
                style={{
                    width: 140,
                    height: 25,
                    marginLeft: 10,
                }}
            />
            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 140, marginLeft: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { deletecheckbox(getindex) }}>
                <DeleteIcon style={{ color: '#fff' }} />
                <small style={{ color: '#fff', fontWeight: 'bold' }}>Delete checkBox</small>
            </div>

        </>
    )
}


