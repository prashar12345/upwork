import React, { useEffect, useState } from 'react'
import statusModel from '../../../models/status.model'
import loader from '../../../methods/loader';
import ApiClient from '../../../methods/api/apiClient';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import Layout from '../../../components/global/layout';
import SelectDropdown from '../../../components/common/SelectDropdown';
import { useDispatch, useSelector } from 'react-redux';
import environment from '../../../environment';
import Select from "react-select";
import { login_success } from '../../../actions/user';

export default function AddEditSkills({ skillsEdit, CloseSkillModal }) {
    const dispatch = useDispatch();
    const [OtherValue,setOtherValue]=useState("");
    const user = useSelector(state => state.user)
    const [OtherSkills,setOtherskills]=useState(user.otherSkills?user.otherSkills:[]);
    //  ############ Skills Types########
    const [SkillTypesdata, setSkillsTypedata] = useState([])
    const { id } = useParams();
    const Navigate = useHistory();
    const [Skilltype, setSkillType] = useState([]);
    useEffect(() => {
        ApiClient.get(`skills?skillType=${Skilltype}`).then(result => {
            if (result.success) {
                const data = result.data;
                let array = [];
                data.map((item, index) => {
                    array.push({ value: item.id, label: item.name })

                })
                setSelectedOptions([])
                setskills(array);
            }
        })
    }, [Skilltype])
    const [form, setform] = useState({ id: "", name: "", status: "active", skillType: "",otherskills:"" })
    const [submitted, setsubmitted] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState();

    const [skills, setskills] = useState([]);

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // loader(true); 
        setsubmitted(true);
        // setSelectedOptions(data);
        let method = "put";
        const payload = { id: user.id, skillType: form.skillType, skills: selectedOptions,otherSkills:OtherSkills }

        console.log(payload, "This is Payload thats i want ")
        ApiClient.put("edit/profile", payload).then(result => {
            if (result.success) {
                dispatch(login_success({ ...user, skills: selectedOptions, skillType: payload.skillType,otherSkills:OtherSkills }))
                CloseSkillModal();
                toast.success("Skills updated Successfully")
            }
            loader(false);
        })

    }

    const GetSkillsTypes = () => {
        loader(true);
        ApiClient.get(`skill/types?status=active`).then(res => {
            if (res.success) {


                setSkillsTypedata(res.data);
            }
            loader(false)
        })
    }
    useEffect(() => {
        GetSkillsTypes();
        if (id) {
            ApiClient.get(`skill?id=${id}`).then(result => {
                if (result.success) {
                    alert("Good")
                    const newdata = result.data;
                    setOtherskills(newdata.otherSkills)
                    alert(JSON.stringify(newdata.otherSkills))
                    setform({ name: newdata.name, status: newdata.status, skillType: newdata?.skillType?.id })
                }
            })
        }
    }, [])

    const isAllow = (key = '') => {
        let permissions = user.role?.permissions
        let value = permissions?.[key]
        if (user.role.id == environment.adminRoleId) value = true
        return value
    }
    useEffect(() => {
        if (skillsEdit) {
            ApiClient.get(`skills?skillType=${user.skillType}`).then(result => {
                if (result.success) {
                    const data = result.data;
                    let array = [];
                    data.map((item, index) => {
                        array.push({ value: item.id, label: item.name })
                    })
                    setskills(array);
                }
            })
            setform({ skillType: user.skillType })
            setSelectedOptions(user.skills)
        }
    }, [skillsEdit])


    //  For handling Other Skills We need to hit this Function 
    const AddOtherSkills=(e)=>{
        e.preventDefault();
        const array=OtherSkills;
        if(OtherValue){
        array.push(OtherValue);
        setOtherValue("");
        setOtherskills(array);}
    }

    const DeleteOtherSkills=(e,index)=>{
        // e.preventDefault()
    const array=OtherSkills;
    array.splice(index,1);
    setOtherskills([...array]);
    }
    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="pprofile1">
                    <h3 className='ViewUser'>{skillsEdit ? 'Edit' : 'Add'} Skill</h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>
                                Skill Type<span className="star">*</span>
                            </label>
                            <select className='form-control text-capitalize' required onChange={e => { setSkillType(e.target.value); setform({ ...form, skillType: e.target.value }) }} value={form.skillType} >
                                <option value="">Select Skill</option>
                                {SkillTypesdata.map((item, index) => (
                                    <option className='text-capitalize' value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Skills<span className="star">*</span></label>
                            <Select
                                isDisabled={form.skillType == "" ? true : false}
                                options={skills}
                                placeholder="Select Skills"
                                value={selectedOptions}
                                onChange={handleSelect}
                                isSearchable={true}
                                required
                                isMulti
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Other Skills
                                <span className="star">*</span>
                            </label>
                            <div className='d-inline-flex'>
                                <input type='text' onKeyPress={event=>event.key == 'Enter'?AddOtherSkills(event):""} value={OtherValue} onChange={e=>setOtherValue(e.target.value)} className='form-control'  /><button onClick={e=>AddOtherSkills(e)}  style={{ height: "40px " }} type='button' className='btn btn-info ml-3'> <i className='fa fa-plus'></i></button>
                            </div>
                            <div className='mt-3'>
                            {OtherSkills.map((item,index)=>(
                                <span className='mr-2 badges_cls'>{item}<i className='fa fa-trash text-danger ml-3' onClick={e=>DeleteOtherSkills(e,index)}></i></span>
                            ))}
                            </div>
                        </div>


                    </div>


                    <div className="text-right">
                        <button type="button" className="btn btn-secondary discard mr-2" onClick={e => CloseSkillModal()}>Back</button>
                        {!id || (id && isAllow('editSkills')) ? <button type="submit" className="btn btn-primary">Save</button> : null}
                    </div>
                </div>

            </form>
        </>
    )
}
