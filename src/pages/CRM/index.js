import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import Html from './html';
import { CategoryType } from '../../models/type.model';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import environment from '../../environment';

const CRM = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', catType: '' })
    const [data, setData] = useState([])
    const [tab,setTab]=useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [form, setform] = useState(CategoryType)
    const history=useHistory()
    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 2; i++) {
            cols.push(userTableModel.category[i])
        }
        setTableCols(cols)
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])


    const uTableCols = () => {
        let exp = []
        if (tableCols) exp = tableCols
        let value = []
        userTableModel.category.map(itm => {
            if (itm != exp.find(it => it.key == itm.key)) {
                value.push(itm)
            }
        })
        return value
    }

    const addCol = (itm) => {
        setTableCols([...tableCols, itm])
    }


    const removeCol = (index) => {
        let exp = tableCols
        exp.splice(index, 1);
        setTableCols([...exp])
    }

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p
         }
        ApiClient.get('api/contract/templates/listing', filter).then(res => {
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


    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/contract/template/delete', {id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }

    

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const openModal = (itm) => {
        let extra=new Date().getTime()
        setform({...itm,extra})
        document.getElementById("openuserModal").click()
    }

    const ChangeRole = (e) => {
        setFilter({ ...filters, catType: e, page: 1 })
        getData({ catType: e, page: 1 })
    }
    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }
    
    const colClick = (col, itm) => {
        if (col.key == 'healthClinicId') {
        }
    }

    const statusChange=(itm)=>{
        let modal='category'
        let status='active'
        if(itm.status=='active') status='deactive'

        if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this`)){
            loader(true)
            ApiClient.put(`api/contract/template/status/change`,{id:itm.id,status}).then(res=>{
                if(res.success){
                    getData()
                }
                loader(false)
            })
        }
    }
    const view=(id)=>{
        history.push("/crm/"+id)
    }
   
    const edit=(id)=>{
        history.push(`/crm/edit/${id}`)
    }

    const copy=(id)=>{
        history.push(`/crm/edit/${id}?copy=true`)
    }

    

    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/contract/template/excel`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Contract Templates.xlsx`;
          link.click();
    }
    const tabChange=(tab)=>{
        setTab(tab)
    }

    return <><Html
    view={view}
    edit={edit}
    copy={copy}
        colClick={colClick}
        tabChange={tabChange}
        exportfun={exportfun}
        tab={tab}
        ChangeRole={ChangeRole}
        ChangeStatus={ChangeStatus}
        openModal={openModal}
        pageChange={pageChange}
        addCol={addCol}
        deleteItem={deleteItem}
        uTableCols={uTableCols}
        removeCol={removeCol}
        filters={filters}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
    />
    </>;
};

export default CRM;
