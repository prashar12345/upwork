import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';

const All_review = () => {
  return (
    <Layout> 
     <div>
         review
     </div>
    </Layout>
  );
};

export default All_review;
