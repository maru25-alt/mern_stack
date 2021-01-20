import Navigation from './components/navigation/Navigation'
import Footer from './components/navigation/Footer'
import Page404 from './pages/Page404';
import {routes} from './routes/routes';
import {SignedInRoutes, SignedOutRoutes} from './routes/ProtectedRoutes'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/responsive.css'
import './css/app.css'
import {selectUser} from './features/user/userSlice';
import {selectLocale} from './features/app/appSlice';
import { useSelector} from 'react-redux';
import {IntlProvider} from 'react-intl'
import {messages} from './Translation'


function App() {
  const user = useSelector(selectUser);
  const locale = useSelector(selectLocale)


  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Router>
       <ToastContainer/>
       <Navigation/>
          <div className="app__container">
            <Switch>
                {routes && routes.map( route =>
                  {
                    if(route.isLoggedIn === true){
                      return (
                         <SignedInRoutes key={route.path}  isAuth={user}  component={route.Component} path={route.path} exact={route.exact}/>
                      )
                  }
                  else if(route.isLoggedIn === false){
                    return  (
                          <SignedOutRoutes  key={route.path}isAuth={user}  component={route.Component} path={route.path} exact={route.exact}/>
                      )

                  }
                  else{
                      return(
                          <Route 
                          key={route.path}
                          path={route.path}
                          exact={route.exact}
                          component={route.Component}/>
                      )
                  }
                  }
                  )}
                  <Route path="*" component={Page404}/>
            </Switch>
           </div>
         <Footer/>
      </Router>
    </IntlProvider>
  );
}

export default App;
