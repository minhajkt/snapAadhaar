import { Box, Button, Paper, Stack, Typography, Snackbar } from "@mui/material";
import { useState } from "react";
import AadhaarData from "./AadhaarData";
import InputFileUpload from "./UploadButton";
import CircularProgress from "@mui/joy/CircularProgress";
import { uploadAadhaarImages } from "../service/upload";

const Home = () => {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [error, setError] = useState("");

  const handle = async () => {
    if (!frontFile || !backFile) {
      return;
    }

    try {
      setProcessing(true);
      setOcrResult(null);
      setError("");
      const res = await uploadAadhaarImages(frontFile, backFile);
      setOcrResult(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      setError(errorMessage);
      setSnackbar(true);
      console.error("Error processing ocr", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleClear = () => {
    setFrontFile(null);
    setBackFile(null);
    setOcrResult(null);
    setError("");
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 2, position: "relative" }}>
      {processing && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          height: { md: "100%" },
          // alignItems:'center'
        }}
      >
        <Stack
          spacing={2}
          sx={{ width: { xs: "100%", md: "50%", height: "95vh" } }}
        >
          {(
            [
              ["Front", frontFile, setFrontFile],
              ["Back", backFile, setBackFile],
            ] as [string, File | null, (file: File) => void][]
          ).map(([label, file, setFile]) => (
            <Paper
              key={label}
              elevation={3}
              sx={{
                p: 2,
                flex: 1,
                bgcolor: "#f8f8f8",
                border: "1px solid #ddd",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Upload {label} side of Aadhaar
              </Typography>
              <InputFileUpload
                label={file ? "Uploaded" : "Upload File"}
                onFileSelect={setFile}
              />
              {file && (
                <Box mt={2}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`${label} Aadhaar Preview`}
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
            </Paper>
          ))}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!frontFile || !backFile || processing}
            onClick={handle}
            sx={{ mt: 1 }}
          >
            {processing ? "Processing..." : "Process"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleClear}
          >
            Clear
          </Button>
        </Stack>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            bgcolor: "#f0f0f0",
            p: { md: 2 },
            borderRadius: 2,
          }}
        >
          {ocrResult ? (
            <AadhaarData data={ocrResult} />
          ) : (
            <Typography color="text.secondary">
              You will see the data once you upload the images and click{" "}
              <strong>Process</strong>.
            </Typography>
          )}
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        autoHideDuration={3000}
        message={error || "Please add a aadhaar"}
      />
    </Box>
  );
};

export default Home;
