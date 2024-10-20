import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addToSaveList, removeFromSaveList } from "../slicers/video-slicer";
import { toast } from "react-toastify";



export function UserDashboard()
{
    const [cookie, setCookies, removeCookie] = useCookies(['userid']);
    const [videos, setVideos ] = useState([{VideoId:0,Title:'', Url:'', Likes:'', Dislikes:'', Views:0, CategoryId:0}]);
    
    const [watchLaterVideos, setWatchLaterVideos] =useState([]);

    const dispatch = useDispatch();
    const videosCount = useSelector((state) => state.store.videosCount); 

    function LoadVideos(){
        axios.get(`http://127.0.0.1:5000/videos`)
        .then(response=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
        LoadVideos();
    },[videosCount]);
    let navigate = useNavigate();
    function handleSignout(){
        removeCookie('userid');
        navigate('/');
    }

    function handleSaveClick(video){
        toast.success('video saved',{
            position:"top-right",
            autoClose:3000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
        });
        setWatchLaterVideos([...watchLaterVideos, video]);
        dispatch(addToSaveList(video));
       
        
    }

    function handleDeleteClick(VideoId){
        toast.info('Video Deleted!',{
            position:"top-right",
            autoClose:3000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
        });
        const updatedVideos = watchLaterVideos.filter((video)=> video.VideoId !== VideoId);
        setWatchLaterVideos(updatedVideos);
        dispatch(removeFromSaveList(VideoId));
    }

   return(
    <div className="container-fluid mt-1" style={{height:''}}>
        <h3 className="d-flex justify-content-between"><span className="text-white">User Dashboard</span><span>
            <button data-bs-toggle="modal" data-bs-target="#history" className="btn bi bi-clock-history text-white">
                 [{videosCount}]
                 </button>
                 </span>
            <div className="modal fade" id="history">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="text-primary">Your Watch later Videos</h3>
                            <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {watchLaterVideos.length > 0? (
                                <ul className="list-group">
                                  {watchLaterVideos.map((videos)=>(
                                    <li key={videos.VideoId} className="list-group-item">
                                        <iframe src={videos.Url} width="50%" height="100" title={videos.Title}></iframe>
                                        <button className="btn btn-danger bi bi-trash" onClick={()=> handleDeleteClick(videos.VideoId)} style={{marginLeft:'80px', marginTop:'-60px'}}>Delete</button>
                                        <h6>{videos.Title}</h6>
                                    </li>
                                  ))}      
                                </ul>
                            ) : (
                                <p>No Videos Added to Watch Later</p>
                            )}
                           
                        </div>
                    </div>
                </div>
            
            </div>
            
            <span className="text-white">{cookie['userid']}</span> <button className="btn btn-danger" onClick={handleSignout}>Signout</button></h3>
        <div className="my-3 d-flex flex-wrap">
            {
                videos.map(video=>
                    <div key={video.VideoId} className="col-md-4 col-lg-3 col-sm-6 col-12 mb-3" >
                        <div className="card h-100">
                        <iframe src={video.Url} width="100%" height="300"></iframe>
                        <div className="card-header">
                               <h6>{video.Title}</h6>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <button className="bi btn bi-eye-fill " >{video.Views}</button>
                            <button className="bi btn mx-2 bi-hand-thumbs-up ">{video.Likes}</button>
                            <button className="bi btn bi-hand-thumbs-down ">{video.Dislikes}</button>
                            <button onClick={()=> handleSaveClick(video)} className="bi bi-floppy-fill btn"> Watch Later</button>
                        </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
   )
}