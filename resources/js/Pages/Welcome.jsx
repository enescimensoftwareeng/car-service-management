import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';

export default function Welcome({ auth, brands }) {
    const { flash } = usePage().props;
    
    // UI State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Appointment State
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // History Query State
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [plateQuery, setPlateQuery] = useState('');
    const [historyData, setHistoryData] = useState(null);
    const [historyError, setHistoryError] = useState('');
    const [isQuerying, setIsQuerying] = useState(false);

    // FAQ State
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

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

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (flash?.success && isAppointmentModalOpen) {
            setShowSuccess(true);
            reset();
        }
    }, [flash]);

    const scrollToSection = (id) => {
        setIsSidebarOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const closeAppointmentModal = () => {
        setIsAppointmentModalOpen(false);
        setTimeout(() => setShowSuccess(false), 300);
    };

    const submitAppointment = (e) => {
        e.preventDefault();
        post(route('appointments.store'));
    };

    const closeHistoryModal = () => {
        setIsHistoryModalOpen(false);
        setPlateQuery('');
        setHistoryData(null);
        setHistoryError('');
    };

    const handleQueryHistory = async (e) => {
        e.preventDefault();
        setHistoryError('');
        setHistoryData(null);
        
        if (!plateQuery) {
            setHistoryError('Lütfen bir plaka giriniz.');
            return;
        }

        setIsQuerying(true);
        try {
            const response = await axios.get(route('api.vehicle-history'), {
                params: { plate: plateQuery }
            });
            setHistoryData(response.data.vehicle);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setHistoryError(error.response.data.message);
            } else {
                setHistoryError('Sorgulama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } finally {
            setIsQuerying(false);
        }
    };

    const features = [
        { title: "Kolay Randevu Yönetimi", desc: "Müşterileriniz saniyeler içinde online randevu alsın, siz sadece onaylayın. Karmaşık defterlerden kurtulun.", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
        { title: "Dijital Servis Kayıtları", desc: "Araca yapılan her işlemi, değişen her parçayı dijital ortama aktarın. Plaka ile geçmişe anında ulaşın.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { title: "Otomatik Bilgilendirme", desc: "Araç kabulünden teslimine kadar müşterilerinizi otomatik e-posta veya sistem mesajlarıyla bilgilendirin.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { title: "Kapsamlı Stok Yönetimi", desc: "Kullandığınız yedek parçaların stoklarını sistem üzerinden düşün, azalan stoklar için bildirim alın.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    ];

    const faqs = [
        { question: "Randevu almak ücretli mi?", answer: "Hayır, sistemimiz üzerinden randevu almak ve araç servis geçmişinizi sorgulamak tamamen ücretsizdir. Ödemelerinizi aracınızı teslim alırken servisimizde yapabilirsiniz." },
        { question: "Araç geçmişimi herkes görebilir mi?", answer: "Sistemimizde araç geçmişi, plaka bilgisi doğru girildiğinde görüntülenebilir. Bu sayede 2. el araç alım satımlarında da şeffaflık sağlanır." },
        { question: "Randevumu iptal edebilir miyim?", answer: "Evet, randevu saatinize 2 saat kalana kadar müşteri hizmetlerimizi arayarak veya sisteme giriş yaparak randevunuzu iptal edebilir veya erteleyebilirsiniz." },
        { question: "Değişen parçaların garantisi var mı?", answer: "Servisimizde değiştirilen tüm orijinal yedek parçalar üretici firma garantisi altındadır. Garanti süresi parçaya göre değişiklik gösterebilir." }
    ];

    return (
        <div className="bg-[#F8F9FA] text-[#212529] min-h-screen font-sans selection:bg-[#36D1DC] selection:text-white overflow-x-hidden">
            <Head title="Araba Servis Pro - Kolay ve Hızlı Oto Servis Yönetimi" />

            {/* SIDEBAR OVERLAY */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300" 
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* SIDEBAR MENU */}
            <div className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <span className="text-xl font-black tracking-tight text-[#1A2B5E]">ARABA<span className="text-[#36D1DC]">PRO</span></span>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
                    <button onClick={() => scrollToSection('hero')} className="text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#1A2B5E] font-semibold transition-colors">Ana Sayfa</button>
                    <button onClick={() => scrollToSection('ozellikler')} className="text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#1A2B5E] font-semibold transition-colors">Özellikler</button>
                    <button onClick={() => scrollToSection('sss')} className="text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#1A2B5E] font-semibold transition-colors">Sıkça Sorulan Sorular</button>
                    
                    <div className="h-px bg-gray-100 my-4 mx-4"></div>

                    <button 
                        onClick={() => { setIsSidebarOpen(false); setIsHistoryModalOpen(true); }}
                        className="text-left px-4 py-3 rounded-xl bg-blue-50 text-[#5B86E5] hover:bg-blue-100 font-bold transition-colors flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        Geçmiş Sorgula
                    </button>
                    
                    <button 
                        onClick={() => { setIsSidebarOpen(false); setIsAppointmentModalOpen(true); setShowSuccess(false); }}
                        className="text-left px-4 py-3 rounded-xl bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] text-white font-bold transition-colors flex items-center gap-3 shadow-lg shadow-blue-500/30"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        Randevu Al
                    </button>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="block w-full py-3 text-center rounded-xl bg-white border border-gray-200 text-[#1A2B5E] font-bold shadow-sm hover:shadow transition">Yönetim Paneli</Link>
                    ) : (
                        <div className="flex gap-3">
                            <Link href={route('login')} className="flex-1 py-3 text-center rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#1A2B5E] font-bold shadow-sm hover:shadow transition">Giriş</Link>
                            <Link href={route('register')} className="flex-1 py-3 text-center rounded-xl bg-[#1A2B5E] text-white hover:bg-slate-800 font-bold shadow-sm transition">Kayıt Ol</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* STICKY NAVBAR */}
            <nav className={`fixed top-0 w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
                        <div className="bg-gradient-to-br from-[#5B86E5] to-[#36D1DC] p-2.5 rounded-lg shadow-sm">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <span className={`text-2xl font-black tracking-tight ${isScrolled ? 'text-[#1A2B5E]' : 'text-[#1A2B5E]'}`}>
                            ARABA<span className="text-[#36D1DC]">PRO</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        <button onClick={() => scrollToSection('ozellikler')} className="text-sm font-bold text-gray-600 hover:text-[#5B86E5] transition-colors uppercase tracking-wider">Özellikler</button>
                        <button onClick={() => scrollToSection('sss')} className="text-sm font-bold text-gray-600 hover:text-[#5B86E5] transition-colors uppercase tracking-wider">S.S.S.</button>
                        <button onClick={() => setIsHistoryModalOpen(true)} className="text-sm font-bold text-gray-600 hover:text-[#5B86E5] transition-colors uppercase tracking-wider">Sorgula</button>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="text-sm font-bold text-[#1A2B5E] px-5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition">Panel</Link>
                        ) : (
                            <Link href={route('login')} className="text-sm font-bold text-[#1A2B5E] hover:text-[#5B86E5] transition px-2">GİRİŞ</Link>
                        )}
                        <button 
                            onClick={() => { setShowSuccess(false); setIsAppointmentModalOpen(true); }}
                            className="bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-wider"
                        >
                            Randevu Al
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 text-gray-600 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </nav>

            {/* HERO SECTION (Diagonal Split Concept) */}
            <section id="hero" className="relative min-h-[90vh] bg-white overflow-hidden pt-24 lg:pt-0 flex items-center">
                {/* Diagonal Background Shape */}
                <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full bg-gradient-to-bl from-[#e0f2fe] to-[#f0f9ff] transform origin-top-right -skew-x-12 translate-x-32 hidden lg:block rounded-bl-[100px]"></div>

                {/* Mobile Background */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white via-white to-[#f0f9ff] lg:hidden"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col lg:flex-row items-center">
                    
                    {/* Left Content */}
                    <div className="w-full lg:w-5/12 pt-10 pb-16 lg:py-24 pr-0 lg:pr-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#5B86E5] font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#36D1DC] animate-pulse"></span>
                            YENİ NESİL SERVİS
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-[#1A2B5E] leading-[1.15]">
                            Kolay ve hızlı <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B86E5] to-[#36D1DC]">oto servis yönetimi</span>
                        </h1>
                        
                        <p className="text-[#6C757D] text-lg lg:text-xl mb-10 leading-relaxed max-w-lg">
                            Müşterileriniz online randevu alsın, iş emirlerini tek ekrandan yönetin. Dijital servis geçmişi ile aracın değerini koruyun.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => { setShowSuccess(false); setIsAppointmentModalOpen(true); }}
                                className="bg-[#1A2B5E] hover:bg-slate-800 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-slate-900/10 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                            >
                                Hızlı Randevu Al
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                            
                            <button
                                onClick={() => setIsHistoryModalOpen(true)}
                                className="bg-white hover:bg-gray-50 border-2 border-gray-200 text-[#1A2B5E] text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 shadow-sm"
                            >
                                <svg className="w-5 h-5 text-[#5B86E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                Geçmiş Sorgula
                            </button>
                        </div>
                        
                        <div className="mt-10 flex items-center gap-4 text-sm font-semibold text-gray-500">
                            <div className="flex items-center gap-1">
                                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                Ücretsiz Sorgulama
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                Güvenli Altyapı
                            </div>
                        </div>
                    </div>

                    {/* Right Content (Illustration) */}
                    <div className="w-full lg:w-7/12 flex justify-center py-10 lg:py-0 mt-8 lg:mt-0">
                        <img 
                            src="/images/servis.png" 
                            alt="Oto Servis Yönetimi" 
                            className="w-full max-w-2xl aspect-[4/3] lg:aspect-video object-cover shadow-2xl hover:scale-105 transition-transform duration-700 rounded-[2rem]"
                        />
                    </div>
                </div>
            </section>

            {/* LİSTELENEN MARKALAR (Logolar) */}
            <section className="py-10 border-y border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Tüm Marka ve Modellere Hizmet Veriyoruz</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg" alt="Audi" className="h-8 md:h-10 object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" className="h-10 md:h-12 object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" alt="Mercedes" className="h-10 md:h-12 object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg" alt="Volkswagen" className="h-10 md:h-12 object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota.svg" alt="Toyota" className="h-8 md:h-10 object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg" alt="Honda" className="h-8 md:h-10 object-contain" />
                    </div>
                </div>
            </section>

            {/* ÖZELLİKLER BÖLÜMÜ */}
            <section id="ozellikler" className="py-24 px-6 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#5B86E5] font-bold tracking-wider uppercase text-sm mb-2 block">NEDEN BİZ?</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1A2B5E] mb-6">Her Şey Kontrol Altında</h2>
                        <p className="text-[#6C757D] max-w-2xl mx-auto text-lg">Geleneksel yöntemleri unutun. Dijital çağın hızına ayak uyduran, tamamen şeffaf ve güvenilir bir altyapı sunuyoruz.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feat, index) => (
                            <div key={index} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#5B86E5] group-hover:-translate-y-2 transition-all duration-300">
                                    <svg className="w-8 h-8 text-[#5B86E5] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feat.icon}></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A2B5E] mb-4">{feat.title}</h3>
                                <p className="text-[#6C757D] leading-relaxed text-lg">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NASIL ÇALIŞIR - Vurgu Bölümü */}
            <section className="py-20 px-6 bg-gradient-to-br from-[#1A2B5E] to-[#0d1530] text-white overflow-hidden relative">
                {/* Decorative background circle */}
                <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full border-[40px] border-white/5 pointer-events-none"></div>
                <div className="absolute bottom-[-50%] left-[-10%] w-[400px] h-[400px] rounded-full border-[30px] border-white/5 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Tek Tıkla Plaka <br/>Sorgulama</h2>
                        <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                            Aracınızın şeffaf geçmişini görmek hiç bu kadar kolay olmamıştı. Sadece plakanızı girin, değişen parçalardan periyodik bakımlara kadar tüm detayları listeleyin. İkinci el araç alım satımlarında güven kazanın.
                        </p>
                        <ul className="space-y-4 mb-10">
                            <li className="flex items-center gap-3 font-semibold text-lg">
                                <div className="w-8 h-8 rounded-full bg-[#36D1DC] text-[#1A2B5E] flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                                Tamamen Ücretsiz
                            </li>
                            <li className="flex items-center gap-3 font-semibold text-lg">
                                <div className="w-8 h-8 rounded-full bg-[#36D1DC] text-[#1A2B5E] flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                                Şeffaf Yedek Parça Listesi
                            </li>
                        </ul>
                        <button 
                            onClick={() => setIsHistoryModalOpen(true)}
                            className="bg-white text-[#1A2B5E] hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-all shadow-lg text-lg flex items-center gap-2"
                        >
                            Hemen Sorgula
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        {/* Mockup or Graphic */}
                        <div className="bg-white p-6 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 max-w-sm w-full">
                            <div className="border-b border-gray-100 pb-4 mb-4">
                                <div className="inline-block px-4 py-2 bg-slate-900 text-white font-bold rounded-md text-xl tracking-widest border-2 border-slate-700 w-full text-center">
                                    TR | 34 ABC 123
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-100 rounded w-full"></div>
                                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                                <div className="p-4 bg-blue-50 rounded-xl mt-4 border border-blue-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-[#1A2B5E]">Periyodik Bakım</span>
                                        <span className="text-sm font-semibold text-[#36D1DC]">15.05.2026</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Motor Yağı Değişimi</div>
                                    <div className="text-sm text-gray-600 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Hava Filtresi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SIKÇA SORULAN SORULAR (SSS) */}
            <section id="sss" className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#5B86E5] font-bold tracking-wider uppercase text-sm mb-2 block">DESTEK</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#1A2B5E]">Sıkça Sorulan Sorular</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow transition-shadow">
                                <button 
                                    className="w-full px-6 py-5 text-left font-bold text-[#1A2B5E] text-lg flex justify-between items-center focus:outline-none"
                                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                                >
                                    {faq.question}
                                    <svg className={`w-6 h-6 text-[#5B86E5] transform transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-[#6C757D] leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#F8F9FA] pt-16 pb-8 px-6 border-t border-gray-200">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#1A2B5E] p-2 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <span className="text-xl font-black tracking-tight text-[#1A2B5E]">ARABA<span className="text-[#5B86E5]">PRO</span></span>
                    </div>
                    
                    <div className="flex gap-6">
                        <button onClick={() => scrollToSection('hero')} className="text-gray-500 hover:text-[#1A2B5E] font-semibold transition">Ana Sayfa</button>
                        <button onClick={() => scrollToSection('ozellikler')} className="text-gray-500 hover:text-[#1A2B5E] font-semibold transition">Özellikler</button>
                        <button onClick={() => scrollToSection('sss')} className="text-gray-500 hover:text-[#1A2B5E] font-semibold transition">SSS</button>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto text-center border-t border-gray-200 pt-8">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Araba Servis Pro. Tüm Hakları Saklıdır. Modern ve Güvenilir Oto Servis Yönetimi.
                    </p>
                </div>
            </footer>

            {/* RANDEVU MODALI (Light Theme Uyarlanmış) */}
            <Modal show={isAppointmentModalOpen} onClose={closeAppointmentModal} maxWidth="2xl">
                {showSuccess ? (
                    <div className="p-10 text-center bg-white rounded-2xl">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-[#1A2B5E] mb-4">Harika! Randevunuz Alındı.</h2>
                        <p className="text-[#6C757D] mb-8 text-lg leading-relaxed">{flash.success}</p>
                        <div className="flex justify-center gap-4">
                            <SecondaryButton type="button" onClick={closeAppointmentModal} className="px-6 py-3 border-gray-200 text-gray-700 hover:bg-gray-50">
                                Kapat
                            </SecondaryButton>
                            {!auth?.user && (
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center px-6 py-3 bg-[#1A2B5E] border border-transparent rounded-xl font-semibold text-white hover:bg-slate-800 transition"
                                >
                                    Giriş Yap
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-[#1A2B5E] mb-6 flex items-center gap-3">
                            <svg className="w-7 h-7 text-[#5B86E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            Hızlı Randevu Al
                        </h2>

                        <form onSubmit={submitAppointment} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Kişisel Bilgiler */}
                                <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                    <h3 className="font-bold text-[#1A2B5E] border-b border-gray-200 pb-2 flex items-center gap-2">
                                        Kişisel Bilgiler
                                    </h3>
                                    <div>
                                        <InputLabel htmlFor="name" value="Ad Soyad" />
                                        <TextInput id="name" className="mt-1 block w-full bg-white border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5]" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="phone" value="Telefon" />
                                        <TextInput id="phone" className="mt-1 block w-full bg-white border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5]" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="email" value="E-posta" />
                                        <TextInput id="email" type="email" className="mt-1 block w-full bg-white border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5]" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                </div>

                                {/* Araç Bilgileri */}
                                <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                    <h3 className="font-bold text-[#1A2B5E] border-b border-gray-200 pb-2 flex items-center gap-2">
                                        Araç Bilgileri
                                    </h3>
                                    <div>
                                        <InputLabel htmlFor="plate" value="Plaka (Örn: 34ABC123)" />
                                        <TextInput id="plate" className="mt-1 block w-full uppercase bg-white border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5]" value={data.plate} onChange={e => setData('plate', e.target.value.toUpperCase())} required />
                                        <InputError message={errors.plate} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="brand_id" value="Marka" />
                                        <select
                                            id="brand_id"
                                            className="mt-1 block w-full border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5] rounded-md shadow-sm bg-white"
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
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <InputLabel htmlFor="model" value="Model" />
                                            <TextInput id="model" className="mt-1 block w-full bg-white border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5]" value={data.model} onChange={e => setData('model', e.target.value)} required />
                                            <InputError message={errors.model} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="year" value="Yıl" />
                                            <TextInput id="year" type="number" min="1900" max={new Date().getFullYear() + 1} className="mt-1 block w-full bg-white border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5]" value={data.year} onChange={e => setData('year', e.target.value)} required />
                                            <InputError message={errors.year} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Randevu Bilgileri */}
                            <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <h3 className="font-bold text-[#1A2B5E] border-b border-gray-200 pb-2 flex items-center gap-2">
                                    Randevu Zamanı
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="appointment_date" value="Tarih" />
                                        <TextInput id="appointment_date" type="date" className="mt-1 block w-full bg-white border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5]" value={data.appointment_date} onChange={e => setData('appointment_date', e.target.value)} required />
                                        <InputError message={errors.appointment_date} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="appointment_time" value="Saat" />
                                        <select
                                            id="appointment_time"
                                            className="mt-1 block w-full border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5] rounded-md shadow-sm bg-white"
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
                                        className="mt-1 block w-full border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5] rounded-md shadow-sm bg-white"
                                        rows="2"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <SecondaryButton type="button" onClick={closeAppointmentModal} className="border-gray-200 hover:bg-gray-50">
                                    İptal
                                </SecondaryButton>
                                <PrimaryButton className="bg-[#1A2B5E] hover:bg-slate-800 py-3 px-8 rounded-xl font-bold" disabled={processing}>
                                    {processing ? 'Gönderiliyor...' : 'Randevu Oluştur'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>

            {/* PLAKA SORGULAMA MODALI (Light Theme Uyarlanmış) */}
            <Modal show={isHistoryModalOpen} onClose={closeHistoryModal} maxWidth="2xl">
                <div className="p-8 bg-white rounded-2xl min-h-[400px]">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-black text-[#1A2B5E] flex items-center gap-3">
                            <svg className="w-7 h-7 text-[#5B86E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            Servis Geçmişi Sorgula
                        </h2>
                        <button onClick={closeHistoryModal} className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-50 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <form onSubmit={handleQueryHistory} className="mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Plaka Numarası</label>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1">
                                <TextInput
                                    type="text"
                                    className="w-full text-lg uppercase bg-white py-3 border-gray-200 focus:border-[#5B86E5] focus:ring-[#5B86E5] rounded-xl shadow-sm"
                                    placeholder="ÖRN: 34 ABC 123"
                                    value={plateQuery}
                                    onChange={(e) => setPlateQuery(e.target.value.toUpperCase())}
                                />
                            </div>
                            <PrimaryButton 
                                type="submit" 
                                className="bg-gradient-to-r from-[#5B86E5] to-[#36D1DC] border-none py-3 px-8 justify-center text-lg rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
                                disabled={isQuerying}
                            >
                                {isQuerying ? 'Sorgulanıyor...' : 'Sorgula'}
                            </PrimaryButton>
                        </div>
                        {historyError && (
                            <p className="mt-3 text-sm text-red-500 font-semibold flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {historyError}
                            </p>
                        )}
                    </form>

                    {historyData && (
                        <div className="animate-fade-in-up">
                            {/* Araç Bilgisi Kartı */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] z-0"></div>
                                <div className="relative z-10">
                                    <div className="inline-block px-4 py-1.5 bg-white text-[#1A2B5E] font-black rounded-md text-xl tracking-wider mb-2 border-2 border-[#1A2B5E] shadow-sm">
                                        TR | {historyData.plate}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1A2B5E]">
                                        {historyData.brand?.name} {historyData.model} <span className="text-gray-500 font-medium text-lg">({historyData.year})</span>
                                    </h3>
                                </div>
                                <div className="text-right relative z-10 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Toplam İşlem</div>
                                    <div className="text-3xl font-black text-[#5B86E5] leading-none">{historyData.services?.length || 0}</div>
                                </div>
                            </div>

                            {/* Servis Geçmişi Listesi */}
                            <h4 className="font-bold text-[#1A2B5E] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                Tamamlanan Bakım ve Onarımlar
                            </h4>
                            
                            {historyData.services && historyData.services.length > 0 ? (
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {historyData.services.map((service, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                                            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex justify-between items-center">
                                                <div className="font-bold text-[#1A2B5E] flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                    {new Date(service.created_at).toLocaleDateString('tr-TR')}
                                                </div>
                                                <div className="text-sm font-semibold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                                                    Km: <span className="text-[#1A2B5E]">{service.km_entry}</span>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Müşteri Şikayeti / Talep</span>
                                                    <p className="text-gray-700 italic">"{service.complaint}"</p>
                                                </div>
                                                
                                                {service.items && service.items.length > 0 && (
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 pl-1">Yapılan İşlemler ve Değişen Parçalar</span>
                                                        <ul className="space-y-2">
                                                            {service.items.map((item, idx) => (
                                                                <li key={idx} className="flex justify-between items-center text-sm bg-white border border-gray-100 p-2.5 rounded-lg shadow-sm">
                                                                    <span className="text-gray-800 font-semibold flex items-center gap-2">
                                                                        <svg className="w-4 h-4 text-[#36D1DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                                        {item.description}
                                                                    </span>
                                                                    <span className="bg-blue-50 text-[#5B86E5] font-bold px-2 py-1 rounded text-xs">x{item.quantity}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-gray-50 border border-gray-200 rounded-2xl">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                    </div>
                                    <p className="text-gray-500 font-medium">Bu araca ait geçmiş servis kaydı bulunmamaktadır.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}
