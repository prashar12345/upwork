import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import Html from './html';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CardsDetail = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const history = useHistory()
    const { id } = useParams()
    const { intervalcount } = useParams()
    const { currencyiso } = useParams()
    const [planpricing, setplanpricing] = useState()

    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 2; i++) {
            cols.push(userTableModel.category[i])
        }
        setTableCols(cols)
        getPlan()
    }, [])
    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get(`api/cards/listing`, filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm => {
                    itm.id = itm.id
                    return itm
                }))
                setTotal(res.data.length)
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

    const statusChange = (itm) => {
        if (window.confirm(`Do you want to set this card primary`)) {
            loader(true)
            ApiClient.put(`api/primary/card`, { card_id: itm }).then(res => {
                if (res.success) {
                    getData()
                }
                loader(false)
            })
        }
    }

    const getPlan = () => {
        ApiClient.get(`api/plan/detail`, { id: id }).then(res => {
            if (res.success) {
                setplanpricing(res.data.pricing.map(itm=>{
                    return {...itm,id:itm.stripe_price_id,name:`${itm.interval_count} ${itm.interval} (${itm.unit_amount} ${itm.currency})`}
                }))
            }
        })
    }

    const handlePay = () => {
        let payload = {
            planId: id,
            planType: 'month',
            planInterval: intervalcount,
            stripe_price_id: planpricing.find(itm=>itm.interval_count == intervalcount && itm.currency == currencyiso.toLowerCase()).stripe_price_id
        }
        loader(true)
        ApiClient.post(`api/purchase/plan`, payload).then(res => {
            loader(false)
            if (res.success) {
                history.push('/activeplan')
            }
        })
    }

    return <><Html
        filter={filter}
        reset={reset}
        ChangeRole={ChangeRole}
        ChangeStatus={ChangeStatus}
        pageChange={pageChange}
        filters={filters}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        handlePay={handlePay}
        history={history}
    />
    </>;
};

export default CardsDetail;
