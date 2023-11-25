import React, { useState, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';
import { roleType } from '../../models/type.model';
import { Link, useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/global/layout';
import statusModel from '../../models/status.model';
import SelectDropdown from '../../components/common/SelectDropdown';

const AddEditRole = () => {
  const defaultvalue = () => {
    let keys = { ...roleType };
    Object.keys(roleType).map((itm) => {
      if (itm != 'permissions') keys[itm] = '';
    });
    Object.keys(roleType.permissions).map((itm) => {
      keys.permissions[itm] = false;
    });
    keys.status = 'active';
    return keys;
  };
  const { id } = useParams();
  const [form, setform] = useState(roleType);
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const formValidation = [
    { key: 'status', required: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;
    let method = 'post';
    let url = 'api/user/role';
    let value = {
      ...form,
    };
    if (value.id) {
      method = 'put';
      url = 'api/user/role/update';
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        ToastsStore.success(res.message);
        history.push('/roles');
      }
      loader(false);
    });
  };

  const setpermission = (key, value) => {
    setform({
      ...form,
      permissions: {
        ...form.permissions,
        [key]: value,
      },
    });
  };

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get('api/user/role/detail', { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          let payload = roleType;

          Object.keys(payload).map((itm) => {
            payload[itm] = value[itm];
          });
          if (value.permissions) {
            payload.permissions = { ...value.permissions[0] };
            // payload.permissions={ ...payload.permissions,...value.permissions}
          }
          console.log('payload', payload);

          setform({
            ...payload,
          });
        }
        loader(false);
      });
    } else {
      setform(defaultvalue());
    }
  }, [id]);
  //  For Handling Dashboard permission
  const hanldealldashboardpermission = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readDashboard: value } });
  }
  const HandleSales = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readSales: value } });
  }
  const HandleReviews = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readReviews: value } });
  }
  const handleProducts = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readProducts: value } });
  }
  const handleMarketing = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readMarketing: value } });
  }
  const handleFinancial = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readFinancial: value } });
  }
  const handleDynamicPricing = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readDynamicPricing: value, addDynamicPricing: value, deleteDynamicPricing: value, editDynamicPricing: value } });
  }
  const handleCompany = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readCompany: value, editCompany: value } });
  }
  const HandleCRM = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readCRM: value } });
  }
  const HandleAPI = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readAPI: value } });
  }
  const handlePlanPre = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readPlan: value, addPlan: value, editPlan: value } });
  }
  const handleBilling = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readBilling: value, addBilling: value } });
  }
  const handleRolesPer = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readRole: value, addRole: value, deleteRole: value, editRole: value } });
  }
  const handleAdminUser = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readAdmins: value, addAdmins: value, deleteAdmins: value, editAdmins: value } });
  }
  const handleBookingPre = (check) => {
    let value = check ? true : false
    setform({ ...form, permissions: { ...form.permissions, readBooking: value, addBooking: value, deleteBooking: value, editBooking: value, refreshBooking: value } });
  }

  const HandleAll = (check) => {
    let value = check ? true : false;
    let permissions = form.permissions
    Object.keys(permissions).map(itm => {
      permissions[itm] = value
    })
    setform({ ...form, permissions: permissions });
  }

  const isAllChecked = () => {
    let value = true;
    let permissions = form.permissions
    Object.keys(permissions).map(itm => {
      if (!permissions[itm]) value = false
    })
    return value
  }

  const HandleAllRead = (check) => {
    let value = check ? true : false;
    setform({ ...form, permissions: { ...form.permissions, readAPI:value, readCRM:value, readBilling:value, readCompany:value, readDynamicPricing:value, readFinancial:value, readMarketing: value, readProducts: value, readAdmins: value, readSales: value, readReviews: value, readBooking: value, readCustomer: value, readDashboard: value, readEmailTemplate: value, readPlan: value, readRole: value } });
  }
  const HandleAllAdd = (check) => {
    let value = check ? true : false;
    setform({ ...form, permissions: { ...form.permissions, addBilling:value, addDynamicPricing:value,addAdmins: value, addBooking: value, addCustomer: value, addEmailTemplate: value, addPlan: value, addRole: value } });
  }
  const HandleallEdit = (check) => {
    let value = check ? true : false;
    setform({ ...form, permissions: { ...form.permissions, editCompany:value, editDynamicPricing:value,editAdmins: value, editBooking: value, editRole: value, editCustomer: value, editEmailTemplate: value, editPlan: value } });
  }
  const HandleAllDelete = (check) => {
    let value = check ? true : false;
    setform({ ...form, permissions: { ...form.permissions, deleteDynamicPricing:value,deleteAdmins: value, deleteBooking: value, deleteCustomer: value, deleteRole: value } });
  }
  const HandleRefreshAll = (check) => {
    let value = check ? true : false;
    setform({ ...form, permissions: { ...form.permissions, refreshBooking: value } });
  }
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1">
            <h3 className="ViewUser mb-3">
              {form && form.id ? 'Edit' : 'Add'} Role
            </h3>

            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label>
                  Name<span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setform({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>
                  Status<span className="star">*</span>
                </label>
                <SelectDropdown
                  id="statusDropdown"
                  displayValue="name"
                  placeholder="Select Status"
                  intialValue={form.status}
                  result={e => { setform({ ...form, status: e.value }) }}
                  options={statusModel.list}
                />
                {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
              </div>
              <div className="col-md-12 mb-3">
                <h5 className='mb-0 mt-4'><b>Permissions</b></h5>
                {/* roles */}
                {/* 1st */}
                <div class="table-responsive">
                  <div class="table_section tablepadding">
                    <table class="table table-striped">
                      <thead class="table_head roleTable">
                        <tr class="heading_row">
                          <th scope="col" class="table_data"></th>
                          <th scope="col" class="table_data">
                            <input
                              type="checkbox" className='mr-2' onChange={e => HandleAll(e.target.checked)} checked={isAllChecked()} />All</th>
                          <th scope="col" class="table_data">
                            <input
                              type="checkbox" className='mr-2' onChange={e => HandleAllRead(e.target.checked)} checked={form.permissions.readAPI && form.permissions.readCRM && form.permissions.readBilling && form.permissions.readCompany && form.permissions.readDynamicPricing && form.permissions.readFinancial && form.permissions.readMarketing && form.permissions.readProducts && form.permissions.readSales && form.permissions.readReviews && form.permissions.readAdmins && form.permissions.readBooking && form.permissions.readCustomer && form.permissions.readDashboard && form.permissions.readEmailTemplate && form.permissions.readPlan && form.permissions.readRole } />Read</th>
                          <th scope="col" class="table_data"> <input
                            type="checkbox" className='mr-2' onChange={e => HandleAllAdd(e.target.checked)} checked={form.permissions.addBilling && form.permissions.addDynamicPricing && form.permissions.addAdmins && form.permissions.addBooking && form.permissions.addCustomer && form.permissions.addEmailTemplate && form.permissions.addPlan && form.permissions.addRole } />Add</th>
                          <th scope="col" class="table_data"> <input
                            type="checkbox" className='mr-2' onChange={e => HandleallEdit(e.target.checked)} checked={form.permissions.editCompany && form.permissions.editDynamicPricing && form.permissions.editAdmins && form.permissions.editBooking && form.permissions.editCustomer && form.permissions.editEmailTemplate && form.permissions.editPlan && form.permissions.editRole } />Edit</th>
                          <th scope="col" class="table_data"> <input
                            type="checkbox" className='mr-2' onChange={e => HandleAllDelete(e.target.checked)} checked={form.permissions.deleteDynamicPricing && form.permissions.deleteAdmins && form.permissions.deleteBooking && form.permissions.deleteCustomer && form.permissions.deleteRole } />Delete</th>
                          <th scope="col" class="table_data"> <input
                            type="checkbox" className='mr-2' onChange={e => HandleRefreshAll(e.target.checked)} checked={form.permissions.refreshBooking} />Refresh</th>
                        </tr>
                      </thead>
                      <tbody className='roleTable'>
                        <tr>
                          <td><b>Dashboard</b></td>
                          <td><input type="checkbox" onChange={(e) => hanldealldashboardpermission(e.target.checked)} checked={form.permissions.readDashboard} /></td>
                          <td><div className="checkList">
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readDashboard}
                                onChange={(e) =>
                                  setpermission('readDashboard', e.target.checked)
                                }
                              />{' '}
                            </label>
                          </div></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Sales Dashboard</b></td>
                          <td><input type="checkbox" onChange={e => HandleSales(e.target.checked)} checked={form.permissions.readSales} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readSales}
                                onChange={(e) =>
                                  setpermission(
                                    'readSales',
                                    e.target.checked
                                  )
                                }
                              />{' '}
                            </label>
                          </td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Reviews</b></td>
                          <td><input type="checkbox" onChange={e => HandleReviews(e.target.checked)} checked={form.permissions.readReviews} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readReviews}
                                onChange={(e) =>
                                  setpermission(
                                    'readReviews',
                                    e.target.checked
                                  )
                                }
                              />{' '}
                            </label>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Product Dashboard</b></td>
                          <td><input type="checkbox" onChange={(e) => handleProducts(e.target.checked)} checked={form.permissions.readProducts} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readProducts}
                                onChange={(e) =>
                                  setpermission('readProducts', e.target.checked)
                                }
                              />{' '}
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <td><b>Marketing Dashboard</b></td>
                          <td><input type="checkbox" onChange={e => handleMarketing(e.target.checked)} checked={form.permissions.readMarketing} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readMarketing}
                                onChange={(e) =>
                                  setpermission('readMarketing', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Financial Dashboard</b></td>
                          <td><input type="checkbox" onChange={e => handleFinancial(e.target.checked)} checked={form.permissions.readFinancial} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readFinancial}
                                onChange={(e) =>
                                  setpermission('readFinancial', e.target.checked)
                                }
                              />{' '}
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <td><b>Dynamic Pricing</b></td>
                          <td><input type="checkbox" onChange={e => handleDynamicPricing(e.target.checked)} checked={form.permissions.readDynamicPricing && form.permissions.addDynamicPricing && form.permissions.editDynamicPricing && form.permissions.deleteDynamicPricing} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readDynamicPricing}
                                onChange={(e) =>
                                  setpermission('readDynamicPricing', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addDynamicPricing}
                                onChange={(e) =>
                                  setpermission('addDynamicPricing', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editDynamicPricing}
                                onChange={(e) =>
                                  setpermission('editDynamicPricing', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteDynamicPricing}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteDynamicPricing',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Company Details</b></td>
                          <td><input type="checkbox" onChange={e => handleCompany(e.target.checked)} checked={form.permissions.readCompany && form.permissions.editCompany} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readCompany}
                                onChange={(e) =>
                                  setpermission('readCompany', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editCompany}
                                onChange={(e) =>
                                  setpermission('editCompany', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>CRM</b></td>
                          <td><input type="checkbox" onChange={e => HandleCRM(e.target.checked)} checked={form.permissions.readCRM} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readCRM}
                                onChange={(e) =>
                                  setpermission(
                                    'readCRM',
                                    e.target.checked
                                  )
                                }
                              />{' '}
                            </label>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>API Integration</b></td>
                          <td><input type="checkbox" onChange={e => HandleAPI(e.target.checked)} checked={form.permissions.readAPI} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readAPI}
                                onChange={(e) =>
                                  setpermission(
                                    'readAPI',
                                    e.target.checked
                                  )
                                }
                              />{' '}
                            </label>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Booking System</b></td>
                          <td><input type="checkbox" onChange={e => handleBookingPre(e.target.checked)} checked={form.permissions.addBooking && form.permissions.editBooking && form.permissions.readBooking && form.permissions.deleteBooking && form.permissions.refreshBooking} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readBooking}
                                onChange={(e) =>
                                  setpermission('readBooking', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addBooking}
                                onChange={(e) =>
                                  setpermission('addBooking', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editBooking}
                                onChange={(e) =>
                                  setpermission('editBooking', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteBooking}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteBooking',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <span className='mr-2'>
                                <input
                                  type="checkbox"
                                  checked={form.permissions.refreshBooking}
                                  onChange={(e) =>
                                    setpermission(
                                      'refreshBooking',
                                      e.target.checked
                                    )
                                  }
                                />
                              </span>

                            </label>
                          </td>
                        </tr>

                        <tr>
                          <td><b>Plan</b></td>
                          <td><input type="checkbox" onChange={e => handlePlanPre(e.target.checked)} checked={form.permissions.readPlan && form.permissions.addPlan && form.permissions.editPlan} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readPlan}
                                onChange={(e) =>
                                  setpermission('readPlan', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addPlan}
                                onChange={(e) =>
                                  setpermission('addPlan', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editPlan}
                                onChange={(e) =>
                                  setpermission('editPlan', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                          </td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Billing</b></td>
                          <td><input type="checkbox" onChange={e => handleBilling(e.target.checked)} checked={form.permissions.readBilling && form.permissions.addBilling} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readBilling}
                                onChange={(e) =>
                                  setpermission('readBilling', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addBilling}
                                onChange={(e) =>
                                  setpermission('addBilling', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Roles</b></td>
                          <td><input type="checkbox" onChange={(e) => handleRolesPer(e.target.checked)} checked={form.permissions.readRole && form.permissions.addRole && form.permissions.editRole && form.permissions.deleteRole} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readRole}
                                onChange={(e) =>
                                  setpermission('readRole', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addRole}
                                onChange={(e) =>
                                  setpermission('addRole', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editRole}
                                onChange={(e) =>
                                  setpermission('editRole', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteRole}
                                onChange={(e) =>
                                  setpermission('deleteRole', e.target.checked)
                                }
                              />{' '}

                            </label>

                          </td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Users</b></td>
                          <td><input type="checkbox" onChange={e => handleAdminUser(e.target.checked)} checked={form.permissions.readAdmins && form.permissions.addAdmins && form.permissions.deleteAdmins && form.permissions.editAdmins} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readAdmins}
                                onChange={(e) =>
                                  setpermission('readAdmins', e.target.checked)
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addAdmins}
                                onChange={(e) =>
                                  setpermission('addAdmins', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editAdmins}
                                onChange={(e) =>
                                  setpermission('editAdmins', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteAdmins}
                                onChange={(e) =>
                                  setpermission('deleteAdmins', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Link to="/roles" className="btn btn-secondary discard mr-2">Back</Link>
              <button type="submit" className="btn btn-primary ">
                Save
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEditRole;
