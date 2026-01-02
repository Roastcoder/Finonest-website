import { useEffect, useState } from 'react';

const HealthCheck = () => {
  const [status, setStatus] = useState({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: 0
  });

  useEffect(() => {
    const startTime = Date.now();
    
    const updateUptime = () => {
      setStatus(prev => ({
        ...prev,
        uptime: Math.floor((Date.now() - startTime) / 1000),
        timestamp: new Date().toISOString()
      }));
    };

    const interval = setInterval(updateUptime, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="p-4 bg-background text-foreground">
      <h1 className="text-xl font-bold mb-4">Finonest Health Check</h1>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Status:</span>
          <span className={`font-semibold ${status.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
            {status.status.toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Version:</span>
          <span>{status.version}</span>
        </div>
        <div className="flex justify-between">
          <span>Environment:</span>
          <span>{status.environment}</span>
        </div>
        <div className="flex justify-between">
          <span>Uptime:</span>
          <span>{status.uptime}s</span>
        </div>
        <div className="flex justify-between">
          <span>Last Check:</span>
          <span>{new Date(status.timestamp).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;