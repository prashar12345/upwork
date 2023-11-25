import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';


const TermConditions = () => {

  

  return (
    <Layout> 
        <div className="container-fluid">
           <h2>Terms & Conditions</h2>
           
        </div>
    </Layout>
  );
};

export default TermConditions;
