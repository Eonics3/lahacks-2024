import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setMessage('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to upload file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Input a CSV or XLSX File
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="contained-button-file">
          <Input 
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
            id="contained-button-file" 
            multiple 
            type="file" 
            onChange={handleFileChange} 
          />
          <Button 
            variant="contained" 
            component="span"
          >
            Browse Files
          </Button>
        </label>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          // This will disable the 'Upload' button when no file is selected or while loading
          disabled={!file || loading} 
          style={{ marginLeft: 20 }}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </form>
      {message && (
        <Alert severity={message.includes('Failed') ? 'error' : 'success'} style={{ marginTop: 20 }}>
          {message}
        </Alert>
      )}
    </div>
  );
}

export default UploadPage;
