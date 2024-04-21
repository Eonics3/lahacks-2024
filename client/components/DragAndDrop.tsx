import React, { useRef, useState } from "react";
import { CircularProgress, Alert } from "@mui/material";
import styles from "./DragAndDrop.module.css";

export default function DragAndDrop() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setMessage("");
    }
  }

  function removeFile() {
    setFile(null);
    setMessage("");
  }

  function openFileExplorer() {
    inputRef.current.click();
  }

  async function handleUpload() {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8080/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message);
      window.location.href = data.redirectUrl;
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to upload file.");
    } finally {
      setLoading(false);
      setFile(null);
    }
  }

  return (
    <div className={styles.uploadContainer}>
      <form
        className={`${styles.dragArea} ${dragActive ? styles.active : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          className={styles.hiddenInput}
          onChange={handleChange}
          multiple={false}
          accept=".xlsx,.csv"
        />
        <div className={styles.fileDropper}>
          {file ? (
            <div className={styles.filePreview}>
              <span className={styles.fileName}>{file.name}</span>
              <button onClick={removeFile} className={styles.removeBtn}>
                &times; Remove
              </button>
            </div>
          ) : (
            <>
              <img
                src="/data-storage-save-cloud-database-download-upload-icon.svg" // Replace with the actual path to your image
                alt="Descriptive Alt Text"
                className={styles.interimImage}
                onClick={openFileExplorer}
              />
              <p className={styles.dropMessage}>
                Drop your files here or{" "}
                <span className={styles.selectFile} onClick={openFileExplorer}>
                  select a file
                </span>
              </p>
            </>
          )}
        </div>
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Upload Files"}
        </button>
      </form>
      {message && (
        <Alert
          severity={message.includes("Failed") ? "error" : "success"}
          className={styles.alert}
        >
          {message}
        </Alert>
      )}
    </div>
  );
}
