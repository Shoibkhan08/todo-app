import React, {useEffect, useMemo, useState} from 'react';
import AddItem from "./AddItem.jsx";
import {Grid} from "@mui/material";
import { useFormik } from 'formik';
import axios from "axios";
import List from './List.jsx'


function TodoWrapper() {
    const [reload, setReload] = useState(false);
    const [todos, setTodos] = useState();
    const [getId, setId] = useState();

    //getTodo
    const getTodo = async ()=>{
        const res = await axios.get(`https://655c28d5ab37729791a9f259.mockapi.io/user/`)
        setTodos(res.data)
        console.log(res.data)
    }

    //PostTodo
    const {handleBlur,handleChange,handleSubmit,values,setValues} = useFormik({
        initialValues: {
            title:"",
            description:"",
            completed:false,
            isEditing:false,

        },
        onSubmit:async (value,action)=>{
            try {
                if (getId){
                    const res = await axios.put(`https://655c28d5ab37729791a9f259.mockapi.io/user/${getId}`,{
                        title: value.title,
                        description: value.description,
                    })
                    console.log('getid')
                    action.resetForm(); // Reset form after submission
                    setId(null)
                    setReload(!reload);
                }else {
                    const res = await axios.post(`https://655c28d5ab37729791a9f259.mockapi.io/user/`, {
                        title: value.title,
                        description: value.description,
                    });
                    action.resetForm(); // Reset form after submission
                    setReload(!reload);
                }

                 // Trigger reload or state update
            } catch (error) {
                console.error("Error submitting the form:", error);
            }
        }
    })
    useEffect(() => {
        getTodo()
    }, [reload]);

    // Delete Todo
    const deleteTodo = async (id) =>{
        const res = await axios.delete(`https://655c28d5ab37729791a9f259.mockapi.io/user/${id}`);
        const newData = await todos.filter((todo)=>{return todo.id !== id})
        setReload(!reload);
    }

    // Edit Todo
    const editTodo = (e) => {
        setValues({title: e.title,description: e.description})
        setId(e.id)
        console.log(e)
    }

    const memolist = useMemo(() => {
        return(
            <>
                <Grid container>
                    {todos  ? (
                        todos.map((todo) => (
                            <Grid item xl={12} sm={12} xs={12} px={2} key={todo.id}>
                                <Grid item sm={6} mx={'auto'} py={2}  >
                                    <List todo={todo} deleteTodo={deleteTodo} editTodo={editTodo}/>
                                </Grid>
                            </Grid>
                        ))
                    ) : (
                        <Grid item sm={12}>
                            <p>No todos available or check Internet connection</p>
                        </Grid>
                    )}
                </Grid>
            </>
        )
    }, [todos]);

    return (
        <>
        <Grid container sx={{position:'sticky',top:'0',zIndex:'99',background:'white',display:'flex',justifyContent:'center'}} >

            <Grid item sm={12} xl={12} xs={12} sx={{textAlign:"center",background:'#097ddb',color:"white",}}>
                <h1>ToDo List</h1>

            </Grid>
            <Grid item xl={10} sm={10} >
                <AddItem handleSubmit={handleSubmit} handleBlur={handleBlur} handleChange={handleChange} values={values}/>
            </Grid>
        </Grid>
            {memolist}
        </>
    )
}

export default TodoWrapper