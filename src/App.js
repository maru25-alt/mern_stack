import "./App.css";
<<<<<<< HEAD
import SignUpForm from "./components/singup/Signup";
import Ads from "./components/ads/Ads";
=======
>>>>>>> f5324eb... set commit for sign up
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
