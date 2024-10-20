import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useCallback,  useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function UserRegister(){

    const [status, setStatus] = useState('');
    const [errorClass, setErrorClass] = useState('');

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
         UserId:'',
         UserName:'',
         Password:'',
         Email:'',
         Mobile:''
        },
        onSubmit : useCallback((user)=>{
            axios.post(`http://127.0.0.1:5000/register-user`, user)
            .then(()=>{
                toast.success('Registered Successfully..',{
                            position:"top-right",
                            autoClose:3000,
                            hideProgressBar:false,
                            closeOnClick:true,
                            pauseOnHover:true,
                            draggable:true,
                            progress:undefined,
                        });
                        setTimeout(()=>{
                            navigate('/user-login');
                        }, 3000)
                });
                
            })
        },[])
    

     function VerifyUser(e){
        axios.get(`http://127.0.0.1:5000/users`)
        .then(response=> {
            var user = response.data.find(item=> item.UserId===e.target.value);
            if(user){
                setStatus('User Id Taken - Try Another');
                setErrorClass('text-danger');
            }else{
                setStatus('User Id Available');
                setErrorClass('text-sucess');
            }
        })
     }


    return(
        <div className="container-fluid" style={{height:'100vh'}}>
            <form onSubmit={formik.handleSubmit}>
                <h2 className="text-white">Register</h2>
                <dl>
                    <dt className="text-white">UserId</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" onKeyUp={VerifyUser} /></dd>
                    <dd className={errorClass}>{status}</dd>
                    <dt className="text-white">User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserName"/></dd>
                    <dt className="text-white">Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password"/></dd>
                    <dt className="text-white">Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email"/></dd>
                    <dt className="text-white">Mobile</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Mobile"/></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <Link to="/user-login">Existing User ?</Link>
        </div>
    )
}