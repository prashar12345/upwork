import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { ToastsStore } from 'react-toasts';
import methodModel from '../../methods/methods';
import { login_success } from '../../actions/user';
import './style.scss';
import { userType } from '../../models/type.model';
import Html from './Html';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { toast } from 'react-toastify';

const Portfolio = p => {
  const user = useSelector((state) => state.user);
  const [ProtofolioError,setProtofolioError]=useState(false);
  const [images,setimages]=useState([]);
  const [data, setData] = useState('');
  const [form, setForm] = useState({ id:'',company:'',location:'',country:'',title:'',hourlyRate:"",startDate:'',endDateDate:'' ,description:'',portfolioUrl:''});
 
  const dispatch = useDispatch();
  const history=useHistory()
  const [submitted, setSubmitted] = useState(false)

  const formValidation = [ 
    { key: 'mobileNo', minLength: 10 },
    // { key: 'dialCode', dialCode: true },
  ]

  const gallaryData = () => {
    loader(true)
    ApiClient.get(`profile`,{id:user.id}).then(res => {
      if (res.success) {
        setimages(res.data&&res.data.portfolioImage!=""&&res.data.portfolioImage ?res.data.portfolioImage:[])
        setForm({form,...res.data,role:res?.data?.role?.name})
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
if((images.length==0&&user.role&&user.role.id=="64e83a928599356bddc2fa00"&&form.portfolioUrl=="")&&!form.portfolioUrl&&user.role.id=="64e83a928599356bddc2fa00"){setProtofolioError(true); return false;}
    let value = {  id: form.id,portfolioImage:images,hourlyRate:form.hourlyRate,portfolioUrl:form.portfolioUrl }
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
    document.getElementById('closePortfolio').click();
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
    // here '[]' is used for, loop se bachne k liye c
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
     images={images}
     setimages={setimages}
     submitted={submitted}
     />
     </Layout>
    </>
  );
};

export default Portfolio;
