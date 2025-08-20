import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const [videos, setVideos] = useState([]);

  function LoadVideos() {
    axios.get(`${process.env.REACT_APP_API_URL}/videos`)
      .then(response => {
        setVideos(response.data);
      });
  }

  useEffect(() => {
    LoadVideos();
  }, []);

  return (
    <div className="container py-5">
      <h3 className="text-center text-light mb-4">📊 Admin Dashboard</h3>

      <div className="d-flex justify-content-center mb-4 gap-3">
        <Link to="/add-video" className="btn btn-primary">
          <i className="bi bi-camera-video me-1"></i> Add Video
        </Link>
        <Link to="/dashboard" className="btn btn-warning text-dark">
          <i className="bi bi-person-fill me-1"></i> User Dashboard
        </Link>
      </div>

      <div className="table-responsive bg-dark p-3 rounded shadow">
        <table className="table table-dark table-hover table-bordered align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted">No videos available</td>
              </tr>
            ) : (
              videos.map(video => (
                <tr key={video.VideoId}>
                  <td>{video.Title}</td>
                  <td>
                    {video.Url ? (
                      <iframe
                        src={video.Url}
                        width="200"
                        height="100"
                        title={video.Title}
                        className="border rounded"
                      ></iframe>
                    ) : (
                      <span className="text-danger">No preview</span>
                    )}
                  </td>
                  <td className="text-center">
                    <Link to={`/edit-video/${video.VideoId}`} className="btn btn-sm btn-outline-warning me-2">
                      <i className="bi bi-pencil-square me-1"></i> Edit
                    </Link>
                    <Link to={`/delete-video/${video.VideoId}`} className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash me-1"></i> Delete
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

