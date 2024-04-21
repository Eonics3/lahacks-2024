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
      const response = await fetch('http://127.0.0.1:8080/upload', {
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

<<<<<<< HEAD


export default FileUploader;


// const upload = multer({
//     storage: multer.diskStorage({
//         destination: './public/uploads', // Ensure this directory exists or configure it as needed
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
//         }
//     }),
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === "text/csv" || file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
//             cb(null, true);
//         } else {
//             cb(new Error('Only .csv and .xlsx files are allowed!'), false);
//         }
//     }
// });

// const handler = nextConnect();

// handler.use(upload.single('file'));

// handler.post((req: NextApiRequest, res: NextApiResponse) => {
//     if (req.file) {
//         res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
//     } else {
//         res.status(400).json({ message: 'File not uploaded or wrong file type.' });
//     }
// });

// export default handler;

// function DummyUpload(){

//     return (       
//     <div>
//         <p>Upload</p>
//     </div>);
// }

// export default DummyUpload;
  

// import type { NextApiRequest, NextApiResponse } from 'next';
// import nextConnect from 'next-connect';
// import multer from 'multer';

// // Configure multer for file storage
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: './public/uploads', // Ensure this directory exists or configure it as needed
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
//         }
//     }),
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === "text/csv" || file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
//             cb(null, true);
//         } else {
//             cb(new Error('Only .csv and .xlsx files are allowed!'), false);
//         }
//     }
// });

// const handler = nextConnect();

// handler.use(upload.single('file'));

// handler.post((req: NextApiRequest, res: NextApiResponse) => {
//     if (req.file) {
//         res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
//     } else {
//         res.status(400).json({ message: 'File not uploaded or wrong file type.' });
//     }
// });

// export default handler;
=======
export default UploadPage;
>>>>>>> 82268ca13bc0e7327ce52562417d6a0d6c1dd714
