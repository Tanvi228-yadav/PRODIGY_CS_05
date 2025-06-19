import React, { useEffect, useState } from 'react';
import PacketTable from './PacketTable';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  const [packets, setPackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackets = () => {
      fetch('http://localhost:5000/packets')
        .then(res => res.json())
        .then(data => {
          setPackets(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Error fetching packets: ' + err);
          setLoading(false);
        });
    };
    fetchPackets();
    const interval = setInterval(fetchPackets, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-4">
        <Col md={10} className="text-center">
          <h1 className="display-4 fw-bold gradient-text">Packet Sniffer Dashboard</h1>
          <p className="lead">
            Visualize and analyze network packets in real time.<br />
            <span className="text-info fw-semibold">For educational and ethical use only.</span>
          </p>
        </Col>
      </Row>
      {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && <PacketTable packets={packets} />}
      <footer className="text-center mt-5 text-muted" style={{fontSize: '0.95em'}}>
        &copy; {new Date().getFullYear()} PRODIGY_CS_05 &mdash; Packet Sniffer Tool
      </footer>
    </Container>
  );
}

export default App;