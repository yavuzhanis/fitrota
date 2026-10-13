# FitRota

Mobil öncelikli, ücretsiz, hesap gerektirmeyen antrenman planlayıcısı. **Next.js + TypeScript + React**, statik export ve Cloudflare Pages uyumlu.

## Özellikler
- Kilo segmentleri: 60–85 kg, 85–110 kg, 110+ kg. Uygulama 60–350 kg aralığında giriş kabul eder; 85 kg üst segmente dahildir.
- Hedefler: yağ yakımı, kilo verme, kas kazanımı, sıkılaşma, vücut ağırlığı.
- Spor salonu / ev ekipmansız / ev ekipmanlı, başlangıç / orta / ileri seviye.
- 2–6 gün, 20/30/45/60 dakika; deterministik varyasyonlu program oluşturucu ve egzersiz yönergeleri.
- Set işaretleme, dinlenme sayacı, antrenman tamamlanma kaydı ve ilerleme ekranı.
- Set bazlı kg/tekrar kaydı, tahmini 1RM, kayıtlı hacim ve sonraki hedef önerileri.
- Sağlık ön kontrolü, temel yasal bilgilendirme sayfaları, sitemap/robots ve PWA uygulama kabuğu cache'i.
- Tarayıcıda kalıcı depolama (`localStorage`), JSON yedek alma/geri yükleme, tüm verileri silme.
- Ücretsiz harici API, sunucu, veritabanı veya kullanıcı hesabı gerekmez.

## Kurulum

Gereksinim: Node.js 20.9+ (önerilen 22).

```bash
npm install
npm run dev
```

`http://localhost:3000` üzerinden açılır. Kontroller:

```bash
npm run typecheck
npm run lint
npm run build
```

`npm run build` komutu statik yayın için `out/` klasörü üretir.

