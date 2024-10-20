import { Link } from "react-router-dom";

export function VideoLibraryIndex(){
    return(
        <div>
            <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
               <Link  to="/user-login" className="btn btn-primary">User Login</Link>
               <Link to="/admin-login" className="btn btn-warning ms-2">Admin Login</Link>
            </div>
        </div>
    )
}