import React, { useState } from "react";
import {
    Modal,
    IconButton,
    CircularProgress,
    TextareaAutosize,
    Alert, Stack, TextField,
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import { addEvent } from "../../services/EventService";
import sendIcon from "../../img/paper-plane.png";
import CloseIcon from '@mui/icons-material/Close';
import "./eventCreateBox.css";

export const EventDatePicker = ({selectedDate, setSelectedDate, label}) => {

    return (
        <Stack marginLeft={3.7} marginBottom={1.5} marginTop={2.7} spacing={4} sx = {{width: '250px'}}>
            <DateTimePicker
                label={label}
                renderInput={(params) => <TextField{...params}/>}
                value={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date)
                }}
            />
        </Stack>
    )
}

export default function EventCreateBox({ user, open, setOpen }) {

    const [selectedStartDate, setSelectedStartDate] = React.useState(
        new Date()
    );

    const [selectedEndDate, setSelectedEndDate] = React.useState(
        new Date()
    );

    const [eventContent, setEventContent] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [preview, setPreview] = useState();
    const [waitResponse, setWaitResponse] = useState(false);
    const [emptyAlert, setEmptyAlert] = useState(false);

    const [state, setState] = useState({
        isLoading: false,
        value: 0,
        postKey: -1,
    });

    const handleEventChange = (event) => {
        setEventContent(event.target.value);
    };

    const handleLocationChange = (event) => {
        setEventLocation(event.target.value);
    };

    const handleClose = () => {
        setEventContent("");
        setPreview(undefined);
        setState({
            isLoading: false,
            value: 0,
            postKey: -1,
            postVisualData: undefined,
        });
        setEmptyAlert(false);
        setOpen(false);
    };

    const onEventCreateClick = () => {
        setWaitResponse(true);

        const customUrl = "newPost" + Math.floor(Math.random() * 100);

        setState({ ...state, postKey: customUrl });

        if (!eventContent || !eventLocation) {
            setEmptyAlert(true);
        } else {
            addEvent(user.id, eventContent, new Date().toISOString(), eventLocation, selectedStartDate, selectedEndDate)
                .then(() => {
                    setWaitResponse(false);
                    handleClose();
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
            <div className="event-create-container">
                <div className="event-create-header">
                    <div className="event-create-header-inner">
                        <img
                            className="event-create-header-profile-pic"
                            src={user.profile_pic_path}
                            alt="event-profile"
                        />
                        <p>Create an event</p>
                    </div>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <hr/>
                {emptyAlert && (
                    <Alert severity="error">{"Event body can NOT be empty!"}</Alert>
                )}

                <div>
                    <TextareaAutosize
                        className="event-content-input"
                        aria-label="minimum height text area"
                        minRows={3}
                        maxRows={8}
                        placeholder=" Type something..."
                        onChange={handleEventChange}
                        value={eventContent}
                    />
                </div>
                <div>
                    <TextareaAutosize
                        className="event-location-input"
                        aria-label="minimum height text area"
                        minRows={2}
                        maxRows={2}
                        placeholder="  Event link or location..."
                        onChange={handleLocationChange}
                        value={eventLocation}
                    />
                </div>

                <div className="event-date-container">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <EventDatePicker selectedDate = {selectedStartDate} setSelectedDate = {setSelectedStartDate} label = 'Start Date'/>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <EventDatePicker selectedDate = {selectedEndDate} setSelectedDate = {setSelectedEndDate} label = 'End Date'/>
                    </LocalizationProvider>
                </div>

                <div className="event-config-bar">

                    {waitResponse ? (
                        <CircularProgress />
                    ) : (
                        <IconButton
                            className="send-event-button"
                            onClick={onEventCreateClick}
                        >
                            <img
                                src={sendIcon}
                                alt="event-send-icon"
                                style={{ height: "24px" }}
                            />
                        </IconButton>
                    )}
                </div>
            </div>
        </Modal>
    );
}
