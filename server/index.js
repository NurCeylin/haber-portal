// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Haberler
app.get('/api/news', (req, res) => {
  db.all('SELECT * FROM news', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Finans
app.get('/api/finance', (req, res) => {
  const financeData = [
    { name: 'Dolar', value: '28.50₺', change: '+0.25' },
    { name: 'Euro', value: '30.10₺', change: '-0.12' },
    { name: 'Sterlin', value: '35.20₺', change: '+0.05' },
    { name: 'Bitcoin', value: '1.145.000₺', change: '-15000' },
    { name: 'BIST 100', value: '7.850', change: '+60' },
    { name: 'Altın', value: '1.890₺', change: '-8' },
    { name: 'Faiz (TCMB)', value: '%35', change: '0' }
  ];
  res.json(financeData);
});

// Hava Durumu
app.get('/api/weather', (req, res) => {
  const weatherData = [
    { day: 'Paz', icon: '🌤️', high: '18°', low: '12°', temp: '18°C', desc: 'Az bulutlu' },
    { day: 'Sal', icon: '🌧️', high: '15°', low: '8°',  temp: '15°C', desc: 'Yağışlı' },
    { day: 'Çar', icon: '🌤️', high: '15°', low: '5°',  temp: '15°C', desc: 'Güneşli' },
    { day: 'Per', icon: '⛅',  high: '13°', low: '4°',  temp: '13°C', desc: 'Parçalı bulutlu' },
    { day: 'Cum', icon: '☀️', high: '14°', low: '8°',  temp: '14°C', desc: 'Açık' }
  ];
  res.json(weatherData);
});

// Ana endpoint (boş isteklerde hata vermemesi için)
app.get('/', (req, res) => {
  res.send('Haber Portalı API çalışıyor.');
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});
