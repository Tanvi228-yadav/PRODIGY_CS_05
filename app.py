from flask import Flask, render_template, jsonify, request
from scapy.all import sniff, IP, TCP, UDP, Ether, Raw
from threading import Thread, Lock
import time

app = Flask(__name__)

packets = []
packets_lock = Lock()
MAX_PACKETS = 200  # Limit in-memory storage for demo

def packet_callback(pkt):
    if IP in pkt:
        src_ip = pkt[IP].src
        dst_ip = pkt[IP].dst
        proto = pkt[IP].proto
        protocol = {6: 'TCP', 17: 'UDP', 1: 'ICMP'}.get(proto, str(proto))
        payload = ""
        if Raw in pkt:
            try:
                payload = pkt[Raw].load.decode(errors='replace')
            except Exception:
                payload = str(pkt[Raw].load)
        packet_info = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "src": src_ip,
            "dst": dst_ip,
            "protocol": protocol,
            "payload": payload[:100],
        }
        with packets_lock:
            packets.append(packet_info)
            if len(packets) > MAX_PACKETS:
                del packets[0]

def start_sniffing():
    sniff(prn=packet_callback, store=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/packets')
def get_packets():
    with packets_lock:
        return jsonify(list(reversed(packets)))

def run_sniffer():
    t = Thread(target=start_sniffing, daemon=True)
    t.start()

if __name__ == '__main__':
    run_sniffer()
    app.run(debug=True, host='0.0.0.0', port=5000)