import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, service }) {
    const [showToast, setShowToast] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

    // YENİ: Veritabanındaki gerçek isimlerle eşleşti
    const [editForm, setEditForm] = useState({ item_name: '', quantity: 1, unit_price: '' });

    const { data, setData, post, processing, reset, errors } = useForm({
        item_name: '',
        quantity: 1,
        unit_price: '',
    });

    const submitItem = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const confirmAndSubmit = () => {
        post(route('services.items.store', service.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowModal(false);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            },
        });
    };

    const changeStatus = (newStatus) => {
        router.patch(route('services.update-status', service.id), { status: newStatus }, {
            preserveScroll: true
        });
    };

    const startEdit = (item) => {
        setEditingItemId(item.id);
        setEditForm({ item_name: item.item_name, quantity: item.quantity, unit_price: item.unit_price });
    };

    const cancelEdit = () => {
        setEditingItemId(null);
    };

    const saveEdit = (item) => {
        router.put(route('services.items.update', item.id), editForm, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingItemId(null);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        });
    };

    // YENİ: Toplam hesaplama unit_price üzerinden yapılıyor
    const totalCost = service.items?.reduce((total, item) => total + (item.unit_price * item.quantity), 0) || 0;

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">İş Emri Detayı: #{service.id}</h2>}
        >
            <Head title={`Servis #${service.id}`} />

            {/* Bildirim (Toast) */}
            {showToast && (
                <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-5 py-4 rounded-lg shadow-2xl flex items-center gap-3 z-50 border-l-4 border-green-500 animate-pulse font-sans">
                    <div className="bg-green-500/20 p-1 rounded-full">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <span className="font-semibold text-sm tracking-wide">İşlem başarıyla kaydedildi!</span>
                </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-2xl font-bold">{service.vehicle?.plate}</h3>
                                <p className="text-gray-600">{service.vehicle?.brand?.name} {service.vehicle?.model}</p>
                                <p className="mt-2"><strong>Şikayet:</strong> {service.complaint}</p>
                                <p className="text-sm text-gray-500 mt-1">Sorumlu Usta: {service.technician?.name} | Giriş KM: {service.km_entry}</p>
                            </div>

                            <div className="flex flex-col items-end gap-2 bg-gray-50 p-3 rounded-lg border">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Servis Durumu</span>
                                <div className="flex gap-2">
                                    <button onClick={() => changeStatus('Beklemede')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${service.status === 'Beklemede' ? 'bg-yellow-500 text-white shadow-inner' : 'bg-white border text-gray-600 hover:bg-yellow-50'}`}>Beklemede</button>
                                    <button onClick={() => changeStatus('İşlemde')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${service.status === 'İşlemde' ? 'bg-blue-500 text-white shadow-inner' : 'bg-white border text-gray-600 hover:bg-blue-50'}`}>İşlemde</button>
                                    <button onClick={() => changeStatus('Tamamlandı')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${service.status === 'Tamamlandı' ? 'bg-green-500 text-white shadow-inner' : 'bg-white border text-gray-600 hover:bg-green-50'}`}>Tamamlandı</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                                        <th className="p-3 text-center">İşlem</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {service.items.map((item) => (
                                        <tr key={item.id} className={`hover:bg-gray-50 ${editingItemId === item.id ? 'bg-blue-50' : ''}`}>
                                            {editingItemId === item.id ? (
                                                <>
                                                    <td className="p-2">
                                                        <input type="text" value={editForm.item_name} onChange={e => setEditForm({...editForm, item_name: e.target.value})} className="w-full border-gray-300 rounded text-sm py-1" />
                                                    </td>
                                                    <td className="p-2">
                                                        <input type="number" min="1" value={editForm.quantity} onChange={e => setEditForm({...editForm, quantity: e.target.value})} className="w-full border-gray-300 rounded text-sm text-center py-1" />
                                                    </td>
                                                    <td className="p-2">
                                                        <input type="number" step="0.01" value={editForm.unit_price} onChange={e => setEditForm({...editForm, unit_price: e.target.value})} className="w-full border-gray-300 rounded text-sm text-right py-1" />
                                                    </td>
                                                    <td className="p-2 text-right font-bold text-gray-700">
                                                        {(editForm.quantity * editForm.unit_price).toLocaleString('tr-TR')} ₺
                                                    </td>
                                                    <td className="p-2 text-center flex justify-center gap-1 mt-1">
                                                        <button onClick={() => saveEdit(item)} className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold hover:bg-green-600 transition">Kaydet</button>
                                                        <button onClick={cancelEdit} className="bg-gray-400 text-white px-2 py-1 rounded text-xs font-bold hover:bg-gray-500 transition">İptal</button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="p-3 font-medium text-gray-800">{item.item_name}</td>
                                                    <td className="p-3 text-center">{item.quantity}</td>
                                                    <td className="p-3 text-right">{Number(item.unit_price).toLocaleString('tr-TR')} ₺</td>
                                                    <td className="p-3 text-right font-bold text-gray-700">{(item.quantity * item.unit_price).toLocaleString('tr-TR')} ₺</td>
                                                    <td className="p-3 text-center">
                                                        <button onClick={() => startEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline">Düzenle</button>
                                                    </td>
                                                </>
                                            )}
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

                        {/* Fatura Ekleme Formu */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 bg-gray-50">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2 text-blue-600">+ Yeni Kalem Ekle</h3>
                            <form onSubmit={submitItem} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Parça veya İşçilik Adı</label>
                                    <input type="text" value={data.item_name} onChange={e => setData('item_name', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm" required />
                                    {errors.item_name && <div className="text-red-500 text-xs mt-1">{errors.item_name}</div>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Adet</label>
                                        <input type="number" min="1" value={data.quantity} onChange={e => setData('quantity', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Birim Fiyat (₺)</label>
                                        <input type="number" step="0.01" value={data.unit_price} onChange={e => setData('unit_price', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm" required />
                                        {errors.unit_price && <div className="text-red-500 text-xs mt-1">{errors.unit_price}</div>}
                                    </div>
                                </div>
                                <button type="submit" disabled={processing} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition mt-4 shadow-sm">
                                    Faturaya Ekle
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* ŞIK ONAY MODALI */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all">
                    <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl mx-4 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-black text-slate-800 mb-2">Kalem Eklenecek</h3>
                        <p className="text-slate-500 mb-8 text-sm">
                            <span className="font-bold text-slate-700">{data.item_name}</span> faturaya yansıtılacaktır. Onaylıyor musunuz?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 px-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                onClick={confirmAndSubmit}
                                disabled={processing}
                                className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                Evet, Ekle
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
