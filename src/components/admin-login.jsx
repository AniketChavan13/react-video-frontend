import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'

export function AdminLogin() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: '',
      Password: ''
    },
    onSubmit: (admin) => {
      axios.get(`${process.env.REACT_APP_API_URL}/admin`)
        .then(response => {
          const user = response.data.find(item => item.UserId === admin.UserId);
          if (user) {
            if (user.Password === admin.Password) {
              toast.success("Login successful!", { autoClose: 2000 });
              setTimeout(() => navigate('/admin-dash'), 2000);
            } else {
              toast.error("Invalid password", { autoClose: 3000 });
            }
          } else {
            toast.error("Invalid User ID", { autoClose: 3000 });
          }
        })
        .catch(() => {
          toast.error("Server error. Please try again later.", { autoClose: 3000 });
        });
    }
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark" style={{ height: '100vh' }}>
      <ToastContainer />
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h4 className="text-center mb-4 text-primary">🔐 Admin Login</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">👤 User ID</label>
            <input
              type="text"
              name="UserId"
              onChange={formik.handleChange}
              className="form-control"
              placeholder="Enter your admin ID"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">🔑 Password</label>
            <input
              type="password"
              name="Password"
              onChange={formik.handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}