import React, { useRef, useEffect, useState} from "react";
import { Rnd } from 'react-rnd';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import InputIcon from '@material-ui/icons/Input';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Cookies from 'js-cookie';
import axios from "axios";
import PrintIcon from '@material-ui/icons/Print';
import { Modal } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import { Spinner } from "react-bootstrap";
import ReactToPrint from "react-to-print";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateForm() {
  const classes = useStyles();
  let componentRef = useRef(null)
  const [tableRow, setTableRow] = useState('')
  const [showdeltable, setShowdeltable] = useState(true)
  const [showdeltable1, setShowdeltable1] = useState(false)
  const [showdeltable2, setShowdeltable2] = useState(false)
  const [widthsize, setWidthsize] = useState('')
  const [widthsize1, setWidthsize1] = useState('')
  const [widthsize2, setWidthsize2] = useState('')
  const [heightsize, setHeightsize] = useState('')
  const [heightsize1, setHeightsize1] = useState('')
  const [heightsize2, setHeightsize2] = useState('')
  const [tableColumn, setTableColumn] = useState('')
  const [datalable, setDatalable] = useState([])
  const [datacheckbox, setDatacheckbox] = useState([])
  const [datatable, setDatatable] = useState([])
  const [datatable1, setDatatable1] = useState([])
  const [datatable2, setDatatable2] = useState([])
  const [listtext, setListText] = useState([])
  const [listtextw, setListTextw] = useState([])
  const [selectedImage, setSelectedImage] = useState([])
  const [editcheckboxvalues, setEditcheckboxvalues] = useState('')
  const [getindex, setGetindex] = useState('')
  const [index, setIndex] = useState('')
  const [index1, setIndex1] = useState('')
  const [editlable, setEditlable] = useState('')
  const [fontSize, setFontSize] = useState('')
  const [bold, setBold] = useState(false)
  const [showstyle, setShowstyle] = useState(false)
  const [show, setShow] = useState(false);
  const [showsave, setShowsave] = useState(false);
  const [saveAs, setSaveAs] = useState('')
  const [countRow, setCountRow] = useState('')
  const [tables, setTables] = useState([[]])
  const [tables1, setTables1] = useState([[]])
  const [tables2, setTables2] = useState([[]])
  const [tables3, setTables3] = useState([[]])
  const [tables4, setTables4] = useState([[]])
  const [inputValues, setInputValues] = useState('')
  const [inputValues1, setInputValues1] = useState('')
  const [inputValues2, setInputValues2] = useState('')
  const [inputValues3, setInputValues3] = useState('')
  const [inputValues4, setInputValues4] = useState('')
  const [inputValues5, setInputValues5] = useState('')
  const [ing_width, setIng_width] = useState('')
  const [ing_heigh, setIng_heigh] = useState('')
  const [pictureUrl, setPictureUrl] = useState(null);
  const [isLoading, setIsLoading,] = useState(false);
  const [file, setFile] = useState();
  let users = Cookies.get("user");
  let data = JSON.parse(users)
  let user_id = data?.user?.user_id
  

  const [showcheckboxStyle, setShowcheckboxStyle] = useState(false)

  const onDragStopcheckbox = (e, d, index) => {
    const cloneDatas = [...datacheckbox]
    const cloneData = { ...datacheckbox[index] }
    cloneData.positionX = d.x;
    cloneData.positionY = d.y
    cloneDatas[index] = cloneData
    setDatacheckbox([...cloneDatas])
  }
  const onDragImagelogo = (e, d, index) => {
    // const cloneDatas=[...selectedImage]
    // const cloneData={...selectedImage[index]}
    // cloneData.positionX=d.x;
    // cloneData.positionY=d.y
    // cloneData[index]=cloneData
    // setSelectedImage([...cloneDatas])

    const cloneDatas = [...selectedImage]
    const cloneData = { ...selectedImage[index] }
    cloneData.positionX = d.x;
    cloneData.positionY = d.y
    cloneDatas[index] = cloneData
    setSelectedImage([...cloneDatas])
  }

  const onClickOnElement = (index) => {
    setGetindex(index)
    const cloneData = datalable[index]
    setEditlable(cloneData.name)
    setFontSize(cloneData.font)
  }
  const handleShow = () => setShow(true);
  const handlesaveShow = () => setShowsave(true)

  const handleClosedel = () => {
    setShow(false);
  }
  const handleCloseSavle = () => {
    setShowsave(false)
  }
  const Onclicktextlist = (index) => {
    const cloneData = listtext[index]
    cloneData.index = index
    setListTextw([cloneData])
  }
  const OnClickImage = (index) => {
    const cloneData = selectedImage[index]
    cloneData.index = index
    setSelectedImage([cloneData])
  }

  const Onclicktableindex = (index) => {
    setShowdeltable(true)
    setShowdeltable1(false)
    setShowdeltable2(false)

    setGetindex(index)
  }
  const Onclicktableindex1 = (index) => {
    setShowdeltable(false)
    setShowdeltable1(true)
    setShowdeltable2(false)
    setGetindex(index)
  }
  const Onclicktableindex2 = (index) => {
    setShowdeltable(false)
    setShowdeltable1(false)
    setShowdeltable2(true)
    setGetindex(index)
  }
  const OnClickCheckbox = (index) => {
    setGetindex(index)
    const cloneData = datacheckbox[index]
    setEditcheckboxvalues(cloneData.name)
  }
  const OnClickCheckimage = (index) => {
    setGetindex(index)
    const cloneData = selectedImage[index]
    setIng_width(cloneData.width)
    setIng_heigh(cloneData.height)
  }
  const onDragStoptable = (e, d, index) => {
    const cloneDatas = [...datatable]
    const cloneData = { ...datatable[index] }
    cloneData.positionX = d.x;
    cloneData.positionY = d.y
    cloneDatas[index] = cloneData
    setDatatable([...cloneDatas])
  }
  const onDragStoptable1 = (e, d, index) => {
    const cloneDatas = [...datatable1]
    const cloneData = { ...datatable1[index] }
    cloneData.positionX = d.x;
    cloneData.positionY = d.y
    cloneDatas[index] = cloneData
    setDatatable1([...cloneDatas])
  }
  const onDragStoptable2 = (e, d, index) => {
    const cloneDatas = [...datatable2]
    const cloneData = { ...datatable2[index] }
    cloneData.positionX = d.x;
    cloneData.positionY = d.y
    cloneDatas[index] = cloneData
    setDatatable2([...cloneDatas])
  }
  const onDragStoplable = (e, d, index) => {
    const cloneDatas = [...datalable]
    const cloneData = { ...datalable[index] }
    cloneData.positionX = d.x;
    cloneData.positionY = d.y
    cloneDatas[index] = cloneData
    setDatalable([...cloneDatas])
  }

  const changeText = (value, key, index) => {
    const object = { ...listtext[index] };
    object[key] = value;
    const cloneData = [...listtext];
    cloneData[index] = { ...object };
    setListText([...cloneData]);
  };
  const changeTextImage_width = (value, key, index) => {

    console.log("key=", key)
    console.log("index=", index)
    setIng_width(value)
    const object = { ...selectedImage[index] };

    object[key] = value;
    const cloneData = [...selectedImage];
    cloneData[index] = { ...object };
    setSelectedImage([...cloneData])
  }
  const changeTextImage_height = (value, key, index) => {
    setIng_heigh(value)
    const object = { ...selectedImage[index] };
    object[key] = value;
    const cloneData = [...selectedImage];
    cloneData[index] = { ...object };
    setSelectedImage([...cloneData])
  }

  // const changeTextForsize = (value, key, index) => {
  //   const object = { ...listtext[index] };
  //   object[key] = value;
  //   const cloneData = [...listtext];
  //   cloneData[index] = { ...object };
  //   setListText([...cloneData]);
  //   setListTextw([cloneData[index]]);
  // };



  const changeLable = (value, key, getindex) => {
    setEditlable(value)
    const object = { ...datalable[getindex] };
    object[key] = value;
    const cloneData = [...datalable];
    cloneData[getindex] = { ...object };
    setDatalable([...cloneData]);

  }
  const changeText1 = (value, key, index1, index) => {
    const cloneTables = [...tables]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables]
    setTables([...cloneData])


  };
  const changeText4 = (value, key, index1, index) => {
    const cloneTables = [...tables1]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables1]
    setTables1([...cloneData])
  };
  const changeText7 = (value, key, index1, index) => {
    const cloneTables = [...tables2]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables2]
    setTables2([...cloneData])
  };
  const changeText2 = (value, key, index, index1) => {
    setInputValues(value)
    const cloneTables = [...tables]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables]
    setTables([...cloneData])
  };
  const changeText3 = (value, key, index, index1) => {
    setInputValues1(value)
    const cloneTables = [...tables]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables]
    setTables([...cloneData])
  };
  const changeTextwidth = (value, key, index, index1) => {
    setWidthsize(value)
    const cloneTables = [...tables]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables]
    setTables([...cloneData])
  };
  const changeTextwidth1 = (value, key, index, index1) => {
    setWidthsize1(value)
    const cloneTables = [...tables1]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables1]
    setTables1([...cloneData])
  };
  const changeTextwidth2 = (value, key, index, index1) => {
    setWidthsize2(value)
    const cloneTables = [...tables2]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables2]
    setTables2([...cloneData])
  };


  const changeTextheight = (value, key, index, index1) => {
    setHeightsize(value)
    const cloneTables = [...tables]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables]
    setTables([...cloneData])
  };
  const changeTextheight1 = (value, key, index, index1) => {
    setHeightsize1(value)
    const cloneTables = [...tables1]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables1]
    setTables1([...cloneData])
  };
  const changeTextheight2 = (value, key, index, index1) => {
    setHeightsize1(value)
    const cloneTables = [...tables2]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables2]
    setTables2([...cloneData])
  };
  const changeText5 = (value, key, index, index1) => {
    setInputValues2(value)
    const cloneTables = [...tables1]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables1]
    setTables1([...cloneData])
  };

  const changeText6 = (value, key, index, index1) => {
    setInputValues3(value)
    const cloneTables = [...tables1]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables1]
    setTables1([...cloneData])
  };
  const changeText8 = (value, key, index, index1) => {
    setInputValues4(value)
    const cloneTables = [...tables2]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables2]
    setTables2([...cloneData])
  };
  const changeText9 = (value, key, index, index1) => {
    setInputValues5(value)
    const cloneTables = [...tables2]
    const datarow = cloneTables[index1]
    const object = datarow[index]
    object[key] = value;
    const cloneData = [...tables2]
    setTables2([...cloneData])
  };
  const DeleteChangeText = (index, index1) => {
    setInputValues('')
    setInputValues1('')

    const cloneTables = [...tables]
    const deleteObject = cloneTables[index1]
    deleteObject.splice(index, 1);
    const cloneData = [...tables]
    setTables([...cloneData])
  }
  const DeleteChangeText1 = (index, index1) => {
    setInputValues2('')
    setInputValues3('')

    const cloneTables = [...tables1]
    const deleteObject = cloneTables[index1]
    deleteObject.splice(index, 1);
    const cloneData = [...tables1]
    setTables1([...cloneData])
  }
  const DeleteChangeText2 = (index, index1) => {
    setInputValues4('')
    setInputValues5('')
    const cloneTables = [...tables2]
    const deleteObject = cloneTables[index1]
    deleteObject.splice(index, 1);
    const cloneData = [...tables2]
    setTables2([...cloneData])
  }
  const OnclickTable = (index, index1) => {
    setWidthsize('')
    setHeightsize('')
    setIndex(index)
    setIndex1(index1)
  }
  const OnclickTable1 = (index, index1) => {
    setWidthsize1('')
    setHeightsize1('')
    setIndex(index)
    setIndex1(index1)
  }

  const OnclickTable2 = (index, index1) => {
    setWidthsize2('')
    setHeightsize2('')
    setIndex(index)
    setIndex1(index1)
  }

  const changeCheckbox = (value, key, getindex) => {
    setEditcheckboxvalues(value)
    const object = { ...datacheckbox[getindex] };
    object[key] = value;
    const cloneData = [...datacheckbox];
    cloneData[getindex] = { ...object };
    setDatacheckbox([...cloneData]);

  }
  const changeTable = (value, key, getindex) => {
    setCountRow(value)
    const object = { ...datatable[getindex] };
    object[key] = value;
    const cloneData = [...datatable];
    cloneData[getindex] = { ...object };
    setDatatable([...cloneData]);

  }

  const changeFontSize = (value, key, getindex) => {
    setFontSize(value)
    const object = { ...datalable[getindex] };
    object[key] = value;
    const cloneData = [...datalable];
    cloneData[getindex] = { ...object };
    setDatalable([...cloneData]);
  }

  const changeTextForsize = (value, key, index) => {
    const object = { ...listtext[index] };
    object[key] = value;
    const cloneData = [...listtext];
    cloneData[index] = { ...object };
    setListText([...cloneData]);
    setListTextw([cloneData[index]]);
  };

  const TextBoldTrue = (getindex) => {
    setBold(true)
    let key = 'fontWeight'
    let value = 'bold'
    const object = { ...datalable[getindex] };
    object[key] = value;
    const cloneData = [...datalable];
    cloneData[getindex] = { ...object };
    setDatalable([...cloneData]);

  }
  const deletechange = (index) => {
    const cloneData = [...listtext]
    const cloneData1 = [...listtextw]
    cloneData.splice(index, 1)
    cloneData1.splice(index, 1)
    setListText([...cloneData])
    setListTextw([...cloneData1])
  }

  const deletecheckbox = (index) => {
    setEditcheckboxvalues('')
    const cloneData = [...datacheckbox]
    cloneData.splice(index, 1)
    setDatacheckbox([...cloneData])
  }
  const deletetable = (index) => {
    setShowdeltable(false)
    const cloneData = [...datatable]
    cloneData.splice(index, 1)
    setDatatable([...cloneData])
  }
  const deletetable1 = (index) => {

    const cloneData = [...datatable1]
    cloneData.splice(index, 1)
    setDatatable1([...cloneData])
  }
  const deletetable2 = (index) => {
    const cloneData = [...datatable2]
    cloneData.splice(index, 1)
    setDatatable2([...cloneData])
  }
  const deletelable = (index) => {
    const cloneData = [...datalable]
    cloneData.splice(index, 1)
    setDatalable([...cloneData])
  }
  const TextBoldFalse = (e) => {
    setBold(false)
    let key = 'fontWeight'
    let value = ''
    const object = { ...datalable[getindex] };
    object[key] = value;
    const cloneData = [...datalable];
    cloneData[getindex] = { ...object };
    setDatalable([...cloneData]);
  }
  const OnAddText = () => {
    setListText([...listtext, { name: "", positionX: 100, positionY: 100, width: 200, height: 25, type: 'text' }]);
  };
  const onCreateTable = () => {
    if (datatable.length == 0) {
      setShow(false)
      setShowdeltable(true)
      if (!tableRow || !tableColumn) return
      const newItemtable = {
        name: '',
        positionX: 0,
        positionY: 0,
        width: 749,
        height: 200,
        countrow: tableRow,
        type: 'table',
      }
      const cloneData = [...datatable]
      cloneData.push(newItemtable)
      setDatatable([...cloneData])
      let item = [];
      for (let i = 0; i < tableColumn; i++) {
        let row = tableRow
        let data;
        if (row == 2) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
        } else if (row == 3) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
        } else if (row == 4) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
        } else if (row == 5) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 6) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 7) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 8) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 9) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 10) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        }
        item.push(data)
      }
      setTables(item)

    } else if (datatable1.length == 0) {
      setShow(false)

      if (!tableRow || !tableColumn) return
      const newItemtable1 = {
        name: '',
        positionX: 0,
        positionY: 0,
        width: 749,
        height: 200,
        type: 'table',
        countrow: tableRow,
      }
      const cloneData = [...datatable1]
      cloneData.push(newItemtable1)
      setDatatable1([...cloneData])
      let item1 = [];
      for (let i = 0; i < tableColumn; i++) {
        let row = tableRow
        let data;
        if (row == 2) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
        } else if (row == 3) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
        } else if (row == 4) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
        } else if (row == 5) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 6) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 7) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 8) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 9) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 10) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        }
        item1.push(data)
      }
      setTables1(item1)
    } else if (datatable2.length == 0) {
      setShow(false)

      if (!tableRow || !tableColumn) return
      const newItemtable2 = {
        name: '',
        positionX: 0,
        positionY: 0,
        width: 749,
        height: 200,
        type: 'table',
        countrow: tableRow,
      }
      const cloneData = [...datatable2]
      cloneData.push(newItemtable2)
      setDatatable2([...cloneData])
      let item2 = [];
      for (let i = 0; i < tableColumn; i++) {
        let row = tableRow
        let data;
        if (row == 2) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 3) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
        } else if (row == 4) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]
        } else if (row == 5) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 6) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 7) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 8) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 9) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        } else if (row == 10) {
          data = [{ name: '', value: '1', cols: 1, rows: 1, width: 80, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }, { name: '', value: '1', cols: 1, rows: 1, width: 100, height: 50 }]

        }
        item2.push(data)
      }
      setTables2(item2)
    }
  }
  const onAddNewItem = () => {
    setShowstyle(true)
    setDatalable([...datalable, { name: 'Text', positionX: 0, positionY: 0, width: 0, height: 0, font: '15px', fontWeight: '', type: 'lable' }])
  }
  const onAddNewCheckbox = () => {
    setShowcheckboxStyle(true)
    const newcheckbox = { name: 'Checkbox', positionX: 0, positionY: 0, width: 50, height: 0, type: 'checkbox' }
    const cloneData = [...datacheckbox]
    cloneData.push(newcheckbox)
    setDatacheckbox([...cloneData])
  }
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const file_attachment = Array.from(selectedFiles);
    setSelectedImage([{ name: file_attachment[0].name, positionX: 0, positionY: 0, width: 100, height: 100, type: 'image' }])
  }

  const handlePictureChange = (event) => {
    setFile(event.target.files);
    const picture = event.target.files[0];
    const selectedFiles = event.target.files;
    const file_attachment = Array.from(selectedFiles);

    setSelectedImage([{ name: file_attachment[0].name, positionX: 0, positionY: 0, width: 100, height: 100, type: 'image' }])
    if (picture) {
      const pictureUrl = URL.createObjectURL(picture);
      setPictureUrl(pictureUrl);
    }
  };


  const OnCreate = async () => {
    setIsLoading(true);
    let images
    if (!file) {
      images = 0
    } else {
      let formData = new FormData();
      for (const key of Object.keys(file)) {
        formData.append("file_name", file[key]);
      }
      formData.append("file_name", file);
      let profileImageReturnName = await axios.post("/api/req/upload", formData);
      images = Object.values(profileImageReturnName.data)[0][0]
      console.log("dddd=",images)
    }

    let informdata = {
      form_name: saveAs,
      formstatus: 0,
      created_by: user_id,
      InsertDataCheckbox: datacheckbox,
      InsertDataLable: datalable,
      InsertPositionOne: datatable,
      DataTablepositionOne: tables,
      InsertPositionsTwo: datatable1,
      DataTablepositiontwo: tables1,
      InsertPositionsThree: datatable2,
      DataTablepositionThree: tables2,
      InsertSizeForInput: listtext,
      InsertDataImage: selectedImage,
      file_name: images
    }
    console.log("data=",informdata)
   
  
    axios.post("/api/form/Insert-form", informdata).then((data) => {
      setIsLoading(false);
      setShowsave(false)
    }).catch((err) => {
      console.log(err)
    })
  }
  const onDragStopinput = (e, d, index) => {
    const cloneDatas = [...listtext]
    const cloneData = { ...listtext[index] }
    cloneData.positionX = d.x;
    cloneData.positionY = d.y
    cloneDatas[index] = cloneData
    setListText([...cloneDatas])
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClosedel} style={{ paddingTop: 50 }} size="sm">
        <Modal.Header closeButton>
          <span style={{ fontSize: 25, fontWeight: 25, paddingTop: 10 }}>
            Create table </span>
        </Modal.Header>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 10 }}>
          <TextField
            style={{ marginTop: 10, marginRight: 10 }}
            onChange={e => setTableRow(e.target.value)}
            id="outlined-number"
            label="Row Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />

          <TextField
            style={{ marginTop: 10, marginRight: 10 }}
            onChange={e => setTableColumn(e.target.value)}
            id="outlined-number"
            label="Column Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10 }}>

          <Button
            style={{ marginRight: 10, marginBottom: 10 }}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={() => { onCreateTable() }}
          >
            Create Table
          </Button>
        </div>

      </Modal>
      <Modal show={showsave} onHide={handleCloseSavle} style={{ paddingTop: 50 }} size="sm">
        <Modal.Header closeButton>
          <span style={{ fontSize: 20, paddingTop: 10 }}>
            Save As</span>
        </Modal.Header>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10 }}>
          <TextField
            style={{ width: '90%', marginLeft: 10 }}
            value={saveAs}
            onChange={e => setSaveAs(e.target.value)}
            id="standard-basic"
            label="Form Name" />

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10 }}>

          <Button
            style={{ marginRight: 20, marginBottom: 10 }}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => { OnCreate() }}
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
      </Modal>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'fixed', top: 65, left: 264, right: 25, zIndex: 0, height: 50, backgroundColor: '#ebedef' }}>
        <div>
          <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 10 }}>
            <Link color="inherit" href="/" className={classes.link}>
              <HomeIcon className={classes.icon} />
              <small style={{ color: '#2106f3' }}>Home</small>

            </Link>
            <Typography color="textPrimary" className={classes.link}>
              <GrainIcon className={classes.icon} />
              <small style={{ color: '#2106f3' }}>Create Form</small>

            </Typography>

          </Breadcrumbs>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <div style={{ border: '1px solid #ccc', borderRadius: 3, width: 80, cursor: 'pointer', height: 30, marginTop: 10, marginRight: 10 }}>

            <Button

              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<InputIcon />}
              onClick={() => { OnAddText() }}
            >
              Input
            </Button>
          </div>
          <div style={{ border: '1px solid #ccc', borderRadius: 3, width: 80, marginLeft: 10, cursor: 'pointer', height: 30, marginTop: 10, marginRight: 10 }}
            onClick={() => { handleShow() }}
          >

            <Button

              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<BorderAllIcon />}
              onClick={() => { handleShow() }}
            >
              Table
            </Button>
          </div>

          <div style={{ border: '1px solid #ccc', borderRadius: 3, width: 50, marginLeft: 10, cursor: 'pointer', height: 30, marginTop: 10, marginRight: 30 }}>

            <Button

              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<TextFormatIcon />}
              onClick={() => { onAddNewItem() }}
            >
              Text
            </Button>
          </div>

          <div style={{ border: '1px solid #ccc', borderRadius: 3, width: 50, marginLeft: 10, marginRight: 70, cursor: 'pointer', height: 30, marginTop: 10 }}>

            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<CheckBoxIcon />}
              onClick={() => { onAddNewCheckbox() }}
            >
              CheckBox
            </Button>

          </div>

          <div style={{ border: '1px solid #ccc', borderRadius: 3, width: 80, marginLeft: 10, cursor: 'pointer', height: 30, marginTop: 10 }}
            onClick={() => { handlesaveShow() }}
          >

            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </div>
          <div style={{ border: '1px solid #ccc', borderRadius: 3, width: 50, marginLeft: 10, marginRight: 37, cursor: 'pointer', height: 30, marginTop: 10 }}

          >
            <label htmlFor="contained-button-file" style={{ position: 'absolute' }}>
              <Button variant="contained" color="primary" size="small" component="span">
                Upload
              </Button>
            </label>
            <input
              style={{ color: 'white', width: 10, marginLeft: 30 }}
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              onChange={handlePictureChange}
              type="file"
            />

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


        </div>

      </div>

      <div style={{ height: 20 }}>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'flex-start', backgroundColor: '#ebedef', marginTop: 10 }} >
      <div ref={(el) => (componentRef = el)} style={{ display:'flex', width: '80%', height: 2000, border: '1px solid #000',backgroundColor:'white'}}>

          {
            datatable.map((el, index) => {
              if (el.type === 'table') {
                return (
                  <Rnd
                    key={index}
                    default={{
                      x: el.positionX,
                      y: el.positionY,

                    }}
                    onDragStop={(e, d) => onDragStoptable(e, d, index)}
                    onClick={() => { Onclicktableindex(index) }}
                  >
                    <table style={{ border: '1px solid gray' }}>
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
                                            onClick={() => { OnclickTable(index, index1) }}
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
            datatable1.map((el, index) => {
              if (el.type === 'table') {
                return (
                  <Rnd
                    key={index}
                    default={{
                      x: el.positionX,
                      y: el.positionY,

                    }}
                    onDragStop={(e, d) => onDragStoptable1(e, d, index)}
                    onClick={() => { Onclicktableindex1(index) }}
                  >
                    <table style={{ border: '1px solid gray' }}>
                      {
                        tables1 && tables1.map((item, index1) => {
                          return (
                            <>
                              <tr key={index1} style={{ width: `${item.width}px`, border: '1px solid gray' }}>
                                {
                                  item.map((data, index) => {
                                    return (
                                      <>
                                        <td key={index} style={{ border: '1px solid gray', width: `${data.width}px`, height: `${data.height}px` }} colSpan={data.cols} rowSpan={data.rows}>

                                          <textarea value={data?.name}
                                            onChange={(e) => { changeText4(e.target.value, 'name', index1, index) }}
                                            onClick={() => { OnclickTable1(index, index1) }}
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
            datatable2.map((el, index) => {
              if (el.type === 'table') {
                return (
                  <Rnd
                    key={index}
                    default={{
                      x: el.positionX,
                      y: el.positionY,

                    }}
                    onDragStop={(e, d) => onDragStoptable2(e, d, index)}
                    onClick={() => { Onclicktableindex2(index) }}
                  >
                    <table style={{ border: '1px solid gray', borderCollapse: 'collapse' }}>
                      {
                        tables2 && tables2.map((item, index1) => {
                          return (
                            <>
                              <tr key={index1} style={{ width: `${item.width}px`, border: '1px solid gray' }}>
                                {
                                  item.map((data, index) => {
                                    return (
                                      <>
                                        <td key={index} style={{ border: '1px solid gray', width: `${data.width}px`, height: `${data.height}px` }} colSpan={data.cols} rowSpan={data.rows}>
                                          <textarea value={data?.name}
                                            onChange={(e) => { changeText7(e.target.value, 'name', index1, index) }}
                                            onClick={() => { OnclickTable2(index, index1) }}
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
                  onDragStop={(e, d) => { onDragImagelogo(e, d, index) }}
                  onClick={() => { OnClickCheckimage(index) }}
                >
       
                  {pictureUrl && (
                    <img src={pictureUrl} alt="Selected Picture" style={{ width: `${e?.width}px`, height: `${e?.height}px` }} />
                  )}
                </Rnd>
              )
            })
          }
        </div>

        <div style={{ display: 'flex', flexDirection: "column", position: 'fixed', zIndex: 999, right: 25 }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            {
              listtextw.length == 0 ? (
                <>
                  <ComponentWidthAndHeighCopy />
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

                </>
              )
            }
          </div>
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
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            <CompoentStyleForCheckBox
              editcheckboxvalues={editcheckboxvalues}
              changeCheckbox={changeCheckbox}
              getindex={getindex}
              deletecheckbox={deletecheckbox}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 12, marginTop: 10 }}>Style for Image</small>
            <input
              placeholder="Width"
              value={ing_width}
              onChange={(e) => changeTextImage_width(e.target.value, 'width', getindex)}
              style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}

            />
            <input
              placeholder="Height"
              value={ing_heigh}
              onChange={(e) => changeTextImage_height(e.target.value, 'height', getindex)}
              style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
            />
            <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 140, marginLeft: 10, cursor: 'pointer', marginTop: 5 }} onClick={() => { deletecheckbox(getindex) }}>
              <DeleteIcon style={{ color: '#fff' }} />
              <small style={{ color: '#fff', fontWeight: 'bold' }}>Delete Image</small>
            </div>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            {
              showdeltable == true ? (<>
                <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 12, marginTop: 10 }}>Style for Table 1</small>
                <input
                  value={inputValues}
                  placeholder="Columns"
                  onChange={(e) => changeText2(e.target.value, 'rows', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Rows"
                  value={inputValues1}
                  onChange={(e) => changeText3(e.target.value, 'cols', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Width"
                  value={widthsize}
                  onChange={(e) => changeTextwidth(e.target.value, 'width', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Height"
                  value={heightsize}
                  onChange={(e) => changeTextheight(e.target.value, 'height', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>

                  <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 70, marginLeft: 10, cursor: 'pointer' }} onClick={() => { DeleteChangeText(index, index1) }}>
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
                <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 12, marginTop: 10 }}>Style for Table 2</small>
                <input
                  value={inputValues2}
                  placeholder="Columns"
                  onChange={(e) => changeText5(e.target.value, 'rows', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Rows"
                  value={inputValues3}
                  onChange={(e) => changeText6(e.target.value, 'cols', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Width"
                  value={widthsize1}
                  onChange={(e) => changeTextwidth1(e.target.value, 'width', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Height"
                  value={heightsize1}
                  onChange={(e) => changeTextheight1(e.target.value, 'height', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 70, marginLeft: 10, cursor: 'pointer' }} onClick={() => { DeleteChangeText1(index, index1) }}>
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
            {
              showdeltable2 == true ? (<>
                <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 12, marginTop: 10 }}>Style for Table 3</small>
                <input
                  value={inputValues4}
                  placeholder="Columns"
                  onChange={(e) => changeText8(e.target.value, 'rows', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Rows"
                  value={inputValues5}
                  onChange={(e) => changeText9(e.target.value, 'cols', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Width"
                  value={widthsize1}
                  onChange={(e) => changeTextwidth2(e.target.value, 'width', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <input
                  placeholder="Height"
                  value={heightsize1}
                  onChange={(e) => changeTextheight2(e.target.value, 'height', index, index1)}
                  style={{ marginLeft: 10, marginTop: 5, width: 140, height: 25, }}
                />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 70, marginLeft: 10, cursor: 'pointer' }} onClick={() => { DeleteChangeText2(index, index1) }}>
                    <DeleteIcon style={{ color: '#fff' }} />
                    <small style={{ color: '#fff', fontWeight: 'bold' }}>Row</small>
                  </div>
                  <div style={{ backgroundColor: '#3f51b5', border: '1px solid #ccc', borderRadius: 3, width: 70, marginRight: 10, cursor: 'pointer' }} onClick={() => { deletetable2(getindex) }}>
                    <DeleteIcon style={{ color: '#fff' }} />
                    <small style={{ color: '#fff', fontWeight: 'bold' }}>Table</small>
                  </div>

                </div>
              </>) : null
            }
          </div>
        </div>
      </div>
    </>
  )
}
function RowComponent({ changeText, Onclicktextlist, e, index }) {
  return (
    <>
      <input
        placeholder="................................................................................................................................................................................................................................................................................................"
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
function ImageComponent({ index, name }) {
  return (
    <>
      <img key={index} src={`/assets/images/${name}`} />
    </>
  )
}
function ComponentWidthAndHeigh({ changeTextForsize, e, index, deletechange }) {
  return (
    <>
      <small style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 14 }}>Style for Input</small>
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

