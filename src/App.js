import "./App.css";
import SignUpForm from "./components/singup/Signup";
import Ads from "./components/ads/Ads";
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  if (auth.loading || auth.loggingIn || auth.loggingOut) {
  }

  return (
    <div className="App">
      <SignUpForm />
      <Ads />
    </div>
  );
}

export default App;
