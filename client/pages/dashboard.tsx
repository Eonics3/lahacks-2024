import * as React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import {
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [co2_val, setCo2_val] = useState([]);
  const [co2_dict, setCo2_dict] = useState({});
  const [ch4_val, setCh4_val] = useState([]);
  const [ch4_dict, setCh4_dict] = useState({});
  const [n2o_val, setN2o_val] = useState([]);
  const [n2o_dict, setN2o_dict] = useState({});

  // co2_val, co2_dict, ch4_val, ch4_dict, n2o_val, n2o_dict

  useEffect(() => {
    console.log("dashboard useEffect");
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8080/data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log("data: ", data);

        setCo2_val(data.co2_val);
        setCo2_dict(data.co2_dict);
        setCh4_val(data.ch4_val);
        setCh4_dict(data.ch4_dict);
        setN2o_val(data.n2o_val);
        setN2o_dict(data.n2o_dict);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <NavBar />
      <Box
        sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            marginLeft: 3,
            paddingTop: 2,
            justifyContent: "flex-start",
            "& .MuiTabs-indicator": {
              backgroundColor: "#4CAF50",
            },
            "& .Mui-selected": {
              // Styles for the selected tab
              color: "#4CAF50", // Change text color for the active tab
            },
            "& .MuiTab-root": {
              // Styles for all tabs
              color: "black", // Default text color for tabs
              "&:hover": {
                color: "#4CAF50", // Hover color
              },
            },
          }}
        >
          <Tab label="Summary" />
          <Tab label="Visuals" />
          <Tab label="Report" />
        </Tabs>
        {value === 0 && (
          <Grid
            container
            padding={5}
            spacing={3}
            sx={{ marginTop: 2, justifyContent: "center" }}
          >
            {[
              { label: "kg of CO₂ emitted", value: co2_val },
              { label: "g of CH₄ emitted", value: ch4_val },
              { label: "g of N₂0 emitted", value: n2o_val },
              { label: "ESG Score", value: "400" },
              { label: "Overall Grade", value: "A-" },
            ].map((metric, index) => (
              <Grid item xs={3} sm={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Inter",
                        fontWeight: "regular",
                        fontSize: "1.8rem",
                      }}
                      component="div"
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "Inter",
                        color: "#064701",
                        fontWeight: "bold",
                      }}
                    >
                      {metric.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {value === 1 && (
          <Box sx={{ p: 3, width: "100%" }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Visuals Content</Typography>
              <Typography>
                Here you might display graphs or charts related to the data.
              </Typography>
            </Paper>
          </Box>
        )}
        {value === 2 && (
          <Box sx={{ p: 3, width: "100%" }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Report Content</Typography>
              <Typography>
                This section could contain textual reports or data summaries.
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </div>
  );
}
