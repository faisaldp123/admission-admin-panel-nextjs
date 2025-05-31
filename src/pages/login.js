// pages/users/form.js  (or wherever your login page lives)
import { useState } from 'react';
import {
  Avatar, Box, Button, Container, CssBaseline,
  Grid, Stack, TextField, Typography
} from '@mui/material';
import { loginUser } from "@/helper/api/login";
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
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);

      if (response.token) {
        const now = Date.now().toString();

        // Set the auth token (7 days)
        Cookies.set("access_token", response.token, { expires: 7, sameSite: 'lax' });
        // Set the user role (7 days)
        Cookies.set("role", response.role || 'admin', { expires: 7, sameSite: 'lax' });
        // Record last activity for idle-timeout (also 7 days)
        Cookies.set("last_activity", now, { expires: 7, sameSite: 'lax' });

        // Replace so we don’t stack the login page in history
        router.replace("/");
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      displayNotification({
        type: 'error',
        message: error.message || 'Invalid credentials, please try again.'
      });
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
        height="100vh"
      >
        <Box textAlign="center" boxShadow={4} borderRadius={2} p={5} width="100%">
          <Grid align="center">
            <Avatar />
            <Typography component="h1" variant="h5" mt={1}>
              Login
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} my={5}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="success"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <Typography mt={2} variant="body2">
            Don’t have an account?{" "}
            <Link href="/register" passHref>
              <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
                Register
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
