import React, { useEffect, useState } from 'react';
import PacketTable from './PacketTable';

function App() {
  const [packets, setPackets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackets = () => {
      fetch('http://localhost:5000/packets')
        .then(res => res.json())
        .then(data => setPackets(data))
        .catch(err => setError('Error fetching packets: ' + err));
    };
    fetchPackets();
    const interval = setInterval(fetchPackets, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{padding: 20, fontFamily: 'Arial'}}>
      <h1>Educational Packet Sniffer</h1>
      <p>
        This tool captures and displays network traffic for educational purposes only.
        Please use it ethically and only on networks you own or have permission to monitor.
      </p>
      {error && <div style={{color: "red"}}>{error}</div>}
      <PacketTable packets={packets} />
    </div>
  );
}

export default App;