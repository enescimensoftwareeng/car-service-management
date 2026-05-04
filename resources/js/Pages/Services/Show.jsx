import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, service }) {
    const [showToast, setShowToast] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editForm, setEditForm] = useState({ description: '', quantity: 1, part_price: 0, labor_price: 0 });

    // price yerine iki ayrı değer tutuyoruz
    const { data, setData, post, processing, reset, errors } = useForm({
        description: '',
        quantity: 1,
        part_price: '',
        labor_price: '',
    });

    const submitItem = (e) => {
        e.preventDefault();
        if (window.confirm("Bu kalemi faturaya eklemek istediğinize emin misiniz?")) {
            post(route('services.items.store', service.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                },
            });
        }
    };

    const changeStatus = (newStatus) => {
        router.patch(route('services.update-status', service.id), { status: newStatus }, { preserveScroll: true });
    };

    const startEdit = (item) => {
        setEditingItemId(item.id);
        setEditForm({
            description: item.description,
            quantity: item.quantity,
            part_price: item.part_price,
            labor_price: item.labor_price
        });
    };

    const cancelEdit = () => setEditingItemId(null);

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

    // MATEMATİK ZAMANI: Tüm faturanın %20 KDV dahil toplamını hesaplıyoruz
    const totalCost = service.items?.reduce((total, item) => {
        const subTotal = (Number(item.part_price) + Number(item.labor_price)) * item.quantity;
        const kdv = subTotal * 0.20; // %20 KDV oranı
        return total + subTotal + kdv;
    }, 0) || 0;

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">İş Emri Detayı: #{service.id}</h2>}
        >
            <Head title={`Servis #${service.id}`} />

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

                    {/* Üst Bilgi Kartı */}
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
                                    <tr className="bg-gray-100 text-gray-600 text-xs uppercase">
                                        <th className="p-3">İşlem / Parça</th>
                                        <th className="p-3 text-center">Adet</th>
                                        <th className="p-3 text-right">Parça (₺)</th>
                                        <th className="p-3 text-right">İşçilik (₺)</th>
                                        <th className="p-3 text-right">KDV'li Toplam</th>
                                        <th className="p-3 text-center">İşlem</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {service.items.map((item) => {
                                        // SATIR MATEMATİĞİ
                                        const subTotal = (Number(item.part_price) + Number(item.labor_price)) * item.quantity;
                                        const kdvAmount = subTotal * 0.20;
                                        const rowTotal = subTotal + kdvAmount;

                                        return (
                                            <tr key={item.id} className={`hover:bg-gray-50 ${editingItemId === item.id ? 'bg-blue-50' : ''}`}>
                                                {editingItemId === item.id ? (
                                                    /* DÜZENLEME MODU GÖRÜNÜMÜ */
                                                    <>
                                                        <td className="p-2"><input type="text" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full border-gray-300 rounded text-sm py-1" /></td>
                                                        <td className="p-2"><input type="number" min="1" value={editForm.quantity} onChange={e => setEditForm({...editForm, quantity: e.target.value})} className="w-16 border-gray-300 rounded text-sm text-center py-1 mx-auto block" /></td>
                                                        <td className="p-2"><input type="number" step="0.01" value={editForm.part_price} onChange={e => setEditForm({...editForm, part_price: e.target.value})} className="w-20 border-gray-300 rounded text-sm text-right py-1 float-right" /></td>
                                                        <td className="p-2"><input type="number" step="0.01" value={editForm.labor_price} onChange={e => setEditForm({...editForm, labor_price: e.target.value})} className="w-20 border-gray-300 rounded text-sm text-right py-1 float-right" /></td>
                                                        <td className="p-2 text-right font-bold text-gray-700 text-sm">{rowTotal.toLocaleString('tr-TR')} ₺</td>
                                                        <td className="p-2 text-center flex justify-center gap-1 mt-1">
                                                            <button onClick={() => saveEdit(item)} className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold hover:bg-green-600 transition">Kaydet</button>
                                                            <button onClick={cancelEdit} className="bg-gray-400 text-white px-2 py-1 rounded text-xs font-bold hover:bg-gray-500 transition">İptal</button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    /* NORMAL LİSTE GÖRÜNÜMÜ */
                                                    <>
                                                        <td className="p-3 font-medium text-gray-800 text-sm">{item.description}</td>
                                                        <td className="p-3 text-center text-sm">{item.quantity}</td>
                                                        <td className="p-3 text-right text-sm">{Number(item.part_price).toLocaleString('tr-TR')} ₺</td>
                                                        <td className="p-3 text-right text-sm">{Number(item.labor_price).toLocaleString('tr-TR')} ₺</td>
                                                        <td className="p-3 text-right text-sm">
                                                            <span className="font-bold text-gray-700">{rowTotal.toLocaleString('tr-TR')} ₺</span>
                                                            <div className="text-[10px] text-gray-400">(%20 KDV Dahil)</div>
                                                        </td>
                                                        <td className="p-3 text-center">
                                                            <button onClick={() => startEdit(item)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold underline">Düzenle</button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500 text-center py-4">Henüz bir işlem veya parça eklenmedi.</p>
                            )}

                            <div className="mt-6 flex justify-end">
                                <div className="bg-gray-800 text-white p-4 rounded-lg shadow min-w-[280px]">
                                    <div className="flex justify-between text-xl">
                                        <span>Genel Toplam:</span>
                                        <span className="font-bold text-green-400">{totalCost.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                    <div className="text-right text-xs text-gray-400 mt-1">* Toplam tutara %20 KDV dahildir.</div>
                                </div>
                            </div>
                        </div>

                        {/* Fatura Ekleme Formu */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 bg-gray-50">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2 text-blue-600">+ Yeni Kalem Ekle</h3>
                            <form onSubmit={submitItem} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Yapılan İşlem</label>
                                    <input type="text" value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm" placeholder="Örn: Triger Seti Değişimi" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Adet</label>
                                    <input type="number" min="1" value={data.quantity} onChange={e => setData('quantity', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm" required />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Parça Tutarı (₺)</label>
                                        <input type="number" step="0.01" min="0" value={data.part_price} onChange={e => setData('part_price', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm" placeholder="0.00" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">İşçilik Tutarı (₺)</label>
                                        <input type="number" step="0.01" min="0" value={data.labor_price} onChange={e => setData('labor_price', e.target.value)} className="mt-1 block w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm" placeholder="0.00" required />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 italic">* Fiyatlara onay sonrası %20 KDV eklenecektir.</p>

                                <button type="submit" disabled={processing} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition mt-4 shadow-sm">
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
