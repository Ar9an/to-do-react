import { useState } from "react";
import { FormProvider } from "./context/FormContext";
import FormPage from "./pages/FormPage";
import SubmitPage from "./pages/SubmitPage";
import "./styles.css";

const App = () => {
  const [page, setPage] = useState("form");

  const navigate = (target) => setPage(target);

  return (
    <FormProvider>
      <div className="app">
        {/* Nav */}
        <nav className="navbar">
          <div className="nav-logo">
            <div className="logo-dot" />
            <span>FormFlow</span>
          </div>
          <div className="nav-steps">
            <button
              className={`nav-step ${page === "form" ? "active" : ""}`}
              onClick={() => navigate("form")}
            >
              <span className="step-num">1</span>
              <span>Fill Form</span>
            </button>
            <div className="step-divider" />
            <button
              className={`nav-step ${page === "submit" ? "active" : ""}`}
              onClick={() => navigate("submit")}
            >
              <span className="step-num">2</span>
              <span>Submit</span>
            </button>
          </div>
        </nav>

        {/* Pages */}
        <main className="main">
          {page === "form" ? (
            <FormPage onNavigate={navigate} />
          ) : (
            <SubmitPage onNavigate={navigate} />
          )}
        </main>
      </div>
    </FormProvider>
  );
};

export default App;
