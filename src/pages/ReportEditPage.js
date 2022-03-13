import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import HeaderPrimary from '../components/HeaderPrimary';
import BoardColumn from '../components/BoardColumn';
import BoardCard from '../components/BoardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useReportTimestamp from '../hooks/timestamp-hook';
import AuthContext from '../auth/auth-context';

const ReportEditPage = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { userId } = auth;
  const {
    getReportTimestamp,
    updateReportTimestamp,
    reportTimestamp,
    isReportTimestampLoading,
  } = useReportTimestamp();

  const [goalList, setGoalList] = useState([]);

  useEffect(() => {
    //Get Goals
    const url = new URL('http://127.0.0.1:5000/user/goals');
    const params = { userId: userId };

    url.search = new URLSearchParams(params).toString();

    async function getGoalList() {
      const responseData = await fetch(url);
      const responseJson = await responseData.json();

      setGoalList((goalList) => [...goalList, ...responseJson.goalList]);
    }
    try {
      getGoalList();
    } catch (err) {
      //TODO handle errors
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    //Get timestamp
    if (userId) {
      getReportTimestamp(userId);
    }
  }, [userId]);

  const renderGoalCard = (goal) => {
    const { goalId, goalName, goalCategory } = goal;
    return (
      <BoardCard
        key={goalId}
        goalId={goalId}
        goalName={goalName}
        goalCategory={goalCategory}
      />
    );
  };

  const updateGoalStatus = async (goalId, colId) => {
    const parsedGoalId = parseInt(goalId);

    const goalRequest = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        goalId: parsedGoalId,
        newStatus: colId,
      }),
    };

    try {
      await fetch('http://127.0.0.1:5000/user/goals', goalRequest);
    } catch (err) {
      //TODO handle error
      console.log(err);
      return;
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    updateReportTimestamp(userId);
    history.push('/report/results');
  };

  if (isReportTimestampLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <HeaderPrimary
        title={
          !!reportTimestamp ? 'Update Your Progress' : 'Start Tracking'
        }
        subtitle={
          !!reportTimestamp
            ? `Report Last Generated: ${reportTimestamp}`
            : 'Evaluate your current progress and start working towards your goals.'
        }
      />
      <div className='container'>
        <section className='section'>
          <div className='columns is-centered is-vcentered my-3'>
            <div className='column is-half has-text-centered'>
              <div className='subtitle is-3'>Ready?</div>
              <button
                className='button has-text-weight-semibold is-primary is-large mt-1'
                onClick={handleReportSubmit}
              >
                Generate New Report
              </button>
            </div>
          </div>
        </section>
        <section className='section pt-2'>
          <div className='columns'>
            <BoardColumn
              className='column'
              title='Not Started'
              id='0.0'
              updateGoalStatus={updateGoalStatus}
            >
              {goalList
                .filter((goal) => goal.goalStatus === '0.0')
                .map((goal) => renderGoalCard(goal))}
            </BoardColumn>
            <BoardColumn
              title='In Progress'
              id='0.5'
              updateGoalStatus={updateGoalStatus}
            >
              {goalList
                .filter((goal) => goal.goalStatus === '0.5')
                .map((goal) => renderGoalCard(goal))}
            </BoardColumn>
            <BoardColumn
              title='Done'
              id='1.0'
              updateGoalStatus={updateGoalStatus}
            >
              {goalList
                .filter((goal) => goal.goalStatus === '1.0')
                .map((goal) => renderGoalCard(goal))}
            </BoardColumn>
          </div>
        </section>
      </div>
    </>
  );
};

export default ReportEditPage;
