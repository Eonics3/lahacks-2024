// import type { NextApiRequest, NextApiResponse } from 'next';
// import nextConnect from 'next-connect';
// import multer from 'multer';
import React from 'react';

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

function DummyUpload(){

    return (       
    <div>
        <p>Upload</p>
    </div>);
}

export default DummyUpload;
  

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
