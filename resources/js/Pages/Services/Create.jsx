import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Car, UserCog, Gauge, ClipboardList, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Create({ auth, vehicles = [], technicians = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        vehicle_id: '',
        technician_id: '',
        km_entry: '',
        complaint: '',
        status: 'Beklemede',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('services.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
        >
            <Head title="Yeni İş Emri" />

            {/* Üst Hero Bölümü - Dashboard Stili */}
            <div className="bg-[#1e293b] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <ClipboardList className="w-8 h-8 text-blue-400" />
                            Yeni İş Emri Oluştur
                        </h2>
                        <p className="text-gray-400 mt-2 text-lg">
                            Müşteri şikayetini ve sorumlu ustayı belirleyerek süreci başlatın.
                        </p>
                    </div>
                    <Link
                        href={route('services.index')}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl transition backdrop-blur-sm border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Listeye Dön
                    </Link>
                </div>
            </div>

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Form Kartı */}
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-2xl border border-gray-100">
                        <div className="p-8">
                            <form onSubmit={submit} className="space-y-8">

                                {/* Bölüm 1: Araç ve Usta Seçimi */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <Car className="w-4 h-4 text-blue-600" />
                                            Araç (Plaka / Model)
                                        </label>
                                        <select
                                            value={data.vehicle_id}
                                            onChange={e => setData('vehicle_id', e.target.value)}
                                            className="block w-full border-gray-200 focus:border-blue-600 focus:ring focus:ring-blue-100 rounded-xl shadow-sm py-3 transition"
                                        >
                                            <option value="">Araç Seçiniz</option>
                                            {vehicles.map(vehicle => (
                                                <option key={vehicle.id} value={vehicle.id}>
                                                    {vehicle.plate} - {vehicle?.brand?.name} {vehicle.model}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.vehicle_id && <div className="text-red-500 text-xs font-medium">{errors.vehicle_id}</div>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <UserCog className="w-4 h-4 text-blue-600" />
                                            Sorumlu Usta
                                        </label>
                                        <select
                                            value={data.technician_id}
                                            onChange={e => setData('technician_id', e.target.value)}
                                            className="block w-full border-gray-200 focus:border-blue-600 focus:ring focus:ring-blue-100 rounded-xl shadow-sm py-3 transition"
                                        >
                                            <option value="">Usta Seçiniz</option>
                                            {technicians.map(tech => (
                                                <option key={tech.id} value={tech.id}>{tech.name}</option>
                                            ))}
                                        </select>
                                        {errors.technician_id && <div className="text-red-500 text-xs font-medium">{errors.technician_id}</div>}
                                    </div>
                                </div>

                                {/* Bölüm 2: Kilometre ve Durum */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <Gauge className="w-4 h-4 text-blue-600" />
                                            Giriş Kilometresi
                                        </label>
                                        <input
                                            type="number"
                                            value={data.km_entry}
                                            onChange={e => setData('km_entry', e.target.value)}
                                            className="block w-full border-gray-200 focus:border-blue-600 focus:ring focus:ring-blue-100 rounded-xl shadow-sm py-3 transition"
                                            placeholder="Örn: 125000"
                                        />
                                        {errors.km_entry && <div className="text-red-500 text-xs font-medium">{errors.km_entry}</div>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <AlertCircle className="w-4 h-4 text-blue-600" />
                                            Başlangıç Durumu
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            className="block w-full border-gray-200 focus:border-blue-600 focus:ring focus:ring-blue-100 rounded-xl shadow-sm py-3 transition"
                                        >
                                            <option value="Beklemede">Beklemede (Sıraya Al)</option>
                                            <option value="İşlemde">İşlemde (Hemen Başla)</option>
                                            <option value="Tamamlandı">Tamamlandı</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Şikayet Bölümü */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <ClipboardList className="w-4 h-4 text-blue-600" />
                                        Müşteri Şikayeti / Yapılacak İşlemler
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={data.complaint}
                                        onChange={e => setData('complaint', e.target.value)}
                                        className="block w-full border-gray-200 focus:border-blue-600 focus:ring focus:ring-blue-100 rounded-xl shadow-sm py-3 transition"
                                        placeholder="Yağ bakımı yapılacak, ön takımdan ses geliyor..."
                                    ></textarea>
                                    {errors.complaint && <div className="text-red-500 text-xs font-medium">{errors.complaint}</div>}
                                </div>

                                {/* Alt İşlem Butonları */}
                                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                                    <Link
                                        href={route('services.index')}
                                        className="px-6 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 transition"
                                    >
                                        İşlemi İptal Et
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl transition shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {processing ? 'Kaydediliyor...' : 'İş Emrini Oluştur ve Başlat'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
