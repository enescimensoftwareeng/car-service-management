import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, vehicles = [] }) {
    const { delete: destroy, processing } = useForm({});
    const [vehicleToDelete, setVehicleToDelete] = useState(null);

    const openDeleteModal = (vehicle) => {
        setVehicleToDelete(vehicle);
    };

    const closeDeleteModal = () => {
        setVehicleToDelete(null);
    };

    const confirmDelete = () => {
        if (!vehicleToDelete) {
            return;
        }

        destroy(route('vehicles.destroy', vehicleToDelete.id), {
            onFinish: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={<h2 className="text-xl font-semibold leading-tight text-slate-800">Arac Yonetimi</h2>}
        >
            <Head title="Araçlar" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">Sistemdeki Araclar</h3>
                                <p className="mt-1 text-sm text-slate-500">Kayitli araclari goruntuleyin, guncelleyin veya silin.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                    Toplam: {vehicles.length}
                                </span>
                                <Link
                                    href={route('vehicles.create')}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                >
                                    Yeni Arac Ekle
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-x-auto px-6 py-6 sm:px-8">
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                                        <th className="pb-3 font-semibold">Plaka</th>
                                        <th className="pb-3 font-semibold">Marka / Model</th>
                                        <th className="pb-3 text-center font-semibold">Yil</th>
                                        <th className="pb-3 font-semibold">Sahibi</th>
                                        <th className="pb-3 text-right font-semibold">Islemler</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {vehicles.map((v) => (
                                        <tr key={v.id} className="transition hover:bg-slate-50">
                                            <td className="py-4 font-semibold text-slate-800">
                                                <span className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold">
                                                    {v.plate}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div className="font-medium text-slate-800">{v.brand?.name ?? '-'}</div>
                                                <div className="text-xs text-slate-500">{v.model ?? '-'}</div>
                                            </td>
                                            <td className="py-4 text-center text-slate-600">{v.year ?? '-'}</td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                                                        {v.owner?.name?.charAt(0) ?? '?'}
                                                    </div>
                                                    <span className="font-medium text-slate-700">{v.owner?.name ?? '-'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route('vehicles.edit', v.id)}
                                                        className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                                                    >
                                                        Guncelle
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => openDeleteModal(v)}
                                                        disabled={processing}
                                                        className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        Sil
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {vehicles.length === 0 && (
                                <div className="py-14 text-center">
                                    <div className="mb-3 text-4xl text-slate-300">🚗</div>
                                    <p className="text-sm font-medium italic text-slate-500">Henuz kayitli arac bulunmuyor.</p>
                                    <Link
                                        href={route('vehicles.create')}
                                        className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        Ilk Araci Ekle
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {vehicleToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-slate-900">Araci silmek istiyor musunuz?</h4>
                                <p className="mt-1 text-sm text-slate-600">
                                    <span className="font-semibold text-slate-800">{vehicleToDelete.plate}</span> plakali kayit kalici olarak silinecek.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                                Vazgec
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                disabled={processing}
                                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Siliniyor...' : 'Evet, Sil'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
