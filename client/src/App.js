import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
// import PredictorPicker from './pages/PredictorPicker';


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
      <Navbar />
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/profile' element={<Profile />} />
              {/* <Route path='/predictorpicker' element={<PredictorPicker />} /> */}
          </Routes>
        {/* <Contact /> */}
      </>
    </ApolloProvider>
  )
}

export default App;
