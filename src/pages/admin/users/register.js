import { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Stack, TextField, Typography } from '@mui/material';
import { registerUser } from "@/helper/api/register";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { useNotification } from '@/hooks/useNotification';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { displayNotification } = useNotification();

  const { register, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
        name: "",
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registerUser(data);

      if (response.token) {
        Cookies.set("access_token", response.token, { expires: 7 });
        Cookies.set("role", response.role || 'admin', { expires: 7 });
        router.push("/admin/users"); // Redirect to Admin Dashboard
      }
    } catch (error) {
      displayNotification({ type: 'error', message: error.message || 'Invalid Credentials' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Full viewport height
      >
      <Box textAlign="center" boxShadow={4} borderRadius={2} padding={5} width="100%">
        <Grid align='center'>
          <Avatar />
          <Typography component="h1" variant="h5" mt={1}>
            Register
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} my={5}>
          <TextField
              fullWidth
              label="Name"
              type='name'
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Email"
              type='email'
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type='password'
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Stack>
          <Button type="submit" fullWidth variant="outlined" color="success">
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <Typography mt={1} variant="body2" className="text-center mt-2">
          Already Registered User? <Link href="/login"><strong>Login</strong></Link>
        </Typography>
      </Box>
      </Box>
    </Container>
  );
};

export default Login;
