import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Car, Users, Wrench, BadgeCheck,
    ChevronRight, Zap
} from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={null}
        >
            <Head title="Dashboard" />

            {/* py-10 olan üst boşluğu pt-2 (üstten 2 birim) yaparak lacivert kutuyu yukarı çektik */}
            <div className="bg-slate-50/50 min-h-screen pt-2 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Karşılama Alanı (Hero Section) */}
                    <div className="relative bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/20 overflow-hidden group">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]"></div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-4xl font-black text-white mb-4 leading-tight">
                                    Hoş Geldin, <br />
                                    <span className="text-blue-400 font-medium italic">{auth?.user?.name}</span>
                                </h3>
                                <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                                    Servis operasyonları bugün %100 kapasiteyle çalışıyor. <br />
                                    Aşağıdan güncel araç durumlarını ve iş emirlerini yönetebilirsin.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center min-w-[120px]">
                                    <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">VERİMLİLİK</p>
                                    <p className="text-white text-3xl font-black">AKTİF</p>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center min-w-[120px]">
                                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">AKTİF USTA</p>
                                    <p className="text-white text-3xl font-black">{stats?.technicians || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* İstatistik Kartları */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Sistemdeki Araçlar', val: stats?.vehicles, icon: Car, color: 'blue' },
                            { label: 'Kayıtlı Müşteri', val: stats?.customers, icon: Users, color: 'indigo' },
                            { label: 'Günlük İş Emri', val: stats?.daily_services, icon: Wrench, color: 'orange' },
                            { label: 'Kayıtlı Markalar', val: stats?.brands, icon: BadgeCheck, color: 'purple' },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase">Canlı Veri</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
                                    <h4 className="text-4xl font-black text-slate-900">{stat.val || 0}</h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hızlı İşlemler */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
                                Hızlı Operasyonlar
                            </h3>
                            <Link
                                href={route('services.index')}
                                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                            >
                                Tümünü Gör <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Link href={route('vehicles.index')} className="group flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-transparent hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:rotate-12 transition-transform">
                                        <Car className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Yeni Araç</h4>
                                        <p className="text-sm text-slate-500">Müşteri kaydı oluştur</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                            </Link>

                            <Link href={route('services.index')} className="group flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-transparent hover:border-orange-200 hover:bg-orange-50/50 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-600 group-hover:rotate-12 transition-transform">
                                        <Wrench className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">İş Emri</h4>
                                        <p className="text-sm text-slate-500">Servis kaydı başlat</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-600 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
