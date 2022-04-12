import React from 'react';


// const useStyles = makeStyles((theme) => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

export default function Login() {
    // const classes = useStyles();
    // const history = useHistory()

    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");


    const handleLogin = (event) => {
        event.preventDefault();
        // console.log("Sign in button clicked.");
        // AuthService.login(username, password).then(r => {
        //     console.log("Response: " + JSON.stringify(r.data));
        //     AuthService.saveJwtToken(r.data.token);
        //     AuthService.saveAuthRoles(r.data.auth);
        //     setSnackbarSeverity("success");
        //     setSnackbarMessage("Welcome back!");
        //     setSnackbarOpen(true);

        //     delay(1000).then(() => {
        //         if(r.data.enrollmentCount === 0){
        //             history.push("/subclub-recommendation");
        //         }
        //         else{
        //             history.push("/")
        //         }
        //     })
        // }).catch(e => {
        //     setSnackbarSeverity("error");
        //     if (e.response !== undefined && e.response.status === 401) {
        //         setSnackbarMessage("Entered credentials are incorrect.");
        //     } else {
        //         setSnackbarMessage("Something went wrong!");
        //     }
        //     setSnackbarOpen(true);
        // })
    }


    return (
        <div component="main" maxWidth="xs">
            <div>

                <h3> Login </h3>

                <form className='login-form' noValidate>
                    <input type='text'
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                    />
                    <input type='password'
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    /> */}
                    <button type='submit'
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='submit'
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="/password-reset" variant="body2"> Forgot password? </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2"> {"Don't have an account? Sign up."} </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
        </div>
    );
}