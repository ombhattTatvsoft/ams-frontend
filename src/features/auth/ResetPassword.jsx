import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../constants/routes';
import FormInput from '../../components/common/FormInput';
import FormButton from '../../components/common/FormButton';
import { resetPassword } from './authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';

function ResetPassword() {
    const {resetcode} = useParams();
    const navigate = useNavigate();
    const [isValid,setIsValid] = useState(null);
    const dispatch = useDispatch();
    const { isAuthenticated, loading, error } = useSelector(
      (state) => state.auth
    );
  
    const [form, setForm] = useState({
      resetcode:resetcode,
      newpassword: "",
      confirmpassword: ""
    });
    useEffect(()=>{
        const validateResetCode = async ()=>{
            try {
                const response =await axios.get(`http://localhost:5131/api/auth/reset-password/${resetcode}`);
                if(response.status==HttpStatusCode.Ok){
                    setIsValid(true);
                }
                else{
                    navigate(PUBLIC_ROUTES.LOGIN);
                }
            } catch (error) {
                console.log(error);
                navigate(PUBLIC_ROUTES.LOGIN);
            }       
        }
        validateResetCode();
    },[navigate, resetcode])

    if(isValid==null)
        return(
    <p>Validating link ...</p>
    )
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(resetPassword(form));
    };
  
    if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;
  return (
    <>
        <h4 className="mb-4">Reset Password</h4>
        <div className="col-10 mb-4">
            <form onSubmit={handleSubmit}>
            <FormInput
            type="password"
            value={form.newpassword}
            onChange={(e) => setForm({ ...form, newpassword: e.target.value })}
            label="New Password"
          ></FormInput>
        <FormInput
            type="password"
            value={form.confirmpassword}
            onChange={(e) => setForm({ ...form, confirmpassword: e.target.value })}
            label="Confirm New Password"
          ></FormInput>
          <FormButton className="w-100 sitebgcolor" type="submit">{loading ? "Sending..." : "Send"}</FormButton>
          {error && <p className="text-danger">{error}</p>}
            </form>
        </div>
    </>
  )
}

export default ResetPassword
