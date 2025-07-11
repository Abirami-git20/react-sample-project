import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRowModel,
  GridPaginationModel,
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

const STORAGE_KEY = 'studentRows';

const defaultRows: GridRowsProp = [
  { id: 1, name: 'Abirami', class: '10A', tamil: 90, english: 85, maths: 92, cs: 95, science: 88, total: 450 },
  { id: 2, name: 'Dharshinee', class: '10A', tamil: 80, english: 88, maths: 79, cs: 85, science: 90, total: 422 },
  { id: 3, name: 'Manoshabari', class: '10B', tamil: 85, english: 78, maths: 90, cs: 92, science: 89, total: 434 },
  { id: 4, name: 'Santhosh', class: '10B', tamil: 75, english: 80, maths: 84, cs: 88, science: 77, total: 404 },
  { id: 5, name: 'Siva', class: '10C', tamil: 89, english: 91, maths: 87, cs: 90, science: 86, total: 443 },
  { id: 6, name: 'Kavya', class: '10C', tamil: 70, english: 75, maths: 78, cs: 82, science: 79, total: 384 },
  { id: 7, name: 'Raj', class: '10A', tamil: 88, english: 82, maths: 85, cs: 87, science: 80, total: 422 },
  { id: 8, name: 'Meena', class: '10B', tamil: 92, english: 93, maths: 90, cs: 96, science: 91, total: 462 },
  { id: 9, name: 'Arjun', class: '10C', tamil: 78, english: 81, maths: 85, cs: 80, science: 84, total: 408 },
  { id: 10, name: 'Sneha', class: '10A', tamil: 85, english: 89, maths: 88, cs: 90, science: 87, total: 439 },
  { id: 11, name: 'Deepak', class: '10B', tamil: 83, english: 84, maths: 81, cs: 79, science: 86, total: 413 },
  { id: 12, name: 'Hari', class: '10C', tamil: 90, english: 88, maths: 92, cs: 94, science: 89, total: 453 },
  { id: 13, name: 'Anjali', class: '10A', tamil: 91, english: 86, maths: 89, cs: 92, science: 88, total: 446 },
  { id: 14, name: 'Karthik', class: '10B', tamil: 76, english: 79, maths: 83, cs: 85, science: 80, total: 403 },
  { id: 15, name: 'Ramya', class: '10C', tamil: 84, english: 85, maths: 87, cs: 89, science: 85, total: 430 },
  { id: 16, name: 'Priya', class: '10A', tamil: 88, english: 90, maths: 91, cs: 93, science: 89, total: 451 },
  { id: 17, name: 'Vikram', class: '10B', tamil: 82, english: 83, maths: 86, cs: 84, science: 81, total: 416 },
  { id: 18, name: 'Varsha', class: '10C', tamil: 87, english: 89, maths: 90, cs: 91, science: 88, total: 445 },
  { id: 19, name: 'Naveen', class: '10A', tamil: 86, english: 88, maths: 84, cs: 86, science: 85, total: 429 },
  { id: 20, name: 'Lavanya', class: '10B', tamil: 90, english: 87, maths: 89, cs: 90, science: 88, total: 444 },
];

export default function EditableGridWithSubmit() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [nextId, setNextId] = useState(defaultRows.length + 1);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedRows = localStorage.getItem(STORAGE_KEY);
    if (savedRows) {
      try {
        const parsedRows = JSON.parse(savedRows);
        if (Array.isArray(parsedRows) && parsedRows.length > 0) {
          setRows(parsedRows);
          setNextId(parsedRows.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1);
          return;
        }
      } catch {
        // fall back to defaultRows if parsing fails
      }
    }
    setRows(defaultRows);
    setNextId(defaultRows.length + 1);
  }, []);

  // Update row with recalculated total but DO NOT save immediately
  const handleRowUpdate = (newRow: GridRowModel) => {
    const total =
      Number(newRow.tamil || 0) +
      Number(newRow.english || 0) +
      Number(newRow.maths || 0) +
      Number(newRow.cs || 0) +
      Number(newRow.science || 0);

    const updatedRow = { ...newRow, total };

    setRows((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );

    return updatedRow;
  };

  // Add new student row
  const handleAddStudent = () => {
    const newStudent = {
      id: nextId,
      name: '',
      class: '',
      tamil: 0,
      english: 0,
      maths: 0,
      cs: 0,
      science: 0,
      total: 0,
    };
    setRows((prev) => [...prev, newStudent]);
    setNextId((prevId) => prevId + 1);
  };

  // Save current rows state to localStorage when submit/save clicked
  const handleSubmit = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    alert('Changes saved!');
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'class', headerName: 'Class', width: 100, editable: true },
    { field: 'tamil', headerName: 'Tamil', width: 100, editable: true, type: 'number' },
    { field: 'english', headerName: 'English', width: 100, editable: true, type: 'number' },
    { field: 'maths', headerName: 'Maths', width: 100, editable: true, type: 'number' },
    { field: 'cs', headerName: 'CS', width: 100, editable: true, type: 'number' },
    { field: 'science', headerName: 'Science', width: 100, editable: true, type: 'number' },
    { field: 'total', headerName: 'Total', width: 100, editable: false, type: 'number' },
  ];

  return (
    <Box sx={{ width: '100%', height: 600 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Button variant="contained" color="primary" onClick={handleAddStudent}>
          Add Student
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPaginationModel(model)}
        pageSizeOptions={[5]}
        processRowUpdate={handleRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
