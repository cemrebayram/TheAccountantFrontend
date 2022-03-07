import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from '../../service/axios'
export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
    let todos = await axios.get('/todo')
    return todos.data.map(todo => ({
        id: todo._id,
        title: todo.title,
        content: todo.content,
    }))
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo',async(id)=>{
    let deleted = await axios.delete(`/todo/${id}`)
    return deleted;
})

export const editTodo = createAsyncThunk('todo/editTodo',async(todo)=>{
    let edited = await axios.put(`/todo/${todo.id}`,todo)
    return edited;
})

export const addTodo = createAsyncThunk('todo/createTodo', async (todo) => {
    let newTodo = await axios.post('/todo', todo)
    return {
        id: newTodo.data._id,
        title: newTodo.data.title,
        content: newTodo.data.content,
    }
});

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        newTodo: {
            id: '',
            title:'',
            content:''
        },
        todos: [],
    },
    reducers: {
        setNewTodo: (state, action) => {
            state.newTodo = action.payload;
        },
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        clearNewTodo: (state) => {
            state.token = '';
            state.newTodo = {
                id: '',
                title:'',
                content:''
            };
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
        });
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.todos.push(action.payload);
        });
        builder.addCase(deleteTodo.fulfilled,(state,action)=>{
            fetchTodos()
        })
    }
})

export const { setTodos, clearNewTodo, setNewTodo } = todoSlice.actions

export default todoSlice.reducer