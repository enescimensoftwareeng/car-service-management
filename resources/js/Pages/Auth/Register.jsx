import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Arka Plan Süsü (Modern Hava) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
            </div>

            <Head title="Kayıt Ol" />

            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20 relative z-10">
                <div>
                    <div className="flex justify-center">
                        <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/50">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                            </svg>
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
                        Servis Takip Sistemi
                    </h2>
                    <p className="mt-2 text-center text-sm text-blue-200">
                        Yeni bir hesap oluşturun
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={submit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Ad Soyad" className="!text-white ml-1" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-white/10 border-white/20 !text-white placeholder-white/50 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Adınız Soyadınız"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="E-posta Adresi" className="!text-white ml-1" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-white/10 border-white/20 !text-white placeholder-white/50 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="ornek@email.com"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Şifre" className="!text-white ml-1" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-white/10 border-white/20 !text-white placeholder-white/50 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Şifre Onayı" className="!text-white ml-1" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full bg-white/10 border-white/20 !text-white placeholder-white/50 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="text-sm text-blue-400 hover:text-blue-300 transition"
                        >
                            Zaten hesabınız var mı?
                        </Link>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/30 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {processing ? 'Kaydediliyor...' : 'Kayıt Ol'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
