import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles(theme => ({

    parent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space - between'
    },
    textField: {
        width: '100%',
        margin: theme.spacing(1)
    },
    messages: {
        height: '80vh',
        maxheight: '80vh',
        overflow: 'auto'
    },
    floatRight: {
        float: 'right',
        margin: theme.spacing(1)
    },
    floatLeft: {
        float: 'left',
        margin: theme.spacing(1)
    }

}));

export default function BasicTextFields(props) {
    const classes = useStyles();
    const [message, setMessage] = React.useState("");
    const [allMessages, setAllMessages] = React.useState([]);

    React.useEffect(() => {

        const handleMessage = (event) => {
            setAllMessages([...allMessages, { type: 'inBound', message: event.detail }]);
        }
        var element = document.getElementById("messageContainer" + props.compId);
        element.scrollTop = element.scrollHeight + 100;
        window.addEventListener(props.compId, handleMessage, false);
        return () => {
            window.removeEventListener(props.compId, handleMessage, false);
        };
    });


    const handleSend = () => {
        setAllMessages([...allMessages, { type: 'outBound', message: message }]);
        window.dispatchEvent(new CustomEvent(props.target, { detail: message }));
        setMessage("");
    }

    return (
        <Grid container className={classes.root} >
            <Grid item xs={12}>
                <Typography variant="h6" >
                    {props.title}
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.messages} id={'messageContainer' + props.compId}>
                <Grid container>
                    {allMessages.map((msg, index) => (
                        msg.type === 'inBound' ?
                            <Grid item xs={12} key={'grid' + index}>
                                <Chip
                                    label={msg.message}
                                    key={index}
                                    className={classes.floatLeft}
                                    color="primary"
                                />
                            </Grid>
                            :
                            <Grid item xs={12} key={'grid' + index}>
                                <Chip
                                    label={msg.message}
                                    key={index}
                                    className={classes.floatRight}
                                    color="secondary"
                                />
                            </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <TextField id="filled-basic"
                    label="Enter message"
                    variant="outlined"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className={classes.textField} />
            </Grid>
            <Grid item xs={4}>
                <Fab color="primary" aria-label="add" onClick={handleSend}>
                    <SendIcon />
                </Fab>
            </Grid>
        </Grid>
    );
}