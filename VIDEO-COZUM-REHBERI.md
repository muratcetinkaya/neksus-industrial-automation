# 🎥 Video Oynatma Sorunu Çözüm Rehberi

## ✅ Kontrol Listesi

### 1. Video Dosyası Kontrolü
- [ ] `video3.mp4` dosyası ana klasörde mevcut mi?
- [ ] Dosya boyutu makul mu? (10MB'dan küçük önerilir)
- [ ] Video H.264 codec ile kodlanmış mı?

### 2. Sunucu Kontrolü
- [ ] HTTPS kullanılıyor mu? (Modern tarayıcılar HTTPS gerektirir)
- [ ] Video dosyası doğru MIME type ile servis ediliyor mu?
- [ ] Sunucuda video dosyası erişilebilir mi?

### 3. Tarayıcı Kontrolü
- [ ] Console'da hata var mı? (F12 > Console)
- [ ] Network sekmesinde video yükleniyor mu? (F12 > Network)
- [ ] Autoplay policy tarafından engellenmiş mi?

## 🔧 Yapılan Güncellemeler

### HTML Güncellemeleri:
```html
<video autoplay muted loop playsinline preload="auto" poster="hero-poster.jpg">
    <source src="video3.mp4" type="video/mp4">
    <source src="video3.webm" type="video/webm">
    Video oynatılamıyor. Tarayıcınız HTML5 video desteklemiyor.
</video>
```

### JavaScript Güncellemeleri:
- Video yükleme durumu takibi
- Hata yönetimi ve fallback sistemi
- Autoplay policy ile başa çıkma
- Kullanıcı etkileşimi ile oynatma

### CSS Güncellemeleri:
- Fallback background sistemi
- Video loading animasyonu
- Smooth geçişler

## 🚨 Yaygın Sorunlar ve Çözümleri

### 1. Video Dosyası Bulunamıyor
**Sorun:** 404 hatası, video yüklenmiyor
**Çözüm:** 
- `video3.mp4` dosyasının httpdocs klasöründe olduğundan emin olun
- Dosya adında Türkçe karakter olmamalı
- Büyük/küçük harf uyumuna dikkat edin

### 2. HTTPS Gereksinimi
**Sorun:** HTTP'de autoplay çalışmıyor
**Çözüm:** 
- Sitenizi HTTPS üzerinden yayınlayın
- .htaccess'te HTTPS yönlendirmesini aktifleştirin

### 3. Video Codec Sorunu
**Sorun:** Video yükleniyor ama oynatmıyor
**Çözüm:**
- H.264 codec ile yeniden kodlayın
- MP4 container kullanın
- Web için optimize edin

### 4. Autoplay Policy
**Sorun:** Video otomatik başlamıyor
**Çözüm:**
- `muted` attribute kullanın
- Kullanıcı etkileşimi bekleyin
- Fallback sistemi aktif

## 📱 Test Adımları

1. **Local Test:** `video-test.html` dosyasını açın
2. **Console Kontrol:** F12 > Console sekmesini izleyin
3. **Network Kontrol:** F12 > Network sekmesinde video yüklenmesini kontrol edin
4. **Mobile Test:** Mobil cihazlarda test edin

## 🎯 Canlı Sunucuda Yapılacaklar

1. Tüm dosyaları httpdocs'a yükleyin:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `video3.mp4`
   - `.htaccess`

2. Video dosyasının erişilebilir olduğunu kontrol edin:
   ```
   https://yourdomain.com/video3.mp4
   ```

3. HTTPS'nin aktif olduğundan emin olun

4. Browser cache'ini temizleyin ve test edin

## 🔍 Debug İçin Console Komutları

```javascript
// Video durumunu kontrol et
const video = document.querySelector('.hero-video video');
console.log('Video ready state:', video.readyState);
console.log('Video network state:', video.networkState);
console.log('Video src:', video.currentSrc);
console.log('Can play MP4:', video.canPlayType('video/mp4'));

// Video yükleme testi
video.load();
video.play().then(() => {
    console.log('Video başarıyla oynatıldı');
}).catch(e => {
    console.error('Video oynatma hatası:', e);
});
```

## 📞 Destek

Sorun devam ederse:
1. Console hata mesajlarını kaydedin
2. Network sekmesindeki durumu kontrol edin
3. Video dosyasının boyutunu ve formatını doğrulayın
4. Sunucu ayarlarını kontrol edin
