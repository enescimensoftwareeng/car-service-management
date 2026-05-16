# 🚗 ServisPro - Araç Servis Yönetim Sistemi

[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

**ServisPro**, oto servisleri ve tamirhaneler için geliştirilmiş, rol bazlı erişim kontrolüne (RBAC) sahip, modern bir web uygulamasıdır. Müşteri kabulünden faturalandırmaya kadar tüm servis süreçlerini dijitalleştirir ve şeffaf bir şekilde yönetilmesini sağlar.

## 🌟 Temel Özellikler (Modüller)

* **Rol Bazlı Yetkilendirme (RBAC):** Sistem Yönetici (Admin), Usta (Technician) ve Müşteri (Customer) olmak üzere 3 farklı yetki seviyesiyle yönetilir.
* **Müşteri ve Garaj Yönetimi:** Müşterilerin sisteme kaydı ve sahip oldukları araçların (Plaka, Marka, Model) detaylı takibi.
* **İş Emri & Servis Süreçleri:** Araç servise girdiği anda şikayet kaydı oluşturma, usta ataması yapma ve durum takibi (Beklemede, İşlemde, Tamamlandı).
* **Dinamik Faturalandırma:** Yapılan işlemleri ve kullanılan yedek parçaları sisteme girerek otomatik genel toplam hesaplama.
* **Gelişmiş Müşteri Paneli:** Müşterilerin kendi araçlarının servis durumunu, geçmiş servis kayıtlarını ve fatura detaylarını canlı olarak takip edebildiği şeffaf arayüz.

## 🏗️ Mimari ve Teknolojik Altyapı

Proje, **Modüler Monolitik** bir yapıda tasarlanmış olup, Backend ve Frontend arasında API yazımına gerek kalmadan **Inertia.js** köprüsü ile SPA (Single Page Application) hızında çalışmaktadır.

* **Backend:** Laravel (PHP)
* **Frontend:** React.js, Vite
* **Tasarım:** Tailwind CSS, Lucide React (İkonlar)
* **Veritabanı:** MySQL (Bire-Çok ilişkiler, Cascade silme işlemleri ve Foreign Key kısıtlamaları ile normalize edilmiştir.)

## 🚀 Kurulum Talimatları

Projeyi yerel ortamınızda (localhost) çalıştırmak için aşağıdaki adımları izleyin:

**1. Depoyu Klonlayın**
```bash
git clone [https://github.com/enescimensoftwareeng/car-service-management.git](https://github.com/enescimensoftwareeng/car-service-management.git)
cd car-service-management
