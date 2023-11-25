import Layout from '../../components/global/layout';
import React, { useEffect, useState } from 'react'
import loader from '../../methods/loader';
import ApiClient from '../../methods/api/apiClient';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Quiz from './Quiz';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function AssesmentListing() {
  const LocalAssessmentId=localStorage.getItem("assessmentid");
    const Navigate=useHistory();
    const [Retake,setRetake]=useState(false);
    const [AssessmentId,setAssessmentId]=useState(null);
    const [Assessments,SetAssessments]=useState([]);
    const GetAssesments=(url="assessments/frontend")=>{
        loader(true);
        ApiClient.get(url).then(res=>{
            if(res.success){
               SetAssessments(res.data) 
                
            }
            loader(false)
        })
    }
    useEffect(()=>{
     GetAssesments()
    },[])


    const HandleScreen=(id)=>{
      setAssessmentId(id);
      document.getElementById("openmodal").click();
    }
const [AssessmentData,setAssessmentData]=useState([]);
    const GetAssessmentData=()=>{
      loader(true);
      ApiClient.get(`assessment/analysis`).then(res=>{
        if(res.success){
          setAssessmentData(res);
        }
        loader(false);
      })
    }
    useEffect(()=>{
GetAssessmentData();
    },[])
    useEffect(()=>{
      const GetId=localStorage.getItem("assessmentid"); 
if(GetId){
HandleScreen(GetId)
}
    },[])

    useEffect(() => {
      const handleContextmenu = e => {
          e.preventDefault()
      }
      document.addEventListener('contextmenu', handleContextmenu)
      return function cleanup() {
          document.removeEventListener('contextmenu', handleContextmenu)
      }
}, [])
    

const HandleClose=(e)=>{
  e.preventDefault();
  Swal.fire({
    title: 'Do you want to Cancel Test?',
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) { 
      localStorage.removeItem("assessmentid");
        localStorage.removeItem("securearray");
        localStorage.removeItem("initialcount");
        localStorage.removeItem("minute");
        localStorage.removeItem("seconds")
    document.getElementById("closeQizModal").click();
    Navigate.push("/profile")
    toast.success("Test Canceled Successfully");
    } else if (result.isDenied) { 
console.log("");
    }
  })
}
  return (
    <div>
    <Layout>
        <div className='row'>
            <button data-toggle="modal" data-target="#exampleModal" id='openmodal' className='d-none'></button>
          <div className='col-md-8'>
          {Retake==true?<button className='btn btn-outline-info mb-2' onClick={e=>{GetAssesments();setRetake(false);}} >Back</button>:null}
          <div className='row'>
            {Assessments.map((item,index)=>( 
            <ul className={`col-md-4 text-center ${item.assessmentQuestions.length==0||(LocalAssessmentId&&LocalAssessmentId!=item.id)?"makeitdisable":""}`}>
             <li className={`shadow p-4 pointer border-rounded font-weight-bold ${item.assessmentQuestions.length==0?"makeitdisable":""}`}   onClick={e=>{if(item.assessmentQuestions.length==0){console.log("error")}else if(LocalAssessmentId&&LocalAssessmentId!=item.id){toast.error("Please Complete your Pending Assessment")} else{HandleScreen(item.id);  localStorage.setItem("assessmentid",item.id);localStorage.setItem("initialcount",0)}}} >{item.name}</li>
            </ul>))}
            </div>
            </div>
            <div className='col-md-4'>
              <div className='shadow p-3'>
                <div className='d-flex justify-content-between output'>
                <h6>Your Assessments</h6>
                <h5><b>{AssessmentData.totalAssesmentsTaken}</b></h5>
                  </div>
                  <div className='d-flex justify-content-between output'>
                <h6>Completed</h6>
                <h5><b>{AssessmentData.passedAssessment}</b></h5>
                  </div>
                  <div className='d-flex justify-content-between output'>
                  <h6 > Retake</h6>
                  <h5><b>{AssessmentData.assementToRetake}</b>{Retake==false?<i onClick={e=>{GetAssesments("retake/assessments");setRetake(true)}} className='fa fa-arrow-alt-circle-right text-warning ml-2'></i>:null}</h5>
                  </div> 
                  <div className='d-flex justify-content-between output'>
                  <h6>Badges</h6>
                  <h5><b>{AssessmentData.userBadge}</b></h5>
                  </div>
              </div>
            </div>
        </div>
    </Layout>
 
<div class="modal fade" id="exampleModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" data-bs-backdrop="static"  role="document">
    <div class="modal-content" data-bs-backdrop="static">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Question</h5>
        <button id='closeQizModal' className='d-none' data-dismiss="modal" aria-label="Close"></button>
        <button type="button"  onClick={e=>HandleClose(e)} class="close" >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-5">
                <Quiz id={AssessmentId} HandleClose={HandleClose} GetAssessmentData={GetAssessmentData} />
      </div> 
    </div>
  </div>
</div>
    </div>
  )
}
