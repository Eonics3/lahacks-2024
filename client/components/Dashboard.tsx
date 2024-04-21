import * as React from 'react';
import { useState } from 'react';
import { Box, Grid, Paper, Tab, Tabs, Typography, Card, CardContent } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Summary" />
        <Tab label="Visuals" />
        <Tab label="Report" />
      </Tabs>
      {value === 0 && (
        <Grid container padding={5} spacing={3} sx={{ marginTop: 2, justifyContent: 'center'}}>
          {[
            { label: 'kg of CO₂ emitted', value: '1,200'},
            { label: 'g of NH₄ emitted', value: '300' },
            { label: 'g of CH₄ emitted', value: '500' },
            { label: 'Greenhouse Gas Emissions', value: '10,000' },
            { label: 'Overall Grade', value: 'A-' }
          ].map((metric, index) => (
            <Grid item xs={3} sm={4} key={index} >
              <Card variant="outlined" sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontFamily: 'Inter', fontWeight: "regular", fontSize: '1.8rem' }} component="div">{metric.label}</Typography>
                  <Typography variant="h3" sx={{ fontFamily: 'Inter', color:"#064701", fontWeight: "bold"}}>{metric.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {value === 1 && (
        <Box sx={{ p: 3, width: '100%' }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Visuals Content</Typography>
            <Typography>Here you might display graphs or charts related to the data.</Typography>
          </Paper>
        </Box>
      )}
      {value === 2 && (
        <Box sx={{ p: 3, width: '100%' }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Report Content</Typography>
            <Typography>This section could contain textual reports or data summaries.</Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
