import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export function AddVideo() {
  const [categories, SetCategories] = useState([{ CategoryId: 0, CategoryName: '' }]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      VideoId: 0,
      Title: '',
      Url: '',
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: 0
    },
    onSubmit: (video) => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_API_URL}/add-video`, video)
        .then(() => {
          alert('✅ Video Added');
          navigate('/admin-dash');
        })
        .finally(() => setLoading(false));
    }
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/categories`)
      .then(response => {
        response.data.unshift({ CategoryId: 0, CategoryName: 'Select Category' });
        SetCategories(response.data);
      });
  }, []);

  return (
    <div className="container py-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center text-light mb-4">🎬 Add New Video</h2>
      <form onSubmit={formik.handleSubmit} className="bg-dark p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="videoId" className="form-label text-light">Video Id</label>
          <input type="number" name="VideoId" className="form-control" onChange={formik.handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-light">Title</label>
          <input type="text" name="Title" className="form-control" onChange={formik.handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label text-light">URL</label>
          <input type="text" name="Url" className="form-control" onChange={formik.handleChange} />
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="likes" className="form-label text-light">Likes</label>
            <input type="number" name="Likes" className="form-control" onChange={formik.handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="dislikes" className="form-label text-light">Dislikes</label>
            <input type="number" name="Dislikes" className="form-control" onChange={formik.handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="views" className="form-label text-light">Views</label>
            <input type="number" name="Views" className="form-control" onChange={formik.handleChange} />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="categoryId" className="form-label text-light">Category</label>
          <select name="CategoryId" className="form-select" onChange={formik.handleChange}>
            {categories.map(category =>
              <option key={category.CategoryId} value={category.CategoryId}>
                {category.CategoryName}
              </option>
            )}
          </select>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-warning w-50" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Adding...
              </>
            ) : (
              "Add Video"
            )}
          </button>
          <Link to="/admin-dash" className="btn btn-outline-light ms-3 w-25">Cancel</Link>
        </div>
      </form>
    </div>
  );
}