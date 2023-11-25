import React, { useState, useEffect } from 'react';
import {  useHistory } from 'react-router-dom';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { search_success } from '../../../actions/search';
import { logout } from '../../../actions/user';
import Html from './Html';


const Header = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen1, setIsOpen1] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const history = useHistory();
  const Virtual = "64e83a928599356bddc2fa00";
  const employeerid = "64e5cdfc5bb9a041a39046d5";
  const [role, setrole] = useState(employeerid);

  const searchState = useSelector((state) => state.search);

  const Logout = () => {
    dispatch(logout())

    localStorage.removeItem("persist:admin-app")
    localStorage.removeItem("token")
    history.push('/home');
  };

  const user = useSelector((state) => state.user);

  useEffect(
    () => {
      window.scrollTo({ top: 0 });
      if (searchState.data) {
        dispatch(search_success(''))
      }

    },
    []
  );

  useEffect(() => {
    setSearch(searchState.data)
  }, [searchState])

  const [search, setSearch] = useState('')

  const searchHandle = (e) => {
    e.preventDefault()
    dispatch(search_success(search))
  }

  const searchChange = (e) => {
    setSearch(e)
    if (!e) {
      dispatch(search_success(''))
    }
  }


  const clear = () => {
    setSearch('')
    dispatch(search_success(''))
  }

  return (
    <Html
    isOpen={isOpen}
    toggle={toggle}
    searchHandle={searchHandle}
    search={search}
    user={user}
    searchChange={searchChange}
    isOpen1={isOpen1}
    clear={clear}
    setrole={setrole}
    Logout={Logout}
    />
  );
};

export default Header;
