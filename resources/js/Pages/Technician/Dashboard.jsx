import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Wrench, Settings, ChevronRight, CheckCircle2, ClipboardList, Zap
} from 'lucide-react';

export default function TechnicianDashboard({ auth, stats, active_services = [] }) {
    return (
        <AuthenticatedLayout user={auth?.user} header={null}>
            <Head title="Usta Paneli" />

            <div className="bg-slate-50/50 min-h-screen pt-2 pb-12 -mt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Karşılama Alanı (Hero Section) */}
                    <div className="relative bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/20 overflow-hidden group">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]"></div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-4xl font-black text-white mb-4 leading-tight">
                                    Kolay Gelsin, <br />
                                    <span className="text-blue-400 font-medium italic">{auth?.user?.name}</span>
                                </h3>
                                <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                                    Size atanan araçları ve iş emirlerini buradan takip edebilirsiniz.<br />
                                    İhtiyacınız olan parçaları stoklardan görüntüleyebilirsiniz.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center min-w-[120px]">
                                    <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">DURUM</p>
                                    <p className="text-white text-3xl font-black">AKTİF</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* İstatistik Kartları */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href={route('services.index')} className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 rounded-2xl bg-orange-50 text-orange-600 group-hover:scale-110 transition-transform">
                                    <Wrench className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase">Aktif İşler</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 mb-1">Bekleyen İşlerim</p>
                                    <h4 className="text-4xl font-black text-slate-900">{stats?.active_tasks || 0}</h4>
                                </div>
                                <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-orange-500 transition-colors group-hover:translate-x-1" />
                            </div>
                        </Link>

                        <Link href={route('services.index')} className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 mb-1">Tamamladığım İşler</p>
                                    <h4 className="text-4xl font-black text-slate-900">{stats?.completed_tasks || 0}</h4>
                                </div>
                                <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-emerald-500 transition-colors group-hover:translate-x-1" />
                            </div>
                        </Link>

                        <div className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 rounded-2xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
                                    <Settings className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500 mb-1">Depodaki Çeşit Sayısı</p>
                                <h4 className="text-4xl font-black text-slate-900">{stats?.total_parts || 0}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Sol Taraf: Aktif İş Emirleri */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-6">
                                <ClipboardList className="w-5 h-5 text-blue-500" />
                                Devam Eden İşlerim
                            </h3>

                            <div className="space-y-4">
                                {active_services && active_services.length > 0 ? (
                                    active_services.map((service) => (
                                        <div key={service.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                                            <div className="mb-4 sm:mb-0">
                                                <h4 className="font-bold text-slate-800 text-lg">{service.vehicle?.plate}</h4>
                                                <p className="text-sm text-slate-500 mb-1">{service.vehicle?.brand?.name} {service.vehicle?.model}</p>
                                                <p className="text-xs text-slate-400 bg-white px-2 py-1 rounded inline-block border">Şikayet: {service.complaint}</p>
                                            </div>
                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                                                    service.status === 'İşlemde' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {service.status}
                                                </span>
                                                <Link
                                                    href={route('services.show', service.id)}
                                                    className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
                                                    title="İş Emrine Git"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                                        <p className="font-bold text-slate-700">Harika! Tüm işleri bitirdiniz.</p>
                                        <p className="text-sm text-slate-500">Şu anda üzerinizde aktif bir iş emri bulunmuyor.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sağ Taraf: Hızlı İşlemler */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-6">
                                <Zap className="w-5 h-5 text-orange-500" />
                                Hızlı Araçlar
                            </h3>
                            
                            <div className="space-y-4">
                                <Link href={route('services.index')} className="group flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-transparent hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                            <ClipboardList className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">Tüm Servis Kayıtları</h4>
                                            <p className="text-sm text-slate-500">Sistemdeki tüm kayıtları incele</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                </Link>

                                <Link href={route('parts.index')} className="group flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-transparent hover:border-purple-200 hover:bg-purple-50/50 transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                            <Settings className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">Depo ve Stoklar</h4>
                                            <p className="text-sm text-slate-500">Kullanılabilir parçalara göz at</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
