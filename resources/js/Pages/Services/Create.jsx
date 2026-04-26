import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, vehicles = [], technicians = [] }) {
    // Form verilerini ve hata yönetimini başlatalım
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Yeni İş Emri (Servis Kaydı)</h2>}
        >
            <Head title="İş Emri Aç" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">

                        <form onSubmit={submit} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Araç Seçimi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Araç (Plaka / Model) *</label>
                                    <select
                                        value={data.vehicle_id}
                                        onChange={e => setData('vehicle_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Araç Seçiniz</option>
                                        {vehicles.map(vehicle => (
                                            <option key={vehicle.id} value={vehicle.id}>
                                                {vehicle.plate} - {vehicle?.brand?.name} {vehicle.model}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.vehicle_id && <div className="text-red-500 text-xs mt-1">{errors.vehicle_id}</div>}
                                </div>

                                {/* Sorumlu Usta Seçimi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sorumlu Usta *</label>
                                    <select
                                        value={data.technician_id}
                                        onChange={e => setData('technician_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Usta Seçiniz</option>
                                        {technicians.map(tech => (
                                            <option key={tech.id} value={tech.id}>{tech.name}</option>
                                        ))}
                                    </select>
                                    {errors.technician_id && <div className="text-red-500 text-xs mt-1">{errors.technician_id}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Giriş Kilometresi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Giriş Kilometresi *</label>
                                    <input
                                        type="number"
                                        value={data.km_entry}
                                        onChange={e => setData('km_entry', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        placeholder="Örn: 125000"
                                    />
                                    {errors.km_entry && <div className="text-red-500 text-xs mt-1">{errors.km_entry}</div>}
                                </div>

                                {/* Durum Seçimi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Başlangıç Durumu</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                    >
                                        <option value="Beklemede">Beklemede</option>
                                        <option value="İşlemde">İşlemde</option>
                                        <option value="Tamamlandı">Tamamlandı</option>
                                    </select>
                                </div>
                            </div>

                            {/* Şikayet / Talep */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Müşteri Şikayeti / Yapılacak İşlemler *</label>
                                <textarea
                                    rows="4"
                                    value={data.complaint}
                                    onChange={e => setData('complaint', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                    placeholder="Yağ bakımı yapılacak, ön takımdan ses geliyor..."
                                ></textarea>
                                {errors.complaint && <div className="text-red-500 text-xs mt-1">{errors.complaint}</div>}
                            </div>

                            {/* Butonlar */}
                            <div className="flex items-center justify-end pt-4 border-t">
                                <Link href={route('services.index')} className="text-gray-600 hover:text-gray-900 mr-6 font-medium">
                                    İptal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition shadow-lg disabled:opacity-50"
                                >
                                    İş Emrini Oluştur
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
