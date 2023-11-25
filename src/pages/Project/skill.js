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
import Header from '../../components/global/header';

const Skill = ({setCount,setMyForm,MyForm}) => {
  const [State,setState]=useState("")
  const [Filter,setFilter]=useState({search:""})
  const [AllSkills,setAllSkills]=useState([]);
  const [Skills,setSkills]=useState([]);
  const [SelectSkills,setSelectSkills]=useState([]);
  const GetSkills=(p={})=>{
    setFilter({search:""})
    loader(true);
    ApiClient.get(`skills?status=active&skillType=${MyForm.skillType}`,p).then(res=>{
      if(res.success){
        const array=[];
        const data=res.data;
        const selectedarray = data.filter(value => MyForm?.skills?.includes(value.id));
         setAllSkills(data);
        data.map((item,index)=>{
          if(MyForm.skills.includes(item.id)){ 
          }
          else{
            array.push(item);
          }
        })
      setSkills([...array]);
      setSelectSkills([...selectedarray]);
      }
      loader(false);
    })
  }
   
  useEffect(()=>{
GetSkills();
  },[])

  const HandleAddSkills=(id)=>{
    const Array=MyForm.skills;
    Array.push(id);
    setMyForm({...MyForm,skills:Array});
    GetSkills()

  }

  const RemoveSkills=async(id)=>{ 
const array=MyForm.skills;
array.filter((item,index)=>{
if(item==id){
  array.splice(index,1);
}
})
  setMyForm({...MyForm, skills:array})
      GetSkills(); 
    }
  
    const HandleSearch=(value)=>{
      setFilter({search:value})
      loader(true);
      ApiClient.get(`skills?search=${value}&status=active&skillType=${MyForm.skillType}`).then(res=>{
        if(res.success){
          const array=[];
          const data=res.data;  
          data.map((item,index)=>{
            if(MyForm.skills.includes(item.id)){ 
            }
            else{
              array.push(item);
            }
          })
        setSkills([...array]); 
        }
        loader(false);
      })
    }
  return (
    <>  
       <div className="bg-white pt-4">
     <div className="container pl-5 pr-5 mt-5">
      <div className="row ">
        <div className="col-md-6">
      <p>Job Post</p>
      <h2>What are the main skills required for your work?</h2>
        </div>
        <div className="col-md-6">
          <h5 className='font-weight-bold mb-2'>Search or add up to 10 skills</h5>
          <input type='text' className="form-control"  value={Filter.search}  onChange={e=>{e.target.value==""?GetSkills():HandleSearch(e.target.value);}} />
            <p className='text-primary mt-3'><i className='fa fa-star'></i> For the best result, add 3-5 skills </p>
          
          <h5 className="font-weight-bold mt-3">Popular Skills</h5>
                <div className='badges_skill'>
                    {Skills.map((item,index)=>( <span>{item.name} <i className='fa fa-plus'  onClick={e=>{MyForm.skills.length>10? console.log("error"):HandleAddSkills(item.id)}}></i></span>))}
                </div>
                {Skills.length==0?<div className='text-center text-danger'>No SKill Exists</div>:null}
                <hr/>
                <div className='badges_skill'>
                    {SelectSkills.map((item,index)=>( <span>{item.name} <i  onClick={e=>RemoveSkills(item.id)} className='fa fa-times'></i></span>))}
                </div>
        </div>
      </div>
     </div>
     </div>
     <div className="footer_btn">
      <button className="btn btn-outline-primary" onClick={e=>setCount(0)}>Back</button>
      <button className="btn btn-primary" disabled={MyForm.skills.length==0} onClick={e=>setCount(2)}  >Next:Scope</button>
     </div>

    </>
  );
};

export default Skill;