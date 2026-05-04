import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, services }) {
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Servis Kayıtları" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">

                    {/* GARANTİ ÇÖZÜM: Butonu doğrudan sayfanın içine, en üste ekledik! */}
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-sm mb-6 border-b-4 border-blue-500">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Servis Kayıtları</h2>
                            <p className="text-sm text-gray-500 mt-1">Sistemdeki tüm araç iş emirlerini buradan yönetebilirsiniz.</p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Link
                                href={route('services.create')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-bold shadow-md flex items-center gap-2"
                            >
                                <span className="text-xl leading-none">+</span> Yeni İş Emri Aç
                            </Link>
                        </div>
                    </div>

                    {services.map((service) => (
                        <div key={service.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500 transition hover:shadow-md">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold">{service.vehicle?.plate} - {service.vehicle?.brand?.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Sorumlu Usta: <span className="font-semibold text-gray-700">{service.technician?.name}</span></p>
                                    <p className="mt-3 text-gray-700 bg-gray-50 p-3 rounded border"><strong>Şikayet:</strong> {service.complaint}</p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-3 w-full md:w-auto">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        service.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                                            service.status === 'İşlemde' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {service.status}
                                    </span>

                                    <Link
                                        href={route('services.show', service.id)}
                                        className="text-sm bg-gray-800 text-white px-5 py-2.5 rounded-md hover:bg-gray-700 transition shadow w-full md:w-auto text-center"
                                    >
                                        Fatura ve Detaylar &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!services || services.length === 0) && (
                        <div className="text-center bg-white p-12 rounded-lg shadow-sm border border-dashed border-gray-300">
                            <div className="text-gray-400 mb-3 text-5xl">📋</div>
                            <p className="text-gray-600 text-xl font-semibold">Henüz aktif bir iş emri bulunmuyor.</p>
                            <p className="text-md text-gray-500 mt-2">Yukarıdaki mavi butona tıklayarak ilk servisinizi başlatabilirsiniz.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
