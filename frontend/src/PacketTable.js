import React from 'react';

const PacketTable = ({ packets }) => (
  <table border="1" cellPadding="6" cellSpacing="0" style={{width: '100%'}}>
    <thead>
      <tr>
        <th>#</th>
        <th>Source IP</th>
        <th>Destination IP</th>
        <th>Protocol</th>
        <th>Payload (first 100 bytes)</th>
      </tr>
    </thead>
    <tbody>
      {packets.map((pkt, idx) => (
        <tr key={idx}>
          <td>{packets.length - idx}</td>
          <td>{pkt.src_ip}</td>
          <td>{pkt.dst_ip}</td>
          <td>{pkt.protocol_name}</td>
          <td><pre style={{margin:0, whiteSpace:'pre-wrap'}}>{pkt.payload}</pre></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PacketTable;