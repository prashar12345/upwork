import React, { useEffect } from 'react';
// import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { PersistGate } from 'redux-persist/es/integration/react';
import "react-datepicker/dist/react-datepicker.css";
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from './config';
import { createBrowserHistory } from 'history';
import Login from './pages/Login';
import "react-pagination-js/dist/styles.css";
import './scss/main.scss';
import SignUp from './pages/Signup';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import Dashboard from './pages/DashboardPages';
import { Auth } from './methods/auth';
import Profile from './pages/Profile';
import EditProfile from './components/Profile/Edit';
import ChangePassword from './components/Profile/ChangePassword';
import Plans from './pages/Plan';
import Cards from './pages/Cards';
import AddEditCards from './pages/Cards/AddEdit';
import CardsDetail from './pages/CardsDetail';
import Products from './pages/Products';
import ProductDetail from './pages/Products/Detail/ProductDetail';
import POS from './pages/POS';
import AddEditPOS from './pages/POS/AddEdit';
import Orders from './pages/POS/Orders/Orders';
import CompanyDetails from './pages/CompanyDetails';
import BookingSystem from './pages/BookingSystem';
import AddEditBooking from './pages/BookingSystem/AddEdit';
import Salesdashboard from './pages/SalesDashboard';
import Marketingdashboard from './pages/MarketingDashboard';
import Financialdashboard from './pages/FinancialDashboard';
// import Resellerdashboard from './pages/ResellerDashboard';
import ActivePlan from './pages/Plan/ActivePlan';
import Payment from './pages/Payment';
import OrderDetail from './pages/POS/Orders/OrderDetail';
import Calendar from './pages/Calendar';
import SalesData from './pages/SalesDashboard/salesData';
import Productdashboard from './pages/ProductDashboard';
import ProductData from './pages/ProductDashboard/ProductData';
import AddEditPrice from './pages/DynamicPrice/AddEditPage';
import DynamicPrice from './pages/DynamicPrice';

import CustomerData from './pages/Customers/CustomerData';
import Customers from './pages/Customers';
import ResellerDatabase from './pages/ResellerDatabase';
import ApplyProduct from './pages/ProductDashboard/ApplyProduct';
import AddEditEarlyBirdPricing from './pages/DynamicPrice/Early/AddEditPage';
import AddEditEarlyBirdTimeFrames from './pages/DynamicPrice/TimeFrames/AddEditPage';
import AddEditEarlyBirdInventory from './pages/DynamicPrice/Inventory/AddEditPage';
import Home from './pages/Home';
import Roles from './pages/Roles';
import AddEditRole from './pages/Roles/AddEdit';
import AddEditLastMinuteFixedDates from './pages/DynamicPrice/LastMinuteFixedDates/AddEditPage';
import AddEditLastMinuteInventory from './pages/DynamicPrice/LastMinuteInventory/AddEditPage';
import Users from './pages/Users';
import AddEditUser from './pages/Users/AddEditUser';
import UserDetail from './pages/Users/Profiledetail';
import Reviews from './pages/Reviews';
import Googlereview from './pages/Reviews/Googlereview';
import Googlereviewsteps from './pages/Reviews/Googlereviewsteps';
import step2 from './pages/Reviews/step2';
import sitereview from './pages/Reviews/Reviewsite';
import improveContact from './pages/Reviews/ImproveContacts';
import CRM from "./pages/CRM";
import AddEditCRM from "./pages/CRM/AddEdit";
import ViewReseller from './pages/ResellerDatabase/view';
import SendContract from './pages/ResellerDatabase/SendContract';
import AddEditReseller from './pages/ResellerDatabase/AddEditReseller';
import Thanku from './pages/Thanku';
import ReviewDashboard from './pages/Reviews/ReviewDashboard';
import BuyExtraProdcts from './pages/ProductDashboard/BuyExtraProducts';
import ReviewPage from './pages/Reviews/ReviewPage';
import ReviewDetail from './pages/Reviews/ReviewDetail';
export const history = createBrowserHistory();
/************ store configration *********/
import ReactGA from 'react-ga'
import All_review from './pages/reviewsAll';
import { ToastContainer } from 'react-toastify';
import Employment from './pages/Employment';
import AddEditEmployment from './pages/Employment/AddEditEmployment';
import EmploymentDetail from './pages/Employment/Employmentdetail';
import Education from './pages/Education';
import AddEditEducation from './pages/Education/AddEditEducation';
import EducationDetail from './pages/Education/Educationdetail';
import SkillsType from './pages/SkillsType';
import AddEditSkills from './pages/SkillsType/AddEditSkills';
import SkillsDetail from './pages/SkillsType/skillsdetail';
import Portfolio from './pages/Portfolio';
import Resume from './pages/Resume';
import CompanyDetail from './pages/CompanyDetail';
import NotfoundPage from './pages/Notfoundpage';
import Virtual from './pages/virtual'; 
import VirtualDetail from './pages/VirtualDetail'; 
import FaqPage from './pages/FAQ';
import Quiz from './pages/QuizesPages/Quiz';
import AssesmentListing from './pages/QuizesPages/AssesmentListing';
import Project from './pages/Project';
import Faq from './pages/FAQ';
import Blog from './pages/Blogs';
// import AddEditBlogs from './pages/Blogs/AddEditBlogs';
import BlogDetails from './pages/Blogs/Detail';
import ProjectsList from './pages/VirtualAssistasnceProject/ProjectsList';
import Skill from './pages/Project/skill';
import Budget from './pages/Project/budget';
import Describe from './pages/Project/describe';
import JobDetails from './pages/Project/JobDetails';
import Invite from './pages/InviteFolder/Invite';
import InviteDetails from './pages/InviteFolder/InviteDetails';
import AddEditProject from './pages/Project/AddEditProject';
import Contracts from './pages/InviteFolder/Invite';
import ContractsDetails from './pages/Contracts/InviteDetails';
import Contract from './pages/Contracts/Contracts';
 


