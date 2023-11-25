import React from "react";
import './style.scss';
import Multiselect from 'multiselect-react-dropdown';

const Html = ({ options, selectedValues,isSingle=false ,handleChange,displayValue,id}) => {
    return <>
        <div className="selectDropdown">
            <Multiselect
                options={options}
                singleSelect={isSingle}
                selectedValues={selectedValues}
                onSelect={e => handleChange(e,'select')}
                onRemove={e => handleChange(e,'remove')}
                displayValue={displayValue}
                id={id}
            />
        </div>

    </>
}

export default Html