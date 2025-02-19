import {useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
// import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
  
  const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));
  
  const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      ...theme.applyStyles('dark', {
        backgroundImage:
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }),
    },
  }));
  
  export default function SignUp() {

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [password2Error, setPassword2Error] = useState(false);
    const [password2ErrorMessage, setPassword2ErrorMessage] = useState('');
    const [usernameError, setUserNameError] = useState(false);
    const [usernameErrorMessage, setUserNameErrorMessage] = useState('');
    const {registerUser} = useContext(AuthContext)
    const navigate = useNavigate();
   
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    
    const validateInputs = () => { 

      let isValid = true;
      
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setEmailError(true);
        setEmailErrorMessage('Please enter a valid email address.');
        isValid = false;
      } else {
        setEmailError(false);
        setEmailErrorMessage('');
      }
      
      if (!password || password.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage('Password must be at least 6 characters long.');
        isValid = false;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage('');
      }
      
      if (!username || username.length < 1) {
        setUserNameError(true);
        setUserNameErrorMessage('Name is required.');
        isValid = false;
      } else {
        setUserNameError(false);
        setUserNameErrorMessage('');
      }
      
      if (password !== password2) {
        setPassword2Error(true);
        setPassword2ErrorMessage('Passwords do not match.');
        isValid = false;
      } else {
        setPassword2Error(false);
        setPassword2ErrorMessage('');
      }
      
      return isValid;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!validateInputs()) {
          return;
      }
  
      const username = e.target.username.value;
      const email = e.target.email.value;
      const password = e.target.password.value;  // Виправлено
      const password2 = e.target.password2.value;  // Виправлено
  
      console.log({ email, username, password, password2 }); // Перевіримо, що дані є
  
      const response = await fetch("http://hth-backend-tks7.onrender.com/users/register/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password, password2 }),
      });
  
      const data = await response.json();
      if (response.ok) {
          console.log("Registration successful!", data);
          navigate('/login');
      } else {
          console.error("Registration failed:", data);
      }
  };
  

    return (
      <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: "100%" }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="username">Full name</FormLabel>
            <TextField
              autoComplete="username"
              name="username"
              required
              fullWidth
              id="username"
              placeholder="Jon Snow"
              error={usernameError}
              helperText={usernameErrorMessage}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password2">Confirm password</FormLabel>
            <TextField
              required
              fullWidth
              name="password2"
              placeholder="••••••"
              type="password"
              id="password2"
              autoComplete="new-password"
              variant="outlined"
              error={password2Error}
              helperText={password2ErrorMessage}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </FormControl>
          <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive updates via email." />
          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* <Button fullWidth variant="outlined" onClick={() => alert("Sign up with Google")}>
            Sign up with Google
          </Button>
          <Button fullWidth variant="outlined" onClick={() => alert("Sign up with Facebook")}>
            Sign up with Facebook
          </Button> */}
          <Typography sx={{ textAlign: "center" }}>
            Already have an account? <Link href="/login" variant="body2">Sign in</Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>

  )
}