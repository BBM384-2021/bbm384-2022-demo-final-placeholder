export const modalStyles = {
    wrapper: {
        fontFamily: 'Poppins',//alo
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
        borderRadius : 5,

    },
    inputFields: {
        fontFamily: 'Poppins',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '15px',
        '.MuiInput-root': {
            marginBottom: '20px',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'end',
    }
};