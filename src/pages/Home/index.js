import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './home.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';
 import Header from '../../components/global/header';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';

const Home = () => { 
  const history=useHistory()
  const routes=useLocation();
  const pathname=routes.pathname;
 const user=useSelector(state=>state.user);
useEffect(()=>{
  if(user.role &&user.role.id == "64e83a928599356bddc2fa00"&&user.isVerifiedDocument!="accepted"){
    if(pathname=="/profile/edit")
    {
    }else{
    history.push("/profile")}
  }
  if(user.role &&user.role.id == "64e83a928599356bddc2fa00"&&user.isVerifiedDocument=="rejected"){
    if(pathname=="/profile/edit")
    {
    }else{
      // toast.error("Your account is Inactive or blocked by Admin.Please upload updated Documents");
    history.push("/profile")}
  }
  if(user.role &&user.role.id == "64e83a928599356bddc2fa00"&&user.isVerifiedDocument=="pending"){
    if(pathname=="/profile/edit")
    {
    }else{
      // toast.success("Your Account is under progress.Admin will Approve it Shortly ")
    history.push("/profile")}
  }
},[])

  return ( 
    <>
    <Header/>
   <div className='container-fluid pl-5 pr-5 mt-5'>
    <div className='row align-items-center '>
        <div className='col-md-6'>
        <div className="theMostTalentedContainer">
        <p className="theMostTalented">
          The most talented remote workers from around the world are ready to
          join your company
        </p>
      </div>
        <div className='d-flex mt-5'>
      <div className="scheduleADemoWrapper mr-2">
        <div className="scheduleADemo">Schedule a demo</div>
      </div>
      <div className="postAProjectWrapper">
        <div className="scheduleADemo">Post a project</div>
      </div>
      </div>
        </div>
        <div className='col-md-6'>
            <img src='assets/img/banner.png' className='w-100' />
        </div>
        <div className='col-md-12'>
        <div className="landingPage2Inner">
        <div className="frameParent3">
          <div className="groupParent1">
            <img className="frameItem" alt="" src="/assets/img/group-1@2x.png" />
            <div className="createAccountParent">
              <div className="logoDesign">Create Account</div>
              <div className="firstYouHave">
                First you have to create a <br />account here
              </div>
            </div>
          </div>
          <div className="groupParent1">
            <img className="frameItem" alt="" src="/assets/img/group-3@2x.png" />
            <div className="createAccountParent">
              <div className="logoDesign">{`Search work `}</div>
              <div className="searchTheBest">
                Search the best freelance <br /> work here
              </div>
            </div>
          </div>
          <div className="groupParent1">
            <img className="frameItem" alt="" src="/assets/img/group-2@2x.png" />
            <div className="createAccountParent">
              <div className="logoDesign">Save and apply</div>
              <div className="searchTheBest">
                Apply or save and start <br /> your work
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
       
    </div>
    <div className='line_bottom mt-5'>
    <div className='row'>
    <div className='col-md-6 mt-5 pt-5'>
            <img src='assets/img/project.png' className='w-100' />
        </div>
        <div className='col-md-6 mt-5 pt-5'>
        <div className="findTheBestVirtualAssistanParent">
          <div className="findTheBest">
            Find The Best Virtual Assistants Here
          </div>
          <div className="loremIpsumDolorContainer">
            <p className="Assistants">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat
              bibendum ornare urna, cursus eget convallis. Feugiat imperdiet
              posuere justo, ultrices interdum
            </p>
            <p className="Assistants"> 
              sed orci nunc, mattis. Ipsum viverra viverra neque adipiscing
              arcu, quam dictum. Dui mi viverra dui, sit accumsan, tincidunt
              massa. Dui cras magnis.
            </p>
          </div>
        </div>
       
        </div>
    </div>
    </div>
   <div className="landingPage2 mt-5 pt-5">
      {/* <img className="landingPage2Child" alt="" src="/assets/img/rectangle-4.svg" /> */}
      
      {/* <img className="image4Icon" alt="" src="/assets/img/image-4@2x.png" /> */}
      <div className="recentlyPosted">
        <div className="frameParent">
          <div className="theLatestProjectsWorkParent">
            <div className="theLatestProjects">
              The latest projects work!
            </div>
            <div className="recentlyPostedWorksContainer">
              <span>Recently Posted </span>
              <span className="works">Works</span>
            </div>
          </div>
          <img className="frameChild" alt="" src="/assets/img/group-12.svg" />
        </div>
        <div className="d-flex w-100">
          <div className='col-md-4'>
          <div className="materialUiParent">
            <img
              className="materialUiIcon"
              alt=""
              src="/assets/img/material-ui@2x.png"
            />
            <div className="logoDesignParent">
              <div className="logoDesign">Logo Design</div>
              <div className="needAProfessional">
                Need a professional logo with writing underneath for our
                jewellery company
              </div>
            </div>
            <div className="highestBid500Parent">
              <div className="highestBid500Container">
                <span>Highest bid</span> 
                <span className="span1">$500</span>
              </div> 
              <a className='text-primary apply_Now'>Apply now</a>
            </div>
          </div>
          </div>
          <div className='col-md-4'>
          <div className="materialUiParent">
            <img
              className="materialUiIcon"
              alt=""
              src="/assets/img/canva-app@2x.png"
            />
            <div className="logoDesignParent">
              <div className="logoDesign">Graphic Design</div>
              <div className="weNeedA">
                We need a graphic designer with UI/UX skills for our Furniture
                company
              </div>
            </div>
            <div className="highestBid500Parent">
              <div className="highestBid500Container1">
                <span>Highest bid </span>
                <span className="span1">$500</span>
              </div> 
              <a className='text-primary apply_Now'>Apply now</a>
            </div>
          </div>
          </div>
          <div className='col-md-4'>
          <div className="materialUiParent">
            <img
              className="materialUiIcon"
              alt=""
              src="/assets/img/account@2x.png"
            />
            <div className="logoDesignParent">
              <div className="logoDesign">Need a SEO</div>
              <div className="needASeo1">
                Need a SEO for our company who will let our company to a higher
                level
              </div>
            </div>
            <div className="highestBid500Parent">
              <div className="highestBid300Container">
                <span>Highest bid </span>
                <span className="span1">$300</span>
              </div> 
              <a className='text-primary apply_Now'>Apply now</a>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="form-row mt-5 pt-5">
        <div className="col-md-12 chooseDifferentCategoryContainer mb-5">
          <span>Choose Different </span> 
          <span className="works"> Category </span>
        </div>
        <div className='col-md-3 position-relative'>
        <img
          className="unsplashv9vii5gv8lwIcon"
          alt=""
          src="/assets/img/unsplashv9vii5gv8lw@2x.png"
        />
        <div className="graphicDesign">Graphic & Design</div>
        </div>
        <div className='col-md-3 position-relative'>
        <img
          className="unsplashgxgtqg5ul2gIcon"
          alt=""
          src="/assets/img/unsplashgxgtqg5ul2g@2x.png"
        />
        <div className="graphicDesign">Cartoon Animation</div>
        </div>
        <div className='col-md-3 position-relative'>
       
        <img
          className="unsplash15widdvl5duIcon"
          alt=""
          src="/assets/img/unsplash15widdvl5du@2x.png"
        />
          <div className="graphicDesign">Flyers & Vouchers</div>
        </div>
        <div className='col-md-3 position-relative'>
        <img
          className="unsplashs9cc2skysjmIcon"
          alt=""
          src="/assets/img/unsplashs9cc2skysjm@2x.png"
        />
        <div className="graphicDesign">Illustration</div>
        </div>
        <div className='col-md-3 position-relative'>
        <img
          className="unsplashuhtdg9eplqiIcon"
          alt=""
          src="/assets/img/unsplashuhtdg9eplqi@2x.png"
        />
               <div className="graphicDesign">Logo Design</div>
        </div>
        <div className='col-md-3 position-relative'>
        <img
          className="unsplashqnwpjzewewaIcon"
          alt=""
          src="/assets/img/unsplashqnwpjzewewa@2x.png"
        />
         <div className="graphicDesign">Social graphics</div>
        </div>
        <div className='col-md-3 position-relative'>
        <img
          className="unsplashjpd5a9MsGIcon"
          alt=""
          src="/assets/img/unsplashjpd5a9-msg@2x.png"
        />
          <div className="graphicDesign">Article writing</div>
        </div>
        <div className='col-md-3 position-relative'>
        <img
          className="unsplashvw2ou66mwbcIcon"
          alt=""
          src="/assets/img/unsplashvw2ou66mwbc@2x.png"
        />
           <div className="graphicDesign">Video Editing</div>
        </div>
       
    
        
        
      
        
 
       
      
     
      </div>
      <div className="moreCategoriesWrapper">
        <div className="scheduleADemo">More Categories</div>
      </div>
      <div className="portfolios">
        <div className="logosWebsitesBookCoversParent">
          <div
            className="theLatestProjects"
          >Logos, websites, book covers & more!</div>
          <div className="recentlyPostedWorksContainer">
            <span>Checkout The Best </span>
            <span className="works">Portfolios</span>
            <span> Here</span>
          </div>
        </div>
        <div className="groupParent">
          <div className="rectangleParent shadow">
              
            <img
              className="groupItem"
              alt=""
              src="/assets/img/rectangle-31@2x.png"
            />
            <div className="frameContainer">
              <div className="theLatestProjectsWorkParent">
                <div className="logoDesign">Bunny design</div>
                <div className="uiuxDesigner">UI/UX Designer</div>
              </div>
              <img
                className="biarrowRightIcon"
                alt=""
                src="/assets/img/biarrowright.svg"
              />
            </div>
          </div>
          <div className="rectangleParent shadow">
              
            <img
              className="groupItem"
              alt=""
              src="/assets/img/unsplash505eectw54k@2x.png"
            />
            <div className="frameDiv">
              <div className="theLatestProjectsWorkParent">
                <div className="logoDesign">Jenna Tashalo</div>
                <div className="uiuxDesigner">Graphic Designer</div>
              </div>
              <img
                className="biarrowRightIcon"
                alt=""
                src="/assets/img/biarrowright.svg"
              />
            </div>
          </div>
          <div className="rectangleParent shadow">
              
            <img
              className="groupItem"
              alt=""
              src="/assets/img/unsplash505eectw54k1@2x.png"
            />
            <div className="frameParent1">
              <div className="theLatestProjectsWorkParent">
                <div className="logoDesign">Aksara Joshi</div>
                <div className="uiuxDesigner">Graphic Designer</div>
              </div>
              <img
                className="biarrowRightIcon"
                alt=""
                src="/assets/img/biarrowright.svg"
              />
            </div>
          </div>
        </div>
       
      </div>
      
      
      
      <div className="testimonial mt-5 pt-5">
      <div className="d-flex justify-content-between align-items-center"> 
          <div className="seeWhatOthersContainer">
          <div className="testimonial4">Testimonial</div>
            <p className="theMostTalented">See What Others Have <br />to Say About Us</p>
            <p className="theMostTalented"></p>
          </div>
          <img
          className="nextPrviousButton"
          alt=""
          src="/assets/img/next-prvious-button.svg"
        />
        </div>
        <div className='d-flex m-0'>
          <div className='col-md-4'>
          <div className="testimonial3">
        <div className="text">
        <img className="quoteIcon" alt="" src="/assets/img/quote.svg" />
            <div className="loremIpsumIs">
              Lorem Ipsum is a simply dummy text of an the printing and type
              settings for has been the industry's standard dumy text the ever
              since unknown printer.
            </div>
          </div>
          <div className="d-flex pl-4 mt-3"> 
            <img className="avatarIcon" alt="" src="/assets/img/avatar.svg" />
            <div className="namedesignations ml-2">
              <div className="jhonSmith">Jhon Smith</div>
              <div className="ceoCompany">CEO | Company</div>
            </div>
          </div>
         
        </div> 
          </div>
          <div className='col-md-4'>
          <div className="testimonial3">
        <div className="text">
        <img className="quoteIcon" alt="" src="/assets/img/quote.svg" />
            <div className="loremIpsumIs">
              Lorem Ipsum is a simply dummy text of an the printing and type
              settings for has been the industry's standard dumy text the ever
              since unknown printer.
            </div>
          </div>
          <div className="d-flex pl-4 mt-3"> 
            <img className="avatarIcon" alt="" src="/assets/img/avatar.svg" />
            <div className="namedesignations ml-2">
              <div className="jhonSmith">Jhon Smith</div>
              <div className="ceoCompany">CEO | Company</div>
            </div>
          </div>
         
        </div> 
          </div>
          <div className='col-md-4'>
          <div className="testimonial3">
        <div className="text">
        <img className="quoteIcon" alt="" src="/assets/img/quote.svg" />
            <div className="loremIpsumIs">
              Lorem Ipsum is a simply dummy text of an the printing and type
              settings for has been the industry's standard dumy text the ever
              since unknown printer.
            </div>
          </div>
          <div className="d-flex pl-4 mt-3"> 
            <img className="avatarIcon" alt="" src="/assets/img/avatar.svg" />
            <div className="namedesignations ml-2">
              <div className="jhonSmith">Jhon Smith</div>
              <div className="ceoCompany">CEO | Company</div>
            </div>
          </div>
         
        </div> 
          </div>
        </div>
      
        
      </div>

     
    </div>
    </div>
    <div className='bg-green text-center p-4'>
            <h2 className='news_letter'>Newsletter Subscription</h2>
            <p>Subscribe to our newsletter to get new freelance work and projects </p>
            <input className='form-control shadow' placeholder='Enter your email address' />
            <button className='btn btn-primary Subscribe'>Subscribe</button>
      </div>

      <div className="footer m-0 row mt-4 pb-5"> 
      <div className="text6 col-md-4 pl-5">
          <img
          className="myvirtualpalLogo151Icon1"
          alt=""
          src="/assets/img/myvirtualpallogo15-11@2x.png"
        />
            <div className="inTheFastPacedContainer">
              <p className="mb-0">
                In the fast-paced world of modern technology,
              </p>
              <p className="">
                many leadership executives and organizations understand that
                building.
              </p>
            </div>
            <div className="about mt-3">
          <div className="socialIcon mb-3">
            <div className="twitter">
              <div className="iconBorder">
              <div className="twitter1"></div>
              </div>
             
            </div>
            <div className="github">
              <div className="iconBorder">
              <div className="twitter1"></div>
              </div>
             
            </div>
            <div className="dribbble">
              <div className="iconBorder2">
              <div className="dribbble1"></div>
              </div>
      
            </div>
            <div className="fb">
              <div className="iconBorder">
              <div className="fb1"></div>
              </div>
         
            </div>
          </div>
       
        </div>
          </div>
      <div className="text6 col-md-2">
        <div className="widgetTitle1">
            <div className="quickLinks">Quick Links</div>
          </div>
          <div className="text5">
            <div className="learnersLeadershipPartnersContainer">
              <p className="leadership">Career</p>
              <p className="leadership">About Us</p>
              <p className="leadership">Contact</p>
              <p className="leadership">Privacy Poilcy</p>
            </div>
          </div>
         
        </div>
        <div className="text6 col-md-2">
        <div className="widgetTitle1">
            <div className="quickLinks">Community</div>
          </div>
          <div className="text4">
            <div className="learnersLeadershipPartnersContainer">
              <p className="leadership">Learners</p>
              <p className="leadership">Leadership</p>
              <p className="leadership">Partners</p>
              <p className="leadership">Developers</p>
            </div>
          </div>
        
        </div>
        <div className="text6 col-md-4">
        <div className="widgetTitle1">
            <div className="jhonSmith">Newsletter</div>
          </div>
          <div className="text3">
            <div className="signUpAnd">
              Sign up and receive the latest tips via email.
            </div>
          </div>
          <div className="inputField">
            <div className="border">
            <img className="mailIcon mr-2" alt="" src="/assets/img/mail.svg" />
            <div className="enterYourMail">Enter Your Mail</div>
      
            </div>
         
          </div>
          <div className="subscribeButton mt-3">
            <div className="btnBg">
          
            <div className="subscribeNow">Subscribe Now</div>
            <img
              className="paperPlane1Icon ml-2"
              alt=""
              src="/assets/img/paperplane-1.svg"
            />
            </div>
          
          </div>
        
        
        
        </div>
      
       
       
        
        
        
      </div>
      <div className="footerBottom">
      <div className="footerBottomChild" />
          <div className="allRightsReserved">
            © 2021 All Rights Reserved
          </div>
        
        </div>
      {/* <div className="lineDiv" /> */}
    </> 
  );
};

export default Home;
