// server/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Kalıcı veritabanı dosyasının yolu
const dbPath = path.resolve(__dirname, 'data.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Veritabanı dosyası açılamadı:', err.message);
  } else {
    console.log('Kalıcı SQLite veritabanı oluşturuldu.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      image TEXT NOT NULL
    )
  `);

  db.get('SELECT COUNT(*) AS count FROM news', (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare('INSERT INTO news (title, slug, image) VALUES (?, ?, ?)');
      const newsItems = [
        ['Kilosunun peşinde olan Bakana doktorlardan atama sistemi şoku', 'haber-1', 'haber_1.jpg'],
        ['TikTok fenomeninin canlı yayında ölümüyle ilgili şok detay', 'haber-2', 'haber_2.jpg'],
        ['Mısır\'dayım diye paylaşım yapan ünlü iş insanı meğerse hapisteymiş', 'haber-3', 'haber_3.jpg'],
        ['Dünyanın kalbi İstanbul\'da atmadı', 'haber-4', 'haber_4.jpg'],
        ['Tazminatsız işten çıkardılar', 'haber-5', 'haber_5.jpg'],
        ['Arnavutluk başbakanı zirvenin önüne geçti', 'haber-6', 'haber_6.jpg'],
        ['DEM Partilileri isim isim uyardı', 'haber-7', 'haber_7.jpg'],
        ['Yalnızca 4 bakanın koltuğu garanti', 'haber-8', 'haber_8.jpg'],
        ['Yine ÇEDES yine skandal!', 'haber-9', 'haber_9.jpg'],
        ['İsrail ve Rumlara 572 yıllık doğalgaz bıraktık', 'haber-10', 'haber_10.jpg']
      ];

      for (const [title, slug, image] of newsItems) {
        stmt.run(title, slug, image);
      }
      stmt.finalize(() => {
        console.log('Örnek haberler veritabanına yüklendi.');
      });
    }
  });
});

module.exports = db;
