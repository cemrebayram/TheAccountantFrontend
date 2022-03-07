import React from 'react'
import {Container} from '@mui/material'

import TodoInputs from '../../components/panel/todo/TodoInputs'
import TodoList from '../../components/panel/todo/TodoList'

export default function Todo() {
    return (
        <Container>
            <TodoInputs />
            <TodoList />
        </Container>
    )
}
