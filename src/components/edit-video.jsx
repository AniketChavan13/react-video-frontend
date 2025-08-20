import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";

export function EditVideo() {
  const [videos, setVideos] = useState([{ VideoId: 0, Title: '', Url: '', Likes: 0, Dislikes: 0, Views: 0, CategoryId: 0 }]);
  const [categories, SetCategories] = useState([{ CategoryId: 0, CategoryName: '' }]);

  const params = useParams();
  const navigate = useNavigate();

  function LoadCategories() {
    axios.get(`${process.env.REACT_APP_API_URL}/categories`)
      .then(response => {
        response.data.unshift({ CategoryId: 0, CategoryName: 'Select Category' });
        SetCategories(response.data);
      });
  }

  function GetVideo() {
    axios.get(`${process.env.REACT_APP_API_URL}/video/${params.id}`)
      .then(response => {
        setVideos(response.data);
      });
  }

  useEffect(() => {
    LoadCategories();
    GetVideo();
  }, []);

  const formik = useFormik({
    initialValues: {
      VideoId: videos[0].VideoId,
      Title: videos[0].Title,
      Url: videos[0].Url,
      Likes: videos[0].Likes,
      Dislikes: videos[0].Dislikes,
      Views: videos[0].Views,
      CategoryId: videos[0].CategoryId
    },
    onSubmit: (video) => {
      axios.put(`${process.env.REACT_APP_API_URL}/edit-video/${video.VideoId}`, video)
        .then(() => {
          alert('Video Updated');
          navigate('/admin-dash');
        });
    },
    enableReinitialize: true
  });

  return (
    <div className="container py-5">
      <form onSubmit={formik.handleSubmit} className="bg-dark text-light p-4 rounded shadow-lg" style={{ maxWidth: '700px', margin: 'auto' }}>
        <h3 className="text-center mb-4">🎬 Edit Video</h3>

        <div className="mb-3">
          <label htmlFor="videoId" className="form-label">Video ID</label>
          <input type="number" className="form-control" name="VideoId" value={formik.values.VideoId} onChange={formik.handleChange} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name="Title" value={formik.values.Title} onChange={formik.handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="url" className="form-label">Video URL</label>
          <input type="text" className="form-control" name="Url" value={formik.values.Url} onChange={formik.handleChange} />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="likes" className="form-label">Likes</label>
            <input type="number" className="form-control" name="Likes" value={formik.values.Likes} onChange={formik.handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="dislikes" className="form-label">Dislikes</label>
            <input type="number" className="form-control" name="Dislikes" value={formik.values.Dislikes} onChange={formik.handleChange} />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="views" className="form-label">Views</label>
            <input type="number" className="form-control" name="Views" value={formik.values.Views} onChange={formik.handleChange} />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="form-label">Category</label>
          <select className="form-select" name="CategoryId" value={formik.values.CategoryId} onChange={formik.handleChange}>
            {categories.map(category => (
              <option key={category.CategoryId} value={category.CategoryId}>
                {category.CategoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button type="submit" className="btn btn-success">
            <i className="bi bi-save me-1"></i> Save
          </button>
          <Link to="/admin-dash" className="btn btn-warning text-dark">
            <i className="bi bi-x-circle me-1"></i> Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}