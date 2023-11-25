import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './home.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';
 import Header from '../../components/global/header';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import environment from '../../environment';


const VirtualDetail = () => { 
  const {id}=useParams();
  const Navigate=useHistory();
  const user=useSelector(state=>state.user);
  const [UserData,setUserdata]=useState({});
  const [Descriptiondata,setDescriptiondata]=useState("");
  const GetDetails=()=>{
    loader(true);
    ApiClient.get(`user/details?id=${id}`).then(res=>{
      if(res.success) {
         setUserdata(res.data);
      }
      loader(false);
    })
  }
 useEffect(()=>{ 
  GetDetails(); 
 },[])

const [ProjectData,setProjectData]=useState([]);
 const GetProjects=()=>{
  loader(true);
  ApiClient.get(`projects?userId=${user.id}`).then(res=>{
    if(res.success){
      setProjectData(res.data);
    }
    loader(false);

  })
 }

 useEffect(()=>{
  GetProjects();
 },[]);

const [SelectedProject,setSelectedProject]=useState("");
 const HandleSubmit=(e)=>{
  e.preventDefault();
  loader(true);
  ApiClient.post('invite',{freelancerId:id,projectId:SelectedProject,description:Descriptiondata}).then(res=>{
    if(res.success){
      document.getElementById("closeinviteModal").click();
      toast.success("Virtual Assistant Invited Successfully")
    }
    loader(false)
  })

 }
  return ( 
    <>
    <Header/>
    <div className='container'>
      <div className='row'>
       
        <div className='col-md-12 mt-4'>
          <div className='d-flex justify-content-between align-items-start'>
            <div className='d-flex'>
          <img src={`${UserData.image==""?"assets/img/placeholder.png":methodModel.userImg(UserData.image)} `} className='virtual_img shadow' />
          <div className='ml-4'>
          <h2 className="name_virtual mt-3 text-capitalize">{UserData.fullName}</h2>
          <p><span class="material-icons location">location_on</span> {UserData.address} -{UserData.timeZone&&UserData.timeZone.label}</p>
          {/* <p className='mt-3'>${UserData.hourlyRate}</p> */}
          {UserData.skills&&UserData.skills.map((item=><span className='mx-1 text-capitalize'>{item.name}</span>))}
        
          </div>
          </div>
          <div>
          <button  className='back btn btn-secondary mr-2' onClick={e=>Navigate.push("/virtual")}>Back</button>

          <button type="button" class="btn btn-primary mr-2" onClick={e=>setSelectedProject("")} data-toggle="modal" data-target="#openmodal">
            Hire
          </button> 
          <button type="button" class="btn btn-success" onClick={e=>setSelectedProject("")} data-toggle="modal" data-target="#openmodal">
            Invite
          </button>
          </div> 
          </div>
        </div>
        
          <div className='col-md-4 border_total_sale'>
            <div className='p-3'>
            <b>About</b>
            <p className='mt-2'>{UserData.description}</p>
            </div>
            <hr />
            <div className='p-3'>
            <div className='d-flex justify-content-between'>
              <div className='total_data'>
            <h5>$1m+</h5>
            <p>Total Earnings</p>
            </div>
            <div className='total_data'>
              <h5>234</h5>
              <p>Total jobs</p>
            </div>
            <div className='total_data'>
              <h5>32,234</h5>
              <p>Total hours</p>
            </div>
            </div>
            </div>
          
            <hr />
            <div className='p-3'>
            <h6 className='font-weight-bold mb-2'>Hourly Charge</h6>
            <p className='mb-0'>More then ${UserData.hourlyRate} hrs</p>
            <p> 24 hrs response time</p>
            </div>
          </div>
          <div className='col-md-8 border-top border-bottom pt-3'>
            <div className='d-flex justify-content-between alignitems-center'>
            <h2 className='font-weight-bold mr-4'>
              Google ads partner (10 yrs) youtube, tiktok, linkin
            </h2>
            <h5><b>${UserData.hourlyRate}.00/hr</b></h5>
            </div>
            <p className='mt-5 desc_font'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
          {/* <div className='border_box p-3'>
              <h2 className="name_virtual mb-3">Description</h2>
              <p className='desc_virtual'>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

                Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>
            </div>  */} 



<div class="modal fade" id="openmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Select the Job Post </h5>
        <button type="button" id='closeinviteModal' class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
     <form onSubmit={e=>HandleSubmit(e)}> <div class="modal-body">
    
        <select value={SelectedProject} className='form-control' required  onChange={e=>setSelectedProject(e.target.value)}>
          <option value="">Select a Job Post </option>
          {ProjectData.map((item,index)=>(
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <div className='mt-3'>
    <label>Description</label>
    <textarea className='form-control' value={Descriptiondata} placeholder='Enter the Description here ' onChange={e=>setDescriptiondata(e.target.value)}></textarea>
        </div>
        <div class="modal-footer mt-3">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Invite</button>
      </div>
      </div>
      </form>

    </div>
  </div>
</div>
        

          </div>
          </div> 
          
          </>
  
  );
};

export default VirtualDetail;
