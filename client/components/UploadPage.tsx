import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import DragAndDrop from 'components/DragAndDrop'

const Input = styled('input')({
  display: 'none',
});

const UploadPage = ({setScreen}) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files && files[0]) {
  //     setFile(files[0]);
  //     setMessage('');
  //   }
  // };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (!file) {
  //     setMessage('Please select a file to upload.');
  //     return;
  //   }
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const response = await fetch('http://127.0.0.1:8080/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     setMessage(data.message);
  //     setScreen(1);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setMessage('Failed to upload file.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

        {/* <Typography variant="h5" gutterBottom>
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
    </div> */}

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '20px' }}>
      <DragAndDrop setScreen = {setScreen}/>
    </div>
  );
}

export default UploadPage;