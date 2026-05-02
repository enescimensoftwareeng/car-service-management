import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, vehicle }) {
    const { data, setData, put, processing, errors } = useForm({
        plate: vehicle.plate || '',
        model: vehicle.model || '',
        chassis_no: vehicle.chassis_no || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('vehicles.update', vehicle.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-slate-800">Arac Duzenle: {vehicle.plate}</h2>}
        >
            <Head title="Araç Düzenle" />

            <div className="py-10">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-5 sm:px-8">
                            <h3 className="text-lg font-semibold text-slate-900">Arac Kaydini Guncelle</h3>
                            <p className="mt-1 text-sm text-slate-500">
                                {vehicle.plate} plakali aracin bilgilerini guncelleyebilirsiniz.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6 px-6 py-7 sm:px-8">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Arac Plakasi *</label>
                                <input
                                    type="text"
                                    value={data.plate}
                                    onChange={(e) => setData('plate', e.target.value.toUpperCase())}
                                    maxLength={20}
                                    className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="34 ABC 123"
                                />
                                {errors.plate && <div className="mt-1.5 text-xs text-rose-600">{errors.plate}</div>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Model (Yil/Paket) *</label>
                                <input
                                    type="text"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    maxLength={100}
                                    className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Passat 1.5 TSI Business"
                                />
                                {errors.model && <div className="mt-1.5 text-xs text-rose-600">{errors.model}</div>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Sasi Numarasi</label>
                                <input
                                    type="text"
                                    value={data.chassis_no}
                                    onChange={(e) => setData('chassis_no', e.target.value.toUpperCase())}
                                    maxLength={17}
                                    minLength={17}
                                    className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="17 karakter VIN"
                                />
                                {errors.chassis_no && <div className="mt-1.5 text-xs text-rose-600">{errors.chassis_no}</div>}
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
                                    {processing ? 'Kaydediliyor...' : 'Degisiklikleri Kaydet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
