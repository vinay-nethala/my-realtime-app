import useStore from "../store/useStore";
import { useEffect } from "react";

function NotificationCenter() {

  const notifications = useStore(state => state.notifications);

  const removeNotification = useStore(state => state.removeNotification);

  const clearNotifications = useStore(state => state.clearNotifications);

  const addNotification = useStore(state => state.addNotification);

  useEffect(() => {
  }, [notifications]);

  const handleRemoveNotification = (id) => {
    removeNotification(id);
  };

  const handleClearNotifications = () => {
    clearNotifications();
  };

  const handleAddTestNotification = () => {
    const testNotification = {
      id: `test-${Date.now()}`,
      title: "Test Notification",
      message: "This is a test notification - click X to dismiss"
    };
    addNotification(testNotification);
  };

  const getNotificationType = (title) => {
    if (title.includes('Error') || title.includes('Failed')) return 'danger';
    if (title.includes('Warning')) return 'warning';
    if (title.includes('Success')) return 'success';
    return 'info';
  };

  return (
    <div className="card" role="region" aria-labelledby="notifications-heading">
      <h2 id="notifications-heading">
        <span className="card-title-icon" aria-hidden="true">🔔</span>
        Notifications
        <button 
          onClick={handleAddTestNotification}
          style={{
            marginLeft: 'auto',
            padding: '0.3rem 0.6rem',
            fontSize: '0.75rem',
            background: '#00d4ff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#0f172a',
            fontWeight: 'bold'
          }}
          title="Add test notification to verify dismiss works"
        >
          + Test
        </button>
      </h2>

      {notifications.length === 0 ? (
        <div className="empty-state" role="status" aria-live="polite">
          <div className="empty-state-icon" aria-hidden="true">📭</div>
          <p>No notifications yet. All systems running smoothly!</p>
        </div>
      ) : (
        <div 
          className="notification-list-container" 
          role="feed" 
          aria-label="Notifications list"
          aria-busy={false}
        >
          {notifications.map((n) => (
            <article 
              key={n.id} 
              className={`notification-item ${getNotificationType(n.title)}`}
              role="article"
              aria-label={`${n.title}: ${n.message}`}
            >
              <div className="notification-content">
                <h4>{n.title}</h4>
                <p>{n.message}</p>
              </div>
              <div className="notification-actions">
                <button
                  className="secondary"
                  onClick={() => handleRemoveNotification(n.id)}
                  aria-label={`Dismiss ${n.title} notification`}
                  title="Dismiss"
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}
                >
                  ✕
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {notifications.length > 0 && (
        <div className="card-controls">
          <button 
            className="primary" 
            onClick={handleClearNotifications}
            aria-label="Delete all notifications"
          >
            🗑️ Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;