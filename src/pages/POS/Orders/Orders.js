import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../../methods/api/apiClient';
import { ToastsStore } from 'react-toasts';
import loader from '../../../methods/loader';
import Html from './html';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import methodModel from '../../../methods/methods';
import environment from '../../../environment';

const Orders = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', catType: '' })
    const [data, setData] = useState([])
    const [tab, setTab] = useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const history = useHistory()

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])


    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p, id: methodModel.getPrams('id') }
        ApiClient.get('api/orders', filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm => {
                    itm.id = itm._id
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
            ApiClient.delete('api/pos/delete', { id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }

    const refresh = (id) => {
        loader(true)
        ApiClient.put('api/pos/refresh', { id: id }).then(res => {
            if (res.success) {
                toast.success(res.message)
                clear()
            }
            loader(false)
        })
    }



    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }


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

    const colClick = (col, itm) => {
        if (col.key == 'healthClinicId') {
        }
    }

    const statusChange = (itm) => {
        let modal = 'category'
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
            loader(true)
            ApiClient.put(`api/pos/status/change`, { id: itm.id, status }).then(res => {
                if (res.success) {
                    getData()
                }
                loader(false)
            })
        }
    }

    const view = (id) => {
        history.push(`/pos/orders/orderdetail/${id}`)
    }

    const edit = (id) => {
        history.push(`/pos/orders/orderdetail/${id}`)
    }

    const back = () => {
        history.goBack()
    }
    const exportfun = async () => {
        const token = await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/orders/export`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Orders.xlsx`;
        link.click();
    }

    return <><Html
        view={view}
        back={back}
        edit={edit}
        colClick={colClick}
        exportfun={exportfun}
        refresh={refresh}
        ChangeRole={ChangeRole}
        ChangeStatus={ChangeStatus}
        pageChange={pageChange}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        filters={filters}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
    />
    </>;
};

export default Orders;
