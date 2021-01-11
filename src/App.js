import "./App.css";
//import SignUpForm from "./components/signup/Signup";
//import Ads from "./components/ads/Ads";
//import useAuth from "./hooks/useAuth";
//import Spinner from "react-bootstrap/Spinner";
import Navigation from './components/navigation/Navigation'
import Footer from './components/navigation/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Page404 from './pages/Page404';
import {routes} from './routes/routes'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
  //const auth = useAuth();

  // if (auth.loading || auth.loggingIn || auth.loggingOut) {
  //   return (
  //     <Spinner animation="grow" role="status">
  //       <span className="sr-only">Loading...</span>
  //     </Spinner>
  //   );
  // }

  return (
    <div className="App">
      <Navigation/>
      <div className="app__container">
      <Router>
            <Switch>
                {routes && routes.map( route =>   
                  <Route 
                    key={route.path} 
                    path={route.path} 
                    exact={route.exact} 
                    component={route.Component}
                  />)}
                  <Route path="*" component={Page404}/>
            </Switch>
        </Router>
      </div>
      {/* <SignUpForm /> */}
      {/* <SignUpForm />
      <Ads /> */}
      <Footer/>
    </div>
  );
}

export default App;
