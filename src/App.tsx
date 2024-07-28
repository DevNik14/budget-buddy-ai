import { app, auth, createUserWithEmailAndPassword } from "./config/firebase";
import RegisterFormPage from "./pages/Login";

function App() {
  return (
    <>
      <RegisterFormPage />
      <footer className="absolute bottom-0 text-center w-full">
        Built with &hearts; by{" "}
        <a href="https://github.com/DevNik14" target="_blank">
          Nikolay Kyurchiyski
        </a>
      </footer>
    </>
  );
}

export default App;
