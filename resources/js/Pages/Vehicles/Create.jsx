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
            header={<h2 className="text-xl font-semibold leading-tight text-slate-800">Yeni Araç Kaydı</h2>}
        >
            <Head title="Araç Ekle" />

            <div className="py-10">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-5 sm:px-8">
                            <h3 className="text-lg font-semibold text-slate-900">Araç Bilgileri</h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Yeni araç kaydı için gerekli bilgileri doldurun.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-7 px-6 py-7 sm:px-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Plaka *</label>
                                    <input
                                        type="text"
                                        value={data.plate}
                                        onChange={(e) => setData('plate', e.target.value.toUpperCase())}
                                        className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="34 ABC 123"
                                    />
                                    {errors.plate && <div className="mt-1.5 text-xs text-rose-600">{errors.plate}</div>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">Marka *</label>
                                    <select
                                        value={data.brand_id}
                                        onChange={(e) => setData('brand_id', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    >
                                        <option value="">Marka Seçin</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                    {errors.brand_id && <div className="mt-1.5 text-xs text-rose-600">{errors.brand_id}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Model *</label>
                                    <input
                                        type="text"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Passat, Megane vb."
                                    />
                                    {errors.model && <div className="mt-1.5 text-xs text-rose-600">{errors.model}</div>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">Uretim Yili *</label>
                                    <input
                                        type="number"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="2020"
                                    />
                                    {errors.year && <div className="mt-1.5 text-xs text-rose-600">{errors.year}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Sasi Numarasi</label>
                                    <input
                                        type="text"
                                        value={data.chassis_no}
                                        onChange={(e) => setData('chassis_no', e.target.value.toUpperCase())}
                                        className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none uppercase transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="17 karakter VIN"
                                    />
                                    {errors.chassis_no && <div className="mt-1.5 text-xs text-rose-600">{errors.chassis_no}</div>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">Arac Sahibi (Musteri) *</label>
                                    <select
                                        value={data.owner_id}
                                        onChange={(e) => setData('owner_id', e.target.value)}
                                        className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    >
                                        <option value="">Musteri Secin</option>
                                        {customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        ))}
                                    </select>
                                    {errors.owner_id && <div className="mt-1.5 text-xs text-rose-600">{errors.owner_id}</div>}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-2">
                                <Link
                                    href={route('vehicles.index')}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
                                >
                                    Iptal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Kaydediliyor...' : 'Araci Kaydet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
