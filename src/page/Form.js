import React, { useState, useEffect, useContext } from "react";
import { BORDER_COLOR } from '../constants/colors'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { LoginContext } from "../page/contexts/LoginContext";

export default function Form() {
    const {
        OnloadListItemcard
    } = useContext(LoginContext);
    const [desription, setDesription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [unity, setUnity] = useState("")
    const [id, setid] = useState("");
    const [name, setName] = useState("")
    const [name_eng, setName_eng] = useState("")
    const [email, setEmail] = useState("")
    const [department, setDepartment] = useState("")
    const [position, setPosition] = useState("")
    const [requestDetail, setRequestDetail] = useState("")
    const [listEmployee, setListEmployee] = useState([])
    const [active, setActive] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showBox, setShowBox] = useState(false);



    const [data, setData] = useState([
        { desription1: '', quantity1: '', unity1: '' },
        { desription1: '', quantity1: '', unity1: '' },
        { desription1: '', quantity1: '', unity1: '' },

    ]);
    const addMore = () => {
        setData([...data, {}]);
    };
    const resetlines = () => {
        let oldarray = [...data]
        oldarray.splice(data, 1)
        setData([...oldarray])
    }
    const OnloadListEmployee = () => {
        axios.get('/api/document/get-employees/').then((data) => {
            setListEmployee([...data?.data?.results])
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleClick = () => {
        setShowBox(!showBox);
    };


    const changeText = (value, key, index) => {
        const object = { ...data[index] };
        object[key] = value;
        const cloneData = [...data];
        cloneData[index] = { ...object };
        setData([...cloneData]);
    };
    const _onSearchList = (e) => {
        setName_eng(e)
        let searchName = listEmployee.filter((el) => el.employee_name.includes(e));
        if (!e) {
            setSearchResult([]);
        } else {
            setSearchResult([...searchName]);
        }
    };
    const getNameList = (id, inputIdex = null) => {
        let employee_id = {
            employee_id: id
        }
        axios.post('/api/document/get-employeesById/', employee_id).then((data) => {
            setDepartment([...data?.data?.results][0].department_name)
            setName([...data?.data?.results][0].employee_name + [...data?.data?.results][0].employee_surname)
            setName_eng([...data?.data?.results][0].employee_name + [...data?.data?.results][0].employee_surname)
            setEmail([...data?.data?.results][0].employee_email)
            setPosition([...data?.data?.results][0].position_name)
            setid([...data?.data?.results][0].employee_id)
            setShowBox(false)

        }).catch((err) => {
            console.log(err)
        })

    }
    const insertCartItems = () => {
        let Information = {
            data
        }
        axios.post('/api/document/insert-cart', Information).then((data) => {
            OnloadListItemcard();

        }).catch((err) => {
            console.log(err)
        })
    };
    useEffect(() => {
        OnloadListEmployee()
    }, [])
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img alt="Logo" style={{ width: 100 }} src="assets/images/favicon.ico" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'green' }}>
                <small style={{ fontWeight: 'bold' }}>Request Form</small>
                <small>ໃບຮ້ອງຂໍ</small>
            </div>
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                <div></div>
                <div style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
                    <small>No:....../RF/AM</small>
                    <small>Date:....../....../2023</small>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <small>ປະເພດການຮ້ອງຂໍ: </small>
                <small style={{ display: "flex", flexDirection: 'row', marginLeft: 50 }}>
                    <input type="checkbox" style={{ marginTop: -15 }} />
                    <p style={{ marginLeft: 15 }}>ການອະນູມັດ</p>
                </small>
                <small style={{ display: "flex", flexDirection: 'row' }}>
                    <input type="checkbox" style={{ marginTop: -15, marginLeft: 15 }} />
                    <p style={{ marginLeft: 15 }} >ອື່ນໆ....................................</p>
                </small>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <small>Request: </small>
                <small style={{ display: "flex", flexDirection: 'row', marginLeft: 80 }}>
                    <input type="checkbox" style={{ marginTop: -15 }} />
                    <p style={{ marginLeft: 15 }}>ການອະນູມັດ</p>
                </small>
                <small style={{ display: "flex", flexDirection: 'row' }}>
                    <input type="checkbox" style={{ marginTop: -15, marginLeft: 15 }} />
                    <p style={{ marginLeft: 15 }} >ອື່ນໆ....................................</p>
                </small>
            </div>
            <div style={{ height: 20 }}></div>
            <div>
                Request Information / ຂໍ້ມູນຜູ້ຮ້ອງຂໍ
            </div>
            <div>
                Company ID / ບໍລີສັດ:Phongsavanh Group
            </div>
            <div style={{ height: 20 }}></div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Name:</p>
                <input
                    type="hidden"        
                    onChange={(e) => setid(e.target.value)}
                    value={id}
                />
                <input
                    placeholder=".............................................................................................................."
                    style={{
                        height: 30,
                        width: 500,
                        outline: 'none',
                        marginTop: -2,
                        marginLeft: 89,
                        borderRadius: 3,
                        border: `1px solid ${BORDER_COLOR}`,
                    }
                    }
                    type="text"
                    onClick={() => handleClick(true)}
                    onChange={(e) => {
                        _onSearchList(e.target.value);
                    }}
                    value={name_eng}
                />
            </div>
            {showBox && (
                <div
                    style={{
                        overflowY: "scroll",
                        height: 100,
                        paddingTop: 5,
                        paddingLeft: 10,
                        marginLeft: 130,
                        position: 'absolute',
                        backgroundColor: 'white',
                        width: 500
                    }}
                >
                    {searchResult.length > 0 ? (
                        <>
                            {searchResult.map((data, index1) => {
                                return (
                                    <>
                                        <span
                                            key={index1}
                                            style={{
                                                cursor: "pointer",
                                                fontWeight: active === data?.label ? "bold" : "",
                                            }}
                                            onClick={() => { getNameList(data?.employee_id, index1) }}
                                            onMouseOver={() => setActive(data?.employee_name)}
                                            onMouseLeave={() => setActive(null)}
                                        >
                                            {data?.employee_name}
                                        </span>
                                        <br />
                                    </>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {listEmployee && listEmployee.map((data, index) => {
                                return (
                                    <>
                                        <span
                                            key={index}
                                            style={{
                                                cursor: "pointer",
                                                fontWeight: active === data?.employee_name ? "bold" : "",
                                            }}
                                            onClick={() => { getNameList(data?.employee_id, index) }}
                                            onMouseOver={() => setActive(data?.employee_name)}
                                            onMouseLeave={() => setActive(null)}
                                        >
                                            {data?.employee_name}
                                        </span>
                                        <br />
                                    </>
                                );
                            })}
                        </>
                    )}
                </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>ຊື່ ແລະ ນາມສະກູນ:</p>
                <input
                    placeholder=".............................................................................................................."
                    style={{
                        height: 30,
                        width: 500,
                        outline: 'none',
                        marginTop: -2,
                        marginLeft: 33,
                        borderRadius: 3,
                        border: `1px solid ${BORDER_COLOR}`
                    }
                    }
                    type="text"
                    value={name}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Email / ອີເມວ:</p>
                <input
                    placeholder=".............................................................................................................."
                    style={{
                        height: 30,
                        width: 500,
                        outline: 'none',
                        marginTop: -2,
                        marginLeft: 48,
                        borderRadius: 3,
                        border: `1px solid ${BORDER_COLOR}`
                    }
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Department/ພະແນກ:</p>
                <input
                    placeholder=".............................................................................................................."
                    style={{
                        height: 30,
                        width: 500,
                        outline: 'none',
                        marginTop: -2,
                        marginLeft: 10,
                        borderRadius: 3,
                        border: `1px solid ${BORDER_COLOR}`
                    }
                    }
                    onChange={(e) => setDepartment(e.target.value)}
                    value={department}
                    type="text"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Position / ຕໍາແໜ່ງ:</p>
                <input
                    placeholder=".............................................................................................................."
                    style={{
                        height: 30,
                        width: 500,
                        outline: 'none',
                        marginTop: -2,
                        marginLeft: 22,
                        borderRadius: 3,
                        border: `1px solid ${BORDER_COLOR}`
                    }
                    }
                    onChange={(e) => setPosition(e.target.value)}
                    value={position}
                    type="text"
                />
            </div>
            <div>
                <small style={{ fontWeight: 'bold' }}>Request Detail ລາຍລະອຽດ:</small>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <small>Purpose / ຈູດປະສົງ:</small>
                <input
                    placeholder="..............................................................................................................................................................................................................................................................................................................................................."

                    style={{
                        height: 30,
                        width: 1100,
                        outline: 'none',
                        marginTop: -2,
                        marginLeft: 28,
                        borderRadius: 3,
                        textAlign: 'center',
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>(For Stock Request Continue To List Below/ສຳລັບການເບີກເຄື່ອງໃຫ້ໄປທີ່ຕື່ມໃສຕາຕະລາງ)</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>(Expected Recevive Date/ ເວລາໃນການຮ້ອງຂໍ):<input type="text" style={{ width: 100, border: 'none' }} placeholder="......................" /></p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Reason/ເຫດພົນ:</p>
                <input
                    placeholder="..............................................................................................................................................................................................................................................................................................................................................."
                    style={{
                        height: 30,
                        width: 1100,
                        outline: 'none',
                        marginTop: -2,
                        marginLeft: 28,
                        borderRadius: 3,
                        textAlign: 'center',
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>List of items:ຕາຕະລາງການເບີກເຄື່ອງ:</p>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <input
                        type="text"
                        placeholder="Item Description / ລາຍສະອຽດ"
                        style={{
                            border: `1px solid ${BORDER_COLOR}`,
                            borderRadius: 3,
                            height: 30,
                            width: 300,
                            outline: 'none',
                            marginTop: -2,
                            marginLeft: 5,
                        }}
                        onChange={(e) => setDesription(e.target.value)}
                        value={desription}
                    />
                    <input
                        type="text"
                        placeholder="Quantity / ຈຳນວນ"
                        style={{
                            border: `1px solid ${BORDER_COLOR}`,
                            borderRadius: 3,
                            height: 30,
                            width: 150,
                            outline: 'none',
                            marginTop: -2,
                            marginLeft: 5,
                        }}
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                    />
                    <input
                        type="text"
                        placeholder="Unit / ຫົວໜ່ອຍ"
                        style={{
                            border: `1px solid ${BORDER_COLOR}`,
                            borderRadius: 3,
                            height: 30,
                            width: 150,
                            outline: 'none',
                            marginTop: -2,
                            marginLeft: 5,
                        }}

                        onChange={(e) => setUnity(e.target.value)}
                        value={unity}
                    />
                    <button
                        style={{
                            width: 100,
                            marginTop: 5,
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            marginTop: -2,
                            marginLeft: 5
                        }}
                        onClick={() => { insertCartItems() }}>
                        <AddIcon /> Add
                    </button>
                </div>
                <div style={{ height: 10 }}></div>

                {/* {JSON.stringify(data)} */}

                <table width={"100%"} border="1">
                    <tr style={{ border: '1px solid #ccc', height: 30 }}>
                        <th>No</th>
                        <th>Item Description/ລາຍລະອຽດ</th>
                        <th>Quantity/ຈຳນວນ</th>
                        <th>Unit/ຫົວໜ່ອຍ</th>

                    </tr>
                    {
                        data && data.map((items, index) => {
                            return (
                                <tr style={{ border: '1px solid #ccc', height: 30, cursor: 'pointer' }}>
                                    <td style={{ border: '1px solid #ccc', width: 50 }}>{index + 1}</td>
                                    <td style={{ width: 700, border: '1px solid #ccc' }}>
                                        <input type="text" placeholder="...................................................................................................................................................................................................................................."
                                            value={items?.desription1}
                                            onChange={(e) => changeText(e.target.value, "desription1", index)}
                                            style={{
                                                width: 800,
                                                outline: 'none',
                                                marginTop: -2,
                                                marginLeft: 28,
                                                borderRadius: 3,
                                                border: 'none',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                    </td>
                                    <td style={{ border: '1px solid #ccc' }}>
                                        <input type="text" placeholder="....................................."
                                            value={items?.quantity1}
                                            onChange={(e) => changeText(e.target.value, "quantity1", index)}
                                            style={{
                                                width: 150,
                                                outline: 'none',
                                                marginTop: -2,
                                                marginLeft: 28,
                                                borderRadius: 3,
                                                border: 'none',
                                                fontWeight: 'bold'
                                            }}

                                        />
                                    </td>
                                    <td style={{ border: '1px solid #ccc' }}>
                                        <input type="text" placeholder="....................................."
                                            value={items?.unity1}
                                            onChange={(e) => changeText(e.target.value, "unity1", index)}
                                            style={{
                                                width: 150,
                                                outline: 'none',
                                                marginTop: -2,
                                                marginLeft: 28,
                                                borderRadius: 3,
                                                border: 'none',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div
                style={{ height: 20 }}
            >
            </div>
            <button style={{
                border: '1px solid #ccc',
                borderRadius: 3,
                paddingLeft: 20, paddingRight: 20,
                backgroundColor: 'white'
            }} onClick={() => { addMore() }}>Add lines</button>
            <button style={{
                border: '1px solid #ccc',
                borderRadius: 3,
                paddingLeft: 20, paddingRight: 20,
                marginLeft: 20, backgroundColor: 'white'
            }} onClick={resetlines}>Clear All </button>

            <div
                style={{ height: 20 }}
            >
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Authorizing Signature:ດັ່ງນັ້ນ, ຈື່ງຮຽນສະເໜີມາຍັງທ່ານເພື່ອພິຈາລະນາຕາມເຫັນສົນຄອນດ້ອຍ</p>
            </div>
            <div
                style={{ height: 20 }}
            >
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', flexDirection: 'column', border: "1px solid #ccc", width: 300, height: 200 }}>
                    <small style={{ fontWeight: 'bold' }}>Request:</small>
                    <small style={{ fontWeight: 'bold' }}>ຜູ້ຮ້ອງຂໍ:</small>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 60 }}>
                        <small style={{ fontWeight: 'bold' }}>Sign/ເຊັນ:...............................................................</small>
                        <small style={{ fontWeight: 'bold' }}>Full Name/ຊື່ ແລະ ນາມສະກຸນ:</small>
                        <small style={{ fontWeight: 'bold', paddingTop: 10 }}>..............................................................................</small>
                        <small style={{ fontWeight: 'bold', paddingTop: 10 }}>Date/ວັນທີ່:..............................................................</small>

                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', border: "1px solid #ccc", width: 300, height: 200 }}>
                    <small style={{ fontWeight: 'bold' }}>Director/Deputy Director of Requester:</small>
                    <small style={{ fontWeight: 'bold' }}>ຫົວໜ້າ/ຮອງຫົວໜ້າຝ່າຍຜູ້ຮ້ອງຂໍ:</small>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 60 }}>
                        <small style={{ fontWeight: 'bold' }}>Sign/ເຊັນ:...............................................................</small>
                        <small style={{ fontWeight: 'bold' }}>Full Name/ຊື່ ແລະ ນາມສະກຸນ:</small>
                        <small style={{ fontWeight: 'bold', paddingTop: 10 }}>..............................................................................</small>
                        <small style={{ fontWeight: 'bold', paddingTop: 10 }}>Date/ວັນທີ່:..............................................................</small>

                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', border: "1px solid #ccc", width: 300, height: 200 }}>
                    <small style={{ fontWeight: 'bold' }}>Director/Deputy Director of Admin:</small>
                    <small style={{ fontWeight: 'bold' }}>ຫົວໜ້າ/ຮອງຫົວໜ້າຫ້ອງການ:</small>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 60 }}>
                        <small style={{ fontWeight: 'bold' }}>Sign/ເຊັນ:...............................................................</small>
                        <small style={{ fontWeight: 'bold' }}>Full Name/ຊື່ ແລະ ນາມສະກຸນ:</small>
                        <small style={{ fontWeight: 'bold', paddingTop: 10 }}>..............................................................................</small>
                        <small style={{ fontWeight: 'bold', paddingTop: 10 }}>Date/ວັນທີ່:..............................................................</small>

                    </div>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                <Button variant="contained" color="primary">
                    Save
                </Button>
            </div>
        </>
    )

}