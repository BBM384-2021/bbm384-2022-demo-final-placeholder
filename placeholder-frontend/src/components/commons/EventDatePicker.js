import {DateTimePicker} from '@mui/lab';
import {Stack, TextField} from '@mui/material';
import React from 'react';

export const EventDatePicker = () => {
    const [selectedDate, setSelectedDate] = React.useState(
        new Date("2022-03-03T12:00:00")
    )

    return (
        <Stack marginLeft={2.7} marginBottom={1.5} marginTop={2.7} spacing={4} sx = {{width: '250px'}}>
            <DateTimePicker
                label='Event Date'
                renderInput={(params) => <TextField{...params}/>}
                value={selectedDate}
                onChange={(newValue) => {
                    setSelectedDate(newValue)
                }}
            />

        </Stack>
    )
}