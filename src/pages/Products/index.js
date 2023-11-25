import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import Html from './html';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import environment from '../../environment';

const Products = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 48, search: '' })
    const [data, setData] = useState([])
    const [currencys, setCurrencys] = useState([])
    const [tab, setTab] = useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const history = useHistory()
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
            getCurrency()
        }
    }, [searchState])

    const getCurrency = () => {
        ApiClient.get('', { page: 1, count: 100, status: 'active' }).then(res => {
            if (res.success) {
                setCurrencys(res.data)
            }
        })
    }

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
        let filter = { ...filters, ...p }
        ApiClient.get(`api/products/listing`, filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm => {
                    itm.id = itm.id
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

    const filter = (p = {}) => {
        setFilter({ ...filters, page: 1, ...p })
        getData({ page: 1, ...p })
    }

    const reset = () => {
        let p = {
            interval: '',
            currencyId: ''
        }
        setFilter({ ...filters, page: 1, ...p })
        getData({ page: 1, ...p })
    }

    const deleteItem = (id) => {
        console.log(id,"id");
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/card/delete', { id: id }).then(res => {
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

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData({ page: 1 })
    }

    const modalResult = (e) => {
        modalClosed()
    }

    // const openModal = (itm) => {
    //     let extra=new Date().getTime()
    //     setform({...itm,extra})
    //     document.getElementById("openuserModal").click()
    // }

    const ChangeRole = (e) => {
        setFilter({ ...filters, catType: e, page: 1 })
        getData({ catType: e, page: 1 })
    }
    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
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

    const statusChange=(itm)=>{
        if(window.confirm(`Do you want to set this card primary`)){
            loader(true)
            ApiClient.put(`api/primary/card`,{card_id:itm}).then(res=>{
                if(res.success){
                    getData()
                }
                loader(false)
            })
        }
    }

    const edit = (id) => {
        history.push(`/card/edit/${id}`)
    }


    const view = (id) => {
        history.push(`/product/detail/${id}`)
    }

    const tabChange = (tab) => {
        setTab(tab)
    }

    const exportfun = async () => {
        const token = await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Plans.xlsx`;
        link.click();
    }

    return <><Html
        currencys={currencys}
        edit={edit}
        view={view}
        filter={filter}
        tabChange={tabChange}
        tab={tab}
        reset={reset}
        ChangeRole={ChangeRole}
        ChangeStatus={ChangeStatus}
        pageChange={pageChange}
        addCol={addCol}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        uTableCols={uTableCols}
        removeCol={removeCol}
        filters={filters}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        exportfun={exportfun}
    />
    </>;
};

export default Products;
