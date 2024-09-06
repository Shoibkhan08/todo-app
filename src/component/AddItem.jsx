import * as React from 'react';
import {Button, Box, TextField, Grid} from '@mui/material';

export default function AddItem({handleBlur,handleChange,handleSubmit,values,}) {
    return (
        <>
        <Box container="true"
             m={2}
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: '2px 4px',display:{sm:'flex'},justifyContent:'center'}}
        >
            <Grid item xl={12} sm={12} xs={12} p={1}>
                <TextField fullWidth id="filled-basic"   name="title" value={values.title} onChange={handleChange} onBlur={handleBlur}  sx={{ ml: 1, flex: 1 }} label="title"/>
            </Grid>

            <Grid item xl={12} sm={12} xs={12} p={1}>
                <TextField fullWidth label="description" name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} sx={{ ml: 1, flex: 1 }} />
            </Grid>

            <Grid item xl={12} sm={2} xs={12} p={2}>
                <Button type={"submit"} variant="contained">Add</Button>
            </Grid>

        </Box>

        </>
    );
}
