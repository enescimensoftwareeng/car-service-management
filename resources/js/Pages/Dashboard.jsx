import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <h2 className="font-bold text-2xl text-gray-800 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Sistem Özeti & Raporlar
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Karşılama Alanı */}
                    <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden border border-white/10">
                        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-extrabold mb-2">
                                Hoş Geldin, {auth?.user?.name}! 👋
                            </h3>
                            <p className="text-blue-200 text-lg max-w-2xl">
                                Servis yönetim panelindesin. Sistemdeki güncel durumu aşağıdan takip edebilir, hızlı işlemler menüsüyle operasyonları yönetebilirsin.
                            </p>
                        </div>
                    </div>

                    {/* İstatistik Kartları (Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Kart 1: Toplam Araç */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Sistemdeki Araçlar</p>
                                    <h4 className="text-3xl font-black text-gray-800 group-hover:text-blue-600 transition-colors">{stats?.vehicles || 0}</h4>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <span className="text-2xl">🚗</span>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-green-600 font-medium flex items-center">
                                <span>+ Yeni kayıtlar aktif</span>
                            </div>
                        </div>

                        {/* Kart 2: Müşteriler */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Kayıtlı Müşteri</p>
                                    <h4 className="text-3xl font-black text-gray-800 group-hover:text-indigo-600 transition-colors">{stats?.customers || 0}</h4>
                                </div>
                                <div className="p-3 bg-indigo-50 rounded-xl">
                                    <span className="text-2xl">👥</span>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-blue-500 font-medium">
                                <span>Sistemi kullananlar</span>
                            </div>
                        </div>

                        {/* Kart 3: Günlük Servisler */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Bugün Açılan İşler</p>
                                    <h4 className="text-3xl font-black text-gray-800 group-hover:text-orange-500 transition-colors">{stats?.daily_services || 0}</h4>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-xl">
                                    <span className="text-2xl">🛠️</span>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-orange-500 font-medium">
                                <span>Günlük iş emri sayısı</span>
                            </div>
                        </div>

                        {/* Kart 4: Desteklenen Markalar */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Kayıtlı Markalar</p>
                                    <h4 className="text-3xl font-black text-gray-800 group-hover:text-purple-600 transition-colors">{stats?.brands || 0}</h4>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-xl">
                                    <span className="text-2xl">🏷️</span>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-purple-500 font-medium">
                                <span>Veritabanı tanımlı</span>
                            </div>
                        </div>

                    </div>

                    {/* Hızlı İşlemler & Sistem Durumu */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                        {/* Hızlı Kısayollar (2 Kolon kaplar) */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                ⚡ Hızlı İşlemler
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link href={route('vehicles.index')} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition group">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                        ➕
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Yeni Araç Ekle</h4>
                                        <p className="text-xs text-gray-500">Sisteme müşteri aracı kaydet</p>
                                    </div>
                                </Link>

                                <Link href={route('services.index')} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-orange-50 hover:border-orange-200 transition group">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                        📝
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">İş Emri Aç</h4>
                                        <p className="text-xs text-gray-500">Servise gelen aracı kaydet</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Sistem Bilgisi (1 Kolon kaplar) */}
                        <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 text-white relative overflow-hidden">
                            <div className="absolute -right-10 -bottom-10 opacity-10">
                                <span className="text-9xl">⚙️</span>
                            </div>
                            <h3 className="text-lg font-bold mb-6 text-slate-200">Sistem Bilgisi</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                    <span className="text-slate-400 text-sm">Veritabanı Durumu</span>
                                    <span className="flex items-center gap-1 text-green-400 text-sm font-bold">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Aktif
                                    </span>
                                </li>
                                <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                    <span className="text-slate-400 text-sm">Güvenlik (Middleware)</span>
                                    <span className="text-blue-400 text-sm font-bold">Aktif</span>
                                </li>
                                <li className="flex justify-between items-center pb-2">
                                    <span className="text-slate-400 text-sm">Senkronizasyon</span>
                                    <span className="text-slate-200 text-sm font-bold">Gerçek Zamanlı</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
