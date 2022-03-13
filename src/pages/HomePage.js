import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderPrimary from '../components/HeaderPrimary';
import Logo from '../components/Logo';
import RestaurantInfoLabel from '../components/RestaurantInfoLabel';
import RestaurantSearch from '../components/RestaurantSearch';
import Dashboard from '../components/Dashboard';
import LargeNotice from '../components/LargeNotice';
import LoadingSpinner from '../components/LoadingSpinner';
import MainIllustration from '../assets/MainIllustration';
import useRestaurantInfo from '../hooks/restaurant-hook';
import useReportTimestamp from '../hooks/timestamp-hook';
import AuthContext from '../auth/auth-context';

const HomePage = () => {
  const auth = useContext(AuthContext);
  const { userId } = auth;
  const {
    getReportTimestamp,
    reportTimestamp,
    isReportTimestampLoading,
  } = useReportTimestamp();

  const {
    restaurantName,
    restaurantLocation,
    isRestaurantLoading,
  } = useRestaurantInfo(userId);
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    async function getRestaurantList() {
      const responseData = await fetch('http://127.0.0.1:5000/restaurants');
      const responseJson = await responseData.json();

      setRestaurantList(responseJson.restaurants);
    }

    try {
      getRestaurantList();
    } catch (err) {
      //TODO handle errors
      console.log(err);
    }
  }, []);

  useEffect(() => {
    //Get timestamp
    if (userId) {
      getReportTimestamp(userId);
    }
  }, [userId]);

  const LoggedOutView = () => {
    return (
      <div className='container'>
        <section className='section'>
          <div className='columns is-vcentered'>
            <div className='column'>
              <Logo className='title is-1' />
              <p className='subtitle is-3 my-5'>
                Help your business turn over a new leaf.
              </p>
              <Link className='button is-primary is-large mt-3' to='/login'>
                Get Your Report
              </Link>
              <Link
                className='button is-primary is-light is-large mt-3 ml-3'
                to='/about'
              >
                Learn More
              </Link>
              <p className='subtitle is-6 mt-4'>
                Adapted from the {''}
                <a
                  href='https://www.dinegreen.com/certification-standards'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GRA Certification Standards
                </a>
              </p>
            </div>
            <div className='column'>
              <MainIllustration width={600} />
            </div>
          </div>
        </section>
        <section className='section'>
          <RestaurantSearch restaurants={restaurantList} />
        </section>
      </div>
    );
  };

  const LoggedInView = () => {
    return (
      <>
        {isReportTimestampLoading || isRestaurantLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <HeaderPrimary
              title='Dashboard'
              subtitle={
                <>
                  <RestaurantInfoLabel
                    title={restaurantName}
                    type='name'
                    className=' is-size-4 mb-2'
                  />
                  <RestaurantInfoLabel
                    title={restaurantLocation}
                    type='location'
                    className=' is-size-4'
                  />
                </>
              }
            />
            <div className='container'>
              <section className='section'>
                {!reportTimestamp ? (
                  <LargeNotice
                    title='Welcome to EcoEateries!'
                    subtitle='Track goals, see results, and share progress.'
                    buttonTitle='Get Started'
                    buttonSrc='/report/edit'
                  />
                ) : (
                  <Dashboard userId={userId} />
                )}
              </section>
            </div>
          </>
        )}
      </>
    );
  };

  return auth.isLoggedIn ? <LoggedInView /> : <LoggedOutView />;
};

export default HomePage;
