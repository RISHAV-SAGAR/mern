import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { toast } from "react-toastify";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectTo = location.state?.from?.pathname || "/home";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const newErrors = {};

    // Email validations
    if (!values.email || !values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address";
    } else if (!values.email.endsWith("@gmail.com")) {
      newErrors.email = "Only @gmail.com addresses are allowed";
    }

    // Password validations
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If the field was already touched, validate with the updated value for live feedback
    if (touched[name]) {
      setErrors((prev) => validate({ ...formData, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // validate current form values
    setErrors(validate({ ...formData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // mark all fields as touched so errors show if present
    setTouched({ email: true, password: true });

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // send formData to backend
        const response = await axios.post(
          "http://localhost:4545/user/login",
          formData
        );

        // handle API response
        if (response?.data?.status === 400) {
          toast.error(response.data.message || "Login failed");
        } else {
          login({
            name: response?.data?.body?.name,
            email: formData.email,
            role: response?.data?.body?.role,
          });
          toast.success(response.data.message || "Login successful");
          navigate(redirectTo, { replace: true });
        }
      } catch (err) {
        console.error("Login error:", err);

        if (!err.response) {
          login({ email: formData.email });
          toast.success("Logged in locally for demo");
          navigate(redirectTo, { replace: true });
        } else {
          toast.error(err.response?.data?.message || "An error occurred");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const goToSignup = () => {
    navigate("/signup", { state: location.state });
  };


  return (
    <div className="pageStyle">
      <div className="cardStyle">
        <h2 className="titleStyle">Welcome back</h2>
        <p className="subtitleStyle">Login with your Gmail address to continue.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: "14px" }}>
            <label htmlFor="email" className="labelStyle">
              Gmail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@gmail.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`inputStyle ${touched.email && errors.email ? "inputError" : ""}`}
              autoComplete="email"
              aria-invalid={!!(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            />
            {touched.email && errors.email && (
              <div id="email-error" className="errorTextStyle">
                {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label htmlFor="password" className="labelStyle">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`inputStyle ${touched.password && errors.password ? "inputError" : ""}`}
              autoComplete="current-password"
              aria-invalid={!!(touched.password && errors.password)}
              aria-describedby={touched.password && errors.password ? "password-error" : undefined}
            />
            {touched.password && errors.password && (
              <div id="password-error" className="errorTextStyle">
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`buttonStyle ${isSubmitting ? "buttonDisabled" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <div style={{ marginTop: "16px", textAlign: "center" }}>
  <span>Don’t have an account? </span>
  <button
    type="button"
    onClick={goToSignup}
    className="linkButtonStyle"
  >
    Create one
  </button>
</div>

        </form>
            
        <p className="footerTextStyle">
          After login, you will be redirected back to your selected page or checkout.
        </p>
      </div>
    </div>
  );
}
