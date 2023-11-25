import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader'; 
import userTableModel from '../../models/table.model';
import categoryType from '../../models/categoryType.model';
import Html from './html';
// import { AssessmentsType } from '../../models/type.model';
import { useHistory } from 'react-router-dom'; 
import environment from '../../environment';
import { search_success } from '../../actions/search';

import axios from 'axios';
import { toast } from 'react-toastify';

const Blog= (p) => {
    const user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '', category:"" })
    const [data, setData] = useState([])
    const [tab,setTab]=useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [form, setform] = useState()
    const [search, setSearch] = useState('filter') 
    const [totalBlog, setTotalBlog]= useState('filter') 

    // const [form, setform] = useState({
    //     id: "",
    //     title: "",
    //     description: "",
    //     category: "id",
    //     image: "",
    //   });
    const types=categoryType.list
    const history=useHistory()
    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 2; i++) {
            cols.push(userTableModel.category[i])
        }
        setTableCols(cols)
    }, [])

    useEffect(() => {
        GetcategoriesTypes()
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const searchChange = (e) => {
        console.log(e, 'kkk')
        setFilter({...filters,search:e});
        getData({search:e})
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

    useEffect(
        () => {
          window.scrollTo({ top: 0 });
          if (searchState.data) {
            dispatch(search_success(''))
          }
    
        },
        []
      );

    const removeCol = (index) => {
        let exp = tableCols
        exp.splice(index, 1);
        setTableCols([...exp])
    }

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('blogs', filter).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }

    const [categoriesdata,setCategoriesdata]=useState([])
console.log(categoriesdata,'kkkk')
const GetcategoriesTypes=()=>{
    // loader(true);
    ApiClient.get(`categories`).then(res=>{
if(res.success){  
setCategoriesdata(res.data);
}
//   loader(false)
    })
}
  

//     const GetcategoriesTypes=()=>{
//         loader(true);
//         ApiClient.get(`categories`).then(res=>{
//   if(res.success){
  
  
//     setCategoriesdata(res.data);
//   }
//   loader(false)
//         })
//     }


    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete(`delete?model=blogs&id=${id}`).then(res => {
                if (res.success) {
                    toast.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }

    const searchHandle = (e) => {
        e.preventDefault()
        dispatch(search_success(search))
      }

  const CatType = (e) => {    
    setFilter({ ...filters, search: '', page: 1 ,category:e})
    getData({ search: '', page: 1 ,category:e})
  }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData({ page: 1 })
    }

    const modalResult=(e)=>{
        console.log("modalResult",e)
        modalClosed()
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

    const statusChange=(itm)=>{
        let modal='blogs'
        let status='active'
        if(itm.status=='active') status='deactive'

        if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this blogs`)){
            loader(true)
            ApiClient.put(`change/status?model=blogs`,{status,id:itm.id}).then(res=>{
                if(res.success){
                    getData()
                    toast.success(`blogs ${status=='active'?'Activated':'Deactivated'} Successfully`)
                }
                loader(false)
            })
        }
    }
 

    const edit=(id)=>{
        history.push(`/AddEditBlogs/${id}`)
    }
  
    const view=(id)=>{
        history.push("/userDetail/"+id)
    }
    const tabChange=(tab)=>{
        setTab(tab)
    }

    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/region`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Roles.xlsx`;
          link.click();
    }


    const isAllow=(key='')=>{
        let permissions=user.role?.permissions
        let value=permissions?.[key] 
        if(user.role.id==environment.adminRoleId) value=true
        return value
    }
    return <><Html 
    isAllow={isAllow}
    edit={edit}
        colClick={colClick}
        tabChange={tabChange}
        exportfun={exportfun}
        tab={tab}
        types={types}
        ChangeRole={ChangeRole}
        ChangeStatus={ChangeStatus}
        openModal={openModal}
        pageChange={pageChange}
        addCol={addCol}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        uTableCols={uTableCols}
        removeCol={removeCol}
        view={view}
        filters={filters}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        searchChange={searchChange}
        categoriesdata={categoriesdata}
        CatType={CatType}
        totalBlog={totalBlog}
    />
    </>;
};

export default Blog;
