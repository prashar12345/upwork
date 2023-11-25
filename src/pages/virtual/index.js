import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './home.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';
 import Header from '../../components/global/header';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import environment from '../../environment';
import Multiselect from 'multiselect-react-dropdown';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Virtual = () => { 

  const [SearchData,setSearchData]=useState("");
  const [CountrySearch,setCountrySearch]=useState("");
  const [Options,setOptions]=useState([]);
  const [Skills,setSkills]=useState([]);
  const [CategoryData,setCategoryData]=useState([]);
  const history=useHistory()
  const routes=useLocation();
  const pathname=routes.pathname;
 const user=useSelector(state=>state.user);
 const [filters,setfilters]=useState({search:"",skills:"",hourlyRateStart:"",hourlyRateEnd:"",country:[],experience:[]})
 const [Virtuals,setVirtuals]=useState([]);
 const [UserData,setUserdata]=useState({});
//  page=1&count=2

const GetVirtualListing=(p={})=>{
const NewFilters={...filters,...p,country:p.country?p.country.toString():filters.country.toString(),experience:p.experience?p.experience.toString():filters.experience.toString()};
  loader(true);
  ApiClient.get(`virtual/assistants`,NewFilters).then(result=>{
    if(result.success){
   setVirtuals(result.data);
    }
    loader(false);
  })
}

useEffect(()=>{
  if(!user.loggedIn){
    history.push("/login")
  }
 GetVirtualListing();
},[])
const HandleSearchFilter=(value)=>{
  setfilters({...filters,search:""});
  setSearchData("");
  GetVirtualListing({search:""})
}
const HandleSearchSubmit=(e)=>{
  e.preventDefault();
  if(SearchData==""){

  }else{
  setfilters({...filters,search:SearchData})
  GetVirtualListing({search:SearchData})
  }
}
// This is a Filter Method for Skills
const HandleSkills=(e)=>{
  const {checked,value}=e.target;
  const skillarray=Skills;
  if(checked){
skillarray.push(value)
setSkills(skillarray);
GetVirtualListing({skills:skillarray.toString()})
  }else{
    setSkills(skillarray.filter(item=>item!=value));
    GetVirtualListing({skills:skillarray.filter(item=>item!=value).toString()})
  }

}

const GetCategoryData=()=>{
  ApiClient.get(`skill/types/frontend`).then(res=>{
    if(res.success){
setCategoryData(res.data)
const newdata=res.data;
const array=[];
newdata.map((type)=>{
type.skilltype&&type.skilltype.map((item)=>{
  array.push({  cat: type.name,key: item.name,value:item._id})
})
})
setOptions(array);
    }
  })
}
useEffect(()=>{
  GetCategoryData();
},[])

const HandleMultipleSelect=(e)=>{
  setfilters({...filters,skills:e.map((item)=>item.value).toString()})
  GetVirtualListing({skills:e.map((item)=>item.value).toString()})
setSkills(e);
}


//  For Getting the Regions Listing With Virtual Assistance count
const [RegionsData,setRegionsData]=useState([]);
const GetRegions=(p={})=>{
  loader(true);
  ApiClient.get(`countries`,p).then(res=>{
    if(res.success){
    setRegionsData(res.data)
    }
    loader(false)
  })
}
const HandleCountrySearch=(e)=>{
  e.preventDefault();
  GetRegions({countryName:CountrySearch})
}
useEffect(()=>{GetRegions()},[])

// ################## For handling the Regions ##################
const HandleRegionsFilter=(e)=>{
const {checked,value}=e.target;
const array=filters.country;
if(checked){
  array.push(value);
  setfilters({...filters,country:array})
  GetVirtualListing({country:array})
}
else{
  const newarray =[];
  array.filter((item)=>{
    if(item!=value){newarray.push(item)}
  })
  setfilters({...filters,country:newarray})
  GetVirtualListing({country:newarray})
}
}


const Pushuser=(url)=>{
  history.push(`${url}`)
}


const HandleExperienceFilter=(e)=>{
  const {checked,value}=e.target;
  const array=filters.experience;
  if(checked){
    array.push(value);
    setfilters({...filters,experience:array})
    GetVirtualListing({experience:array})
  }
  else{
    const newarray =[];
    array.filter((item)=>{
      if(item!=value){newarray.push(item)}
    })
    setfilters({...filters,experience:newarray})
    GetVirtualListing({experience:newarray})
  }
}
  return ( 
    <>
    <Header/>
    <div className='container-fluid p-0'>
      <div className='row w-100'>
        <div className='col-md-3 pl-4 bggray'>
          <div className='sticky'>
            {/* <RangeSlider
            min={5}
            step={1}
            max={100}
            // value={[1,50]}
            onInput={e=>{setfilters({...filters,hourlyRateStart:e[0],hourlyRateEnd:e[1]});GetVirtualListing({hourlyRateStart:e[0],hourlyRateEnd:e[1]})}}
            />
            <p>${filters.hourlyRateStart} ${filters.hourlyRateEnd}</p> */}
          <h4 className='pt-3 headign_Cat'>Category</h4>
          {/* <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-search"></i>
            </div>
          </div>
          <input type="text" placeholder='Select Categories' className="form-control" aria-label="Text input with checkbox" />
        </div> */}

      {/* { CategoryData.map((item,index)=>( <div className='  p-3 bg-white'>
          <p className='search_data text-capitalize'>{item.name}</p>
          {item.skilltype&&item.skilltype.map((item,index)=>(<div className="input-group">
            <input type='checkbox' value={item._id}  onChange={e=>HandleSkills(e)} className='mr-2' />
            <label className='mb-0'>{item.name}</label>
            </div>))}
        </div>))} */}
        <Multiselect
  displayValue="key"
  groupBy="cat"
  // onKeyPressFn={function noRefCheck(){}}
  onRemove={e=>HandleMultipleSelect(e)}
  // onSearch={function noRefCheck(){}}
  onSelect={e=>HandleMultipleSelect(e)}
  options={Options}
  showCheckbox
/>

        {/* virtual  */}
        <h4 className='pt-4 headign_Cat'>Virtual Assistant Location</h4>
          <div className="input-group mb-1">
          <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-search"  onClick={e=>HandleCountrySearch(e)}></i>
            </div>
          </div>
          <input type="text" placeholder='Select client locations' onKeyPress={e=>e.key=="Enter"?HandleCountrySearch(e):null} onChange={e=>e.target.value==""?GetRegions({search:""}):setCountrySearch(e.target.value)}  className="form-control " aria-label="Text input with checkbox" />
        </div> 
        <div className='  p-3 bg-white'>
          <p className='search_data'>Regions</p>
  
           {RegionsData.map((item,indedx)=>{
          return item.country!=""?<div className="input-group">
            <input value={item.country} checked={filters.country.includes(item.country)} onChange={e=>HandleRegionsFilter(e)} type='checkbox' className='mr-2' />
            <label className='mb-1'>{item.country} ({item.sum})</label>
            
            </div>:null})}
            {RegionsData.length==0?<div className='text-danger'>No Data Found</div>:null}
        </div>


        <h4 className='pt-4 headign_Cat'>Hourly Rate</h4>
          <div className="d-flex align-items-center">
           
          <div class="input-group mb-0">
    <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">$</span>
  </div>
  <input type="number" class="form-control" value={filters.hourlyRateStart}  placeholder='Min' onChange={e=>setfilters({...filters,hourlyRateStart:e.target.value})}  aria-label="Username" aria-describedby="basic-addon1" />
</div>
<span className='ml-1 mr-1'>-</span>
<div class="input-group mb-0">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">$</span>
  </div>
  <input type="number" class="form-control" value={filters.hourlyRateEnd}  min={filters.hourlyRateStart} placeholder='Max' onChange={e=>setfilters({...filters,hourlyRateEnd:e.target.value})}  aria-label="Username" aria-describedby="basic-addon1" />
</div>
</div>
<h4 className='pt-4 headign_Cat'>Experience</h4>
<div className='mt-3 p-3 bg-white'>  
           
          <div className="input-group">
          <input value="entryLevel" checked={filters.experience.includes("entryLevel")}  onChange={e=>HandleExperienceFilter(e)} type='checkbox' className='mr-2' />
            <label className='mb-1'>EntryLevel</label>
            </div>
            <div className="input-group">
          <input  onChange={e=>HandleExperienceFilter(e)} value="intermediate" checked={filters.experience.includes("intermediate")} type='checkbox' className='mr-2' />
            <label className='mb-1'>Intermediate</label>
            </div>
            <div className="input-group">
          <input  onChange={e=>HandleExperienceFilter(e)} value="advance" checked={filters.experience.includes("advance")} type='checkbox' className='mr-2' />
            <label className='mb-1'>Advance</label>
            </div>
            <div className="input-group">
          <input  onChange={e=>HandleExperienceFilter(e)} value="expert" checked={filters.experience.includes("expert")} type='checkbox' className='mr-2' />
            <label className='mb-1'>Expert</label>
            </div>
        </div>
          {/* <span className='mt-2 mr-1' style={{fontSize:"20px"}}>$</span>
          <input type="number" placeholder='Min'  onChange={e=>setfilters({...filters,hourlyRateStart:e.target.value})}   className="form-control col-md-3 ml-2"  /> <span className='m-2'>-</span>
           <span className='mt-2' style={{fontSize:"20px"}}>$</span>
          <input type="number" placeholder='Max'  onChange={e=>setfilters({...filters,hourlyRateEnd:e.target.value})}   className="form-control col-md-3 ml-2" aria-label="Text input with checkbox" /><i style={{fontSize:"20px"}} onClick={e=>GetVirtualListing()} className='fa fa-search m-2'></i> */}
         <div className='text-right btn_virtual'>
          <button className='btn btn-secondary mt-2 mr-2' onClick={e=>{setfilters({skills:[],hourlyRateEnd:"",hourlyRateStart:"",search:"",country:[],experience:[]});GetVirtualListing({skills:[],hourlyRateEnd:"",hourlyRateStart:"",search:"",country:[],experience:[]})}}>Clear</button>
          <button  onClick={e=>GetVirtualListing()}  className='btn btn-primary mt-2'>Search</button>
          </div>
        </div>
     
      

          </div>
          
          <div className='col-md-9 mt-3'>
          <div className="main_shadow">

          <form className='col-md-4' style={{float:"left"}}  onSubmit={e=>HandleSearchSubmit(e)}> 
          <div class="input-group searchfield mb-4 mt-4">
          <input type="search" placeholder='Search' onChange={e=>e.target.value==""?HandleSearchFilter(e.target.value):setSearchData(e.target.value)} id="form1" class="form-control d-flex-inline " /> 
          <div class="input-group-append">
          <button type="submit" class="btn btn-primary d-inline-flex pl-3 pr-3">
          <i class="fas fa-search"></i>
        </button>
        </div>
        
        </div>
       </form> 
    <div className='row m-0 w-100 align-items-center mb-5'>
  { Virtuals.map((item,index)=>(       
  <div className='col-md-12 p-0'>

            <div className='box_clas p-3' style={{cursor:"pointer"}} onClick={e=>Pushuser(`/virtualdetails/${item.id}`)}>
            <div className="row"> 
  <div className="col-md-1">
<img src={`${item.image==""?"assets/img/placeholder.png":methodModel.userImg(item.image)} `} className='virtual_user' />
  </div>
  <div className="col-md-6">            
            <h4 className='mt-1 ml-3 mb-0 text-capitalize d-flex justify-content-between name_cls'>{item.fullName} </h4><br/>
            <h3 className="skilssty ml-3 text-capitalize">{item.skillType?item.skillType.name:"Virtual Assistant"}</h3>
            <div><span className='rate ml-3'>${item.hourlyRate}</span></div>
            <p className="ml-3 mt-3 description_cls">{item.description} </p>
       
            </div>
            <div className="col-md-2">
            <div className="mt-2">
            <p><span class="material-icons location">location_on</span> {item.country} 
            {/* -{UserData.timeZone&&UserData.timeZone.label} */}
            </p>
            </div>
            </div>
            <div className="col-md-3">
            <div className="text-right">
            <p className='mb-0 mt-2'> Skills:{item.skills&&item.skills.map((item,index)=>(
                <span className='mx-1 text-capitalize'>{item.label}</span>
              ))}</p> 
            </div>       
         </div>
  </div>
        
             
           
         
        
            </div>
          </div>))}
          {Virtuals.length<1?
          <div className='text-center mt-3 text-danger'><p>No Records Found</p></div>:null}
      
          </div>  


          </div>
          </div>
          </div>
          </div> 
          </>
  
  );
};

export default Virtual;
