import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {Button, Grid} from "@mui/material";
import Moremenu from "./Moremenu.jsx";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function List({todo,deleteTodo,editTodo}) {


    return (
        <div>
            <Accordion >
                <Grid item sm={12} sx={{display:'flex',justifyContent: 'space-between',alignItems:'center'}}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Grid container >
                            <Grid item py={1} >{todo.title}</Grid>


                        </Grid>

                    </AccordionSummary>
                    <Grid item sx={{alignItems:'center'}}>
                        <Moremenu deleteTodo={deleteTodo} editTodo={editTodo} todo={todo} />
                    </Grid>

                </Grid>

                <AccordionDetails>
                    <Typography>
                        {todo.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>


        </div>
    );
}
