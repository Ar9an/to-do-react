import { useState } from "react";
import { useForm } from "../context/FormContext";

const INITIAL_STATE = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  experience: "",
  country: "",
  message: "",
  agree: false,
};

const ERRORS_INITIAL = {};

const FormPage = ({ onNavigate }) => {
  const [fields, setFields] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(ERRORS_INITIAL);
  const [focused, setFocused] = useState(null);
  const { submitForm } = useForm();

  const validate = () => {
    const e = {};
    if (!fields.fullName.trim()) e.fullName = "Full name is required";
    if (!fields.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!fields.phone.match(/^\+?[\d\s\-]{7,15}$/)) e.phone = "Valid phone number required";
    if (!fields.role) e.role = "Please select a role";
    if (!fields.experience) e.experience = "Please select experience level";
    if (!fields.country.trim()) e.country = "Country is required";
    if (!fields.message.trim() || fields.message.length < 20) e.message = "Message must be at least 20 characters";
    if (!fields.agree) e.agree = "You must agree to continue";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    submitForm(fields);
    onNavigate("submit");
  };

  const inputClass = (name) =>
    `form-input ${focused === name ? "input-focused" : ""} ${errors[name] ? "input-error" : ""}`;

  return (
    <div className="page form-page">
      <div className="page-bg">
        <div className="bg-circle circle-1" />
        <div className="bg-circle circle-2" />
        <div className="bg-grid" />
      </div>

      <div className="form-container">
        <div className="form-header">
          <div className="badge">Step 1 of 2</div>
          <h1 className="form-title">
            Tell us about <span className="highlight">yourself</span>
          </h1>
          <p className="form-subtitle">Fill in the details below to get started. All fields are required.</p>
        </div>

        <form onSubmit={handleSubmit} className="form" noValidate>
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label className="label">Full Name</label>
              <input
                className={inputClass("fullName")}
                type="text"
                name="fullName"
                placeholder="Jane Doe"
                value={fields.fullName}
                onChange={handleChange}
                onFocus={() => setFocused("fullName")}
                onBlur={() => setFocused(null)}
              />
              {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="label">Email Address</label>
              <input
                className={inputClass("email")}
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={fields.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label className="label">Phone Number</label>
              <input
                className={inputClass("phone")}
                type="tel"
                name="phone"
                placeholder="+1 555 000 0000"
                value={fields.phone}
                onChange={handleChange}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label className="label">Country</label>
              <input
                className={inputClass("country")}
                type="text"
                name="country"
                placeholder="United States"
                value={fields.country}
                onChange={handleChange}
                onFocus={() => setFocused("country")}
                onBlur={() => setFocused(null)}
              />
              {errors.country && <span className="error-msg">{errors.country}</span>}
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label className="label">Role / Position</label>
              <select
                className={inputClass("role")}
                name="role"
                value={fields.role}
                onChange={handleChange}
                onFocus={() => setFocused("role")}
                onBlur={() => setFocused(null)}
              >
                <option value="">Select a role...</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Product Manager</option>
                <option value="analyst">Data Analyst</option>
                <option value="devops">DevOps Engineer</option>
                <option value="other">Other</option>
              </select>
              {errors.role && <span className="error-msg">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label className="label">Experience Level</label>
              <select
                className={inputClass("experience")}
                name="experience"
                value={fields.experience}
                onChange={handleChange}
                onFocus={() => setFocused("experience")}
                onBlur={() => setFocused(null)}
              >
                <option value="">Select level...</option>
                <option value="junior">Junior (0–2 yrs)</option>
                <option value="mid">Mid-level (2–5 yrs)</option>
                <option value="senior">Senior (5–10 yrs)</option>
                <option value="lead">Lead / Principal (10+ yrs)</option>
              </select>
              {errors.experience && <span className="error-msg">{errors.experience}</span>}
            </div>
          </div>

          {/* Message */}
          <div className="form-group full-width">
            <label className="label">
              Message{" "}
              <span className="char-count">({fields.message.length}/500)</span>
            </label>
            <textarea
              className={inputClass("message")}
              name="message"
              placeholder="Tell us a bit about yourself and why you're reaching out..."
              value={fields.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              maxLength={500}
              rows={4}
            />
            {errors.message && <span className="error-msg">{errors.message}</span>}
          </div>

          {/* Checkbox */}
          <div className="form-group full-width checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agree"
                checked={fields.agree}
                onChange={handleChange}
                className="checkbox-input"
              />
              <span className="checkbox-custom" />
              <span className="checkbox-text">
                I agree to the <a href="#" className="link">Terms of Service</a> and{" "}
                <a href="#" className="link">Privacy Policy</a>
              </span>
            </label>
            {errors.agree && <span className="error-msg">{errors.agree}</span>}
          </div>

          <button type="submit" className="btn-primary">
            <span>Review & Submit</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
