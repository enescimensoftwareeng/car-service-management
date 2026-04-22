import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, vehicles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Araç Yönetimi</h2>
                    <Link
                        href={route('vehicles.create')}
                        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm transition"
                    >
                        + Yeni Araç Ekle
                    </Link>
                </div>
            }
        >
            <Head title="Araçlar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {vehicles.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">Sistemde henüz kayıtlı araç bulunmuyor.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">Plaka</th>
                                            <th scope="col" className="px-6 py-4">Marka / Model</th>
                                            <th scope="col" className="px-6 py-4">Müşteri</th>
                                            <th scope="col" className="px-6 py-4">Şasi No</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {vehicles.map((vehicle) => (
                                            <tr key={vehicle.id} className="border-b hover:bg-gray-50 transition">
                                                <td className="whitespace-nowrap px-6 py-4 font-bold">{vehicle.plate}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{vehicle.brand?.name} {vehicle.model} ({vehicle.year})</td>
                                                <td className="whitespace-nowrap px-6 py-4">{vehicle.owner?.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-gray-500">{vehicle.chassis_no || '-'}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
