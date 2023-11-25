import React from "react"

const Html=({searchText,search,placeholder,id})=>{
    return <>
    <input compoment="GooglePlaceAutoComplete" type="text" id={'pac_input_'+id} value={searchText} placeholder={placeholder||''} onChange={e=>search(e.target.value)} className="form-control" />
    </>
}

export default Html