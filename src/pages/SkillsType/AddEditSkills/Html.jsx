// import React from "react";
// import methodModel from "../../../methods/methods";
// import ImageUpload from "../../../components/common/ImageUpload";
// import GooglePlaceAutoComplete from "../../../components/common/GooglePlaceAutoComplete";
// import Layout from "../../../components/global/layout";
// import SelectDropdown from "../../../components/common/SelectDropdown";



// const Html = ({
//   form,
//   handleSubmit,
//   setform,
//   roles,
//   addressResult,
//   submitted,
//   images,
//   imageResult,
//   getError,
//   setEyes,
//   eyes, 
//   emailErr,
//   emailLoader,
//   detail,
  
// }) => {
//   return (
//     <>
//       <>
//         <form onSubmit={handleSubmit}>
//           <div className="pprofile1">
//             <h3 className="ViewUser">
//               {form && form.id ? "Edit" : "Add"} Skills 
//             </h3>
//             <div className="form-row">
//               <div className="col-md-6 mb-3">
//                 <label>
//                Name<span className="star">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={form.addedBy_name}
//                   onChange={(e) =>
//                     setform({ ...form, addedBy_name: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label>
//                 Skill<span className="star">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={form.name}
//                   onChange={(e) => setform({ ...form, name: e.target.value })}
//                   required
//                 />
//               </div>


        
      
//               <div className="col-md-12 mb-3">
//                 <label>
//                   Description<span className="star">*</span>
//                 </label>
//                 <textarea
//                   className="form-control"
//                   value={form.description}
//                   onChange={(e) =>
//                     setform({ ...form, description: e.target.value })
//                   }
//                   required
//                 />
//               </div>
             
//             </div>

//             <div className="text-right">
//               <button
//                 type="button"
//                 id="closeeducationmodal"
//                 className="btn btn-secondary discard mr-2" 
//                 data-dismiss="modal" aria-label="Close"
//               >
//                 Back
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Save
//               </button>
//             </div>
//           </div>
//         </form>
//       </>
//     </>
//   );
// };

// export default Html;
