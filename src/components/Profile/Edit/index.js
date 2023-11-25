import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import { ToastsStore } from 'react-toasts';
import methodModel from '../../../methods/methods';
import { login_success } from '../../../actions/user';
import './style.scss';
import { userType } from '../../../models/type.model';
import Html from './Html';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { toast } from 'react-toastify';

const EditProfile = p => {
  const user = useSelector((state) => state.user);
  const [addressSellected,setAddressSellected]=useState(false);
  const [ProtofolioError,setProtofolioError]=useState(false);
  const [images,setimages]=useState([]);
  const [data, setData] = useState('');
  const [form, setForm] = useState({ id:'',company:'',description:"",address:"",dialCode:"",location:'',country:'',title:'',hourlyRate:"",startDate:'',endDateDate:'' ,description:'',portfolioUrl:'',timeZone:''});
 
  const dispatch = useDispatch();
  const history=useHistory()
  const [submitted, setSubmitted] = useState(false)

  const formValidation = [ 
    // { key: 'mobileNo', minLength: 10 },
    // { key: 'dialCode', dialCode: true },
  ]

  const gallaryData = () => {
    loader(true)
    ApiClient.get(`profile`,{id:user.id}).then(res => {
      if (res.success) {
        setimages(res.data&&res.data.document)
        setForm({form,...res.data,role:res?.data?.role?.name,timeZone:res.data.timeZone?res.data.timeZone:"",description:res.data&&res.data.description})
        setData(res.data)
      }
      loader(false)
    })
  };

  const getError = (key) => {
    return methodModel.getError(key, form, formValidation)
  }

  const handleSubmit = e => { 
    setProtofolioError(false)
    e.preventDefault();
    setSubmitted(true)
    let invalid = methodModel.getFormError(formValidation, form)
    if (invalid) return
    if(form.address=="")return
    if(form.image==""&&user.role&&user.role.id == "64e83a928599356bddc2fa00"){toast.error("Please Upload your Profile Image");return false}
// if((images.length==0&&user.role&&user.role.id=="64e83a928599356bddc2fa00"&&form.portfolioUrl=="")&&!form.portfolioUrl&&user.role.id=="64e83a928599356bddc2fa00"){setProtofolioError(true); return false;}
    let value = { fullName: form.fullName, dialCode:form.dialCode, mobileNo: form.mobileNo, image: form.image, id: form.id,hourlyRate:form.hourlyRate,address:form.address,country:form.country,city:form.city,state:form.state,timeZone:form.timeZone,description:form.description }
console.log(value,"This is the Value thats we want")
    loader(true)
    ApiClient.put('edit/profile', value).then(res => {
      if (res.success) {
        let uUser = { ...user, ...value }
        dispatch(login_success(uUser))
        history.push("/profile")
        toast.success(res.message)
      }
      loader(false)
    })
  };

  const uploadImage = (e) => {
    setForm({ ...form, baseImg: e.target.value })
    let files = e.target.files
    let file = files.item(0)
    loader(true)
    ApiClient.postFormData('upload/image?modelName=users', { file: file, modelName: 'users' }).then(res => {
      console.log(res,'kk')
      if (res.data.fullpath) {
        let image = res.data.fullpath
        setForm({ ...form, image: image, baseImg: '' })
      } else {
        setForm({ ...form, baseImg: '' })
      }
      loader(false)
    })
  }

  

  useEffect(
    () => {
      if (user && user.loggedIn) {
        gallaryData();
      }
    },
    []
    // here '[]' is used for, loop se bachne k liye
  );

  return (
    <>
    <Layout>
     <Html
     handleSubmit={handleSubmit}
     setForm={setForm}
     form={form}
     uploadImage={uploadImage}
     getError={getError}
     ProtofolioError={ProtofolioError}
     setProtofolioError={setProtofolioError}
     addressSellected={addressSellected}
     setAddressSellected={setAddressSellected}
     images={images}
     setimages={setimages}
     submitted={submitted}
     />
     </Layout>
    </>
  );
};

export default EditProfile;
