import React, { useEffect, useState } from 'react';
import './style.scss';

import Html from './html';

const CompanyDetail = (p) => {



    const isAllow=(key='')=>{
        let permissions=user.role?.permissions[0]
        let value=permissions?.[key]
        if(user.role.id==environment.adminRoleId) value=true
        // return value
        return true
    }

    return <><Html
      
     
        isAllow={isAllow}

    />
    </>;
};

export default CompanyDetail;
