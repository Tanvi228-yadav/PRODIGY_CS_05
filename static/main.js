function fetchPackets() {
    fetch('/packets')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('packets-body');
            tbody.innerHTML = '';
            data.forEach(pkt => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pkt.timestamp}</td>
                    <td>${pkt.src}</td>
                    <td>${pkt.dst}</td>
                    <td><span class="badge bg-info text-dark">${pkt.protocol}</span></td>
                    <td><code style="white-space:pre-wrap;word-break:break-all;">${pkt.payload || '-'}</code></td>
                `;
                tbody.appendChild(row);
            });
        });
}

setInterval(fetchPackets, 2000);
window.onload = fetchPackets;