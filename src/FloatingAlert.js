const FloatingAlerts = ({ alerts, onRemove }) => (
    <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
      {alerts.map((alert) => (
        <div key={alert.metric} style={{ marginBottom: '10px', background: 'rgba(255, 36, 0,.9)', padding: '10px', borderRadius: '5px',fontWeight:"bold", color:"white"
    }}>
          {alert.message}
          {/* <button onClick={() => onRemove(alert.metric)} style={{ marginLeft: '10px' }}>X</button> */}
        </div>
      ))}
    </div>
  );
  
  export default FloatingAlerts