import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function DeleteVideo() {
  const params = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);

  function GetVideo() {
    axios.get(`${process.env.REACT_APP_API_URL}/video/${params.id}`)
      .then(response => {
        setVideo(response.data[0]); // Assuming response is an array
      });
  }

  useEffect(() => {
    GetVideo();
  }, []);

  function handleDeleteClick() {
    axios.delete(`${process.env.REACT_APP_API_URL}/${params.id}`)
      .then(() => {
        alert('Deleted Successfully');
        navigate('/admin-dash');
      });
  }

  return (
    <div className="container py-5">
      <h2 className="text-center text-light mb-4">🗑️ Delete Video</h2>

      {video ? (
        <div className="card mx-auto shadow-lg bg-dark text-light" style={{ maxWidth: '600px' }}>
          <div className="card-header text-center bg-danger text-white">
            <h4>Are you sure you want to delete this video?</h4>
          </div>

          <div className="card-body">
            <h5 className="mb-3">{video.Title}</h5>
            {video.Url ? (
              <iframe
                width="100%"
                height="300"
                src={video.Url}
                title={video.Title}
                className="rounded border"
              ></iframe>
            ) : (
              <p className="text-danger">No preview available</p>
            )}
          </div>

          <div className="card-footer d-flex justify-content-center gap-3">
            <button onClick={handleDeleteClick} className="btn btn-danger">
              <i className="bi bi-trash me-1"></i> Yes, Delete
            </button>
            <Link to="/admin-dash" className="btn btn-secondary">
              <i className="bi bi-x-circle me-1"></i> Cancel
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center text-muted">Loading video details...</div>
      )}
    </div>
  );
}