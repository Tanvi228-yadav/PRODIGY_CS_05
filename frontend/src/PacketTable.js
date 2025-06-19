import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const protocolColor = (protocol) => {
  switch (protocol) {
    case 'TCP': return 'primary';
    case 'UDP': return 'success';
    default: return 'secondary';
  }
};

const PacketTable = ({ packets }) => (
  <div className="table-responsive">
    <Table striped bordered hover responsive className="shadow-lg bg-white rounded">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Source IP</th>
          <th>Destination IP</th>
          <th>Protocol</th>
          <th>Payload <span className="text-secondary" style={{fontSize:'0.8em'}}>(first 100 bytes)</span></th>
        </tr>
      </thead>
      <tbody>
        {packets.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center text-muted">No packets captured yet.</td>
          </tr>
        )}
        {packets.map((pkt, idx) => (
          <tr key={idx}>
            <td>{packets.length - idx}</td>
            <td>{pkt.src_ip}</td>
            <td>{pkt.dst_ip}</td>
            <td>
              <Badge bg={protocolColor(pkt.protocol_name)}>{pkt.protocol_name}</Badge>
            </td>
            <td>
              <pre style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                fontSize: '0.95em',
                background: '#f8f9fa',
                borderRadius: '6px',
                padding: '6px'
              }}>
                {pkt.payload}
              </pre>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default PacketTable;