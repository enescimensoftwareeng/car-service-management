import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Welcome({ auth, brands }) {
    const { flash } = usePage().props;
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        plate: '',
        brand_id: '',
        model: '',
        year: '',
        appointment_date: '',
        appointment_time: '09:00',
        notes: ''
    });

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (flash?.success && isAppointmentModalOpen) {
            setShowSuccess(true);
            reset();
        }
    }, [flash]);

    const closeModal = () => {
        setIsAppointmentModalOpen(false);
        // Let animation finish before resetting state
        setTimeout(() => setShowSuccess(false), 300);
    };

    const submitAppointment = (e) => {
        e.preventDefault();
        post(route('appointments.store'));
    };

    return (
        <>
            <Head title="Hoş Geldiniz" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">

                {/* Arka Plan Dekorasyonu */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px]"></div>
                </div>

                {/* Navigasyon */}
                <nav className="relative z-10 flex justify-between items-center px-6 py-8 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight">ARABA SERVİS <span className="text-blue-400">PRO</span></span>
                    </div>

                    <div className="flex gap-4">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-medium transition"
                            >
                                Yönetim Paneli
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-6 py-2 font-medium hover:text-blue-300 transition"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition shadow-lg shadow-blue-500/20"
                                >
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Bölümü */}
                <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-sm mb-6">
                        Hem Müşteriler Hem Servis Sahipleri İçin
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Aracınız Emin Ellerde, <br /> Servisiniz Kontrol Altında.
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                        İster aracınızın bakımını güvenle yaptırıp anlık takip edin, ister servis operasyonlarınızı profesyonelce yönetin. Her iki taraf için de kusursuz bir deneyim.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={auth?.user ? route('dashboard') : route('login')}
                            className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 text-lg font-bold px-10 py-4 rounded-2xl transition transform hover:scale-105"
                        >
                            {auth?.user ? 'Panele Git' : 'Giriş Yap'}
                        </Link>
                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                setIsAppointmentModalOpen(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-10 py-4 rounded-2xl transition shadow-2xl shadow-blue-500/40 transform hover:scale-105"
                        >
                            Hızlı Randevu Al
                        </button>
                    </div>

                    {/* Özellik Kartları (Glassmorphism) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl text-left hover:bg-white/10 transition group">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Kolay Randevu</h3>
                            <p className="text-gray-400 text-sm">Sıra beklemeden, dilediğiniz gün ve saat için saniyeler içinde online randevu oluşturun.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl text-left hover:bg-white/10 transition group">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Şeffaf Süreç Takibi</h3>
                            <p className="text-gray-400 text-sm">Aracınızın durumunu, yapılan işlemleri, değişen parçaları ve faturaları panelinizden canlı izleyin.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl text-left hover:bg-white/10 transition group">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Profesyonel Yönetim</h3>
                            <p className="text-gray-400 text-sm">Servis sahipleri için iş emri atamaları, müşteri yönetimi ve otomatik faturalandırma bir arada.</p>
                        </div>
                    </div>
                </main>

                {/* Alt Bilgi */}
                <footer className="relative z-10 py-10 text-center text-gray-500 text-sm border-t border-white/5">
                    © 2026 Araba Servis Takip Sistemi. Batın, Enes & Mahmut tarafından geliştirildi.
                </footer>
            </div>

            {/* Randevu Modalı */}
            <Modal show={isAppointmentModalOpen} onClose={closeModal}>
                {showSuccess ? (
                    <div className="p-10 text-center bg-slate-50">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4">Harika! Randevunuz Alındı.</h2>
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed">{flash.success}</p>
                        <div className="flex justify-center gap-4">
                            <SecondaryButton type="button" onClick={closeModal} className="px-6 py-3">
                                Kapat
                            </SecondaryButton>
                            <Link 
                                href={route('login')} 
                                className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Giriş Yap
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 bg-slate-50">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Hızlı Randevu Al</h2>
                        
                        <form onSubmit={submitAppointment} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Kişisel Bilgiler */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-700 border-b pb-2">Kişisel Bilgiler</h3>
                                <div>
                                    <InputLabel htmlFor="name" value="Ad Soyad" />
                                    <TextInput id="name" className="mt-1 block w-full" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="phone" value="Telefon" />
                                    <TextInput id="phone" className="mt-1 block w-full" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="E-posta" />
                                    <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            </div>

                            {/* Araç Bilgileri */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-700 border-b pb-2">Araç Bilgileri</h3>
                                <div>
                                    <InputLabel htmlFor="plate" value="Plaka (Örn: 34ABC123)" />
                                    <TextInput id="plate" className="mt-1 block w-full uppercase" value={data.plate} onChange={e => setData('plate', e.target.value.toUpperCase())} required />
                                    <InputError message={errors.plate} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="brand_id" value="Marka" />
                                    <select
                                        id="brand_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.brand_id}
                                        onChange={e => setData('brand_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Marka Seçin</option>
                                        {brands?.map(brand => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.brand_id} className="mt-2" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <InputLabel htmlFor="model" value="Model" />
                                        <TextInput id="model" className="mt-1 block w-full" value={data.model} onChange={e => setData('model', e.target.value)} required />
                                        <InputError message={errors.model} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="year" value="Yıl" />
                                        <TextInput id="year" type="number" min="1900" max={new Date().getFullYear() + 1} className="mt-1 block w-full" value={data.year} onChange={e => setData('year', e.target.value)} required />
                                        <InputError message={errors.year} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Randevu Bilgileri */}
                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="font-semibold text-slate-700">Randevu Zamanı</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="appointment_date" value="Tarih" />
                                    <TextInput id="appointment_date" type="date" className="mt-1 block w-full" value={data.appointment_date} onChange={e => setData('appointment_date', e.target.value)} required />
                                    <InputError message={errors.appointment_date} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="appointment_time" value="Saat" />
                                    <select
                                        id="appointment_time"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.appointment_time}
                                        onChange={e => setData('appointment_time', e.target.value)}
                                        required
                                    >
                                        {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.appointment_time} className="mt-2" />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="notes" value="Açıklama (Opsiyonel)" />
                                <textarea
                                    id="notes"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="2"
                                    value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                ></textarea>
                                <InputError message={errors.notes} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <SecondaryButton type="button" onClick={closeModal}>
                                İptal
                            </SecondaryButton>
                            <PrimaryButton className="bg-blue-600 hover:bg-blue-700" disabled={processing}>
                                {processing ? 'Gönderiliyor...' : 'Randevu Oluştur'}
                            </PrimaryButton>
                        </div>
                    </form>
                    </div>
                )}
            </Modal>
        </>
    );
}
