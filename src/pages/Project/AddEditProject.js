import React, { useEffect, useState } from 'react'
import loader from '../../methods/loader';
import ApiClient from '../../methods/api/apiClient';
import Header from '../../components/global/header';
import Skill from './skill';
import Budget from './budget';
import Describe from './describe';
import JobDetails from './JobDetails';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function AddEditProject() {
  const {id}=useParams();
  const Navigate=useHistory();
  const [MyForm,setMyForm]=useState({ id:"",title:"",skills:[],hourlyratestart:"",hourlyrateEnd:"",description:"",documents:[],skillType:""})
  const [StopIndex,setStopIndex]=useState(2);
  const [Count,setCount]=useState(0);
  const [Categories,setCategories]=useState([]);
  const [Speciality,setSpeciality]=useState([]);

  const GetCategories=()=>{
    loader(true);
    ApiClient.get(`categories?status=active`).then(res=>{
      if(res.success){
        setCategories(res.data);
      
      }
      loader(false)
    })
  }

  const GetAllSpeciality=()=>{
    loader(true);
    ApiClient.get(`specialities?status=active&category=${MyForm.category}`).then(res=>{
      if(res.success){
        setSpeciality(res.data);
      }
      loader(false);
    })
  }
//   useEffect(()=>{
// GetCategories()
//   },[])
//   useEffect(()=>{
//     GetAllSpeciality()
//   },[MyForm.category]);

  useEffect(()=>{
if(id){
  ApiClient.get(`project?id=${id}`).then(res=>{
    if(res.success){
      const data=res.data;
      setMyForm({ id:id,title:data.name,skills:data.skills&&data.skills.map((item)=>item.id),hourlyratestart:data.hourlyratestart,hourlyrateEnd:data.hourlyrateEnd,description:data.description,documents:data.documents,skillType:data.skillType&&data.skillType.id})
    }
  })
}
  },[id]);

  const [SkillTypes,setSkillTypes]=useState([]);
  const SkillType=()=>{
loader(true);
ApiClient.get(`skill/types?status=active`).then(res=>{
  if(res.success){
    setSkillTypes(res.data);
  }
  loader(false);
})
  }

  useEffect(()=>{
     SkillType();
  },[])
  return (
    <div>
 <Header/>
 {Count==0? 
   <>
   <div className="bg-white pt-4">
     <div className="container pl-5 pr-5 mt-5">
      <div className="row ">
        <div className="col-md-6">
      <p>Job Post</p>
      <h2>Let's start with a strong title.</h2>
      <p>This help your job post stand out to the right candidates. it's the first thing they'll see, so make it count!</p>
        </div>
        <div className="col-md-6">
          <label>Write a title for your job post</label>
          <input type='text' value={MyForm.title} onChange={e=>setMyForm({...MyForm,title:e.target.value})} className="form-control"  />

          {/* {MyForm.category==""?null:<p className="mt-3 text-primary">We'll match you with candidates that specialize in {Categories.filter((item)=>{if(item.id=MyForm.category){
            return(
              <span>{item.name}</span>
            )
          }})}</p>} */}
{/*         
          <h5 className="font-weight-bold mt-3">Job category</h5> */}
          {/* <div className="choose_cat mt-2">
          <input type="radio" id="cat" name="cat" value="cat" className="mr-2" />
            <label>General virtual Assistance</label>
          </div> */}
          {/* {MyForm.category==""?null:Categories.map((item,index)=>{
            if(index<StopIndex||item.id==MyForm.category){
            return (<div className="choose_cat mt-2 mb-2">
          <input type="radio" id="cats" onChange={e=>document.getElementById("opencategorymodal").click()} name="cats" value="cats" checked={item.id==MyForm.category} className="mr-2" />
            <label className='text-capitalize'>{item.name}</label>
          </div>)
}})} */}
          {/* <a className="text-primary">See all categories</a> */}
          <h6 className="mt-3 font-weight-bold">Examples</h6>
          <ul className="pl-3">
            <li className="mb-1">Build responsive wordpress site with booking/payment functionality</li>
            <li className="mb-1">Graphic designer needed to design ad creative for multiple campaigns</li>
            <li className="mb-1">Facebook ad specialist needed for product launch</li>
          </ul>
        </div>
      </div>
     </div>
     </div>
       <div className="footer_btn">
       <button className="btn btn-outline-primary" onClick={e=>Navigate.push("/project")} >Back</button>
       {/* {MyForm.specialty!=""?  : */}
       <button className="btn btn-primary" disabled={MyForm.title==""} id='opencategorymodal' data-toggle="modal"  data-target="#categoryModal">Next</button>
       
      </div>
      </>
     :Count==1?<Skill MyForm={MyForm} setCount={setCount} setMyForm={setMyForm}/>:Count==2?<Budget MyForm={MyForm} setCount={setCount} setMyForm={setMyForm} />:Count==3?<Describe MyForm={MyForm} setCount={setCount} setMyForm={setMyForm}/>:Count==4?<JobDetails MyForm={MyForm} setCount={setCount} setMyForm={setMyForm}/>:null}
     
<div class="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="categoryModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <h6 class="modal-title font-weight-bold" id="categoryModalLabel">Skill Type</h6>
        <button type="button" class="close" id="closeCategory" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body pb-5 mb-5">
        <div className="row">
        <div className="col-md-7">
        <label>Skill Type</label>
            <select className="form-control mb-3" value={MyForm.skillType} onChange={e=>setMyForm({...MyForm,skillType:e.target.value})}>
              <option value="" >select</option>
              {SkillTypes.map((item,index)=>(
                <option  value={item.id}>{item.name}</option>
              ))}
            </select>
            </div>
        {/* {MyForm.category==""?null:   <div className="col-md-7">
            <label>Specialty</label>
            <select className="form-control" value={MyForm.specialty} onChange={e=>setMyForm({...MyForm,specialty:e.target.value})}>
              <option>select</option>
             {Speciality.map((item,index)=>(
              <option value={item.id}>{item.name}</option>
             ))}
            </select>
            </div>} */}
            </div>
      </div>

        {MyForm.skillType==""?null:<button className="btn btn-primary w-25 mb-3 ml-3 mr-0" style={{float:"right"}} onClick={e=>{document.getElementById("closeCategory").click(); setCount(1);}}>Next:Skills</button>}
        </div>
        </div>
        </div>
    </div>
  )
}
