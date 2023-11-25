import React, { useEffect, useState } from 'react'
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import environment from '../../../environment';
import { login_success } from '../../../actions/user';

export default function VideoModal({date}) {
    const user=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const [Video,setVideo]=useState(user.introVideo?user.introVideo:"");
    const [Audio,setAudio]=useState(user.introAudio?user.introAudio:"");
    const [VideoUrl,setVideoUrl]=useState(user.introLink?user.introLink:"");
    const [UploadVideoError,setUploadVideoError]=useState(false);
    const [AudioError,setAudioError]=useState(false);
    const [SubmittedError,setSubmittedError]=useState(false);
useEffect(()=>{
  loader(true)
setVideo(user.introVideo?user.introVideo:"");
setAudio(user.introAudio?user.introAudio:"");
setVideoUrl(user.introLink?user.introLink:"")
loader(false)
},[date])

    const VideoUpload = (e) => { 
        let files = e.target.files
        let file = files.item(0)
        if(file){loader(true)}
        ApiClient.postFormData('uploadvideos', { file: file }).then(res => { 
          if (res.success) {
            let newimage = res.data
            // console.log(newimage,"New Image is this")
            const image=newimage?.imagePath[0]
            // alert(image)
  setVideo(image);
          } else { 
          }
          loader(false)
        })
      }


      const AudioUpload=(e)=>{
        let files = e.target.files
        let file = files.item(0)
        if(file){
        loader(true)}
        ApiClient.postFormData('uploadaudios', { file: file }).then(res => { 
            if(res.success){
          if (res.data.imagePath) {
            let image = res?.data?.imagePath[0]
  setAudio(image);
          } else { 
          }
        }
          loader(false)
        })
      }
    

    const HandleSubmit=(e)=>{
        e.preventDefault();
        setSubmittedError(true);
        if(Video==""&&VideoUrl==""){ return false}
        if(!validateYouTubeUrl(VideoUrl)){toast.error("Please enter a valid Youtube Video URL"); return false}
    ApiClient.put(`edit/profile`,{id:user.id,introVideo:Video,introLink:VideoUrl}).then(res=>{
        if(res.success){
            document.getElementById("closeVideomodal").click();
            const data={...user,introVideo:Video,introLink:VideoUrl}
            dispatch(login_success(data))
            toast.success(`Introduction ${user.introLink==""&&user.introVideo==""?"Added":"Updated"} Successfully`)
        }
    })
    }


    function validateYouTubeUrl(url)
{
    // var url = $('#youTubeUrl').val();
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
              return true
            }
            else {
              return false
                // Do anything for not being valid
            }
        }
        else{
          return false
        }
}
    const HandleAudioDelete=(e)=>{
      e.preventDefault();
      setAudio("");
    }
  return (
    <div>
        <div class="modal-body pt-0">
            <form onSubmit={e=>HandleSubmit(e)}>
                <div className="row">
                  <div className="col-md-12">
                    <label>Link to your YouTube video</label>
                    <input type='url' onChange={e=>setVideoUrl(e.target.value)} value={VideoUrl} placeholder="" className="form-control" />
                  </div> 
                  <div className="col-md-6 mt-3">
                    <label className="mb-2">Upload video</label>
                    {Video==""?<div class="profile_btn_portfolio d- ">
                      <label class={`add_portfolio edit ml-3`}>
                        <input id="bannerImage" accept='.mp4' type="file" onChange={e=>VideoUpload(e)} class="d-none" />
                        <span class="add_portfolio">
                          <i class="material-icons add_port">add</i>
                          </span>
                          </label>
                          </div>:<div><video width={300} height={150} src={`${environment.api+"images/videos/"+Video}`} controls/><i className='fa fa-trash text-danger video_tarsh' style={{marginTop:"-100px"}} onClick={e=>setVideo("")}></i></div>}
                          {SubmittedError&&Video==""&&VideoUrl==""?<p className='text-danger'>Upload Video or enter URL</p>:null}
                  </div>
                  {/* <div className="col-md-6 mt-3">
                    <label className="mb-2">Audio Upload</label>
                  {Audio==""?  <div class="profile_btn_portfolio d- ">
                      <label class="add_portfolio edit ml-3">
                        <input id="bannerImage" accept='.mp3' onChange={e=>AudioUpload(e)} type="file" class="d-none" />
                        <span class="add_portfolio">
                          <i class="material-icons add_port">add</i>
                          </span>
                          </label>
                        </div>:<><audio src={environment.api+"images/audios/"+Audio} controls/><i className='fa fa-trash text-danger audio_trash' onClick={e=>HandleAudioDelete(e)}></i></>}
                        {SubmittedError&&Audio==""?<p className='text-danger'>Audio is Required</p>:null}

                  </div> */}
                  <div className='modal-footer'>
                    <button className='btn btn-secondary discard mr-2' data-dismiss="modal" type='button'>Back</button>
                    <button type='submit'  className='btn btn-info'>Submit</button>
                  </div>
                </div>
                </form>
            </div>
    </div>
  )
}