const { persistor, store } = configureStore(history); 

export default () => { 
 

   
    return (<>
        <Provider store={store}>
            <PersistGate loading={'loading ...'} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Router>
                        <Switch>
                            <Route exact={true} store={store} path="/login" component={Login} />
                            <Route exact={true} store={store} path="/signup" component={SignUp} />
                            <Route exact={true} store={store} path="/forgotpassword" component={Forgotpassword} />
                            <Route exact={true} store={store} path="/resetpassword" component={Resetpassword} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/dashboard" component={Dashboard} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/profile" component={Profile} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/profile/edit" component={EditProfile} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/profile/change-password" component={ChangePassword} />

                            <Route exact={true} path="/employment" store={store} requireAuth={Auth} component={Employment} />
                            <Route exact={true} path="/employment/add" store={store} requireAuth={Auth} component={AddEditEmployment} />
                            <Route exact={true} path="/employment/edit/:id" store={store} requireAuth={Auth} component={AddEditEmployment} />
                            <Route exact={true} path="/employmentDetail/:id" store={store} requireAuth={Auth} component={EmploymentDetail} />

                            <Route exact={true} path="/education" store={store} requireAuth={Auth} component={Education} />
                            <Route exact={true} path="/education/add" store={store} requireAuth={Auth} component={AddEditEducation} />
                            <Route exact={true} path="/education/edit/:id" store={store} requireAuth={Auth} component={AddEditEducation} />
                            <Route exact={true} path="/educationDetail/:id" store={store} requireAuth={Auth} component={EducationDetail} />
                            

                            <Route exact={true} path="/skills" store={store} requireAuth={Auth} component={SkillsType} />
                            <Route exact={true} path="/skills/add" store={store} requireAuth={Auth} component={AddEditSkills} />
                            <Route exact={true} path="/skills/edit/:id" store={store} requireAuth={Auth} component={AddEditSkills} />
                            <Route exact={true} path="/skillsDetail/:id" store={store} requireAuth={Auth} component={SkillsDetail} />

                            <Route exact={true} requireAuth={Auth} store={store} path="/portfolio" component={Portfolio} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/resume" component={Resume} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/detailcompany" component={CompanyDetail} />

                            <Route exact={true} requireAuth={Auth} store={store} path="/notfound" component={NotfoundPage} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/virtual" component={Virtual} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/virtualdetails/:id" component={VirtualDetail} />

                            <Route exact={true} requireAuth={Auth} store={store} path="/faq" component={Faq} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/quiz" component={Quiz} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/assessments" component={AssesmentListing} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/project" component={Project} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/addeditproject/:id?"  component={AddEditProject} />

                            <Route exact={true} path="/blogs" store={store} requireAuth={Auth} component={Blog} />
                            {/* <Route exact={true} path="/AddEditBlogs" requireAuth={Auth} store={store} component={AddEditBlogs}/>
                            <Route exact={true} path="/AddEditBlogs/:id?" requireAuth={Auth} store={store} component={AddEditBlogs}/> */}
                            <Route exact={true} path="/blogsDetails/:id?" requireAuth={Auth} store={store} component={BlogDetails}/>

                            {/*  Routes for Virtual Assistance Project  */}
                            <Route exact={true} path="/projectslist" requireAuth={Auth} store={store} component={ProjectsList}/>
                            <Route exact={true} path="/skill" requireAuth={Auth} store={store} component={Skill}/>
                            <Route exact={true} path="/budget" requireAuth={Auth} store={store} component={Budget}/>
                            <Route exact={true} path="/describe" requireAuth={Auth} store={store} component={Describe}/>
                            <Route exact={true} path="/jobdetails" requireAuth={Auth} store={store} component={JobDetails}/>
                  {/*  Routes for Invites */}
                  <Route exact={true} path="/invites" requireAuth={Auth} store={store} component={Invite}/>
                  <Route exact={true} path="/invite/:id?" requireAuth={Auth} store={store} component={InviteDetails}/>

                  <Route exact={true} path="/contracts" requireAuth={Auth} store={store} component={Contract}/>
                  <Route exact={true} path="/contracts/:id?" requireAuth={Auth} store={store} component={ContractsDetails}/>
                            
                            {/* <Route exact={true} requireAuth={Auth} store={store} path="/dashboard/orders" component={Orders} />
                            <Route exact={true} requireAuth={Auth} store={store} path="/dashboard/orderdetail/:id" component={OrderDetail} />
                            
                            <Route exact={true} store={store} path="/products" component={Products} />
                            <Route exact={true} store={store} path="/calendar" component={Calendar} />
                            <Route exact={true} store={store} path="/activeplan" component={ActivePlan} />
                            <Route exact={true} store={store} path="/payment" component={Payment} />
                            <Route exact={true} store={store} path="/product/detail/:id" component={ProductDetail} />
                            <Route exact={true} store={store} path="/company" component={CompanyDetails} />
                            <Route exact={true} store={store} path="/booking" component={BookingSystem} />
                            <Route exact={true} store={store} path="/booking/add" component={AddEditBooking} />
                         
                         

                            <Route exact={true} store={store} path="/saledata" component={SalesData} />

                            <Route exact={true} path="/users" store={store} requireAuth={Auth} component={Users} />
                            <Route exact={true} path="/users/add" store={store} requireAuth={Auth} component={AddEditUser} />
                            <Route exact={true} path="/users/edit/:id" store={store} requireAuth={Auth} component={AddEditUser} />
                            <Route exact={true} path="/userDetail/:id" store={store} requireAuth={Auth} component={UserDetail} />

                       


                            <Route exact={true} store={store} path="/roles" component={Roles} />
                            <Route exact={true} store={store} path="/roles/add" component={AddEditRole} />
                            <Route exact={true} store={store} path="/roles/edit/:id" component={AddEditRole} />

                            <Route exact={true} path="/productdashboard" store={store} requireAuth={Auth} component={Productdashboard} />
                            <Route exact={true} path="/productData" store={store} requireAuth={Auth} component={ProductData} />
                            <Route exact={true} path="/buyExtraProducts" store={store} requireAuth={Auth} component={BuyExtraProdcts} />
                            <Route exact={true} path="/applyproduct/:id" store={store} requireAuth={Auth} component={ApplyProduct} />
                        
                            <Route exact={true} path="/customerData" store={store} requireAuth={Auth} component={CustomerData} />
                            <Route exact={true} path="/customers" store={store} requireAuth={Auth} component={Customers} />
                            <Route exact={true} path="/databaseReseller" store={store} requireAuth={Auth} component={ResellerDatabase} />
                            <Route exact={true} path="/databaseReseller/edit/:id" store={store} requireAuth={Auth} component={AddEditReseller} />
                            <Route exact={true} path="/databaseReseller/view/:id" store={store} requireAuth={Auth} component={ViewReseller} />
                            <Route exact={true} path="/contractSign" store={store} requireAuth={Auth} component={SendContract} /> */}
                            
                    
                            {/* <Route exact={true} path="/reviews" store={store} requireAuth={Auth} component={Reviews} />
                            <Route exact={true} path="/reviewDashboard" store={store} requireAuth={Auth} component={ReviewDashboard} />
                            <Route exact={true} path="/review" store={store} requireAuth={Auth} component={Googlereview} />
                            <Route exact={true} path="/reviewStep" store={store} requireAuth={Auth} component={Googlereviewsteps} />
                            <Route exact={true} path="/step" store={store} requireAuth={Auth} component={step2} />
                            <Route exact={true} path="/sitereview" store={store} requireAuth={Auth} component={sitereview} />
                            <Route exact={true} path="/improvecontact" store={store} requireAuth={Auth} component={improveContact} />
                            <Route exact={true} path="/reviewpage" store={store} requireAuth={Auth} component={ReviewPage} />
                            <Route exact={true} path="/reviewdetail/:id" store={store} requireAuth={Auth} component={ReviewDetail} /> */}

                            {/* <Route exact={true} path="/crm" store={store} requireAuth={Auth} component={CRM} />
                            <Route exact={true} path="/crm/add" store={store} requireAuth={Auth} component={AddEditCRM} />
                            <Route exact={true} path="/crm/edit/:id" store={store} requireAuth={Auth} component={AddEditCRM} />

                            <Route exact={true} path="/pos" store={store} requireAuth={Auth} component={POS} />
                            <Route exact={true} path="/pos/orders" store={store} requireAuth={Auth} component={Orders} />
                            <Route exact={true} store={store} path="/pos/orders/orderdetail/:id" component={OrderDetail} />
                            <Route exact={true} path="/pos/add" store={store} requireAuth={Auth} component={AddEditPOS} />
                            <Route exact={true} path="/pos/edit/:id" store={store} requireAuth={Auth} component={AddEditPOS} />
                            <Route exact={true} path="/sales" store={store} requireAuth={Auth} component={Salesdashboard} />
                            <Route exact={true} path="/marketing" store={store} requireAuth={Auth} component={Marketingdashboard} />
                            <Route exact={true} path="/financial" store={store} requireAuth={Auth} component={Financialdashboard} /> */}
                            {/* <Route exact={true} path="/reseller" store={store} requireAuth={Auth} component={Resellerdashboard} /> */}
                             {/* Last Minute Pricing */}
                             {/* <Route exact={true} path="/dynamicprice/lastminutefixeddates/add" requireAuth={Auth} component={AddEditLastMinuteFixedDates} />
                            <Route exact={true} path="/dynamicprice/lastminutefixeddates/edit/:id/:copy" requireAuth={Auth} component={AddEditLastMinuteFixedDates} />
                            <Route exact={true} path="/dynamicprice/lastminuteinventory/add" requireAuth={Auth} component={AddEditLastMinuteInventory} />
                            <Route exact={true} path="/dynamicprice/lastminuteinventory/edit/:id/:copy" requireAuth={Auth} component={AddEditLastMinuteInventory} /> */}
                            {/* Early Bird Pricing */}
                            {/* <Route exact={true} path="/dynamicprice/earlybirdcustomdates/add" requireAuth={Auth} component={AddEditEarlyBirdPricing} />
                            <Route exact={true} path="/dynamicprice/earlybirdcustomdates/edit/:id/:copy" requireAuth={Auth} component={AddEditEarlyBirdPricing} />
                            <Route exact={true} path="/dynamicprice/earlybirdtimeframes/add" requireAuth={Auth} component={AddEditEarlyBirdTimeFrames} />
                            <Route exact={true} path="/dynamicprice/earlybirdtimeframes/edit/:id/:copy" requireAuth={Auth} component={AddEditEarlyBirdTimeFrames} />
                            <Route exact={true} path="/dynamicprice/earlybirdinventory/add" requireAuth={Auth} component={AddEditEarlyBirdInventory} />
                            <Route exact={true} path="/dynamicprice/earlybirdinventory/edit/:id/:copy" requireAuth={Auth} component={AddEditEarlyBirdInventory} /> */}
                            {/* Dynamic Price */}
                            {/* <Route exact={true} path="/dynamicpricelist" store={store} requireAuth={Auth} component={DynamicPrice} />
                            <Route exact={true} path="/dynamicprice/add" store={store} requireAuth={Auth} component={AddEditPrice} />
                            <Route exact={true} path="/dynamicprice/:type" store={store} requireAuth={Auth} component={DynamicPrice} />
                            <Route exact={true} path="/dynamicprice/:type/add" store={store} requireAuth={Auth} component={AddEditPrice} />
                            <Route exact={true} path="/dynamicprice/:type/edit/:id/:copy" store={store} requireAuth={Auth} component={AddEditPrice} /> */}
                            {/* Plans */}
                            {/* <Route exact={true} path="/plans" component={Plans} /> */}
                            {/* Cards */}
                            {/* <Route exact={true} store={store} path="/card" component={Cards} />
                            <Route exact={true} store={store} path="/card/add" component={AddEditCards} />
                            <Route exact={true} store={store} path="/card/edit/:id" component={AddEditCards} />
                        
                            <Route exact={true} path="/detailcards/:id/:intervalcount/:currencyiso" component={CardsDetail} />
                            <Route exact={true} path="/home" store={store} component={Home} />
                            <Route exact={true} path="/thanku" store={store} component={Thanku} />
                            <Route exact={true} path="/allreview" store={store} component={All_review} /> */}
                            <Route exact={true} path="/home" store={store} component={Home} />
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                        </Switch>
                    </Router>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
        <div id="loader" className="loaderDiv d-none">
            <div>
                <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
            </div>
        </div>
 <ToastContainer position='top-right'/>
    </>
    );
};
