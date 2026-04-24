import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (values) => {
    const e = {};

    if (!values.fullName.trim()) e.fullName = "Full name is required";
    else if (values.fullName.trim().length < 3) e.fullName = "Name must be at least 3 characters";

    if (!values.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email address";

    if (values.phone) {
      // allow + and digits, 7-15 digits (no letters)
      if (!/^\+?[0-9]{7,15}$/.test(values.phone)) e.phone = "Enter a valid phone number";
    }

    // collect password issues rather than overwriting
    const pwIssues = [];
    if (!values.password) {
      pwIssues.push("Password is required");
    } else {
      if (values.password.length < 8) pwIssues.push("At least 8 characters");
      if (!/[A-Z]/.test(values.password)) pwIssues.push("Include at least one uppercase letter");
      if (!/[a-z]/.test(values.password)) pwIssues.push("Include at least one lowercase letter");
      if (!/[0-9]/.test(values.password)) pwIssues.push("Include at least one number");
      // optionally require special char:
      // if (!/[^A-Za-z0-9]/.test(values.password)) pwIssues.push("Include at least one special character");
    }
    if (pwIssues.length) e.password = pwIssues.join(", ");

    if (!values.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (values.confirmPassword !== values.password) e.confirmPassword = "Passwords do not match";

    if (!values.terms) e.terms = "You must accept the terms and conditions";

    return e;
  };

  const passwordStrength = useMemo(() => {
    const p = formData.password || "";
    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    return score; // 0..4
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = type === "checkbox" ? checked : value;

    // compute updated state first to avoid stale validation
    const updated = { ...formData, [name]: next };
    setFormData(updated);

    // if this field already touched, update errors live
    if (touched[name]) {
      const newErrors = validate(updated);
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    // validate current form values
    const newErrors = validate(formData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // mark all fields touched so errors appear
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Prepare payload: map fullName -> name and DO NOT send confirmPassword
        const payload = {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone ? formData.phone.trim() : "",
          password: formData.password,
        };

        // Ensure you are sending over HTTPS in production
        const response = await axios.post("http://localhost:4545/user/signup", payload);

        // handle API response (adjust depending on API contract)
        if (response?.data?.status === 400) {
          toast.error(response.data.message || "Signup failed");
        } else {
          toast.success(response.data.message || "Signup successful");
          navigate("/login", { state: location.state });
        }
      } catch (err) {
        console.error("Signup error:", err);

        if (!err.response) {
          toast.success("Account created locally for demo. Please log in to continue.");
          navigate("/login", { state: location.state });
        } else {
          toast.error(err.response?.data?.message || "An error occurred");
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // if validation failed, focus first error field (optional enhancement)
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
    }
  };

  const strengthLabel = ["Very weak", "Weak", "Okay", "Good", "Strong"][passwordStrength];

  return (
    <div className="signup-page">
      <div className="signup-card" role="region" aria-labelledby="signupHeading">
        <h2 id="signupHeading" className="signup-title">Create an account</h2>
        <p className="signup-sub">Sign up to get access. It only takes a minute.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label className="label" htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input ${touched.fullName && errors.fullName ? 'input-error' : ''}`}
              placeholder="Your full name"
              aria-invalid={!!errors.fullName}
            />
            {touched.fullName && errors.fullName && <div className="error">{errors.fullName}</div>}
          </div>

          <div className="form-row">
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input ${touched.email && errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {touched.email && errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-row">
            <label className="label" htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input ${touched.phone && errors.phone ? 'input-error' : ''}`}
              placeholder="+1234567890"
              aria-invalid={!!errors.phone}
            />
            {touched.phone && errors.phone && <div className="error">{errors.phone}</div>}
          </div>

          <div className="form-row">
            <label className="label" htmlFor="password">Password</label>
            <div className="pw-row">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input ${touched.password && errors.password ? 'input-error' : ''}`}
                placeholder="Create a strong password"
                aria-invalid={!!errors.password}
                aria-describedby="pwHelp"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="pw-toggle"
                aria-pressed={showPassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="pw-strength-wrap">
              <div className="pw-strength" aria-hidden>
                <i style={{ width: `${(passwordStrength / 4) * 100}%` }} />
              </div>
              <div id="pwHelp" className="small">{formData.password ? `${strengthLabel} password` : 'Use at least 8 characters'}</div>
            </div>

            {touched.password && errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form-row">
            <label className="label" htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input ${touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Repeat your password"
              aria-invalid={!!errors.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>

          <div className="form-row terms-row">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="terms-label">I agree to the <a href="#" onClick={(e)=>e.preventDefault()}>Terms & Conditions</a></label>
          </div>
          {errors.terms && <div className="error">{errors.terms}</div>}

          <div className="form-row">
            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="note">Already have an account? <button type="button" className="link-btn" onClick={() => navigate('/login', { state: location.state })}>Log in</button></div>
        </form>
      </div>
    </div>
  );
}
