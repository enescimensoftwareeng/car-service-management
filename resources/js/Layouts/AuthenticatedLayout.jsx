import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Car,
    Wrench,
    UserCircle,
    LogOut,
    Settings,
    Menu,
    X,
    ChevronDown,
    Zap,
    Users
} from 'lucide-react';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Dropdown from '@/Components/Dropdown';

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
        if (!toastMessage) return;
        const timeout = setTimeout(() => setToastMessage(''), 4000);
        return () => clearTimeout(timeout);
    }, [toastMessage]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">

            {/* ÜST NAVIGASYON */}
            <nav className="sticky top-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex justify-between h-24">

                        {/* Sol Taraf: Logo & Menü */}
                        <div className="flex items-center gap-16">
                            <Link href={route('dashboard')} className="flex items-center gap-4 group shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:rotate-6 transition-all duration-300">
                                    <Zap className="w-6 h-6 text-white fill-white/20" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-2xl leading-none tracking-tighter text-slate-900">
                                        SERVİS<span className="text-blue-600">PRO</span>
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-400 tracking-[0.25em] uppercase mt-1.5">
                                        {/* Logo altındaki yazı da role göre değişsin */}
                                        {user?.role_id === 3 ? 'MÜŞTERİ PANELİ' : 'MANAGEMENT'}
                                    </span>
                                </div>
                            </Link>

                            {/* AKILLI MENÜ (Sadece Yönetici ve Usta görebilir, Müşteri göremez) */}
                            <div className="hidden space-x-10 sm:flex">
                                {user?.role_id !== 3 ? (
                                    <>
                                        {/* YÖNETİCİ & USTA LİNKLERİ */}
                                        <NavLink href={route('dashboard')} active={route().current('dashboard')} className="flex items-center gap-3 py-2">
                                            <LayoutDashboard className="w-5 h-5" />
                                            <span className="font-semibold text-[15px]">Yönetim Paneli</span>
                                        </NavLink>
                                        <NavLink href={route('vehicles.index')} active={route().current('vehicles.index')} className="flex items-center gap-3 py-2">
                                            <Car className="w-5 h-5" />
                                            <span className="font-semibold text-[15px]">Tüm Araçlar</span>
                                        </NavLink>
                                        <NavLink href={route('services.index')} active={route().current('services.*')} className="flex items-center gap-3 py-2">
                                            <Wrench className="w-5 h-5" />
                                            <span className="font-semibold text-[15px]">Servis Kayıtları</span>
                                        </NavLink>
                                        
                                        {/* SADECE YÖNETİCİ LİNKLERİ */}
                                        {user?.role_id === 1 && (
                                            <div className="relative flex items-center">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <button className={`flex items-center gap-2 py-2 font-semibold text-[15px] transition duration-150 ease-in-out border-b-2 ${route().current('technicians.*') ? 'text-slate-900 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'}`}>
                                                            <Settings className="w-5 h-5" />
                                                            Sistem Yönetimi
                                                            <ChevronDown className="w-4 h-4" />
                                                        </button>
                                                    </Dropdown.Trigger>

                                                    <Dropdown.Content align="left" width="48" contentClasses="py-1 bg-white rounded-xl shadow-xl border border-slate-100 mt-2">
                                                        <Dropdown.Link href={route('technicians.index')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium">
                                                            <Users className="w-4 h-4" />
                                                            Personel Yönetimi
                                                        </Dropdown.Link>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {/* MÜŞTERİ LİNKLERİ */}
                                        <NavLink href={route('dashboard')} active={route().current('dashboard')} className="flex items-center gap-3 py-2">
                                            <LayoutDashboard className="w-5 h-5" />
                                            <span className="font-semibold text-[15px]">Panelim</span>
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Sağ Taraf: Profil & Role Bölümü */}
                        <div className="hidden sm:flex sm:items-center">
                            <div className="flex items-center gap-8 pl-10 border-l border-slate-100">

                                {/* İsim ve Rol Alanı */}
                                <div className="flex flex-col items-end shrink-0">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1.5 opacity-90 leading-none">
                                        {user?.role_id === 1 ? 'YÖNETİCİ' : user?.role_id === 2 ? 'USTA' : 'MÜŞTERİ'}
                                    </span>
                                    <span className="text-[16px] font-extrabold text-slate-800 tracking-tight leading-none">
                                        {user?.name}
                                    </span>
                                </div>

                                {/* Açılır Menü (Dropdown) */}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="relative flex items-center gap-3 p-1.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group">
                                            <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                                <UserCircle className="w-7 h-7 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-all group-hover:translate-y-0.5 mr-2" />
                                            <div className="absolute top-1 left-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" width="64" contentClasses="py-0 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden mt-2">
                                        <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100">
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Hesap Ayarları</p>
                                            <p className="text-sm font-bold text-slate-700 truncate">{user?.email}</p>
                                        </div>
                                        <div className="p-3">
                                            <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-4 px-4 py-3.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-2xl transition-all duration-200 group">
                                                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    <Settings className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-[14px]">Profil Ayarları</span>
                                            </Dropdown.Link>

                                            <div className="h-px bg-slate-100/60 my-2 mx-4"></div>

                                            <Dropdown.Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-200 group text-left">
                                                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                                                    <LogOut className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-[14px]">Güvenli Çıkış</span>
                                            </Dropdown.Link>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobil Menü Butonu */}
                        <div className="flex items-center sm:hidden">
                            <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="p-3 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition">
                                {showingNavigationDropdown ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobil Menü İçeriği (Yine Role Göre Ayrılmış) */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white border-b border-slate-100'}>
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        {user?.role_id !== 3 ? (
                            <>
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Yönetim Paneli</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('vehicles.index')} active={route().current('vehicles.index')}>Tüm Araçlar</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('services.index')} active={route().current('services.*')}>Servis Kayıtları</ResponsiveNavLink>
                                {user?.role_id === 1 && (
                                    <>
                                        <div className="px-4 py-2 mt-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                            Sistem Yönetimi
                                        </div>
                                        <ResponsiveNavLink href={route('technicians.index')} active={route().current('technicians.*')} className="pl-8">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                Personel Yönetimi
                                            </div>
                                        </ResponsiveNavLink>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Panelim</ResponsiveNavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* ANA İÇERİK */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-8 lg:px-12 py-16">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="bg-white border-t border-slate-200 py-12 mt-24">
                <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center md:text-left">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-6">
                            <span className="font-black text-xl tracking-tighter">
                                SERVİS<span className="text-blue-600">PRO</span>
                            </span>
                            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
                            <p className="text-sm text-slate-500 font-medium">
                                &copy; {new Date().getFullYear()} Tüm Hakları Saklıdır.
                            </p>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 px-5 py-2.5 bg-green-50 rounded-full border border-green-100 shadow-sm">
                                <div className="relative flex h-2 w-2">
                                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
                                    <div className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></div>
                                </div>
                                <span className="text-xs font-black text-green-700 uppercase tracking-[0.1em]">Sistem Çevrimiçi</span>
                            </div>
                            <span className="text-xs font-black text-slate-300 tracking-[0.4em] hidden sm:block uppercase">ELAZIĞ</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
