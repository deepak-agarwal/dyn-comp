import React, { useState } from 'react'
import './style.css'
import ErrorBoundary from '../errorBoundary';

function MyTabsComponent({ code, children}) {
  const [activeTab, setActiveTab] = useState("view");
const [hasError, setHasError] = useState(false);
  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

   const handleViewError = () => {
     // Set hasError to true to indicate that an error occurred in the View tab
     setHasError(true);
     handleTabChange("code");
   };

  return (
    <div className="container">
      <div className="tabs">
        {!hasError && (
          <div
            className={`tab ${activeTab === "view" ? "active" : ""}`}
            onClick={() => handleTabChange("view")}
          >
            View
          </div>
        )}
        <div
          className={`tab ${activeTab === "code" ? "active" : ""}`}
          onClick={() => handleTabChange("code")}
        >
          Code
        </div>
      </div>

      <div
        className={`content ${
          activeTab === "view" && !hasError ? "active" : ""
        }`}
      >
        <div className="space-y-2">
          <div className="content-container">
            {hasError ? null : (
              <ErrorBoundary onError={handleViewError}>
                {children}
              </ErrorBoundary>
            )}
          </div>
        </div>
      </div>

      <div className={`content ${activeTab === "code" ? "active" : ""}`}>
        <div className="space-y-2">
          <pre className="content-container overflow-auto">{code}</pre>
        </div>
      </div>
    </div>
  );
}

export default MyTabsComponent
