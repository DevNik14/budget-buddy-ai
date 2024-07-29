import { app, auth, createUserWithEmailAndPassword } from "./config/firebase";
import { Routes, Route } from "react-router-dom";
import RegisterFormPage from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<h2>Login Page</h2>} />
      </Routes>
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
