import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import {AuthService} from "../service/AuthService";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import {Snackbar} from "@material-ui/core";
import Copyright from "../component/common/Copyright";
import {Alert} from "@material-ui/lab";
import {delay} from "../util/async";
import {MemberService} from "../service/MemberService";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const history = useHistory()

    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

    const [open, setSnackbarOpen] = React.useState(false);
    const [severity, setSnackbarSeverity] = React.useState("success");
    const [snackbarMessage, setSnackbarMessage] = React.useState("Welcome back!");


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>

                <Avatar className={classes.avatar}> <LockOutlinedIcon/> </Avatar>
                <Typography component="h1" variant="h5"> Login </Typography>

                <form className={classes.form} noValidate>
                    <TextField
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(event) => {
                            event.preventDefault();
                            console.log("Sign in button clicked.");
                            AuthService.login(username, password).then(r => {
                                console.log("Response: " + JSON.stringify(r.data));
                                AuthService.saveJwtToken(r.data.token);
                                AuthService.saveAuthRoles(r.data.auth);
                                setSnackbarSeverity("success");
                                setSnackbarMessage("Welcome back!");
                                setSnackbarOpen(true);

                                delay(1000).then(() => {
                                    if(r.data.enrollmentCount === 0){
                                        history.push("/subclub-recommendation");
                                    }
                                    else{
                                        history.push("/")
                                    }
                                })
                            }).catch(e => {
                                setSnackbarSeverity("error");
                                if (e.response !== undefined && e.response.status === 401) {
                                    setSnackbarMessage("Entered credentials are incorrect.");
                                } else {
                                    setSnackbarMessage("Something went wrong!");
                                }
                                setSnackbarOpen(true);
                            })
                        }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/password-reset" variant="body2"> Forgot password? </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2"> {"Don't have an account? Sign up."} </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={severity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}