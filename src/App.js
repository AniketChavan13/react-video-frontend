import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { VideoLibraryIndex } from './components/index.jsx';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AddVideo } from './components/add-video';
import { DeleteVideo } from './components/delete-video';
import { EditVideo } from './components/edit-video';
import { UserLogin } from './components/user-login';
import { UserRegister } from './components/user-register';
import { UserDashboard } from './components/user-dashbord';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return ( <div>
        <BrowserRouter >
        
        < header className = 'bg-dark text-white p-2 text-center' >
        
        <h2 > Video Library </h2> 
        </header> 
        <section>
          <ToastContainer/>
              <Routes >
                
                  <Route path='/' element={<VideoLibraryIndex/>}/>
                  <Route path='admin-login' element={<AdminLogin/>}/>
                  <Route path='admin-dash' element={<AdminDashboard/>}/>
                  <Route path='add-video' element={<AddVideo/>}/>
                  <Route path='delete-video/:id' element={<DeleteVideo/>}/>
                  <Route path='edit-video/:id' element={<EditVideo/>}/>
                  <Route path='user-login' element={<UserLogin/>}/>
                  <Route path='user-register' element={<UserRegister/>}/>
                  <Route path='user-dash'element={<UserDashboard/>}/>
              </Routes>
          
        </section>
         </BrowserRouter> 
         </div>
    );
}

export default App;