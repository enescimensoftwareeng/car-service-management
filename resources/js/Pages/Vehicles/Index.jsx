import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, vehicles = [], brands = [], customers = [] }) {
    // ÖNEMLİ: user_id olan her yeri owner_id yaptık
    const { data, setData, post, processing, reset, errors } = useForm({
        plate: '',
        brand_id: '',
        model: '',
        year: new Date().getFullYear(),
        owner_id: '', // Modelimizdeki isimle eşitlendi
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('vehicles.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Araç Yönetimi</h2>}
        >
            <Head title="Araçlar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* SOL TARAF: Yeni Araç Ekleme Formu */}
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg h-fit border-t-4 border-blue-600">
                        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-700">Yeni Araç Kaydı</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 uppercase">Plaka</label>
                                <input
                                    type="text"
                                    value={data.plate}
                                    onChange={e => setData('plate', e.target.value.toUpperCase())}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="34 ABC 123"
                                />
                                {errors.plate && <div className="text-red-500 text-xs mt-1">{errors.plate}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 uppercase text-[10px]">Marka</label>
                                    <select
                                        value={data.brand_id}
                                        onChange={e => setData('brand_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Seçiniz</option>
                                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                    {errors.brand_id && <div className="text-red-500 text-xs mt-1">{errors.brand_id}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 uppercase text-[10px]">Model Yılı</label>
                                    <input
                                        type="number"
                                        value={data.year}
                                        onChange={e => setData('year', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.year && <div className="text-red-500 text-xs mt-1">{errors.year}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 uppercase text-[10px]">Model İsmi</label>
                                <input
                                    type="text"
                                    value={data.model}
                                    onChange={e => setData('model', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Örn: Passat B8"
                                />
                                {errors.model && <div className="text-red-500 text-xs mt-1">{errors.model}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 uppercase text-[10px]">Araç Sahibi (Müşteri)</label>
                                <select
                                    value={data.owner_id} // owner_id olarak güncellendi
                                    onChange={e => setData('owner_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Müşteri Seçiniz</option>
                                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                {errors.owner_id && <div className="text-red-500 text-xs mt-1">{errors.owner_id}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                            >
                                {processing ? 'Kaydediliyor...' : 'Aracı Sisteme Kaydet'}
                            </button>
                        </form>
                    </div>

                    {/* SAĞ TARAF: Kayıtlı Araçlar Listesi */}
                    <div className="md:col-span-2 bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-lg font-bold text-gray-700">Sistemdeki Araçlar</h3>
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                Toplam: {vehicles.length}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                <tr className="text-gray-400 text-xs uppercase tracking-wider border-b">
                                    <th className="pb-3">Plaka</th>
                                    <th className="pb-3">Marka / Model</th>
                                    <th className="pb-3 text-center">Yıl</th>
                                    <th className="pb-3">Sahibi</th>
                                    <th className="pb-3 text-right">İşlem</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {vehicles.map(v => (
                                    <tr key={v.id} className="hover:bg-blue-50/50 transition group">
                                        <td className="py-4 font-black text-gray-900">
                                                <span className="border-2 border-gray-800 px-2 py-1 rounded bg-white shadow-sm italic">
                                                    {v.plate}
                                                </span>
                                        </td>
                                        <td className="py-4">
                                            <div className="font-bold text-gray-800">{v.brand?.name}</div>
                                            <div className="text-xs text-gray-500">{v.model}</div>
                                        </td>
                                        <td className="py-4 text-center text-sm font-medium text-gray-600">{v.year}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                    {v.owner?.name?.charAt(0)}
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700">{v.owner?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="text-red-400 hover:text-red-600 font-medium text-xs transition p-2 hover:bg-red-50 rounded-lg">
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {vehicles.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-2 text-gray-200">🚗</div>
                                    <p className="text-gray-400 font-medium italic text-sm">Henüz hiç araç kaydedilmemiş.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
