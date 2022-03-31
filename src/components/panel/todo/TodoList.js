import { Container, Divider, Chip, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  fetchTodos,
  editTodo,
} from "../../../store/slices/todoSlice";
import { Delete } from "@mui/icons-material";
export default function TodoDataTable() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const handleCellEditCommit = async (params) => {
    let editedId = params.id;
    let editedValue = params.value;
    let editedField = params.field;
    let editedTodo = todos.find((todo) => todo.id === editedId);
    let editedTodoCopy = { ...editedTodo, [editedField]: editedValue };
    await dispatch(editTodo(editedTodoCopy));
    dispatch(fetchTodos());
  };
  console.log(todos);
  const handleDeleteClick = async (id) => {
    await dispatch(deleteTodo(id));
    dispatch(fetchTodos());
  };
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions({ id }) {
        return [
          <IconButton onClick={() => handleDeleteClick(id)}>
            {" "}
            <Delete />{" "}
          </IconButton>,
        ];
      },
    },
    { field: "title", headerName: "Title", width: 150, editable: true },
    { field: "content", headerName: "Content", width: 150, editable: true },
  ];
  return (
    <Container sx={{ padding: "10px 0" }}>
      <Divider sx={{ margin: "30px 0" }}>
        <Chip label="Todos Table" />
      </Divider>
      <Container style={{ height: 400, width: "100%" }}>
        <DataGrid
          onCellEditCommit={handleCellEditCommit}
          rows={todos}
          columns={columns}
        />
      </Container>
    </Container>
  );
}
