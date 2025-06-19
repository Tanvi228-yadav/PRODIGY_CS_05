from flask import Flask, jsonify
from flask_cors import CORS
from scapy.all import sniff, IP, TCP, UDP
import threading

app = Flask(__name__)
CORS(app)

packets_list = []

def packet_callback(packet):
    pkt_info = {}
    if IP in packet:
        pkt_info['src_ip'] = packet[IP].src
        pkt_info['dst_ip'] = packet[IP].dst
        pkt_info['protocol'] = packet[IP].proto
        # Try to get payload
        pkt_info['payload'] = str(bytes(packet[IP].payload))[:100]
        # Protocol name
        if TCP in packet:
            pkt_info['protocol_name'] = 'TCP'
        elif UDP in packet:
            pkt_info['protocol_name'] = 'UDP'
        else:
            pkt_info['protocol_name'] = 'Other'
        packets_list.append(pkt_info)
        # Keep only last 100 packets for demo
        if len(packets_list) > 100:
            packets_list.pop(0)

def start_sniffing():
    sniff(prn=packet_callback, store=False)

@app.route('/packets', methods=['GET'])
def get_packets():
    return jsonify(list(reversed(packets_list)))

@app.route('/')
def hello():
    return "Packet Sniffer API running"

if __name__ == '__main__':
    t = threading.Thread(target=start_sniffing, daemon=True)
    t.start()
    app.run(host='0.0.0.0', port=5000, debug=False)