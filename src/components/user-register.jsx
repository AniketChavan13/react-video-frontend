import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

export function UserRegister() {
  const [status, setStatus] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    onSubmit: useCallback(
      (user) => {
        axios.post(`${process.env.REACT_APP_API_URL}/register-user`, user).then(() => {
          toast.success("Registered Successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/user-login");
          }, 2000);
        });
      },
      [navigate]
    ),
  });

  function VerifyUser(e) {
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then((response) => {
      const user = response.data.find((item) => item.UserId === e.target.value);
      if (user) {
        setStatus("❌ User ID Taken - Try Another");
        setErrorClass("text-danger");
      } else {
        setStatus("✅ User ID Available");
        setErrorClass("text-success");
      }
    });
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
      }}
    >
      <div
        className="p-4 rounded-4 shadow-lg text-white"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">📝 Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              name="UserId"
              onChange={formik.handleChange}
              onKeyUp={VerifyUser}
              required
            />
            <small className={errorClass}>{status}</small>
          </div>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              name="UserName"
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="Password"
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="Email"
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input
              type="text"
              className="form-control"
              name="Mobile"
              onChange={formik.handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/user-login" className="text-warning text-decoration-none">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}