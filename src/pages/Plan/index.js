import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import Html from './html';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import environment from '../../environment';
import { toast } from 'react-toastify';

const Plans = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '' })
    const [data, setData] = useState([])
    const [currencys, setCurrencys] = useState([])
    const [tab, setTab] = useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [cardsData, setcardsaData] = useState()
    const [activeplan, setActiveplan] = useState()
    const history = useHistory()
    const [pricing, setpricing] = useState()
    const [appliedcurrency, setappliedcurrency] = useState()
    const [currencyiso, setcurrencyiso] = useState()
    const [features, setFeatures] = useState()
    const [interval, setInterval] = useState(1)
    useEffect(() => {
        getCards()
        getappliedcurrency()
        getCurrency()
        getFeatures()
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const getactivePlan = () => {
        ApiClient.get('api/my/plan', {}).then(res => {
            if (res.success) {
                setActiveplan(res.data)
             }
        
        })
    }


    const getCurrency = () => {
        ApiClient.get('', { page: 1, count: 100, status: 'active' }).then(res => {
            if (res.success) {
                setCurrencys(res.data)
            }
        })
    }

    const getFeatures = () => {
        ApiClient.get('api/grouped/features', { page: 1, count: 100, status: 'active' }).then(res => {
            if (res.success) {
                setFeatures(res.data)
            }
        })
    }

    const getData = (p = {}) => {
        getactivePlan()
        setLoader(true)
        let filter = { ...filters, ...p }
        loader(true)
        ApiClient.get(`api/frontend/plan/listing`, filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm => {
                    itm.id = itm._id
                    return itm
                }))
                setTotal(res.total)
            }
            loader(false)
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
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('', { id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
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

    const isChecked=(item,fitm)=>{
        let value=false
        if(item.feature){
            Object.keys(item.feature).map(oitm=>{
                let farr=item.feature[oitm]
                let ext=farr.find(itm=>itm.id==fitm.id)
                if(ext?.checked) value=true
            })
        }
        return value
    }

    const changeInterval=(p)=>{
        setInterval(p)
    }

    const getPrice=(p)=>{
       let value=0
       let intervalKey='monthlyPrice'
       if(interval==1) intervalKey='monthlyPrice'
       if(interval==3) intervalKey='threeMonthPrice'
       if(interval==6) intervalKey='sixMonthPrice'
       if(interval==12) intervalKey='yearlyPrice'
    
       value=p?.[intervalKey]?.[currencyiso] || 0
       return Number(value)
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

    const getCards = () => {
        ApiClient.get(`api/cards/listing`).then(res => {
            if (res.success) {
                setcardsaData(res.data)
            }
        })
    }

    const setprimary = (id) => {
        if (window.confirm(`Do you want to set this card primary`)) {
            ApiClient.put(`api/primary/card`, { card_id: id }).then(res => {
                getCards()
            })
        }
    }

    const getplandetails = (p) => {
        if (!currencyiso) {
            toast.error('Please Select Currency.')
            return
        }
        else {
            let price=getPrice(p)
            if (!price) {
                toast.error('Please Select Another Currency.')
                return
            }
            history.push(`detailcards/${p.id}/${interval}/${currencyiso}`)
        }
    }

    const addcard = () => {
        document.getElementById("closePaymentModal").click()
        history.push("/cards/add")
    }

    const cancelplan = (id) => {
        if (window.confirm('Do you want to cancel this subscription.')) {
            ApiClient.delete(`api/cancel/subscription`, { id: id }).then(res => {
                if (res.success) {
                    getData();
                }
            })
        }
    }

    const getappliedcurrency = () => {
        ApiClient.get('api/currency/applied?page=1&count=100&status=active').then(res => {
            if (res.success) {
                setappliedcurrency(res.data.map(itm => {
                    return { ...itm, id: itm.isoCode }
                }))
                setcurrencyiso(res.data[0].isoCode)
            }
        })
    }

    return <><Html
        currencys={currencys}
        features={features}
        getPrice={getPrice}
        changeInterval={changeInterval}
        filter={filter}
        interval={interval}
        tab={tab}
        isChecked={isChecked}
        activeplan={activeplan}
        addcard={addcard}
        reset={reset}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        loaging={loaging}
        data={data}
        total={total}
        appliedcurrency={appliedcurrency}
        exportfun={exportfun}
        cardsData={cardsData}
        setprimary={setprimary}
        getplandetails={getplandetails}
        setpricing={setpricing}
        pricing={pricing}
        cancelplan={cancelplan}
        setcurrencyiso={setcurrencyiso}
        currencyiso={currencyiso}
    />
    </>;
};

export default Plans;
