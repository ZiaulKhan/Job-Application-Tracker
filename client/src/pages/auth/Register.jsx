import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import registerSchema from "../../validations/registerSchema";
import InputField from "../../components/shared/Form/InputField";
import { useEffect } from "react";
import { getToken } from "../../utils/helpers";
import "./Auth.css";
import { useToast } from "../../context/ToastContext";

const RegisterPage = () => {
  const form = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    const res = await register(data);
    if (res.success) {
      showToast("Registration successful");
      navigate("/");
    } else {
      showToast(error || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="auth-container-wrapper">
      <div className="auth-container">
        <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
          <p className="auth-title">Register</p>

          <InputField
            label="Name"
            name="name"
            inputProps={{ placeholder: "Enter name" }}
            form={form}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            form={form}
            inputProps={{ placeholder: "Enter email" }}
          />

          <InputField
            label="Password"
            name="password"
            form={form}
            inputProps={{ placeholder: "Enter password" }}
            isPassword={true}
          />

          <InputField
            label="Confirm Password"
            name="cPassword"
            form={form}
            isPassword={true}
            inputProps={{ placeholder: "Enter confirm password" }}
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      <div className="auth-footer">
        <p className="auth-footer-text">Already have an account?</p>
        <Link to="/login" className="auth-footer-btn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
