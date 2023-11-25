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

const Resume = ({Resume,setResume,settime}) => {
  const user = useSelector((state) => state.user);

  const [ProtofolioError,setProtofolioError]=useState(false);
  const [images,setimages]=useState([]);
  const [data, setData] = useState('');
  const [form, setForm] = useState({ id:'' ,resume:'',resumeDocument:'',});
 
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
        setimages(res.data&&res.data.document)
        setForm({form,...res.data,role:res?.data?.role?.name})
        setData(res.data)
      }
      loader(false)
    })
  };

  setResume(user.resumeDocument); 
  const getError = (key) => {
    return methodModel.getError(key, form, formValidation)
  }

  const handleSubmit = e => { 
    setProtofolioError(false)
    e.preventDefault();
    setSubmitted(true)
    let invalid = methodModel.getFormError(formValidation, form)
    if (invalid) return
// if((images.length==0&&user.role&&user.role.id=="64e83a928599356bddc2fa00"&&form.resume=="")&&!form.resume&&user.role.id=="64e83a928599356bddc2fa00"){setProtofolioError(true); return false;}
if(form.resume==""&&form.resumeDocument==""){toast.error("Please Write or Upload Document"); return false}
    let value = {id:user.id,resume:form.resume,resumeDocument:form.resumeDocument }
console.log(value,"This is the Value thats we want")
    loader(true)
    ApiClient.put('edit/profile', value).then(res => {
      if (res.success) {
        let uUser = { ...user, resume:form.resume,resumeDocument:form.resumeDocument }
        dispatch(login_success(uUser))
        history.push("/profile"); 
        settime(new Date())
        toast.success("Resume Updated Successfully")
      }
      loader(false)
    })
    document.getElementById('resumemodal').click();
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
     Resume={Resume}
     setResume={setResume}
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

export default Resume;
