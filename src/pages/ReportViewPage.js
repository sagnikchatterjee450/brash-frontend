import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import HeaderSecondary from '../components/HeaderSecondary';
import RestaurantInfoLabel from '../components/RestaurantInfoLabel';
import ScoreTotalSection from '../components/ScoreTotalBanner';
import ScoreBreakdownGrid from '../components/ScoreBreakownGrid';
import PageNotFound from '../components/PageNotFound';
import LoadingSpinner from '../components/LoadingSpinner';
import useRestaurantInfo from '../hooks/restaurant-hook';
import useReportTimestamp from '../hooks/timestamp-hook';
import useReportInfo from '../hooks/report-hook';
import AuthContext from '../auth/auth-context';
import LargeNotice from '../components/LargeNotice';

const ReportViewPage = () => {
  const auth = useContext(AuthContext);
  const [userId, setUserId] = useState(useParams().userId);

  const queryParams = useLocation().search;
  const isEmbedded = queryParams.includes('view=embedded');
  const urlNoParams = window.location.href.split('?')[0];

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
  const { categories, restaurantScore, isReportLoading } = useReportInfo(
    userId
  );

  useEffect(() => {
    const url = new URL('http://127.0.0.1:5000/user/exists');
    const params = { userId: userId };

    url.search = new URLSearchParams(params).toString();

    async function getUser() {
      const responseData = await fetch(url);
      const responseJson = await responseData.json();

      if (responseJson.exists === 'true') {
        setUserId(userId);
        getReportTimestamp(userId);
      } else {
        setUserId(null);
      }
    }

    try {
      getUser();
    } catch (err) {
      //TODO handle errors
      console.log(err);
    }
  }, [userId]);

  if (!userId) {
    return <PageNotFound />;
  }

  if (isEmbedded) {
    return (
      <div className='has-text-centered'>
        <ScoreTotalSection score={restaurantScore} small />
        <a
          href={urlNoParams}
          target='_blank'
          rel='noopener noreferrer'
          className='button is-primary'
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} className='mr-2' />
          View Full Report
        </a>
      </div>
    );
  }

  if (isReportLoading || isReportTimestampLoading || isRestaurantLoading) {
    return <LoadingSpinner />;
  }

  const FullReportView = () => {
    if (!reportTimestamp) {
      const sameUser = auth.userId == userId;
      return (
        <>
          {sameUser ? (
            <LargeNotice
              title='No report found (yet)!'
              subtitle={
                sameUser
                  ? 'Start by tracking your progress to generate your report.'
                  : `Are you ${restaurantName}? Login to get and share your report.`
              }
              buttonTitle='Update Progress'
              buttonSrc='/report/edit'
            />
          ) : (
            <LargeNotice
              title='No report found (yet)!'
              subtitle={`Are you ${restaurantName}? Login to share your results.`}
              buttonTitle='Login'
              buttonSrc='/login'
            />
          )}
        </>
      );
    }

    return (
      <>
        <section className='section'>
          <ScoreTotalSection
            score={restaurantScore}
            restaurantName={restaurantName}
          />
        </section>
        <hr />
        <section className='section'>
          <ScoreBreakdownGrid categories={categories} />
        </section>
      </>
    );
  };

  return (
    <>
      <HeaderSecondary
        title='EcoEateries Report'
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
        <FullReportView />
      </div>
    </>
  );
};

export default ReportViewPage;
