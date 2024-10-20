import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';




export function UserLogin(){

    const[cookies, setCookies, removeCookie]= useCookies(['userid'])
    const [users, setUsers] = useState([{userId:'', UserName:'', Password:'', Email:'', Mobile:''}]);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:''
        },
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:5000/users`)
            .then(response=>{
                var result = response.data.find(item=> item.UserId===user.UserId);
                if(result){
                    if(user.Password===result.Password){
                        setCookies('userid', user.UserId);
                        toast.success('Login Successful!', {
                            position:"top-right",
                            autoClose:3000,
                            hideProgressBar:false,
                            closeOnClick:true,
                            pauseOnHover:true,
                            draggable:true,
                            progress:undefined,
                        });
                       

                        setTimeout(()=>{
                           
                            navigate('/user-dash');
                        }, 5000);
                        
                    }else{
                        toast.error('Invalid Password',{
                            position:"top-right",
                            autoClose:3000,
                            hideProgressBar:false,
                            closeOnClick:true,
                            pauseOnHover:true,
                            draggable:true,
                            progress:undefined,

                        });
                    }
                }else{
                    toast.error('Invalid UserId',{
                        position:"top-right",
                        autoClose:3000,
                        hideProgressBar:false,
                        closeOnClick:true,
                        pauseOnHover:true,
                        draggable:true,
                        progress:undefined,
                    });
                }
            });
        }
    });

    return(
        <div className="container-fluid" style={{height:'100vh'}}>
           
            <form onSubmit={formik.handleSubmit}>
                <h3 className="text-white">User Login</h3>
                <dl>
                    <dt className="text-white">User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId"/></dd>
                    <dt className="text-white">Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password"/></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
            </form>
            <Link to="/user-register"> New User Register</Link>
        </div>
    )

}