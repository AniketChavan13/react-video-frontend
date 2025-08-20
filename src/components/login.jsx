import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

export function UserLogin() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userid"]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    onSubmit: useCallback(
      (loginData) => {
        setLoading(true);

        axios
          .get(`${process.env.REACT_APP_API_URL}/users`)
          .then((response) => {
            const user = response.data.find(
              (u) =>
                u.UserId.trim() === loginData.UserId.trim() &&
                u.Password.trim() === loginData.Password.trim()
            );

            if (user) {
              setCookie("userid", user.UserId, { path: "/" });

              toast.success("Login Successful!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
              });
              setTimeout(() => {
                navigate("/dashboard");
              }, 2000);

              return;
            }

            toast.error("Invalid User ID or Password", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            });
          })
          .catch(() => {
            toast.error("Login failed, please try again.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            });
          })
          .finally(() => setLoading(false));
      },
      [navigate, setCookie]
    ),
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 text-white"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div
        className="p-4 rounded-4 shadow-lg text-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
       

        {/* Heading */}
        <h2 className="mb-4 fw-bold">🔐 User Login</h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="userId" className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              name="UserId"
              onChange={formik.handleChange}
              value={formik.values.UserId}
              disabled={loading}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="Password"
              onChange={formik.handleChange}
              value={formik.values.Password}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social Login UI */}
        <div className="mt-4">
          <p className="mb-2">Or login with</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-light btn-sm">
              <i className="bi bi-google me-1"></i> Google
            </button>
            <button className="btn btn-outline-light btn-sm">
              <i className="bi bi-facebook me-1"></i> Facebook
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-4">
          <Link to="/user-register" className="btn btn-outline-light btn-sm">
            New User? Register Here
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}