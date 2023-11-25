import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import loader from '../../methods/loader';
import ApiClient from '../../methods/api/apiClient';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Quiz({id,GetAssessmentData,HandleClose}) {
    // const [Minute,setMinute]=useState(5);
    const Localid=localStorage.getItem("assessmentid");
    const Minute=useRef(parseInt(localStorage.getItem("minute"))?parseInt(localStorage.getItem("minute")):0);
    const Seconds=useRef(parseInt(localStorage.getItem("seconds"))?parseInt(localStorage.getItem("seconds")):1);
    const [Good,SetGood]=useState(new Date())
    // const [Seconds,setSeconds]=useState(0);
    const Navigate=useHistory();
    const  params=new URLSearchParams(window.location.search);
    const [QuestionLength,setQuestionLength]=useState(0); 
    const [SecureArray,setSecureArray]=useState(localStorage.getItem("securearray")?JSON.parse(localStorage.getItem("securearray")):[]);
    const user=useSelector(state=>state.user);
    const IniCount=parseInt(localStorage.getItem("initialcount")?localStorage.getItem("initialcount"):0)
    const [InitialCount,setInitialCount]=useState(IniCount!=undefined&&IniCount!=null?IniCount:0);
    const [Assessments,SetAssessments]=useState([]);
    const [Options,setOptions]=useState([]);
    const [QuestionArray,setQuestionArray]=useState([])
    const GetAssesments=()=>{ 
        loader(true);
        ApiClient.get(`assessments/frontend`).then(res=>{
            if(res.success){
                const data=res.data;
                data.filter((item,index)=>{
                    if(item._id==id){
                        // alert(true);
                        console.log(item)
                        SetAssessments(item); 
                        setQuestionLength(item.assessmentQuestions&&item.assessmentQuestions.length-1)
                        const Leng=item.assessmentQuestions&&item.assessmentQuestions.length;
                        const Calculatemin=parseInt(Leng)*2;
                        if(Localid==id){
                        if(!localStorage.getItem("minute")){
                        Minute.current=Calculatemin-1;
                        localStorage.setItem("minute",Calculatemin-1)
                        Seconds.current=60
                        }
                    }
                    else{
                        Minute.current=Calculatemin-1;
                        localStorage.setItem("minute",Calculatemin-1)
                        Seconds.current=60
                    }
                       
                    setQuestionArray([item.assessmentQuestions[InitialCount]]);
                    }
                })
            }
            loader(false)
        })
    }
    useEffect(()=>{
       GetAssesments();
    },[id])



    const HandleChange=(e,value,id,question,questionid,index)=>{
        const {checked}=e.target;
       const array=Options;
       const securearray=SecureArray;
       if(securearray.some((item)=>item.index==InitialCount)){
        securearray.filter((item,indexo)=>{
                if(item.index==InitialCount)
                {
                securearray[indexo]["value"]= checked?value:"";
                }
           })
        }else{
            securearray.push({index:InitialCount,value:value});
        }
       if(array.length==0){
        array.push({value:value,id:questionid,question:question,answer:id})
        // securearray.push({index:InitialCount,value:value})
       }else{

    array.filter((item,index)=>{
        if(item.question==question){
            if(checked){
            array[index]["answer"]=id;
            array[index]["value"]=value;
        array[index]["id"]=questionid;
        array[index]["question"]=question
        }
            if(array.every((item)=>item!=question)){
                array[index]["id"]="";
            array[index]["value"]="";
            array[index]["answer"]=""
            array[index]["question"]="";
            }
        }else{ 
            if(array.every((item)=>item.question!=question)){
            array.push({value:value,answer:id,question:question,id:questionid})
            } 
        }
    })
}
setSecureArray([...securearray]);
setOptions([...array]);
localStorage.setItem("securearray",JSON.stringify([...securearray]))
    }  
    console.log(SecureArray,"This is our Secure Array")

console.log(SecureArray,"This is SecureArray thats we need ")

    //  For Handling the Next Function 
    const HandleNext=(e,type="Next")=>{
        e.preventDefault();
        let count=InitialCount;
        if(type=="back"){
            count-=1
        }else{
            count+=1
        }
     setInitialCount(count);
     localStorage.setItem("initialcount",count);
setQuestionArray([Assessments.assessmentQuestions[count]])

    }  




    const handleSubmit=(e)=>{
        if(e){
        e.preventDefault();}
        const finalpaylod=[]
        const newoptions=Options; 
        newoptions.map((item,index)=>{ 
              delete newoptions[index]["question"]; 
              delete newoptions[index]["value"]; 
        })
        newoptions.forEach((item)=>
        {
            if(item.answer!=""&&item.id!=""){
                finalpaylod.push(item);
            }
        }) 
const payload= {assessment:localStorage.getItem("assessmentid"),data:finalpaylod}
loader(true);
ApiClient.post(`analyize/assessment`,payload).then(res => {
    if(res.success){
        try{
        document.getElementById("closeQizModal").click()
        }catch{ 
        }
        GetAssessmentData();
        localStorage.removeItem("assessmentid");
        localStorage.removeItem("securearray");
        localStorage.removeItem("initialcount");
        localStorage.removeItem("minute");
        localStorage.removeItem("seconds")
        toast.success("Submitted Successfully ") 
        Navigate.push("/profile")
    }
})
    }
    useEffect(()=>{
 const Assessid=localStorage.getItem("assessmentid");
 if(Assessid){

    setInitialCount(IniCount);  
 }
    },[])
 
        // setInterval(() => {
        //     let seconds=parseInt(Seconds)-1;
        //     setSeconds(seconds)
        //     if(seconds==0){
        //        setMinute(Minute-1);
        //        setSeconds(60);
        //     }else{
        //        setSeconds(seconds)
        //     }
        // }, 1000);

       const tick = (CountInterval) => {
            const minutes=Minute.current;
            const seconds=Seconds.current;
        
            if (minutes == 0 && seconds == 0) {   
                    handleSubmit() 
                // alert(localStorage.getItem("minute"))
            } else if (seconds === 0) {
                Seconds.current=59 
               Minute.current=minutes - 1; 
               localStorage.setItem("seconds",59)
               localStorage.setItem("minute",minutes - 1);
            } else {
              Seconds.current=seconds - 1 
              localStorage.setItem("seconds",seconds-1)
            }
          };
     
          useEffect(()=>{
  let CountInterval= setInterval(() => {
    if(localStorage.getItem("assessmentid")&&Minute!=0&&Seconds!=0){
    tick()
  SetGood(new Date()) 
    }
    else{
        clearInterval(CountInterval)
    }
   }, 1000);
   return ()=>{ 
    clearInterval(CountInterval);
   }
          },[])

         
  return (
    <div> 
        <p style={{float:"right"}}>Total Question:{QuestionLength+1}</p>
         {Minute.current==0&&Seconds.current==0?
         <h5 className='text-danger text-center'>Time Out </h5>: 
         <h5><lable className='d-block m-2 font-weight-bold fs-6'>Ends in</lable><span className='timer'>{Minute.current}</span>
         <span className='timer'>{Seconds.current<10?"0"+Seconds.current:Seconds.current}</span>
         </h5>}
        <div className="container mt-4"> 
            {QuestionArray.map((newitem)=>(<div> 
            <h6 className='mt-2 mb-3 font-weight-bold'> {newitem.question}</h6>
            <div className='row'>
{newitem&&newitem.options&&newitem.options.map((OPitem,index)=>(<div className='col-md-4'>
 <h6><input type='checkbox' value={OPitem.value}   checked={SecureArray.some((item)=>item.value==OPitem.value&&item.index==InitialCount)}  onChange={e=>HandleChange(e,OPitem.value,OPitem.id,newitem.question,newitem._id,index)} name={newitem.question}/> {OPitem.value}</h6>
</div>))}
{/* checked={SecureArray.length!=0?SecureArray[InitialCount]&&SecureArray[InitialCount]["value"]==OPitem.value:false} */}
            </div>
            </div>))}
            <div className='d-flex justify-content-between mt-4'>
            <button className='btn btn-secondary btSmall' onClick={e=>{InitialCount==0? HandleClose(e):HandleNext(e,"back")}} disabled={InitialCount==0?true:false}>Back</button>
             {InitialCount==QuestionLength?<button className='btn btn-primary btSmall ml-2' onClick={e=>handleSubmit(e)} >Submit</button>:
             <button className='btn btn-primary btSmall ml-2' onClick={e=>HandleNext(e)}>Next</button>}
             </div>
            </div>
    
    </div>
  )
}
