import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, services }) {
    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Servis Kayıtları</h2>
                    <Link href={route('services.create')} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        + Yeni İş Emri Aç
                    </Link>
                </div>
            }
        >
            <Head title="Servis Kayıtları" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold">{service.vehicle?.plate} - {service.vehicle?.brand?.name}</h3>
                                    <p className="text-sm text-gray-500">Usta: {service.technician?.name}</p>
                                    <p className="mt-2 text-gray-700"><strong>Şikayet:</strong> {service.complaint}</p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-3">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                                        {service.status}
                                    </span>

                                    {/* EKLENEN YENİ BUTON: Bizi otomatik olarak doğru ID'ye götürecek */}
                                    <Link
                                        href={route('services.show', service.id)}
                                        className="text-sm bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition shadow"
                                    >
                                        Fatura ve Detaylar &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!services || services.length === 0) && (
                        <div className="text-center bg-white p-8 rounded-lg shadow-sm">
                            <p className="text-gray-500 text-lg">Henüz aktif bir iş emri bulunmuyor.</p>
                            <p className="text-sm text-gray-400 mt-2">Sağ üstteki butondan yeni bir kayıt açabilirsiniz.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
