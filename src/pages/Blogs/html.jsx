import React from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
import "./style.scss";
import { Link } from "react-router-dom";
import methodModel from "../../methods/methods";
import datepipeModel from "../../models/datepipemodel";
import environment from "../../environment";
import Switch from "react-switch";
import { useHistory } from "react-router-dom";
import Header from '../../components/global/header';


const Html = ({
  tab,
  edit,
  ChangeStatus,
  statusChange,
  pageChange,
  deleteItem,
  filters,
  loaging,
  data,
  isAllow,
  searchHandle,
  searchChange,
  categoriesdata,
  search,
  CatType,
  totalBlog,
  total = { total },
}) => {
  const Navigate = useHistory();
  return (
   <>
   <Header />
   <div className="container mb-5">
    <div className="row">
      <div className="col-md-12">
   <div className="d-flex justify-content-between mt-3 mb-4">
   <h2 className="mb-0">Blogs</h2>
   <form className='headerSearch' onSubmit={searchHandle}>
            <input type="text" placeholder="Search..." value={filters.search} onChange={e =>{ searchChange(e.target.value)}} className="Searchbar"></input>
            <i className="fa fa-search" onClick={searchHandle} aria-hidden="true"></i>
            {search ? <i className="fa fa-times" onClick={clear} aria-hidden="true"></i> : <></>}
          </form>
          </div>
          </div>
   </div>

<div className='row'>
<div className="col-md-9">
<div className='row'>
{data.map((itm, index) => (
  <a className='col-md-4 mb-4'  >

 
    <div className='post-wrap'>

      <div className='' onClick={() => Navigate.push(`blogsDetails/${itm.id}`)}>
      {/* <img src="/assets/img/noimag.jpg" className="noimage"/> */}
      {/* <img src={methodModel.noImage(data && data?.image)} className="uploadimage_class"/> */}
      <img src={methodModel.noImage(itm.image)} className="uploadimage_class" />
      </div>

      <div className='post-body' onClick={() => Navigate.push(`blogsDetails/${itm.id}`)}>
        <div className='post-body-primary'>
          {/* <div className='post-meta' >
            <p className="mb-1">{itm.updatedAt}</p>
          </div> */}

          <div className='post-title'>
            <h5>{itm.title}</h5>
          </div>

          <div className='post-text'>
            <p className="mb-0"><div className="text-truncate w-75" dangerouslySetInnerHTML={{ __html: itm.description }}></div></p>
          </div>
        </div> 
      </div>

    </div>

</a>

))}


{!loaging && total == 0 ? (
        <div className="py-3 text-center">No Data</div>
      ) : (
        <></>
      )}

</div>
</div>
    <div className="col-md-3 position-sticky">
              <ul className="category_name  p-3" >
                <h6 className=" mt-1 mb-3 font-weight-bold">Blogs Category</h6>
                {categoriesdata && categoriesdata.map((item, index) => (
                <li className="text-capitalize"   onClick={(e) => CatType(item.id)} >{item.name} </li>
                 ))}
              </ul>
            </div>

      {!loaging && total > filters.count ? (
        <div className="paginationWrapper">
          <span>
            Show {filters.count} from {total} Categories
          </span>
          <Pagination
            currentPage={filters.page}
            totalSize={total}
            sizePerPage={filters.count}
            changeCurrentPage={pageChange}
          />
        </div>
      ) : (
        <></>
      )}

      {loaging ? (
        <div className="text-center py-4">
          <img src="/assets/img/loader.gif" className="pageLoader" />
        </div>
      ) : (
        <></>
      )}


 
</div>
</div>
{/* <div className='button-wrap'>
  <a className='button' href='#'>Read More</a>
</div> */}
   </>
    
  );
};

export default Html;
