"use client"
import { GridCallbackDetails, GridRowSelectionModel } from "@mui/x-data-grid";

export const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    console.log('選択された行:', rowSelectionModel);
  };