import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, service }) {
    // Parça ekleme formu için state yönetimi
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        quantity: 1,
        price: '',
    });

    const submitItem = (e) => {
        e.preventDefault();
        post(route('services.add-item', service.id), {
            onSuccess: () => reset(), // Başarılı olursa formu temizle
        });
    };

    // Eklenen kalemlerin toplam fiyatını hesapla
    const totalCost = service.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">İş Emri Detayı: #{service.id}</h2>}
        >
            <Head title={`Servis #${service.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* ÜST KART: Araç ve Müşteri Şikayeti */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-2xl font-bold">{service.vehicle?.plate}</h3>
                                <p className="text-gray-600">{service.vehicle?.brand?.name} {service.vehicle?.model}</p>
                                <p className="mt-4"><strong>Şikayet:</strong> {service.complaint}</p>
                            </div>
                            <div className="text-right">
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">
                                    {service.status}
                                </span>
                                <p className="mt-2 text-sm text-gray-500">Sorumlu Usta: {service.technician?.name}</p>
                                <p className="text-sm text-gray-500">Giriş KM: {service.km_entry}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* SOL TARAF: Eklenen Kalemler ve Fatura */}
                        <div className="lg:col-span-2 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Yapılan İşlemler & Parçalar</h3>

                            {service.items?.length > 0 ? (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                    <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                                        <th className="p-3">İşlem / Parça</th>
                                        <th className="p-3 text-center">Adet</th>
                                        <th className="p-3 text-right">Birim Fiyat</th>
                                        <th className="p-3 text-right">Toplam</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {service.items.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="p-3">{item.name}</td>
                                            <td className="p-3 text-center">{item.quantity}</td>
                                            <td className="p-3 text-right">{Number(item.price).toLocaleString('tr-TR')} ₺</td>
                                            <td className="p-3 text-right font-medium">{(item.quantity * item.price).toLocaleString('tr-TR')} ₺</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500 text-center py-4">Henüz bir işlem veya parça eklenmedi.</p>
                            )}

                            <div className="mt-6 flex justify-end">
                                <div className="bg-gray-800 text-white p-4 rounded-lg shadow min-w-[250px]">
                                    <div className="flex justify-between text-lg">
                                        <span>Genel Toplam:</span>
                                        <span className="font-bold text-green-400">{totalCost.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SAĞ TARAF: Yeni Kalem Ekleme Formu */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 bg-gray-50">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2 text-blue-600">+ Yeni Kalem Ekle</h3>
                            <form onSubmit={submitItem} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Parça veya İşçilik Adı</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        placeholder="Örn: Motor Yağı, Fren Balatası..."
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Adet</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.quantity}
                                            onChange={e => setData('quantity', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Birim Fiyat (₺)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                            placeholder="0.00"
                                        />
                                        {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50 mt-4"
                                >
                                    Faturaya Ekle
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
