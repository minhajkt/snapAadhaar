import {  Typography, TextField, Stack, Paper } from "@mui/material";
import { AadhaarDataType } from "../types/types";

const AadhaarData = ({ data } : {data: AadhaarDataType}) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#fafafa" }}>
      <Typography variant="h5" gutterBottom>
        Extracted Aadhaar Data
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Name"
          value={data.name}
          variant="outlined"
          fullWidth
          disabled
        />
        <TextField
          label="Aadhaar Number"
          value={data.aadhaarNumber}
          variant="outlined"
          fullWidth
          disabled
        />
        <TextField
          label="Date of Birth"
          value={data.dob}
          variant="outlined"
          fullWidth
          disabled
        />
        <TextField
          label="Gender"
          value={data.gender}
          variant="outlined"
          fullWidth
          disabled
        />
        <TextField
          label="Address"
          value={data.address}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          disabled
        />
      </Stack>
    </Paper>
  );
};

export default AadhaarData;
