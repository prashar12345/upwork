import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import categoryType from '../../models/categoryType.model';
import Html from './html';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import environment from '../../environment';
import countryModel from "../../models/country.model"

const DynamicPrice = (p) => {
    const {type} =useParams()
    const year = new Date().getFullYear()
    const user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '',country:'' ,year:'',type:type })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const types=categoryType.list
    const history=useHistory()

    const years=[
        {year:'2015',id:'2015'},
        {year:'2016',id:'2016'},
        {year:'2017',id:'2017'},
        {year:'2018',id:'2018'},
        {year:'2019',id:'2019'},
        {year:'2020',id:'2020'},
        {year:'2021',id:'2021'},
        {year:'2022',id:'2022'},
        {year:'2023',id:'2023'},
    ]
    
    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 2; i++) {
            cols.push(userTableModel.category[i])
        }
        setTableCols(cols)
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data,type:type })
            getData({ search: searchState.data, page: 1,type:type  })
        }
    }, [searchState,type])

    const getData = (p = {}) => {
        setLoader(true)
        let country='us'
        if(user.country){
           let ext=countryModel.search(user.country)
           if(ext){
            country=ext.cca2.toLowerCase()
           }
        }
        let filter = { ...filters, ...p,country}
        ApiClient.get('api/dynamic/pricings', filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm=>{
                    itm.id=itm._id
                    return itm
                }))
                setTotal(res.total)
            }
            setLoader(false)
        })
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const exportCsv = () => {
        loader(true)
        ApiClient.get('user/csv').then(res => {
            if (res.success) {
                let url = res.path
                let downloadAnchor = document.getElementById("downloadJS")
                downloadAnchor.href = url
                downloadAnchor.click()
            }
            loader(false)
        })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/dynamic/pricing/delete', { id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    getData()
                }
                loader(false)
            })
        }
    }

    const edit = (item, copy) => {
        history.push(`/dynamicprice/${item.type}/edit/${item.id}/${copy}`)
    }

    const statusChange = (itm) => {
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
            loader(true)
            // Status Change APi For Country
            ApiClient.put(`api/dynamic/pricing/status/change`, { id: itm.id, status }).then(res => {
                if (res.success) {
                    getData()
                }
                loader(false)
            })
        }
    }

    const filter = (p={}) => {
        setFilter({ ...filters, page: 1,...p })
        getData({ page: 1,...p })
    }

    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }

    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/dynamic/pricing/excel`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `DynamicPrice.xlsx`;
          link.click();
    }


    const reset = () => {
        let prm = {
            status: ''
        }
        setFilter({...filter,...prm})
        getData(prm)
    }

    return <><Html
        exportfun={exportfun}
        types={types}
        type={type}
        reset={reset}
        pageChange={pageChange}
        exportCsv={exportCsv}
        filters={filters}
        filter={filter}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        deleteItem={deleteItem}
        edit={edit}
        statusChange={statusChange}
        ChangeStatus={ChangeStatus}
        setFilter={setFilter}
        years={years}
    />
    </>;
};

export default DynamicPrice;
