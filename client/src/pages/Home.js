import { Link } from 'react-router-dom';

function Home() {
  return (
      <div className="container">
        <div className="main-content">
          <div className="signup-container box">
            <h1 className='title'>Sports API</h1>
            <p className='description'>API for sports data</p>
            <Link to='/sports' className='signup-btn'>Sports</Link>
          </div>
          <div className="signup-container box">
            <h1 className="title">Parlay Perfecter</h1>
            <p className="description">Learn how to be a wise wager!</p>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        </div>
      </div>
  );
}

export default Home;

