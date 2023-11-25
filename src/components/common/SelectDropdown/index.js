import React from "react";
import Html from "./html";

const SelectDropdown = ({intialValue,options,result,displayValue='name',id,placeholder="Select Status",disabled=false,name,required=false,noDefault=false,className=''}) => {
    const handleChange=(e)=>{
        result({event:"value",value:e})
    }

    return <>
        <Html
        id={id}
        name={name}
        className={className}
        noDefault={noDefault}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        displayValue={displayValue}
        options={options}
        selectedValues={intialValue}
        handleChange={handleChange}
        />
    </>
}

export default SelectDropdown