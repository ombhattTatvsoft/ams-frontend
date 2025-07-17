import React from 'react'
import FormButton from '../ui/FormButton'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <>
    <p className='h3 mb-4 text-danger'>Page Not Found</p>
    <FormButton className='mb-3 sitebgcolor' onClick={()=>{navigate(-1)}}>
        Go Back
    </FormButton>
    </>
  )
}

export default NotFound