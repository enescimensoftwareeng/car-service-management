import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Car, Wrench, ShieldCheck, Clock } from 'lucide-react'; // Senin kullandığın modern ikonlar

export default function CustomerDashboard({ auth, vehicles, customerName }) {
    // Toplam araç sayısı
    const totalVehicles = vehicles.length;
    // Toplam servis kaydı sayısı (tüm araçların servislerini topluyoruz)
    const totalServices = vehicles.reduce((acc, vehicle) => acc + vehicle.services.length, 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Müşteri Paneli</h2>}
        >
            <Head title="Garajım" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Müşteri Karşılama Banner'ı (Senin o efsane koyu mavi tasarımına uyumlu) */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden flex justify-between items-center">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-medium mb-1">Garajınıza Hoş Geldiniz,</h1>
                            <h2 className="text-4xl font-bold text-blue-400 italic">{customerName}</h2>
                            <p className="mt-4 text-slate-300 max-w-xl text-lg">
                                Aracınızın tüm servis geçmişi, bakım durumu ve detayları güvence altında.
                                Aşağıdan kayıtlı araçlarınızı ve işlem detaylarını inceleyebilirsiniz.
                            </p>
                        </div>
                        {/* Sağ taraftaki minik istatistik kutuları */}
                        <div className="hidden md:flex gap-4 relative z-10">
                            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 text-center border border-slate-700">
                                <p className="text-slate-400 text-sm font-semibold mb-2">KAYITLI ARAÇ</p>
                                <p className="text-4xl font-bold">{totalVehicles}</p>
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 text-center border border-slate-700">
                                <p className="text-slate-400 text-sm font-semibold mb-2">TOPLAM SERVİS</p>
                                <p className="text-4xl font-bold">{totalServices}</p>
                            </div>
                        </div>
                        {/* Arka plan süslemesi */}
                        <div className="absolute -right-20 -top-20 opacity-10">
                            <Car size={300} />
                        </div>
                    </div>

                    {/* Garajımdaki Araçlar Listesi */}
                    <div>
                        <div className="flex justify-between items-end mb-6 mt-10">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <ShieldCheck className="text-blue-600" /> Garajımdaki Araçlar
                                </h3>
                            </div>
                        </div>

                        {vehicles.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                                <Car className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Henüz kayıtlı bir aracınız yok</h3>
                                <p className="mt-2 text-gray-500">Sisteme aracınız eklendiğinde burada görünecektir.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {vehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative group overflow-hidden">
                                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>

                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">PLAKA</p>
                                                <h4 className="text-2xl font-black text-gray-800 tracking-tight">{vehicle.plate}</h4>
                                            </div>
                                            <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                                                <Car size={24} />
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Wrench size={18} className="text-gray-400" />
                                                <span className="font-medium text-gray-900">{vehicle.model}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Clock size={18} className="text-gray-400" />
                                                <span className="text-sm">Son İşlem: {vehicle.services.length > 0 ? "Kayıt Var" : "Henüz işlem yok"}</span>
                                            </div>
                                        </div>

                                        {/* Bu buton şimdilik boş duracak, sonra "Servis Detayları" sayfasına bağlayacağız */}
                                        <Link href="#" className="block w-full py-3 px-4 bg-gray-50 hover:bg-blue-50 text-center rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors border border-gray-200 hover:border-blue-200">
                                            Servis Geçmişini İncele
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
