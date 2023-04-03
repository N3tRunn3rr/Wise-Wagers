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
            <h1 className="title">Wise Wager</h1>
            <p className="description">API for finance</p>
            <Link to="/finance" className="signup-btn">Finance</Link>
          </div>
        </div>
      </div>
  );
}

export default Home;

