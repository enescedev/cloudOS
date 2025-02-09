# cloudOS🖥️
Web Virtual Linux Environment with Integrated Applications

💡 Frontend: React.js (Material-UI veya Tailwind CSS)

💡 Terminal: Xterm.js + WebSocket

💡 Storage: S3 API (MinIO, AWS S3)

💡 Kimlik Doğrulama: GitHub OAuth, Token auth

💡 AI Chat: OpenAI API, Ollama

![image](https://github.com/user-attachments/assets/85f67b19-1f8d-4ad8-bfc9-265276551f33)

📌 Geliştirme Aşamaları

✅ 1. UI/UX 

✅ 2. Ana Menü & Profil Sayfası geliştirme

✅ 4. Terminal (Xterm.js + WebSocket)

✅ 5. AI Chat bileşeni (AI entegrasyonu)

✅ 6. S3 Bucket yönetimi için dosya düzenleme/görüntüleme (Yeni eklenen özellik)

✅ 7. Ayarlar - API Key yönetimi (Yeni eklenen özellik)

## v1.1 Yapılan değişiklikler:
1. Chat için yeni bir dialog bileşeni oluşturuldu
2. SimpleChat bileşeni dialog içinde kullanıma uygun hale getirildi
3. Ana menüye chat açma butonu eklendi
4. Chat ve Terminal için ortak dialog stili kullanıldı
5. ScrollArea ve input alanı için responsive tasarım eklendi

## v1.2 Yapılan değişiklikler:
1. Terminal bileşeni tamamen client-side olarak yeniden yazıldı
2. Dynamic import'lar güncellendi ve SSR devre dışı bırakıldı
3. Terminal boyutlandırması için CSS düzeltmeleri yapıldı
4. Next.js webpack konfigürasyonu eklendi
5. Terminal başlatma mantığı iyileştirildi ve hata yakalama eklendi

## v1.3 Yapılan değişiklikler:
1. ResizeObserver eklendi
2. Terminal başlatma işlemi requestAnimationFrame ile yapıldı
3. WebSocket bağlantısı terminal açıldıktan sonra başlatılıyor
4. Cleanup işlemleri güncellendi ve ResizeObserver temizleme eklendi
5. Terminal boyutlandırma mantığı iyileştirildi
6. isTerminalReady state'i WebSocket bağlantısı sonrası set ediliyor


![image](https://github.com/user-attachments/assets/47b67ecb-dc1c-4129-86a1-676ee02830b7) ![image](https://github.com/user-attachments/assets/f837d1df-ce5b-4f2c-b6bc-1948b0ede9b0)

## v1.4.Yapılan değişiklikler:
1. ResizeObserver eklendi
2. Terminal başlatma işlemi requestAnimationFrame ile yapıldı
3. WebSocket bağlantısı terminal açıldıktan sonra başlatılıyor
4. Cleanup işlemleri güncellendi ve ResizeObserver temizleme eklendi
5. Terminal boyutlandırma mantığı iyileştirildi
6. isTerminalReady state'i WebSocket bağlantısı sonrası set ediliyor

## v1.5 Yapılan değişiklikler:
- Multi-stage build ile uygulama derleme
- Docker optimizasyonları
- Ubuntu base image kullanıldı
- Shell environment düzenlendi
- Workspace volume mapping eklendi
- Shell prompt özelleştirildi
- Start script basitleştirildi

## V1.6 Yapılan değişiklikler:
1. Bash terminal'i dialog olarak yeniden düzenlendi
2. Menü butonu ve sayfa yönlendirmesi entegre edildi
3. Tam ekran desteği eklendi
4. URL parametresi ile terminal açma desteği eklendi
5. Tek bir terminal bileşeni kullanıldı

![image](https://github.com/user-attachments/assets/2d7978e8-0255-40ec-bf27-cd18e52ea6e5)

![image](https://github.com/user-attachments/assets/4b99ccef-3785-4748-adcd-bee942147131)

## Kullanım adımları:

1. Docker image'ı build edin:
```bash
docker build -t devos:latest .
```

2. Container'ı çalıştırın:
```bash
docker run -it --rm \
  -p 3000:3000 \
  --name devos \
  devos:latest
```
