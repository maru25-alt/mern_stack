import "./App.css";
import SignUpForm from "./components/singup/Signup";
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();

  if (auth.loading || auth.loggingIn || auth.loggingOut) {
  }

  return (
    <div className="App">
      <SignUpForm />
    </div>
  );
}

export default App;
