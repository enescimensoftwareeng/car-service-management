import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { flash } = usePage().props;
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (!toastMessage) {
            return undefined;
        }

        const timeout = setTimeout(() => {
            setToastMessage('');
        }, 3500);

        return () => clearTimeout(timeout);
    }, [toastMessage]);

    return (
        // Sayfanın tamamını kaplaması ve footer'ın en alta itilmesi için min-h-screen ve flex flex-col kullanıyoruz
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

            {/* ÜST MENÜ (HEADER / NAVBAR) */}
            <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Özel Logo ve Marka İsmi */}
                            <div className="shrink-0 flex items-center gap-2">
                                <Link href={route('dashboard')} className="flex items-center gap-2 group">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:bg-blue-700 transition">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                    </div>
                                    <span className="font-extrabold text-xl tracking-tight text-slate-800">
                                        SERVİS<span className="text-blue-600">PRO</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Ana Menü Linkleri */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Yönetim Paneli
                                </NavLink>
                                <NavLink href={route('vehicles.index')} active={route().current('vehicles.index')}>
                                    Araç Yönetimi
                                </NavLink>
                                <NavLink href={route('services.index')} active={route().current('services.*')}>
                                    Servis Kayıtları
                                </NavLink>
                            </div>
                        </div>

                        {/* Sağ Taraf - Kullanıcı Menüsü */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {/* Yetki Rozeti (Role 1: Admin, Role 2: Usta, Role 3: Müşteri) */}
                            <span className="mr-3 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                                {user?.role_id === 1 ? 'Sistem Yöneticisi' : user?.role_id === 2 ? 'Servis Ustası' : 'Müşteri'}
                            </span>

                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-bold rounded-md text-gray-700 bg-white hover:text-blue-600 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user?.name}
                                                <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profil Ayarları</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600 font-medium">
                                            Güvenli Çıkış
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobil Menü Butonu */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobil Menü İçeriği */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Yönetim Paneli
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('vehicles.index')} active={route().current('vehicles.index')}>
                            Araç Yönetimi
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('services.index')} active={route().current('services.*')}>
                            Servis Kayıtları
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user?.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profil Ayarları</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Çıkış Yap
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* SAYFA BAŞLIĞI (Varsa) */}
            {header && (
                <header className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* ANA İÇERİK (Dashboard, Araçlar vb. buraya gelir) */}
            <main className="flex-1">
                {children}
            </main>

            {toastMessage && (
                <div className="fixed right-5 top-20 z-[70] w-full max-w-sm">
                    <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-lg">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 011.415-1.42l2.292 2.29 6.493-6.49a1 1 0 011.415 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-800">Islem Basarili</p>
                                <p className="mt-0.5 text-sm text-slate-600">{toastMessage}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setToastMessage('')}
                                className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ALT BİLGİ (FOOTER) - Senin İmzan! */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex justify-center md:justify-start mb-4 md:mb-0 space-x-6 md:order-2">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Sistem Aktif
                            </span>
                            <span className="text-sm text-gray-500">v1.0.0</span>
                        </div>
                        <div className="mt-8 md:mt-0 md:order-1 text-center md:text-left">
                            <p className="text-sm text-gray-500 font-medium">
                                &copy; {new Date().getFullYear()} Araba Servis Takip Sistemi.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}
