import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import DragAndDrop from 'components/DragAndDrop';
import styles from './UploadPage.module.css';

const Input = styled('input')({
  display: 'none',
});

const UploadPage = ({setScreen}) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px'}}>
        <h2 className={styles.pageHeading}>Your descriptive text here</h2> {/* Add this line */}
        <div style={{ maxWidth: 1000, margin: '40px auto', padding: '20px' }}>
          <DragAndDrop setScreen = {setScreen}/>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;