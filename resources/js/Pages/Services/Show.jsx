import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function Show({ auth, service }) {
    // Parça ekleme formu için Inertia useForm hook'u
    const { data, setData, post, processing, reset, errors } = useForm({
        item_name: '',
        quantity: 1,
        unit_price: '',
    });

    // Toplam tutarı hesaplayan yardımcı fonksiyon
    const totalAmount = service.items?.reduce((sum, item) => {
        return sum + (item.quantity * item.unit_price);
    }, 0);

    const submitItem = (e) => {
        e.preventDefault();
        // ServiceController'da yeni bir metod oluşturacağız (addItem)
        post(route('services.items.store', service.id), {
            onSuccess: () => reset(),
        });
    };

    const updateStatus = (newStatus) => {
        router.patch(route('services.update', service.id), {
            status: newStatus
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Servis Detayı - #{service.id}</h2>}
        >
            <Head title={`Servis #${service.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Üst Bilgi Kartı */}
                    <div className="bg-white p-6 shadow sm:rounded-lg flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{service.vehicle?.plate}</h3>
                            <p className="text-sm text-gray-600">{service.vehicle?.owner?.name} - {service.vehicle?.model}</p>
                            <p className="mt-2 text-sm italic text-gray-500">" {service.complaint} "</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-xs text-gray-500 uppercase">Durum</span>
                            <span className="text-lg font-bold text-indigo-600 uppercase">{service.status}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Sol Taraf: Parça Ekleme Formu */}
                        <div className="bg-white p-6 shadow sm:rounded-lg">
                            <h3 className="font-bold mb-4 border-b pb-2">Parça / İşçilik Ekle</h3>
                            <form onSubmit={submitItem} className="space-y-4">
                                <div>
                                    <InputLabel value="Açıklama" />
                                    <TextInput
                                        className="w-full"
                                        value={data.item_name}
                                        onChange={e => setData('item_name', e.target.value)}
                                        placeholder="Örn: Motor Yağı Değişimi"
                                    />
                                    <InputError message={errors.item_name} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <InputLabel value="Adet" />
                                        <TextInput
                                            type="number"
                                            className="w-full"
                                            value={data.quantity}
                                            onChange={e => setData('quantity', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Birim Fiyat" />
                                        <TextInput
                                            type="number"
                                            className="w-full"
                                            value={data.unit_price}
                                            onChange={e => setData('unit_price', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <PrimaryButton className="w-full justify-center" disabled={processing}>
                                    Listeye Ekle
                                </PrimaryButton>
                            </form>
                        </div>

                        {/* Sağ Taraf: Fatura Listesi */}
                        <div className="md:col-span-2 bg-white p-6 shadow sm:rounded-lg">
                            <h3 className="font-bold mb-4 border-b pb-2">Yapılan İşlemler</h3>
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="text-gray-500 border-b">
                                    <th className="py-2">İşlem</th>
                                    <th className="py-2 text-center">Adet</th>
                                    <th className="py-2 text-right">Birim</th>
                                    <th className="py-2 text-right">Toplam</th>
                                </tr>
                                </thead>
                                <tbody>
                                {service.items?.map(item => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-3">{item.item_name}</td>
                                        <td className="py-3 text-center">{item.quantity}</td>
                                        <td className="py-3 text-right">{item.unit_price} TL</td>
                                        <td className="py-3 text-right font-bold">{(item.quantity * item.unit_price).toFixed(2)} TL</td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot>
                                <tr className="text-lg font-bold">
                                    <td colSpan="3" className="py-4 text-right">GENEL TOPLAM:</td>
                                    <td className="py-4 text-right text-green-600">{totalAmount.toFixed(2)} TL</td>
                                </tr>
                                </tfoot>
                            </table>

                            <div className="mt-8 flex gap-2 justify-end">
                                <button onClick={() => updateStatus('processing')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">İşleme Al</button>
                                <button onClick={() => updateStatus('completed')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Servisi Tamamla</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
