import useStore from "../store/useStore";

function RealtimeMetric() {

  const metric = useStore(state => state.metric);

  const status = useStore(state => state.status);

  const isOnline = status === 'connected';

  return (
    <div className="card">
      <h2>
        <span className="card-title-icon">📊</span>
        Active Users
      </h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="metric-display" style={{ margin: 0, width: '100%' }}>
          <span className="metric-label">Currently Online</span>
          <span className="metric-value">{metric}</span>
        </div>
        <div className={`status-badge ${!isOnline ? 'offline' : ''}`} style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <span className="status-indicator"></span>
          <span>{isOnline ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
    </div>
  );
}

export default RealtimeMetric;