## Cloudflare Pages ile yayınlama
1. GitHub reposunu Cloudflare Pages'e bağla: **Workers & Pages → Create → Pages → Connect to Git**.
2. Repository: `yavuzhanis/fitrota`.
3. Framework preset: **Next.js (Static HTML Export)** seç. Bu seçenek yoksa **None** seçip ayarları elle gir:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/`
4. Deploy command / custom deploy command alanı görünüyorsa boş bırak. `npx wrangler deploy` kullanma; bu Worker/OpenNext akışını başlatır.
5. Node.js sürümü için Cloudflare ortam değişkeni gerekirse `NODE_VERSION=22` ekle.
6. **Save and Deploy** ile yayına al. Sonraki `git push` işlemleri otomatik yeni deploy üretir.

Bu uygulama backend, API route, server action veya veritabanı kullanmadığı için statik hosting'e uygundur. Veriler cihazdaki tarayıcı depolamasında saklanır; farklı cihazlar arasında otomatik senkronize olmaz.

## Vercel ile yayınlama
1. Bu klasörü GitHub'da yeni bir repoya gönder.
2. Vercel'de **Add New → Project → Import Git Repository**.
3. Framework **Next.js** otomatik tanınır. Root Directory repo kök dizini; Build Command `npm run build`.
4. **Deploy** ile yayınla. Ortam değişkeni gerekmez.
5. Sonraki `git push` işlemleri Vercel'de yeni dağıtım tetikler.

**Önemli:** Vercel Hobby planı uygunluk ve kullanım koşullarına tabidir; ticari kullanım için plan koşullarını kontrol et. Veriler farklı cihazlar arasında senkronize olmaz. Geri yükleme için JSON yedeğini paylaşabilirsin. Uygulama tarayıcı tabanlıdır; manifest ve temel service worker eklenmiştir.

## Kısıtlar ve güvenlik
Egzersiz seçimi doğrulanabilir kurallarla yapılır, ücretli üretken yapay zekâ servisine bağlı değildir. Bu sistem klinik değerlendirme, kişisel antrenör veya fizyoterapi yerine geçmez. Kiloya göre öneri yalnızca bir filtrelemedir; sağlık riskinin veya egzersiz uygunluğunun tek ölçüsü değildir. 110+ kg ve belirtilen hassasiyetlerde düşük darbeli egzersizler önceliklendirilir. Özellikle kronik hastalığı veya semptomları olan kişiler uzman görüşü almalıdır.

## Beslenme modülü

Mobil alt menüde **Beslenme** bölümünden 7 günlük örnek öğün listesi oluşturulabilir. Kullanıcı karışık, vejetaryen ya da vegan beslenme tipini, 3–5 öğün sayısını ve süt/yumurta/gluten/kuruyemiş/soya filtrelerini seçer. Kalori ve makro değerleri örnek porsiyonlar üzerinden yaklaşık verilmiştir; kişiselleştirilmiş kalori reçetesi değildir. Özel tıbbi durumlar için bir diyetisyene danışılmalıdır. Liste tarayıcıda saklanır ve uygulamanın JSON yedeğine eklenir.

## Yeni eklenen özellikler (v3)
- Program arşivi: Yeniden oluşturulan programların son 20 sürümü yerel olarak saklanır; Profil ekranından geri yüklenir.
- Günlük su takibi: Beslenme sekmesinde bardak sayısı tarih bazlı saklanır.
- Öğün takibi: Beslenme planındaki öğünler tüketildi olarak işaretlenir.
- Yedi günlük alışveriş listesi: Plandaki yemeklerin malzemeleri/porsiyon açıklamaları bir araya getirilir (toplam alışveriş miktarı hesabı değildir).
- Kilo geçmişi: İlerleme sekmesinden tarih bazlı kilo kaydı yapılır.
- JSON dışa/içe aktarma tüm yeni alanları da kapsar; eski yedek formatıyla uyumludur.

### Sınırlar
Beslenme listeleri tıbbi diyet değildir; kalori, makro ve alerjen verileri klinik doğrulama içermemektedir. Market listesi tariflerdeki gıda adlarını verir ve alışveriş için miktarları birleştirmez. Egzersiz görselleri lisanslı video/GIF yerine yerel SVG hareket demolarıdır.


## v4 - Genişletilmiş egzersiz kütüphanesi

- Yerel egzersiz veritabanı genişletildi; sayı uygulama başlığında dinamik gösterilir.
- Yeni egzersizler için Türkçe ad, kategori, ekipman, seviye ve uygulama açıklaması eklendi.
- Program üreticisi son iki günlük hareket tekrarını mümkün olduğunca azaltır.
- Her hareketin altında filtrelenmiş alternatif hareket seçimi bulunur. İşaretli setler değişimden önce onay alınarak sıfırlanır.
- Veriler önceki v3 LocalStorage anahtarı ve JSON yedek şemasıyla uyumludur.
- GIF/video eklenmedi; üçüncü taraf görsel ve lisans bağımlılığı yoktur.
- Kısıt filtreleri yalnızca basit ihtiyat kurallarıdır; tıbbi uygunluk garantisi değildir.


## v5 — Antrenman geliştirmeleri

- 390 seçenek: **111 başlangıç egzersizi**, bunlardan türetilmiş 267 teknik varyasyon ve 12 düşük tempolu interval varyasyonu. Teknik varyasyonlar bağımsız anatomik egzersizler değildir.
- Hareket başına set bazlı kilogram ve tekrar kaydı, eski yerel kayıtlara geriye dönük uyum.
- YouTube üzerinde hareket adına göre **arama bağlantısı** (doğrulanmış / gömülü GIF veya video değildir).
- Egzersizler için itiş/çekiş/squat/hinge/core/cardio örüntü etiketleri.
- Antrenman süre tahmini; planı hedef süreye göre budama, kısa antrenmanda set azaltımı; toparlanmaya dair yönlendirici notlar. Bunlar spor bilimleri uzmanı onaylı plan değildir.
- `npm test`: sözdizimi kontrolleri ve 108 profil üzerinden algoritma denemesi. `npm run check`: production build ve ESLint (bağımlılıklar kurulabilirse).

## v6 — Güven ve ilerleme geliştirmeleri

- Program oluşturmadan önce sağlık ön kontrolü ve risk durumlarında uzman onayı işaretleme akışı.
- İlerleme ekranında kayıtlı hacim, tahmini 1RM, hareket bazlı sonraki hedef ve örüntü dengesi.
- Ana uygulama kabuğu için temel service worker cache'i.
- Gizlilik Politikası, Kullanım Şartları ve Sağlık Uyarısı sayfaları.
- SEO için metadata, canonical, sitemap ve robots dosyaları.

### Henüz tamamlanmayanlar

- Doğrulanmış, lisanslı, egzersiz başına gerçek GIF/video entegrasyonu. Video araması harici bağlantıdır.
- Gerçek telefonlarda erişilebilirlik, performans ve mobil uçtan uca testler.
- Özel alan adı ve sosyal paylaşım görseli.
- Hesap, bulut senkronizasyonu ve cihazlar arası otomatik veri taşıma.
- Anatomik kas grubu bazlı hacim dengesi, RPE/RIR, deload ve otomatik program güncelleme.
