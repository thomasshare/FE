import React from 'react';

// 리액트에서는 페이지간에 이동을 할때 react-router-dom을 이용함
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

/* CORS(closs origin resources sharering) 정책을 해결하기 위하여 packagge.json에 "http-proxy-middleware": "^1.0.4" 미들웨어를 설치 함 */
// https://create-react-app.dev/docs/proxying-api-requests-in-development 참조
 
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    // 아래 예제 임
    // https://reacttraining.com/react-router/web/example/basic
    <Router>
{/* 
      <div>
      // 화면에 나타낼 메뉴 링크들
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr /> */}

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        {/* 실제로 서버에서 라우팅 처리를 하는곳 */}
        {/* exact prop을 붙여주는 이유는 리액트 Path와 location.pathname의 경로가 완전히 일치해야만 라우트 되도록 하기 위하여 붙여줌 */}
        <Switch>
          <Route exact path="/" component={ Auth(LandingPage, true) } />  {/* Auth HOC(higherOrderComponent)를 이용하여 component를 감싸 줌 */}
            {/* <LandingPage /> */}
          {/* </Route> */}
          <Route exact path="/login" component={ Auth(LoginPage, false) } />
            {/* <LoginPage /> */}
          {/* </Route> */}
          <Route exact path="/register" component={ Auth(RegisterPage, false) } />
            {/* <RegisterPage /> */}
          {/* </Route> */}
        </Switch>
      {/* </div> */}
    </Router>



    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.<br></br>
    //       hello
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

// 보여줄 페이지 컴포넌트로 대체?
// function Home() {
//   return (
//     <div>
//       <h2>Home 페이지</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About 페이지</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard 페이지</h2>
//     </div>
//   );
// }

export default App;
