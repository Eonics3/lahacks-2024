import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import DragAndDrop from 'components/DragAndDrop';
import styles from './UploadPage.module.css';

const Input = styled('input')({
  display: 'none',
});  


const UploadPage = ({setScreen}) => {

  return (
    <div style = {{height: '100vh'}}>
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px'}}>
        <h1 style={{ fontWeight: '700', fontSize: '24px', marginBottom: '10px', color: '#333' }}>
          Input Company Data
        </h1>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '0px' }}> {/* Adjusted marginBottom to '0px' */}
          A free AI-powered helper for Sustainability analysis. We use Large Language Model Agents combined with Retrieval Augmented Generation to help visualize and deliver key insights for company greenhouse gas emissions. Our calculations are based on the 2023 US Environment Protection Agency's Emissions Factors report.
        </p>
        <ol style={{ paddingLeft: '20px', listStyleType: 'decimal', marginBottom: '0px' }}> {/* Adjusted marginBottom to '0px' */}
          <li>Drag or select a .csv file into the drag and drop below.</li>
          <li>Click to download our visualizations. Interact with an LLM for further findings.</li>
        </ol>
        <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '10px' }}>
          <DragAndDrop setScreen={setScreen} />
        </div>
      </div>
    </div>
  );

}

export default UploadPage;