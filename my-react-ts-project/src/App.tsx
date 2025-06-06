import React, { useState, lazy, Suspense } from "react";
import EmailForm from "./components/EmailForm";
import "./App.css";

// Lazy load the heavy component
const HeavyDataComponent = lazy(
  () => import("./components/HeavyDataComponent")
);

const App: React.FC = () => {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);

  const handleLoadHeavyComponent = () => {
    setShowHeavyComponent(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TypeScript React Demo</h1>
        <p>Features: Lazy Loading, Transitions, useId Hook</p>
      </header>

      <main className="app-main">
        <section className="load-section">
          <h2>Lazy Loading Demo</h2>
          <button
            className="load-button"
            onClick={handleLoadHeavyComponent}
            disabled={showHeavyComponent}
          >
            {showHeavyComponent ? "Component Loaded" : "Load Heavy Component"}
          </button>

          {showHeavyComponent && (
            <Suspense
              fallback={
                <div className="loading">Loading heavy component...</div>
              }
            >
              <HeavyDataComponent />
            </Suspense>
          )}
        </section>

        <section className="forms-section">
          <h2>Email Forms with useId()</h2>

          <div className="forms-container">
            <div className="form-wrapper">
              <h3>Newsletter Signup</h3>
              <EmailForm placeholder="Enter your email for newsletter" />
            </div>

            <div className="form-wrapper">
              <h3>Contact Form</h3>
              <EmailForm placeholder="Enter your contact email" />
            </div>

            <div className="form-wrapper">
              <h3>Support Request</h3>
              <EmailForm placeholder="Enter your email for support" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
