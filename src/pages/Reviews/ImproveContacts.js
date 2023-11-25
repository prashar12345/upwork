import React from 'react';
import './style.scss';

function Improvecontact({
    tabChange
}) {
    const mystyle={
        backgroundImage: 'linear-gradient(to left, rgba(255,0,0,0), rgb(118 90 166))',
        width:'50%'
      }
    return (
        <div className=" mt-4 align-items-center">
        <div className='row mx-auto'>
            <div className='col-md-12 mx-auto'>
                <div className='d-flex justify-content-between w-50 mx-auto mb-2'>
                    <div>Sign up</div>
                    <div>Set up</div>
                    <div>Lift off</div>
                </div>
                <div class="progress w-50 mx-auto mb-5">
                    <div class="progress-bar stepCls" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={mystyle}></div>
                </div>

                <h1 className="welcomeAboard text-center mb-0">
                Import your contacts
                </h1>
                <p className='text-center pcls'>Add you customers now so it's easier to ask them to review you later</p>
                <div className='socialForm mx-auto mt-5'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <div className='oneStep'>1</div>
                        </div>
                        <div className='col-md-10'>
                            <a> Download our .csv template</a>
                            <span> and add your contacts (You can see and add more under the  Contacts tab later)</span>
                           
                        </div>

                        <div className='col-md-2 mt-4'>
                            <div className='oneStep'>2</div>
                        </div>
                        <div className='col-md-5 mt-4'>
                        <div className='boxImgupload'>
                                <div>
                                <input type="file" class="image-upload" accept="image/*" />
                                <div className='border_file'>
                                 <span class="material-icons">file_upload</span>
                                </div>
                               <b>Upload contacts spreadsheet</b>
                               </div>
                            </div>
                        </div>

                        
                       
                       
                    </div>
                    <div className='buttonSection mt-5 mb-4 d-flex justify-content-center'>
                        <button className='btn btnsecondary backBtn w-25' onClick={e => tabChange('step3')}>
                            <span class="material-icons">keyboard_backspace</span>
                        </button>
                        <button className='btn btn-primary ml-2 w-75' onClick={e => tabChange('step5')}>
                            Next Step
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
}

export default Improvecontact;
