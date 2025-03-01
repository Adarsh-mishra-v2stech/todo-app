import { useTodos } from "../Context/useTodoContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Grid2 as Grid, Autocomplete } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const DateRangeFilter = () => {
  const {
    dateRange,
    setDateRange,
    sortByTitle,
    searchTitle,
    setSortByTitle,
    setSearchTitle,
    setSortByPriority,
    sortByPriority,
    todos,
    completedStatus,
    setCompletedStatus,
  } = useTodos();

  const handleSortByTitle = () => {
    setSortByPriority("");
    setSortByTitle(sortByTitle === "asc" ? "desc" : "asc");
  };

  const handleSortByPriority = () => {
    setSortByTitle("");
    setSortByPriority(sortByPriority === "asc" ? "desc" : "asc");
  };

  return (
    <Box className="date-range-filter" ml={4}>
      <h3>Filter & Sort</h3>
      <Grid container spacing={2}>
        <Grid>
          <Autocomplete
            sx={{ width: 250 }}
            size="small"
            options={todos}
            disablePortal
            id="combo-box-demo"
            renderInput={(params) => (
              <TextField
                label="Search by Title"
                {...params}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            )}
            getOptionLabel={(option) => option.title}
            onChange={(e, value) => setSearchTitle(value?.title || "")}
          />
        </Grid>
        <Grid>
          <FormControl sx={{ width: 100 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={completedStatus}
              label="Status"
              onChange={(e) => setCompletedStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={dateRange.start ? dayjs(dateRange.start) : null}
              onChange={(newValue) =>
                setDateRange({
                  ...dateRange,
                  start: newValue ? newValue.toISOString() : "",
                })
              }
              slotProps={{ textField: { size: "small", required: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={dateRange.end ? dayjs(dateRange.end) : null}
              onChange={(newValue) =>
                setDateRange({
                  ...dateRange,
                  end: newValue ? newValue.toISOString() : "",
                })
              }
              slotProps={{ textField: { size: "small", required: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <Button
            onClick={() => setDateRange({ start: "", end: "" })}
            disabled={!dateRange.start && !dateRange.end}
            fullWidth
            variant="contained"
          >
            <CloseIcon />
          </Button>
        </Grid>

        <Grid>
          <Button
            onClick={() => handleSortByTitle()}
            fullWidth
            variant="contained"
          >
            Name{" "}
            {sortByTitle === "asc" ? (
              <ArrowUpwardIcon sx={{ fontSize: "18px" }} />
            ) : (
              <ArrowDownwardIcon sx={{ fontSize: "18px" }} />
            )}
          </Button>
        </Grid>
        <Grid>
          <Button
            onClick={() => handleSortByPriority()}
            fullWidth
            variant="contained"
          >
            Priority
            {sortByPriority === "asc" ? (
              <ArrowUpwardIcon sx={{ fontSize: "18px" }} />
            ) : (
              <ArrowDownwardIcon sx={{ fontSize: "18px" }} />
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DateRangeFilter;
