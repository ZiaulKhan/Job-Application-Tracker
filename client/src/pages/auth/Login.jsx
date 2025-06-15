import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import loginSchema from "../../validations/loginSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/shared/Form/InputField";
import { useEffect } from "react";
import { getToken } from "../../utils/helpers";
import "./Auth.css";
import { login } from "../../services/auth-service";
import { useToast } from "../../context/ToastContext";

const Login = () => {
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      dispatch({ type: "LOGIN", payload: res.data });
      navigate("/");
      showToast("Login successful");
    } catch (err) {
      showToast("Invalid credentials", "error");
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
        <p className="auth-title">Login</p>
        <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            name="email"
            type="email"
            form={form}
            inputProps={{ placeholder: "Enter email" }}
          />
          <InputField
            name="password"
            label="Password"
            form={form}
            isPassword={true}
            inputProps={{ placeholder: "Enter password" }}
          />
          <button type="submit" className="btn">
            Log in
          </button>
        </form>
      </div>

      <div className="auth-footer">
        <p className="auth-footer-text">Don't have an account?</p>
        <Link to="/register" className="auth-footer-btn">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
