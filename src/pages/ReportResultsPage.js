import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faLink } from '@fortawesome/free-solid-svg-icons';

import HeaderPrimary from '../components/HeaderPrimary';
import ScoreTotalSection from '../components/ScoreTotalBanner';
import ScoreBreakdownGrid from '../components/ScoreBreakownGrid';
import BadgeCodeSnippet from '../components/BadgeCodeSnippet';
import LargeNotice from '../components/LargeNotice';
import BadgePreview from '../components/BadgePreview';
import LoadingSpinner from '../components/LoadingSpinner';
import useRestaurantInfo from '../hooks/restaurant-hook';
import useReportInfo from '../hooks/report-hook';
import AuthContext from '../auth/auth-context';
import useReportTimestamp from '../hooks/timestamp-hook';

const ReportResultsPage = () => {
  const auth = useContext(AuthContext);
  const { userId } = auth;

  const {
    getReportTimestamp,
    reportTimestamp,
    isReportTimestampLoading,
  } = useReportTimestamp();

  const defaultCopyButtonText = 'Copy Report Link';
  const [copyButtonText, setCopyButtonText] = useState(defaultCopyButtonText);

  const { restaurantName, isRestaurantLoading } = useRestaurantInfo(userId);
  const { categories, restaurantScore, isReportLoading } = useReportInfo(
    userId
  );

  const reportViewUrl = `${window.location.protocol}//${window.location.host}/${userId}/report`;
  const codeSnippet = `<iframe src='${reportViewUrl}?view=embedded' height='335' width='300' title='EcoEateries ${restaurantName} Report'></iframe>`;

  useEffect(() => {
    //Get timestamp
    if (userId) {
      getReportTimestamp(userId);
    }
  }, [userId]);

  const handleCopyClick = () => {
    var textArea = document.createElement('textarea');
    textArea.value = reportViewUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopyButtonText('Copied!');
    setTimeout(() => {
      setCopyButtonText(defaultCopyButtonText);
    }, 1500);
  };

  if (isReportLoading || isRestaurantLoading || isReportTimestampLoading) {
    return <LoadingSpinner />;
  }

  if (!reportTimestamp) {
    return (
      <>
        <HeaderPrimary
          title='Your Results'
          subtitle='View and share your latest results.'
        />
        <div className='container'>
          <LargeNotice
            title={`No report found (yet)!`}
            subtitle='Update your progress and generate a report to view and share your results.'
            buttonTitle='Update Progress'
            buttonSrc='/report/edit'
          />
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderPrimary
        title='Your Results'
        subtitle='View your most recent results and share them.'
      />
      <div className='container'>
        <section className='section'>
          <h2 className='title is-3'>1. Review</h2>
          <h3 className='title is-4'>Total Score</h3>
          <p className='is-size-5 mb-4'>
            Your total score is the average of all category scores.
          </p>
          <ScoreTotalSection
            score={restaurantScore}
            restaurantName={restaurantName}
          />
          <h3 className='title is-4'>Score Breakdown</h3>
          <p className='is-size-5 mb-4'>
            These are the individual scores for each category.
          </p>
          <ScoreBreakdownGrid categories={categories} />
        </section>
        <hr />
        <section className='section'>
          <div className='columns is-vcentered'>
            <div className='column'>
              <h2 className='title is-3'>2. Share</h2>

              <h3 className='title is-4'>Share Direct Link</h3>
              <button
                className='button is-info is-light mb-5 mr-2 is-medium'
                onClick={handleCopyClick}
                style={{ width: '250px' }}
              >
                <FontAwesomeIcon icon={faCopy} className='mr-3' />
                {copyButtonText}
              </button>
              <a
                href={reportViewUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='button is-info is-inverted mb-5 is-medium'
                style={{ width: '180px' }}
              >
                <FontAwesomeIcon icon={faLink} className='mr-3' />
                Go to Link
              </a>
              <h3 className='title is-4'>Embed in Website</h3>
              <p className='is-size-5 mb-4'>
                Add this code snippet to your website's code, between the{' '}
                {'<body></body>'} tags.
              </p>
              <BadgeCodeSnippet codeSnippet={codeSnippet} />
            </div>
            <div className='column is-one-third'>
              <h4 className='title is-5'>Badge Preview</h4>
              <BadgePreview codeSnippet={codeSnippet} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReportResultsPage;
