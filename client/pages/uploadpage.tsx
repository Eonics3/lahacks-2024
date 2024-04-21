import React, { useState } from "react";
import DragAndDrop from "components/DragAndDrop";
import NavBar from "components/Navbar";

const UploadPage = () => {
  return (
    <div>
      {" "}
      <NavBar />
      <div style={{ height: "100vh" }}>
        <div
          style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px" }}
        >
          <h1
            style={{
              fontWeight: "700",
              fontSize: "24px",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Input Company Data
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              lineHeight: "1.6",
              marginBottom: "0px",
            }}
          >
            {" "}
            {/* Adjusted marginBottom to '0px' */}We are Sustainalytics, a free AI-powered helper for
            Sustainability analysis. We use Large Language Model Agents combined
            with Retrieval Augmented Generation to help visualize and deliver
            key insights for company greenhouse gas emissions. Our calculations
            are based on a variety of reputable database such as 2023 US EPA Emissions
            Factors report.
          </p>
          <ol
            style={{
              paddingLeft: "20px",
              listStyleType: "decimal",
              marginBottom: "0px",
            }}
          >
            {" "}
            {/* Adjusted marginBottom to '0px' */}
            <li>Drag or select a .csv file into the drag and drop below.</li>
            <li>
              Click to download our visualizations. Interact with an LLM for
              further findings.
            </li>
          </ol>
          <div
            style={{ maxWidth: "1000px", margin: "20px auto", padding: "10px" }}
          >
            <DragAndDrop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
