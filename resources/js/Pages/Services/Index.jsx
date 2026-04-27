import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, services }) {
    // Duruma göre renk veren ufak bir yardımcı fonksiyon
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Beklemede';
            case 'processing': return 'İşlemde';
            case 'completed': return 'Tamamlandı';
            default: return status;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Aktif İş Emirleri</h2>
                    <Link
                        href={route('services.create')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        + Yeni İş Emri Aç
                    </Link>
                </div>
            }
        >
            <Head title="İş Emirleri" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {services.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">Şu an serviste bekleyen araç bulunmuyor.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">Tarih</th>
                                            <th scope="col" className="px-6 py-4">Araç</th>
                                            <th scope="col" className="px-6 py-4">Müşteri</th>
                                            <th scope="col" className="px-6 py-4">Durum</th>
                                            <th scope="col" className="px-6 py-4 text-right">İşlem</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {services.map((service) => (
                                            <tr key={service.id} className="border-b hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {new Date(service.created_at).toLocaleDateString('tr-TR')}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                                    {service.vehicle?.plate} <br/>
                                                    <span className="text-xs text-gray-500 font-normal">{service.vehicle?.brand?.name}</span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">{service.vehicle?.owner?.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(service.status)}`}>
                                                            {getStatusText(service.status)}
                                                        </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right">
                                                    <Link
                                                        href={route('services.show', service.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                    >
                                                        Detaya Git ➔
                                                    </Link>
                                                </td>
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
