import React, { useEffect, useState } from 'react';
import EditProfile from '../../components/Profile/Edit';
import ChangePassword from '../../components/Profile/ChangePassword';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { ToastsStore } from 'react-toasts';
import rescheduleTimeModel from '../../models/rescheduleTime.model';
import { useSelector } from 'react-redux';
import AppointmentReminder from '../../components/Profile/AppointmentReminder';
import methodModel from '../../methods/methods';
import { useParams } from 'react-router-dom';
import Layout from '../../components/global/layout';

const Settings = () => {
  const user = useSelector(state => state.user)
  const [tabs, setTabs] = useState('profile');
  const [form, setForm] = useState();

  const { tab } = useParams()

  const gallaryData = () => {
    ApiClient.get(`setting`, {}).then(res => {
      if (res.success) {
        setForm(res.data)
      }
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    let value = {
      rescheduleTime: form.rescheduleTime,
      id: form.id
    }

    ApiClient.put('setting', value).then(res => {
      if (res.success) {
        ToastsStore.success(res.message)
      }
    })
  };


  useEffect(() => {
    if (tab) {
      setTabs(tab)
    } else {
      setTabs('profile')
    }
  }, [tab])

  useEffect(() => {
    // gallaryData()
  }, [])

  return (
    <>
      <Layout>


        {!tab ? <>
          <h3 className="mb-3">Settings</h3>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={tabs == 'profile' ? 'nav-link active' : 'nav-link'}
                href="#"
                onClick={() => setTabs('profile')}
              >
                Edit Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  tabs == 'change-pass' ? 'nav-link active' : 'nav-link'
                }
                href="#"
                onClick={() => setTabs('change-pass')}
              >
                Change Password
              </a>
            </li>
          </ul> </> : <></>}


        <div>
          {tabs === 'edit' ? <EditProfile /> : <></>}
          {tabs === 'change-password' ? <ChangePassword /> : <></>}
          {tabs === 'reminder' ? <AppointmentReminder /> : <></>}
          {tabs === 'reschedule-time' ? <div className="">
            <h3 className='mb-3'>Reschedule Time</h3>
            <form className="form-row" onSubmit={handleSubmit}>
              <div className="col-md-12 mb-3">
                <label>Hours <span className="start">*</span></label><br />
                <p className='small'>Set up a minimum number of hours that is required for an appointment to be rescheduled</p>
                <input
                  type="number"
                  className="form-control mt-2"
                  value={form && form.rescheduleTime}
                  maxLength={2}
                  onChange={e => { setForm({ ...form, rescheduleTime: methodModel.isNumber(e) }) }}
                  required
                />

                <div className="mt-3 text-right">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>

            </form>
          </div> : <></>}
        </div>
      </Layout>
    </>
  );
};

export default Settings;
