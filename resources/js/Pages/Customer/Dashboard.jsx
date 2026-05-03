import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Car, Calendar, ChevronRight, ShieldCheck, Activity, Clock, CheckCircle2, History } from 'lucide-react';

// pastServices prop'unu ekledik
export default function CustomerDashboard({ auth, vehicles = [], activeServices = [], pastServices = [] }) {

    // Tarih formatlamak için yardımcı fonksiyon
    const formatDate = (dateString) => {
        if (!dateString) return 'Tarih Yok';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <AuthenticatedLayout user={auth?.user} header={null}>
            <Head title="Müşteri Paneli" />

            <div className="bg-slate-50/50 min-h-screen pt-2 pb-12 -mt-10">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Müşteri Karşılama Kartı */}
                    <div className="relative bg-slate-900 rounded-[2.5rem] p-10 shadow-xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-indigo-600/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4"></div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                    <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Müşteri Portalı</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                                    Merhaba, <span className="text-blue-400">{auth?.user?.name}</span>
                                </h3>
                                <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
                                    Aracınız ServisPro güvencesi altında. Tüm servis süreçlerini, geçmiş işlemlerinizi ve faturalarınızı buradan şeffaf bir şekilde takip edebilirsiniz.
                                </p>
                            </div>

                            <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-3xl min-w-[200px] text-center md:text-left">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Garajımdaki Araçlar</p>
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <Car className="w-8 h-8 text-blue-400" />
                                    <span className="text-white text-4xl font-black">{vehicles.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* SOL KOLON: Servis Süreçleri */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* DEVAM EDEN İŞLEMLER */}
                            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative">
                                <h4 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-6">
                                    {activeServices.length > 0 && (
                                        <div className="relative flex h-3 w-3">
                                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></div>
                                            <div className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></div>
                                        </div>
                                    )}
                                    Devam Eden İşlemleriniz
                                </h4>

                                {activeServices.length > 0 ? (
                                    activeServices.map((service) => (
                                        <div key={service.id} className="bg-slate-50 border border-slate-200 rounded-[1.5rem] p-6 mb-4">
                                            <div className="flex justify-between items-center mb-6">
                                                <div>
                                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full mb-2">
                                                        {service.vehicle?.plate || 'Bilinmeyen Araç'}
                                                    </span>
                                                    <h5 className="text-xl font-bold text-slate-900">
                                                        {service.description || 'Genel Servis İşlemi'}
                                                    </h5>
                                                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-2">
                                                        <Calendar className="w-4 h-4" /> Giriş Tarihi: {formatDate(service.created_at)}
                                                    </p>
                                                </div>
                                                <div className="px-5 py-2.5 bg-orange-100 text-orange-700 font-bold rounded-xl border border-orange-200">
                                                    {service.status}
                                                </div>
                                            </div>

                                            <div className="relative pt-4 border-t border-slate-200">
                                                <div className="flex justify-between mb-3">
                                                    <span className={`text-xs font-bold flex items-center gap-1 ${service.status === 'Bekliyor' ? 'text-orange-600' : 'text-emerald-600'}`}>
                                                        <CheckCircle2 className="w-4 h-4"/> Teslim Alındı
                                                    </span>
                                                    <span className={`text-xs font-bold flex items-center gap-1 ${service.status === 'İşlemde' ? 'text-orange-600' : 'text-slate-400'}`}>
                                                        <Activity className="w-4 h-4"/> Bakım Yapılıyor
                                                    </span>
                                                    <span className={`text-xs font-bold flex items-center gap-1 ${service.status === 'Tamamlandı' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                        <CheckCircle2 className="w-4 h-4"/> Teslime Hazır
                                                    </span>
                                                </div>
                                                <div className="w-full bg-slate-200 rounded-full h-2.5">
                                                    <div
                                                        className="bg-gradient-to-r from-orange-400 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                                                        style={{
                                                            width: service.status === 'Bekliyor' ? '25%' :
                                                                service.status === 'İşlemde' ? '50%' :
                                                                    service.status === 'Tamamlandı' ? '100%' : '10%'
                                                        }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-slate-50 rounded-[1.5rem] border border-dashed border-slate-200">
                                        <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500 font-medium">Şu anda serviste olan aracınız bulunmamaktadır.</p>
                                    </div>
                                )}
                            </div>

                            {/* GEÇMİŞ SERVİS KAYITLARI (YENİ EKLENDİ) */}
                            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                                <h4 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-6">
                                    <History className="w-6 h-6 text-blue-500" />
                                    Geçmiş Servis Kayıtları
                                </h4>

                                {pastServices.length > 0 ? (
                                    <div className="space-y-4">
                                        {pastServices.map((service) => (
                                            <div key={service.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-slate-50 transition-colors group">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-full">
                                                            {service.vehicle?.plate || 'Bilinmeyen Araç'}
                                                        </span>
                                                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" /> {formatDate(service.created_at)}
                                                        </span>
                                                    </div>
                                                    <h5 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                                                        {service.description || 'Genel Servis İşlemi'}
                                                    </h5>
                                                </div>
                                                <div className="mt-4 sm:mt-0 px-4 py-2 bg-emerald-50 text-emerald-600 font-bold rounded-xl border border-emerald-100 text-sm flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    {service.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Clock className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                                        <p className="text-sm text-slate-500">Henüz geçmiş bir servis kaydınız bulunmuyor.</p>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* SAĞ KOLON: Garajım */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                                <h4 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-6">
                                    <Car className="w-5 h-5 text-blue-500" /> Garajım
                                </h4>
                                <div className="space-y-4">
                                    {vehicles.length > 0 ? (
                                        vehicles.map((vehicle) => (
                                            <div key={vehicle.id} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 cursor-pointer transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-600 group-hover:text-blue-600">
                                                        <Car className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{vehicle.plate}</p>
                                                        <p className="text-xs text-slate-500">{vehicle.brand} {vehicle.model}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500 text-center py-4">Kayıtlı aracınız bulunmuyor.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
