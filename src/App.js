import './App.css';
import ReactDOM from "react-dom";
import React, { useState, useRef, useEffect, useReducer } from 'react';
import MetricBox from './MetricBox';
import Alert from './Alert';
import VisualizationType from './VisualizationType';
import FloatingAlerts from './FloatingAlert'

// import { useMediaQuery } from 'react-responsive';
import WebSocketComponent from './WebSocketComponent';
import background from './background.mp4'
import DataVis from './DataVis';

async function fetchData() {
  try {
    const response = await fetch("http://brownhackathon.devices.brown.edu:5000/data");
    const json = await response.json();
    console.log(json);
    return json; // Return the fetched data
  } catch (error) {
    const json = {
      temperature:0,
      moisture:0.5,
      light:50,
      water_level:60,
      timestamp:1707007776
    }
    return json; // Return the fetched data
  }
}




function App() {
  

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const fetchedData = await fetchData();
      if (fetchedData) {
        setTemperature(fetchedData.temperature);
        setMoisture(fetchedData.moisture);
        setLight(fetchedData.light);
        setWater_level(fetchedData.water_level); 
  
        // Use a functional update for metricData
        // handleMetricDataChange(fetchedData);
        if (!(fetchData.temperature==0 || fetchedData.moisture==0 || fetchedData.light ==0 || fetchedData.water_level==0)){
          dispatch({ type: 'add', payload: fetchedData });
        }
        console.log("data length"+metricData.length)
        dispatch({ type: 'remove', payload: fetchedData });

        
      }
      
    }, 2000); // Fetch data every second
  
    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array indicates this effect doesn't depend on any props or state
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'remove':
        return state.slice(-30);
      case 'refresh':
        return action.payload; // Assuming payload is an array of new data
      default:
        return state;
    }
  };
  const [metricData, dispatch] = useReducer(reducer, [
    {
      'timestamp': 1707007776,
      'water_level': 0.6,
      'moisture': 0.3,
      'temperature': 28.5,
      'light': 50,
    },
    {
      'timestamp': 1707007777,
      'water_level': 0.5,
      'moisture': 0.6,
      'temperature': 25.5,
      'light': 30,
    },
    {
      'timestamp': 1707007778,
      'water_level': 0.8,
      'moisture': 0.4,
      'temperature': 25.9,
      'light': 25,
    }
  ]);
  

  // // State variables
  // const [metricData, setMetricData] = useState([
  //   {
  //     'timestamp': 1707007776,
  //     'water_level': 0.6,
  //     'moisture': 0.3,
  //     'temperature': 28.5,
  //     'light': 50,
  //   },
  //   {
  //     'timestamp': 1707007777,
  //     'water_level': 0.5,
  //     'moisture': 0.6,
  //     'temperature': 25.5,
  //     'light': 30,
  //   },
  //   {
  //     'timestamp': 1707007778,
  //     'water_level': 0.8,
  //     'moisture': 0.4,
  //     'temperature': 25.9,
  //     'light': 25,
  //   }
  // ]); // list of json
  // const handleMetricDataChange = (newValue) => {
  //   setMetricData(
  //     [
  //       ...metricData,
  //       newValue
  //     ]
  //   );
  // };
  const [temperature, setTemperature] = useState(25); // default to 25 celsius
  // Function to handle changes in the input field
  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };
  const [moisture, setMoisture] = useState(100); // default to 50%
  // Function to handle changes in the input field
  const handleMoistureChange = (event) => {
    setMoisture(event.target.value);
  };
  const [light, setLight] = useState(50); // Default to an initial value, adjust as needed
  // Function to handle changes in the input field for light
  const handleLightChange = (event) => {
    setLight(event.target.value);
  };
  const [water_level, setWater_level] = useState(50); // Default to an initial value, adjust as needed
  // Function to handle changes in the input field for water level
  const handleWater_levelChange = (event) => {
    setWater_level(event.target.value);
  };


  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateAlerts();// update the alerts
    }, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [temperature, moisture, light, water_level]);

  // Example function to check metric status
  const updateAlerts = () => {
    // Check temperature status
    if (checkTempStatus() === 1) {
      addAlert("Temperature is high", "temperature");
    } else if (checkTempStatus() === -1) {
      addAlert("Temperature is low", "temperature");
    } else {
      removeAlert("temperature");
    }
  
    // Check moisture status
    if (checkMoistureStatus() === 1) {
      addAlert("Moisture is high", "moisture");
    } else if (checkMoistureStatus() === -1) {
      addAlert("Moisture is low", "moisture");
    } else {
      removeAlert("moisture");
    }
  
    // Check water level status
    if (checkWaterStatus() === 1) {
      addAlert("Water level is high", "water_level");
    } else if (checkWaterStatus() === -1) {
      console.log("added water alert")
      addAlert("Water level is low", "water_level");
    } else {
      removeAlert("water_level");
    }
  
    // Check light status
    if (checkLightStatus() === 1) {
      addAlert("Light level is high", "light");
    } else if (checkLightStatus() === -1) {
      addAlert("Light level is low", "light");
    } else {
      removeAlert("light");
    }
  };
  

  // Function to add an alert
  const addAlert = (message, metric) => {
    setAlerts(prev => [...prev.filter(alert => alert.metric !== metric), { message, metric }]);
  };

  // Function to remove an alert
  const removeAlert = (metric) => {
    setAlerts(prev => prev.filter(alert => alert.metric !== metric));
  };



   // Returns status of temperature
  // Returns 0 for normal, 1 for high, -1 for low
  const checkTempStatus = () => {
    if (temperature > 30) { // Example: High if above 30°C
      return 1;
    } else if (temperature < 10) { // Example: Low if below 10°C
      return -1;
    }
    return 0;
  }

  // Returns status of moisture
  // Returns 0 for normal, 1 for high, -1 for low
  const checkMoistureStatus = () => {
    if (moisture < 30) {
      return -1;
    }
    return 0;
  }

  const checkLightStatus = () => {
    if (light < 30) { // Low light condition
      return -1;
    }
    return 0; // Normal light condition
  };

  const checkWaterStatus = () => {
    return 0; // Normal water level condition
  };



  // Returns status of all metrics
  // Returns true/false
  const checkAllStatus = () => {
    if (checkMoistureStatus() == 0 && checkTempStatus() == 0
      && checkWaterStatus() == 0 && checkLightStatus() == 0
    ) {
      return true;
    }
    return false;

  }
  const renderMessage = () => {
    if (!checkAllStatus()) {
      return <h3 className="message" style={{ color: '#FF2400' }}>There are some concerning metrics: </h3>;
    } else {
      return <h3 className="message" style={{ color: '#56AE57' }}>Your crops are doing great! </h3>;
    }
  };



  return (
    <div className="App">
      <header className="App-header">

        <nav className="nav-flex" aria-label="primary-navigation">
          <div className="flex-row">
            <a className="link" href="#status">status</a>
            <a className="link" href="#insights">insights</a>
            <a className="link" href="#alerts">alerts</a>
          </div>
        </nav>

        <h1 className="main-title">CosmoCrops</h1>

        

        
      </header>

      <main className="App-main">
        <section id="status">
          <h2 className="title">Status</h2>
          {renderMessage()}
          <div className="status-page">
            <MetricBox metricName={"Temperature"} value={temperature} status={checkTempStatus()} />
            <MetricBox metricName={"Moisture"} value={moisture} status={checkMoistureStatus()} />
            <MetricBox metricName={"Water Level"} value={water_level} status={checkWaterStatus()} />
            <MetricBox metricName={"Light"} value={light} status={checkLightStatus()} />
            {/* <MetricBox metricName={"metricdata"} value={metricData.length} status={checkLightStatus()} /> */}
          </div>


        </section>

        <section id="insights">
          <h2 className="title">Insights</h2>
          <div className="status-page">
            <div className='vert-pair'>
              <DataVis type={VisualizationType.Line} data={metricData} temp={temperature}  moisture={moisture}  water_level={water_level}  light={light} />
              <DataVis type={VisualizationType.Bar}data={metricData} />
            </div>
            <div className='vert-pair'>
              <DataVis type={VisualizationType.Bar2}data={metricData}  />
              <DataVis type={VisualizationType.Bar3}data={metricData}/>
            </div>
          </div>

        </section>
        <section id="alerts">
          <h2 className="title">Alerts</h2>
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <Alert key={index} message={alert.message} />
            ))
          ) : (
            <p>No alerts :)</p>
          )}
        </section>
      </main>
      <FloatingAlerts alerts={alerts} onRemove={removeAlert} />
    </div>

  );
}


export default App;


ReactDOM.render(<App />, document.getElementById("root"));