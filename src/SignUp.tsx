import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { GithubLoginButton } from 'react-social-login-buttons'
import firebase from './utils/firebase'

type State = {
  email: string
  password: string
}

const initialState = {
  email: '',
  password: '',
}

const SignUp: React.FC = () => {
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // user signed in
      } else {
        // user not signed in
      }
    })
  }, [])

  const handleSignUpWithGitHub = useCallback(async () => {
    const provider = new firebase.auth.GithubAuthProvider()

    try {
      const currentUser = await firebase.auth().currentUser

      const res = currentUser
        ? await currentUser.linkWithPopup(provider)
        : await firebase.auth().signInWithPopup(provider)

      console.log('res: ', res)
    } catch (err) {
      // error handling
      console.error(err)
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(s => ({ ...s, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault()

    const { email, password } = state

    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
      console.log('res: ', res)
    } catch (e) {
      // error handling
      console.error(e)
    }

  }, [state])

  return (
    <div className="h-screen flex justify-center items-center">
      <div className='
        max-w-md
        py-4
        border-2
        rounded-lg
        bg-white
        text-center
        '>
        <div className="m-10">
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography component="h1" variant="h6">
              Sign up
            </Typography>
            <p className='m-4 text-lg'>
              <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={state.email}
              autoComplete="email"
              onChange={handleChange}
              />
            </p>
            <p className='m-4 text-lg'>
               <TextField
                 variant="outlined"
                 required
                 fullWidth
                 name="password"
                 label="Password"
                 type="password"
                 id="password"
                 value={state.password}
                 autoComplete="current-password"
                 onChange={handleChange}
               />
            </p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>

            <Grid item xs={12}>
              <div>or</div>
            </Grid>
          </form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <GithubLoginButton
                onClick={handleSignUpWithGitHub}>
                <span>Sign up with Github</span>
              </GithubLoginButton>
            </Grid>

            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
              My Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </div>
    </div>
  );
}

export default SignUp