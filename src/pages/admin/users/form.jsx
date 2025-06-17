import React, { useEffect, useState } from 'react';
import styles from '../../styles/students/students.module.css';
import { useFieldArray } from 'react-hook-form';
import {
  TextField,
  Grid,
  MenuItem,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { addUser, getUserById, updateUser } from '@/helper/api/users';
import { useRouter } from 'next/router';
import { useNotification } from '@/hooks/useNotification';



const Form = () => {
    const router = useRouter();
    const { id } = router.query;
    const {displayNotification} = useNotification()

    const [loading, setLoading] = useState(false);

  const form = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      name: "",
      email: "",
      password: "",
      status: "",
    },
  });

  

  const { register, handleSubmit, formState, control, getValues, reset } = form;
  const { errors } = formState;


  const onSubmit = async (data)=>{
    setLoading(true)
    try {
      if (id){
        let response = await updateUser(id, data);
      } 
        else {
          let response = await addUser(data);
        }
        
        router.push("/users")
    } catch (error) {
      displayNotification({message: "Unable to Created User", type: "error"})
    } finally {
      setLoading(false)
    }
     
    
   
}

useEffect(() =>{
    if(id){
        getUserById(id).then(res => {
            if(res[0]){
                reset(
                    { name: res[0].name, email: res[0].email, password: res[0].password, status: res[0].status },
                )
            }
        }).catch(err => displayNotification({type: "error", message: "Unable To Fetch Users Details"}))
    }
},[id])



  return (
    <>
      <div className="container">
        <div style={{ maxWidth: "50rem", margin: "auto",}}>
        <div style={{textAlign: "center"}}>
        <h2 className="text-3xl mb-5"><strong>STUDENT FORM</strong></h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
              fullWidth
                label="Name"
                type='text'
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              /></Grid>



               <Grid item xs={12} md={6}>
              <TextField
              fullWidth
               label="Email"
               type='text'
               {...register("email", { required: "Email is required" })}
               error={!!errors.email}
               helperText={errors.email?.message}
               />
               </Grid>

               <Grid item xs={12} md={6}>
              <TextField
              fullWidth
               label="Password"
               type='password'
               {...register("password", { required: "Password is required" })}
               error={!!errors.password}
               helperText={errors.password?.message}
               />
               </Grid>
                  <Grid item xs={12} md={6}>
                  <TextField
                  // defaultValue={getValues().status}
                  select
                  fullWidth
                  error={!!errors.status} helperText={errors.status?.message}
                    labelId="status"
                    label="status" 
                    {...register("status", { required: "status is required" })} 
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
              {/* <Autocomplete
              onChange={(event, newValue)=>{
                console.log(newValue)
              }}
                // value={"active"}
                option={[{label: "active", value: "active"}, {label: "inactive", value: "inactive"}]}
                renderInput={(params) => <TextField {...params} label="Status"/>}
              /> */}
              </Grid>
            </Grid>

            <div className='text-center'>
              <button className={styles.submit_btn} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
