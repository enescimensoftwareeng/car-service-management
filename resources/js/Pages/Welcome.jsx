import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Hoş Geldiniz" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">

                {/* Arka Plan Dekorasyonu */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px]"></div>
                </div>

                {/* Navigasyon */}
                <nav className="relative z-10 flex justify-between items-center px-6 py-8 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight">ARABA SERVİS <span className="text-blue-400">PRO</span></span>
                    </div>

                    <div className="flex gap-4">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-medium transition"
                            >
                                Yönetim Paneli
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-6 py-2 font-medium hover:text-blue-300 transition"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition shadow-lg shadow-blue-500/20"
                                >
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Bölümü */}
                <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Servis Yönetiminde <br /> Modern Çözüm.
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                        Araç kayıtları, usta atamaları ve fatura takibi artık çok daha kolay.
                        İşletmenizin verimliliğini artırmak için tasarlandı.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={auth?.user ? route('dashboard') : route('login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-10 py-4 rounded-2xl transition shadow-2xl shadow-blue-500/40 transform hover:scale-105"
                        >
                            Hemen Başlayın
                        </Link>
                    </div>

                    {/* Özellik Kartları (Glassmorphism) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl text-left hover:bg-white/10 transition">
                            <div className="text-blue-400 mb-4 text-3xl font-bold">01</div>
                            <h3 className="text-xl font-bold mb-2">Hızlı Araç Kaydı</h3>
                            <p className="text-gray-400 text-sm">Plaka ve marka bazlı detaylı araç yönetimini saniyeler içinde yapın.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl text-left hover:bg-white/10 transition">
                            <div className="text-blue-400 mb-4 text-3xl font-bold">02</div>
                            <h3 className="text-xl font-bold mb-2">İş Emri Takibi</h3>
                            <p className="text-gray-400 text-sm">Ustaların işlemlerini canlı olarak izleyin ve durum güncellemelerini anlık görün.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl text-left hover:bg-white/10 transition">
                            <div className="text-blue-400 mb-4 text-3xl font-bold">03</div>
                            <h3 className="text-xl font-bold mb-2">Otomatik Fatura</h3>
                            <p className="text-gray-400 text-sm">Parça ve işçilik kalemlerini girin, toplam tutarı sistem sizin yerinize hesaplasın.</p>
                        </div>
                    </div>
                </main>

                {/* Alt Bilgi */}
                <footer className="relative z-10 py-10 text-center text-gray-500 text-sm border-t border-white/5">
                    © 2026 Araba Servis Takip Sistemi. Muhammed Enes Çimen tarafından geliştirildi.
                </footer>
            </div>
        </>
    );
}
