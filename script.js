// Untuk index.html: Inisialisasi scanner
if (document.getElementById('preview')) {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    scanner.addListener('scan', function (content) {
        document.getElementById('result').innerText = 'Data Scanned: ' + content;
        // Simpan ke localStorage
        let data = JSON.parse(localStorage.getItem('scannedData')) || [];
        data.push({ content: content, timestamp: new Date().toLocaleString() });
        localStorage.setItem('scannedData', JSON.stringify(data));
        alert('Data disimpan!');
    });
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });
}

// Untuk data.html: Tampilkan data
if (document.getElementById('data-list')) {
    let data = JSON.parse(localStorage.getItem('scannedData')) || [];
    let list = document.getElementById('data-list');
    data.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.timestamp}: ${item.content}`;
        list.appendChild(li);
    });
}

// Fungsi hapus data
function clearData() {
    localStorage.removeItem('scannedData');
    location.reload();
}
