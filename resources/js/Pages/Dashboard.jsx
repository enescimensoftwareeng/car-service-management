import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Yönetim Paneli</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Özet Kartları Izgarası */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                        {/* Kart 1: Araçlar */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-500 transition hover:shadow-md">
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Sistemdeki Araçlar</div>
                            <div className="text-3xl font-bold text-gray-800 mt-2">{stats.vehicles}</div>
                        </div>

                        {/* Kart 2: Müşteriler */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-green-500 transition hover:shadow-md">
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Kayıtlı Müşteriler</div>
                            <div className="text-3xl font-bold text-gray-800 mt-2">{stats.customers}</div>
                        </div>

                        {/* Kart 3: Markalar */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-orange-500 transition hover:shadow-md">
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Desteklenen Markalar</div>
                            <div className="text-3xl font-bold text-gray-800 mt-2">{stats.brands}</div>
                        </div>

                    </div>

                    {/* Hoş Geldin Mesajı */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-lg">
                            Hoş geldin, <span className="font-bold text-blue-600">{auth.user.name}</span>! Sistem tıkır tıkır çalışıyor.
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
