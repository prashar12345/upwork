import React from "react";
import methodModel from "../../../methods/methods";
import './style.scss';

const Html = ({ options, selectedValues, handleChange, displayValue, id,placeholder,required ,disabled,name,noDefault,className}) => {
    return <>
        <div className="selectDropdown">
            <input type="hidden" name={name} required={required} value={selectedValues} />
            <div className="dropdown addDropdown">
                <button disabled={disabled} className={`btn btn-primary dropdown-toggle removeBg ${className}`} type="button" id={"dropdownMenuButton" + id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {selectedValues ? methodModel.find(options, selectedValues, 'id')?.[displayValue] || placeholder : placeholder}
                </button>
                <div className="dropdown-menu shadow bg_hover" aria-labelledby={"dropdownMenuButton" + id}>
                   {noDefault?<a className={selectedValues == '' ? 'dropdown-item active disabled' : 'dropdown-item disabled'} disabled>{placeholder}</a>:<a className={selectedValues == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => handleChange('')}>{placeholder}</a>} 
                    {options && options.map(itm => {
                        return <a className={selectedValues == itm.id ? 'dropdown-item active' : 'dropdown-item'} onClick={() => handleChange(itm.id)} key={itm.id}>{itm[displayValue]}</a>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default Html