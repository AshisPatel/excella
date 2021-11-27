import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import EisenHowerMatrix from './pages/EisenhowerMatrix';
import JobCRM from './pages/JobCRM';
import PomodoroTimer from './pages/PomodoroTimer';
import Nav from './components/Nav';
import SideNav from "./components/SideNav";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Job from "./pages/Job";
import { useSelector } from "react-redux";

// create link to graphql server at its endpoint in our server-side code
const httpLink = createHttpLink({
  uri: '/graphql'
});
// create an authentication path to validate whether or not a token exists on all API requests
// skip first parameter with _
const authLink = setContext((_, { headers }) => {
  // Access token in localStorage
  const token = localStorage.getItem('id_token');
  // should the token exist, pass in all other headers along with authorization header containing token
  return {
    headers: {
      ...headers,
      authorizaton: token ? `Bearer ${token}` : ''
    }
  };
});

// create connection to API endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



function App() {

  // initialize visibility of signup/login modal
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // delete once authentication exists 
  const loggedIn = useSelector(state => state.loggedIn);

  return (
    <ApolloProvider client={client}>
      <div className="content">
        {loggedIn && <SideNav />}
        {showSignup && <SignupModal setShowSignup={setShowSignup} setShowLogin={setShowLogin} />}
        {showLogin && <LoginModal setShowSignup={setShowSignup} setShowLogin={setShowLogin} />}
        <Nav
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EisenhowerMatrix" element={<EisenHowerMatrix />} />
          <Route path="/JobCRM" element={<JobCRM />} />
          <Route path="/JobCRM/:_id" element={<Job />} />
          <Route path="/PomodoroTimer" element={<PomodoroTimer />} />
        </Routes>

      </div>
    </ApolloProvider>
  );
}

export default App;
