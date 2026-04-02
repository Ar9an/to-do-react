import { useState } from "react";
import { useForm } from "../context/FormContext";

const LABELS = {
  fullName: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  role: "Role / Position",
  experience: "Experience Level",
  country: "Country",
  message: "Message",
};

const ROLE_MAP = {
  developer: "Developer",
  designer: "Designer",
  manager: "Product Manager",
  analyst: "Data Analyst",
  devops: "DevOps Engineer",
  other: "Other",
};

const EXP_MAP = {
  junior: "Junior (0–2 yrs)",
  mid: "Mid-level (2–5 yrs)",
  senior: "Senior (5–10 yrs)",
  lead: "Lead / Principal (10+ yrs)",
};

const SubmitPage = ({ onNavigate }) => {
  const { formData, resetForm } = useForm();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!formData) {
    return (
      <div className="page submit-page">
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h2>No form data found</h2>
          <p>Please fill out the form first.</p>
          <button className="btn-primary" onClick={() => onNavigate("form")}>
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 1800);
  };

  const handleReset = () => {
    resetForm();
    onNavigate("form");
  };

  const displayValue = (key, value) => {
    if (key === "role") return ROLE_MAP[value] || value;
    if (key === "experience") return EXP_MAP[value] || value;
    return value;
  };

  if (confirmed) {
    return (
      <div className="page submit-page">
        <div className="page-bg">
          <div className="bg-circle circle-3" />
          <div className="bg-circle circle-4" />
          <div className="bg-grid" />
        </div>
        <div className="success-container">
          <div className="success-icon-wrap">
            <svg className="success-check" viewBox="0 0 52 52">
              <circle className="check-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="check-path" fill="none" d="M14 27l8 8 16-16" />
            </svg>
          </div>
          <h1 className="success-title">You're all set!</h1>
          <p className="success-sub">
            Thanks, <strong>{formData.fullName}</strong>. We've received your submission and will be in touch at{" "}
            <strong>{formData.email}</strong> shortly.
          </p>
          <div className="success-meta">
            <span className="meta-tag">#{Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
            <span className="meta-tag">{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <button className="btn-outline" onClick={handleReset}>
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page submit-page">
      <div className="page-bg">
        <div className="bg-circle circle-3" />
        <div className="bg-circle circle-4" />
        <div className="bg-grid" />
      </div>

      <div className="submit-container">
        <div className="form-header">
          <div className="badge badge-green">Step 2 of 2</div>
          <h1 className="form-title">
            Review your <span className="highlight-green">submission</span>
          </h1>
          <p className="form-subtitle">Check your details before confirming. You can go back to make changes.</p>
        </div>

        <div className="review-card">
          <div className="review-grid">
            {Object.entries(LABELS).map(([key, label]) => (
              key !== "message" && (
                <div className="review-item" key={key}>
                  <span className="review-label">{label}</span>
                  <span className="review-value">{displayValue(key, formData[key])}</span>
                </div>
              )
            ))}
          </div>

          <div className="review-message">
            <span className="review-label">Message</span>
            <p className="review-value review-msg-text">{formData.message}</p>
          </div>
        </div>

        <div className="action-row">
          <button className="btn-ghost" onClick={() => onNavigate("form")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Edit Form</span>
          </button>

          <button
            className={`btn-confirm ${loading ? "btn-loading" : ""}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Confirm & Submit</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
