import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, brands, customers }) {
    // Inertia useForm kancası ile form verilerini ve hataları yönetiyoruz
    const { data, setData, post, processing, errors } = useForm({
        plate: '',
        brand_id: '',
        model: '',
        year: '',
        chassis_no: '',
        owner_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('vehicles.store')); // Verileri backend'e gönder
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Yeni Araç Kaydı</h2>}
        >
            <Head title="Araç Ekle" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <form onSubmit={submit} className="space-y-6">
                            {/* Plaka ve Marka (Yan yana) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Plaka *</label>
                                    <input
                                        type="text"
                                        value={data.plate}
                                        onChange={e => setData('plate', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        placeholder="34 ABC 123"
                                    />
                                    {errors.plate && <div className="text-red-500 text-xs mt-1">{errors.plate}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Marka *</label>
                                    <select
                                        value={data.brand_id}
                                        onChange={e => setData('brand_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Marka Seçin</option>
                                        {brands.map(brand => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                    {errors.brand_id && <div className="text-red-500 text-xs mt-1">{errors.brand_id}</div>}
                                </div>
                            </div>

                            {/* Model ve Yıl (Yan yana) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Model *</label>
                                    <input
                                        type="text"
                                        value={data.model}
                                        onChange={e => setData('model', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        placeholder="Passat, Megane vb."
                                    />
                                    {errors.model && <div className="text-red-500 text-xs mt-1">{errors.model}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Üretim Yılı *</label>
                                    <input
                                        type="number"
                                        value={data.year}
                                        onChange={e => setData('year', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        placeholder="2020"
                                    />
                                    {errors.year && <div className="text-red-500 text-xs mt-1">{errors.year}</div>}
                                </div>
                            </div>

                            {/* Şasi No ve Müşteri (Yan yana) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Şasi Numarası</label>
                                    <input
                                        type="text"
                                        value={data.chassis_no}
                                        onChange={e => setData('chassis_no', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                    {errors.chassis_no && <div className="text-red-500 text-xs mt-1">{errors.chassis_no}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Araç Sahibi (Müşteri) *</label>
                                    <select
                                        value={data.owner_id}
                                        onChange={e => setData('owner_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Müşteri Seçin</option>
                                        {customers.map(customer => (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        ))}
                                    </select>
                                    {errors.owner_id && <div className="text-red-500 text-xs mt-1">{errors.owner_id}</div>}
                                </div>
                            </div>

                            {/* Butonlar */}
                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('vehicles.index')} className="text-gray-600 hover:text-gray-900 mr-4">
                                    İptal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    Kaydet
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
