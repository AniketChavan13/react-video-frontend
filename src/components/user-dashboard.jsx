import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToSaveList, removeFromSaveList } from "../slicers/video-slicer";
import { toast, ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

export function UserDashboard() {
  const [cookie, , removeCookie] = useCookies(["userid"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [videos, setVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [lastDeleted, setLastDeleted] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [loading, setLoading] = useState(true); // Loader state

  const videosCount = useSelector((state) => state.video.count);

  useEffect(() => {
    if (!cookie.userid) {
      navigate("/user-login");
      return;
    }
    fetchData();
  }, [cookie.userid, videosCount]);

  async function fetchData() {
    setLoading(true);
    try {
      await loadUsername();
      await loadVideos();
    } finally {
      setLoading(false);
    }
  }

  async function loadUsername() {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${cookie.userid.trim()}`);
    if (res.data && res.data.UserName) {
      setUsername(res.data.UserName);
    } else {
      toast.error("❌ User not found");
    }
  } catch (err) {
    console.error("Error loading user:", err);
    toast.error("❌ Failed to load user");
  }
}


  async function loadVideos() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/videos`);
      setVideos(res.data);
    } catch {
      toast.error("❌ Failed to load videos");
    }
  }

  function handleSaveClick(video, e) {
    e.preventDefault();
    e.stopPropagation();
    if (watchLaterVideos.some((v) => v.VideoId === video.VideoId)) {
      toast.info("🔁 Already in Watch Later");
      return;
    }
    setWatchLaterVideos([...watchLaterVideos, video]);
    dispatch(addToSaveList(video));
    toast.success(" Video saved!");
    setShowModal(true);
  }

  function handleDeleteClick(VideoId) {
    const deleted = watchLaterVideos.find((v) => v.VideoId === VideoId);
    const updated = watchLaterVideos.filter((v) => v.VideoId !== VideoId);
    setWatchLaterVideos(updated);
    dispatch(removeFromSaveList(VideoId));
    setLastDeleted(deleted);
    const timeout = setTimeout(() => setLastDeleted(null), 5000);
    setUndoTimeout(timeout);

    toast(
      ({ closeToast }) => (
        <div className="d-flex justify-content-between align-items-center">
          <span>🗑️ Deleted</span>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => {
              handleUndoDelete();
              closeToast();
            }}
          >
            Undo
          </button>
        </div>
      ),
      { autoClose: 5000 }
    );
  }

  function handleUndoDelete() {
    if (!lastDeleted) return;
    setWatchLaterVideos((prev) => [...prev, lastDeleted]);
    dispatch(addToSaveList(lastDeleted));
    setLastDeleted(null);
    clearTimeout(undoTimeout);
    toast.success("✅ Undo successful");
  }

  function handleLogout() {
    removeCookie("userid", { path: "/" });
    toast.success("🔓 Logged out successfully!");
    navigate("/user-login");
  }

  // Theme-based styles
  const themeStyles = {
    light: {
      bg: "bg-light text-dark",
      card: "",
      gradient: "linear-gradient(to right, #f0f0f0, #ffffff)",
    },
    dark: {
      bg: "bg-dark text-light",
      card: "bg-secondary text-light",
      gradient: "linear-gradient(to right, #1c1c1c, #2c3e50)",
    },
    classic: {
      bg: "bg-warning text-dark",
      card: "bg-light text-dark border border-dark",
      gradient: "linear-gradient(to right, #fbeec1, #f6d365)",
      fontFamily: "'Courier New', Courier, monospace",
    },
  };

  return (
    <div
      className={`min-vh-100 ${themeStyles[theme].bg}`}
      style={{
        backgroundImage: themeStyles[theme].gradient,
        fontFamily: themeStyles[theme].fontFamily || "inherit",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container py-3">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
          <h3 className="fw-bold mb-1" style={{
      background: "linear-gradient(90deg, #ff5733, #33ff57, #3375ff, #f1c40f)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}>
      🎬 Video Library
    </h3>
          <p className="mb-0">
      <span style={{ background: "linear-gradient(45deg, #f39c12, #8e44ad)", 
                     WebkitBackgroundClip: "text", 
                     WebkitTextFillColor: "transparent", 
                     fontWeight: "bold" }}>
        👋 Welcome, {username}
      </span>{" "}
      |{" "}
      <span style={{ background: "linear-gradient(45deg, #16a085, #2980b9)", 
                     WebkitBackgroundClip: "text", 
                     WebkitTextFillColor: "transparent", 
                     fontWeight: "bold" }}>
        User ID: {cookie.userid}
      </span>
    </p>
          <div className="d-flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn btn-outline-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-bookmark-fill"></i>Saved Videos
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn btn-outline-secondary"
              onClick={() =>
                setTheme(
                  theme === "light"
                    ? "dark"
                    : theme === "dark"
                    ? "classic"
                    : "light"
                )
              }
            >
              {theme === "light"
                ? "🌙 Dark Mode"
                : theme === "dark"
                ? "🕰 Classic Theme"
                : "☀️ Light Mode"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              🔓 Logout
            </motion.button>
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          // Video Grid
          <div className="row">
            {videos.map((video, index) => (
              <motion.div
                key={video.VideoId}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`card h-100 shadow ${themeStyles[theme].card}`}>
                  <iframe
                    className="card-img-top"
                    src={video.Url}
                    title={video.Title}
                    allowFullScreen
                    style={{ width: "100%", aspectRatio: "16/9" }}
                  ></iframe>
                  <div className="card-body">
                    <h5 className="card-title">{video.Title}</h5>
                    <p className="card-text">{video.Description}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between flex-wrap gap-2">
                    <button className="btn btn-success btn-sm"> <i className="bi bi-hand-thumbs-up me-1"></i> Like</button>
                    <button className="btn btn-warning btn-sm"><i className="bi bi-hand-thumbs-down me-1"></i> Dislike</button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary btn-sm"
                      onClick={(e) => handleSaveClick(video, e)}
                    ><i className="bi bi-bookmark-plus me-1"></i>
                      Save
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Watch Later Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal show d-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1055,
            }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className={`modal-content ${themeStyles[theme].card}`}>
                <div className="modal-header">
                  <h5 className="modal-title">📁 Watch Later</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {watchLaterVideos.length === 0 ? (
                    <p>No videos saved.</p>
                  ) : (
                    <div className="row">
                      {watchLaterVideos.map((video) => (
                        <div
                          className="col-12 col-sm-6 col-md-4 mb-3"
                          key={video.VideoId}
                        >
                          <div
                            className={`card h-100 ${themeStyles[theme].card}`}
                          >
                            <iframe
                              className="card-img-top"
                              src={video.Url}
                              title={video.Title}
                              allowFullScreen
                              style={{ width: "100%", aspectRatio: "16/9" }}
                            ></iframe>
                            <div className="card-body d-flex flex-column">
                              <h6 className="card-title">{video.Title}</h6>
                              <button
                                className="btn btn-sm btn-danger mt-auto"
                                onClick={() =>
                                  handleDeleteClick(video.VideoId)
                                }
                              >
                                <i className="bi bi-trash me-1"></i> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
