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
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { toast } from 'react-toastify';
import { search_success } from '../../actions/search';



const FaqPage = p => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [ProtofolioError,setProtofolioError]=useState(false);
  const [images,setimages]=useState([]);
  const [data, setData] = useState('');
  console.log(data,'===data====');
  const [filters, setFilter] = useState({ page: 1, count: 10, search: '', })
  const [tab,setTab]=useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [form, setForm] = useState({ });
    const [submitted, setsubmitted] = useState(false);
    const [search, setSearch] = useState('filter')  
    const [isLike, setIsLike] = useState(false)  
    const [item, setItem] = useState();
    
    const searchState = useSelector((state) => state.search);
  const formValidation = [ 
    { key: 'mobileNo', minLength: 10 },
    // { key: 'dialCode', dialCode: true },
  ]

  const dispatch = useDispatch()

  useEffect(
    () => {
      window.scrollTo({ top: 0 });
      if (searchState.data) {
        dispatch(search_success(''))
      }

    },
    []
  );

  useEffect(()=>{
    getData()
  },[])




  const getData = (p = {}) => {
    setLoader(true)
    let filter = { ...filters, ...p }
    ApiClient.get('faq/all', filter).then(res => {
        console.log(res,'asda')
        if (res.success) {
            console.log(res,'====');
            setData(res.data)
            setTotal(res.total)
        }
        setLoader(false)
    })
}

const searchChange = (e) => {
 setFilter({...filters,search:e});
 getData({search:e})
}

const [categoriesdata,setCategoriesdata]=useState([])
console.log(categoriesdata,'kkkk')
const GetcategoriesTypes=()=>{
    // loader(true);
    ApiClient.get(`categories`).then(res=>{
if(res.success){  
setCategoriesdata(res.data);
}
//   loader(false)
    })
}
const [isActive, setIsActive] = useState(false);
const [liked, setLiked] = useState(false)  
const [disliked, setDisliked] = useState(false)  

const handleLike=(id)=>{
  let payload= {id:id,like:true}
    ApiClient.put(`like-unlike/faq`,payload).then(res=>{
      setIsActive(!isActive);
    })
}

const handleDislike=(id)=>{
  let payload= {id:id,like:false}
  ApiClient.put(`like-unlike/faq`,payload).then(res=>{
    setIsActive(!isActive);
  })
}





console.log(form,"fdsdf");
const uTableCols = () => {
  let exp = []
  if (tableCols) exp = tableCols
  let value = []
  userTableModel.category.map(itm => {
      if (itm != exp.find(it => it.key == itm.key)) {
          value.push(itm)
      }
  })
  return value
}

const ChangeStatus = (e) => {
  setFilter({ ...filters, status: e, page: 1 })
  getData({ status: e, page: 1 })
}

const statusChange=(itm)=>{
  let modal='faq'
  let status='active'
  if(itm.status=='active') status='deactive'

  if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this faq`)){
      loader(true)
      ApiClient.put(`change/status?model=faq`,{status,id:itm.id}).then(res=>{
          if(res.success){
              getData()
              toast.success(`FAQ ${status=='active'?'Activated':'Deactivated'} Successfully`)
          }
          loader(false)
      })
  }
}



const clear = () => {
  setSearch('')
  dispatch(search_success(''))
}


const searchHandle = (e) => {
  e.preventDefault()
  dispatch(search_success(search))
}

const CatType = (e) => {    
  console.log(e,'hhhh')
  setFilter({ ...filters, search: '', page: 1 ,category:e})
  getData({ search: '', page: 1 ,category:e})
}


useEffect(() => {
  GetcategoriesTypes()
  if (id) {
    ApiClient.get(`faq?id=${id}`).then((result) => {
      if (result.success) {
        const newdata = result.data;
        console.log(newdata.category.name,"hhhh");     
      }
    });
  }
}, []);


  useEffect(
    
    () => {
      GetcategoriesTypes()
      if (user && user.loggedIn) {
     
     
      }
    },
    []

  );

  return (
    <>
    <Layout>
     <Html
     
     setForm={setForm}
     form={form}
     setFilter={setFilter}
     ProtofolioError={ProtofolioError}
     setProtofolioError={setProtofolioError}
     images={images}
     setimages={setimages}
     submitted={submitted}
     categoriesdata={categoriesdata}
     CatType={CatType}
     data={data}
     uTableCols={uTableCols}
     filters={filters}
     searchHandle={searchHandle}
     search={search}
     searchChange={searchChange}
     clear={clear}
     ChangeStatus={ChangeStatus}
     statusChange={statusChange}
     handleLike={handleLike}
     handleDislike={handleDislike}
     liked={liked}
     disliked={disliked}

     isActive={isActive}

     />
     </Layout>
    </>
  );
};

export default FaqPage;
