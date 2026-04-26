import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, vehicle }) {
    // data nesnesini doğrudan veritabanından gelen aracın bilgileriyle dolduruyoruz
    const { data, setData, put, processing, errors } = useForm({
        plate: vehicle.plate || '',
        model: vehicle.model || '',
        chassis_no: vehicle.chassis_no || '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Güncelleme işleminde POST yerine PUT kullanılır!
        put(route('vehicles.update', vehicle.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Araç Düzenle: {vehicle.plate}</h2>}
        >
            <Head title="Araç Düzenle" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Araç Plakası</label>
                                <input
                                    type="text"
                                    value={data.plate}
                                    onChange={(e) => setData('plate', e.target.value.toUpperCase())}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm uppercase"
                                />
                                {errors.plate && <div className="text-red-500 text-sm mt-1">{errors.plate}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Model (Yıl/Paket)</label>
                                <input
                                    type="text"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                                {errors.model && <div className="text-red-500 text-sm mt-1">{errors.model}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Şasi Numarası</label>
                                <input
                                    type="text"
                                    value={data.chassis_no}
                                    onChange={(e) => setData('chassis_no', e.target.value.toUpperCase())}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                                {errors.chassis_no && <div className="text-red-500 text-sm mt-1">{errors.chassis_no}</div>}
                            </div>

                            <div className="flex items-center justify-end mt-4 gap-4">
                                <Link href={route('vehicles.index')} className="text-gray-600 hover:text-gray-900">
                                    İptal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                                >
                                    Değişiklikleri Kaydet
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
