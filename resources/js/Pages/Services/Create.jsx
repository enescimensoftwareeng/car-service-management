import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, vehicles }) {
    const { data, setData, post, processing, errors } = useForm({
        vehicle_id: '',
        current_km: '',
        complaint: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('services.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Yeni İş Emri Aç</h2>}
        >
            <Head title="Yeni Servis Kaydı" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <form onSubmit={submit} className="space-y-6">
                                {/* Araç Seçimi */}
                                <div>
                                    <InputLabel htmlFor="vehicle_id" value="Araç Seçin" />

                                    <select
                                        id="vehicle_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.vehicle_id}
                                        onChange={(e) => setData('vehicle_id', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Lütfen bir araç seçin</option>
                                        {vehicles.map((vehicle) => (
                                            <option key={vehicle.id} value={vehicle.id}>
                                                {vehicle.plate} - {vehicle.owner?.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.vehicle_id} className="mt-2" />
                                </div>

                                {/* Güncel Kilometre */}
                                <div>
                                    <InputLabel htmlFor="current_km" value="Güncel Kilometre" />

                                    <TextInput
                                        id="current_km"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.current_km}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            // En fazla 7 haneli bir sayı girilmesine izin ver (Örn: 9.999.999)
                                            if (val.length <= 7) {
                                                setData('current_km', val);
                                            }
                                        }}
                                        required
                                        min="0"
                                        max="3000000"
                                    />

                                    <InputError message={errors.current_km} className="mt-2" />
                                </div>

                                {/* Müşteri Şikayeti */}
                                <div>
                                    <InputLabel htmlFor="complaint" value="Müşteri Şikayeti / İstekler" />

                                    <textarea
                                        id="complaint"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                        value={data.complaint}
                                        onChange={(e) => setData('complaint', e.target.value)}
                                        required
                                        placeholder="Müşterinin belirttiği arızaları veya yapılacak işlemleri yazın..."
                                    ></textarea>

                                    <InputError message={errors.complaint} className="mt-2" />
                                </div>

                                {/* Kaydet Butonu */}
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        İş Emrini Başlat
                                    </PrimaryButton>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
