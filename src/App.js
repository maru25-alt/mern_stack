import "./App.css";
import SignUpForm from "./components/signup/Signup";
import Ads from "./components/ads/Ads";
import useAuth from "./hooks/useAuth";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const auth = useAuth();

  if (auth.loading || auth.loggingIn || auth.loggingOut) {
    return (
      <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="App">
      <SignUpForm />
      <Ads />
    </div>
  );
}

export default App;
