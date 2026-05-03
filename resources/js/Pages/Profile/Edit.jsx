import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { UserCircle, KeyRound, ShieldAlert } from 'lucide-react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Profil Ayarları"
        >
            <Head title="Profil Ayarları" />

            <div className="pb-12">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Profil Bilgileri Kartı */}
                    <div className="bg-white p-8 sm:p-10 shadow-sm border border-slate-100 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                        <div className="relative z-10 flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
                                <UserCircle className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800">Profil Bilgileri</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">Hesabınızın adını ve e-posta adresini buradan güncelleyebilirsiniz.</p>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* Şifre Güncelleme Kartı */}
                    <div className="bg-white p-8 sm:p-10 shadow-sm border border-slate-100 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                        <div className="relative z-10 flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                            <div className="p-3.5 bg-orange-50 text-orange-600 rounded-2xl shadow-sm">
                                <KeyRound className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-800">Şifre Güncelleme</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">Hesabınızın güvenliğini sağlamak için uzun ve rastgele karakterlerden oluşan bir şifre kullanın.</p>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Hesabı Sil Kartı */}
                    <div className="bg-white p-8 sm:p-10 shadow-sm border border-red-100 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                        <div className="relative z-10 flex items-center gap-4 mb-8 border-b border-red-50 pb-6">
                            <div className="p-3.5 bg-red-50 text-red-600 rounded-2xl shadow-sm">
                                <ShieldAlert className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-red-600">Tehlikeli Bölge</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">Hesabınızı kalıcı olarak silmek istiyorsanız bu alanı kullanın.</p>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
