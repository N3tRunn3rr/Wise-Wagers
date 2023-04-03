import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        log in or go to the home page to sign up!
      </h4>
    );
  }

    return (
        <div className="container">
          <div className="main-content">
            <div className="my-bets-container box">
              <h2>My Bets</h2>
              <ul>
                <li>Team A to win the Super Bowl</li>
                <li>Player B to score the first goal in the soccer match</li>
                <li>Team C to win the World Series</li>
              </ul>
            </div>
            <div className="signup-container box">
              <h1 className="title">Parlay Perfecter</h1>
              <p className="description">Find the perfect parlay for you!</p>
            </div>
            <div className="info-board-container box">
              <h2>Info Board</h2>
              <ul>
                <li>Latest news: Team X has signed a new star player</li>
                <li>Upcoming events: NBA playoffs start next week</li>
                <li>Statistics: Team Y has the best record in the league</li>
              </ul>
            </div>
          </div>
        </div>
    );
  };

export default Profile;