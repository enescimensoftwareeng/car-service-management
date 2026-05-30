import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Car, Pencil, Trash2, PlusCircle, ChevronRight } from 'lucide-react';

export default function Index({ auth, vehicles }) {
    const { delete: destroy, processing } = useForm({});
    const [vehicleToDelete, setVehicleToDelete] = useState(null);
    const vehicleRows = vehicles?.data ?? [];
    const paginationLinks = vehicles?.links ?? [];
    const totalVehicles = vehicles?.total ?? vehicleRows.length;

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
        <AuthenticatedLayout user={auth?.user} header={null}>
            <Head title="Araclar" />

            <div className="min-h-screen bg-slate-50/50 py-10">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 shadow-2xl shadow-blue-900/20">
                        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                        <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-indigo-500/15 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="text-3xl font-black text-white">Arac Yonetimi</h3>
                                <p className="mt-2 text-sm text-slate-300">
                                    Sistemdeki araclari hizli sekilde yonetin, guncelleyin ve kayitlari duzenli tutun.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Toplam Arac</p>
                                    <p className="text-2xl font-black text-white">{totalVehicles}</p>
                                </div>
                                <Link
                                    href={route('vehicles.create')}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    Yeni Arac Ekle
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                            <h4 className="flex items-center gap-2 text-lg font-black text-slate-800">
                                <Car className="h-5 w-5 text-blue-600" />
                                Sistemdeki Araclar
                            </h4>
                            <Link
                                href={route('vehicles.create')}
                                className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 transition hover:text-blue-800"
                            >
                                Yeni Kayit <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
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
                                    {vehicleRows.map((v) => (
                                        <tr key={v.id} className="transition hover:bg-blue-50/40">
                                            <td className="py-4 font-semibold text-slate-800">
                                                <span className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold shadow-sm">
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
                                                        className="inline-flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                        Guncelle
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => openDeleteModal(v)}
                                                        disabled={processing}
                                                        className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                        Sil
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {vehicleRows.length === 0 && (
                                <div className="py-14 text-center">
                                    <div className="mb-3 text-4xl text-slate-300">🚗</div>
                                    <p className="text-sm font-medium italic text-slate-500">Henuz kayitli arac bulunmuyor.</p>
                                    <Link
                                        href={route('vehicles.create')}
                                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        <PlusCircle className="h-4 w-4" />
                                        Ilk Araci Ekle
                                    </Link>
                                </div>
                            )}

                            {vehicleRows.length > 0 && paginationLinks.length > 3 && (
                                <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
                                    {paginationLinks.map((link, index) => (
                                        <Link
                                            key={`${link.label}-${index}`}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                                                link.active
                                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                                    : link.url
                                                        ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                                                        : 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
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
