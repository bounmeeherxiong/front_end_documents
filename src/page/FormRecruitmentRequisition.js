import React from 'react'
import { BORDER_COLOR } from '../constants/colors'

function FormRecruitmentRequisition() {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <h5>Phongsavanh</h5>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <small>Unit 01,Ban Phakhao,Kaysone Phomvihanh Rd,Xaythany District,Vientiane,Lao P.D.R</small>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <small>Tel:(+85621) + 85621 711566 Ext: 151 Email:info@phongsavanhbank.com www.phongsavanhbank.com</small>
            </div>
            <div style={{ height: 10 }}>
            </div>
            <div style={{ height: 2, backgroundColor: 'black' }}>
            </div>
            <div style={{ height: 10 }}>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <small style={{ fontWeight: 'bold' }}>ໃບສະເໜີຂໍພະນັກງານ</small>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <small style={{ fontWeight: 'bold' }}>Recruitment Requisistion Form</small>
            </div>
            <div>
                <small>ຮຽນ: ຝ່າຍບຸກຄະລາກອນ ທີ່ນັບຖື</small>
            </div>
            <div>
                <small>Dear: Human Resources Department</small>
            </div>
            <div>
                <small style={{ fontWeight: 'bold' }}>ເລື່ອງ:ຂໍພະນັກງານ (Subject:Recruitment Requisition)</small>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <small >ຕໍາແໜ່ງ(Job Title):</small>
                <input
                    placeholder="................................................................................................................................"
                    style={{
                        height: 30,
                        width: 500,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 10,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
                <small>ຈຳນວນຕໍາແໜ່ງ(Number Required):</small>
                <input
                    placeholder=".................................................................................................."
                    style={{
                        height: 30,
                        width: 400,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 1,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <small>ຝ່າຍ/ສາຂາ (Department/Branch):</small>
                <input
                    placeholder="......................................................................................................................................................................................................................................................................."
                    style={{
                        height: 30,
                        width: 1000,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 1,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <small>ຮູບແບບການຈ້າງງານ(Employeement Type):</small>
                <input type="checkbox" style={{ marginLeft: 10 }} />
                <small style={{ marginLeft: 10 }}>ພ/ງຖາວອນ(Permanet Staff)</small>
                <input type="checkbox" style={{ marginLeft: 10 }} />
                <small style={{ marginLeft: 10 }}>ພ/ງສັນຍາຈ້າງ(Temporary Staff)</small>
                <input type="checkbox" style={{ marginLeft: 10 }} />
                <small style={{ marginLeft: 10 }}>ພ/ງໃນແຜນປະຈຳປີ(Budgeted)</small>
                <input type="checkbox" style={{ marginLeft: 10 }} />
                <small style={{ marginLeft: 10 }}>ພ/ງນອກແຜນ(Not Budgeted)</small>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <small>ກໍລະນີພ/ງໃນແຜນ (if Budgeted): ແຜນປະຈຳປີ(Year Plan):</small>
                <input
                    placeholder="................................"
                    style={{
                        height: 30,
                        width: 100,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 1,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
                <small style={{ marginLeft: 10 }}>ຈຳນວນ(Vacancies):</small>
                <input
                    placeholder="................................"
                    style={{
                        height: 30,
                        width: 100,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 1,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
                <small style={{ marginLeft: 10 }}>(Person)</small>
                <small style={{ marginLeft: 10 }}>ບັນຈຸແລ້ວ(Recruited):</small>
                <input
                    placeholder="................................"
                    style={{
                        height: 30,
                        width: 100,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 1,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
                <small style={{ marginLeft: 10 }}>(Person)</small>
                <small style={{ marginLeft: 10 }}>ຍັງ(Outstanding):</small>
                <input
                    placeholder="................................"
                    style={{
                        height: 30,
                        width: 50,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 1,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
                <small style={{ marginLeft: 10 }}>ຄົນ(Person)</small>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <small>ຕ້ອງການພະນັກງານ(Recruitment Source):</small>
                <input type="checkbox" style={{ marginLeft: 10 }} />
                <small style={{ marginLeft: 10 }}>ພາຍໃນ(Internal)</small>
                <input type="checkbox" style={{ marginLeft: 10 }} />
                <small style={{ marginLeft: 10 }}>ພາຍນອກ(External)</small>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <small>ໃຫ້ເລີ່ມວຽກວັນທີ(Start Date):</small>
                <input
                    placeholder="...................................................."
                    style={{
                        height: 30,
                        width: 1000,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 1,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <small>ເຫັດຜົດການຂໍພະນັກງານ(Reason for Recruitment): (ຄັດຕິດລາຍລະອຽດໜ້າວຽກມາພ້ອມ attach the Job Description)</small>
                <input
                    placeholder="................................................................................................................................................................."
                    style={{
                        height: 30,
                        width: 600,
                        outline: 'none',
                        marginTop: -3,
                        marginLeft: 1,
                        borderRadius: 3,
                        border: 'none',
                        fontWeight: 'bold'
                    }
                    }
                    type="text"
                />

            </div>
            <div>
                <small>ຄຸນນະວຸດທີ່ຕ້ອງການ (Selection Criterion)</small>
            </div>
            <div>
                <table width={"100%"} style={{ border: '1px solid #ccc' }}>
                    <tr style={{ border: '1px solid #ccc', height: 30 }}>
                        <th style={{ border: '1px solid #ccc' }}>ວຸດທິການສືກສາ ແລະ ປະສົບການ
                            <br />
                            Qualification and Experience

                        </th>
                        <th style={{ border: '1px solid #ccc' }}>ລະດັບຕໍ່າສຸດທີ່ຕ້ອງການ <br /> Minimum Education Level</th>
                        <th style={{ border: '1px solid #ccc' }}>ລະດັບທີ່ຕ້ອງການ <br /> Education Level Required</th>
                    </tr>
                    <tr style={{ border: '1px solid #ccc', height: 30 }}>

                        <td style={{ border: '1px solid #ccc' }}>ລະດັບການສືກສາ (ດ້ານໃດ) <br /> Qualification (Major)</td>
                        <td style={{ border: '1px solid #ccc' }}>
                            <input
                                placeholder="................................................................................................................................................................."
                                style={{
                                    height: 30,
                                    width: 500,
                                    outline: 'none',
                                    marginTop: -3,
                                    marginLeft: 1,
                                    borderRadius: 3,
                                    border: 'none',
                                    fontWeight: 'bold'
                                }
                                }
                                type="text"
                            />
                        </td>
                        <td style={{ border: '1px solid #ccc' }}>
                            <input
                                placeholder="................................................................................................................................................................."
                                style={{
                                    height: 30,
                                    width: 500,
                                    outline: 'none',
                                    marginTop: -3,
                                    marginLeft: 1,
                                    borderRadius: 3,
                                    border: 'none',
                                    fontWeight: 'bold'
                                }
                                }
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr style={{ border: '1px solid #ccc', height: 30 }}>
                        <td style={{ border: '1px solid #ccc' }}>ປະສົບການ(ຈັກປີ,ດ້ານໃດ)<br />Experience (Year,Experience)</td>
                        <td style={{ border: '1px solid #ccc' }}>
                            <input
                                placeholder="................................................................................................................................................................."
                                style={{
                                    height: 30,
                                    width: 500,
                                    outline: 'none',
                                    marginTop: -3,
                                    marginLeft: 1,
                                    borderRadius: 3,
                                    border: 'none',
                                    fontWeight: 'bold'
                                }
                                }
                                type="text"
                            />

                        </td>
                        <td style={{ border: '1px solid #ccc' }}>
                            <input
                                placeholder="................................................................................................................................................................."
                                style={{
                                    height: 30,
                                    width: 500,
                                    outline: 'none',
                                    marginTop: -3,
                                    marginLeft: 1,
                                    borderRadius: 3,
                                    border: 'none',
                                    fontWeight: 'bold'
                                }
                                }
                                type="text"
                            />

                        </td>
                    </tr>
                    <tr style={{ border: '1px solid #ccc', height: 30 }}>
                        <td style={{ border: '1px solid #ccc' }}>ຄວາມຮູ້ຄວາມສາມາດ (Competency) <br />(ຈັກປີ,ດ້ານໃດ)(Yes,Skill)</td>
                        <td style={{ border: '1px solid #ccc' }}>
                            <input
                                placeholder="................................................................................................................................................................."
                                style={{
                                    height: 30,
                                    width: 500,
                                    outline: 'none',
                                    marginTop: -3,
                                    marginLeft: 1,
                                    borderRadius: 3,
                                    border: 'none',
                                    fontWeight: 'bold'
                                }
                                }
                                type="text"
                            />
                        </td>
                        <td style={{ border: '1px solid #ccc' }}>
                            <input
                                placeholder="................................................................................................................................................................."
                                style={{
                                    height: 30,
                                    width: 500,
                                    outline: 'none',
                                    marginTop: -3,
                                    marginLeft: 1,
                                    borderRadius: 3,
                                    border: 'none',
                                    fontWeight: 'bold'
                                }
                                }
                                type="text"
                            />
                        </td>
                    </tr>
                </table>
            </div>
            <div style={{ height: 10 }}>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <small></small>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <small>ນະຄອນຫຼວງວຽງຈັນ(Vientiane) ວັນທີ່(date):</small>
                    <input
                        placeholder="..............................................."
                        style={{
                            height: 30,
                            width: 100,
                            outline: 'none',
                            marginTop: -3,
                            marginLeft: 1,
                            borderRadius: 3,
                            border: 'none',
                            fontWeight: 'bold'
                        }
                        }
                        type="text"
                    />
                </div>
            </div>
            <div style={{ height: 20 }}>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <small>ອະນູມັດໂດຍ <br /> Approved by:</small>
                <small style={{ marginLeft: 300 }}>ຢັ້ງຢືນ <br /> Verified by:</small>
                <small style={{ marginLeft: 300 }}>ຮັບຮູ້ໂດຍ <br /> Acknowledge by:</small>
                <small style={{ marginLeft: 300 }}>ສະເໜີໂດຍ <br /> Requested by:</small>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around',marginTop:60 }}>
                <small>_________________________________</small>
                <small style={{ marginLeft: 100 }}>_________________________________</small>
                <small style={{ marginLeft: 100 }}>_________________________________</small>
                <small style={{ marginLeft: 100 }}>_________________________________</small>
            </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',marginTop:20}}>
                <small>ຜູ້ອຳນວຍການໃຫ່ຍ <br/>(Managing Director)</small>
                <small style={{ marginLeft: 300 }}>ຝ່າຍບຸກຄະລາກອນ <br/>(Human Resourece Department)</small>
                <small style={{ marginLeft: 300 }}>ຜູ້ຮັບຜິດຊອບ <br/>(Workload)</small>
                <small style={{ marginLeft: 300 }}>ຝ່າຍສາຂາ <br/>(Head of Department/Branch)</small>
            </div>
        </>

    )
}

export default FormRecruitmentRequisition
