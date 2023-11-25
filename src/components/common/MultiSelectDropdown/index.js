import React, { useEffect, useState } from "react";
import methodModel from "../../../methods/methods";
import Html from "./html";

const MultiSelectDropdown = ({intialValue,options,isSingle=false,result,displayValue='name',id}) => {

    const [selectedValues,setSelectedValues]=useState([])

    const handleChange=(e,type)=>{
        let value=[]
       
        if(isSingle){
           value=e[0].id
        }else{
            value=e.map(itm=>{
                return itm.id
            })
        }
        console.log("handleChange",e)
        console.log("type",type)
        result({event:"value",value:value})
    }

    useEffect(()=>{
        if(isSingle){
            let ext=methodModel.find(options,intialValue,'id')
            if(ext) setSelectedValues([ext])
        }else{
            let value=[]
            if(intialValue?.length && options?.length){
                value=intialValue?.map(itm=>{
                    return {
                        ...methodModel.find(options,itm,'id'),
                        id:methodModel.find(options,itm,'id')?.id || '',
                        [displayValue]:methodModel.find(options,itm,'id')?.[displayValue] || 'Not Exist'
                    }
                })
            }
            setSelectedValues(value)
        }
    },[intialValue,options])

    return <>
        <Html
        id={id}
        isSingle={isSingle}
        displayValue={displayValue}
        options={options}
        selectedValues={selectedValues}
        handleChange={handleChange}
        />
    </>
}

export default MultiSelectDropdown