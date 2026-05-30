import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Users, Plus, UserPlus, Phone, Mail, ShieldCheck, Edit, Trash2, KeyRound } from 'lucide-react';

export default function TechniciansIndex({ auth, technicians = [] }) {
    const { flash } = usePage().props;
    
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // Selected technician for actions
    const [selectedTechnician, setSelectedTechnician] = useState(null);

    // Form for Adding
    const addForm = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    // Form for Editing
    const editForm = useForm({
        name: '',
        email: '',
        phone: '',
    });

    // Form for Password Reset
    const resetPasswordForm = useForm({
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setIsResetPasswordModalOpen(false);
            setIsDeleteModalOpen(false);
            
            addForm.reset();
            resetPasswordForm.reset();
        }
    }, [flash]);

    // Handlers
    const submitAdd = (e) => {
        e.preventDefault();
        addForm.post(route('technicians.store'));
    };

    const openEditModal = (tech) => {
        setSelectedTechnician(tech);
        editForm.setData({
            name: tech.name,
            email: tech.email,
            phone: tech.phone || '',
        });
        setIsEditModalOpen(true);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        editForm.put(route('technicians.update', selectedTechnician.id));
    };

    const openResetPasswordModal = (tech) => {
        setSelectedTechnician(tech);
        resetPasswordForm.reset();
        setIsResetPasswordModalOpen(true);
    };

    const submitResetPassword = (e) => {
        e.preventDefault();
        resetPasswordForm.patch(route('technicians.reset-password', selectedTechnician.id));
    };

    const openDeleteModal = (tech) => {
        setSelectedTechnician(tech);
        setIsDeleteModalOpen(true);
    };

    const submitDelete = () => {
        router.delete(route('technicians.destroy', selectedTechnician.id), {
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

    return (
        <AuthenticatedLayout user={auth?.user} header={null}>
            <Head title="Ustalar (Personel Yönetimi)" />

            <div className="bg-slate-50/50 min-h-screen pt-2 pb-12 -mt-10">
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    {/* Üst Kısım ve Yeni Ekle Butonu */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                <Users className="w-8 h-8 text-indigo-500" />
                                Servis Personeli (Ustalar)
                            </h2>
                            <p className="text-sm text-slate-500 mt-2">
                                Sisteme kayıtlı ustaları görüntüleyin ve yönetin.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-500/30 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Yeni Usta Ekle
                        </button>
                    </div>

                    {/* Ustalar Listesi (Kart Tasarımı) */}
                    {technicians.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {technicians.map((tech) => (
                                <div key={tech.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition group relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition">
                                            <ShieldCheck className="w-7 h-7 text-indigo-600" />
                                        </div>
                                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                            Usta
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-1">{tech.name}</h3>
                                    
                                    <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            {tech.email}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            {tech.phone || 'Telefon Kayıtlı Değil'}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-5 flex items-center gap-2">
                                        <button 
                                            onClick={() => openEditModal(tech)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg text-sm font-semibold transition-colors"
                                            title="Düzenle"
                                        >
                                            <Edit className="w-4 h-4" /> Düzenle
                                        </button>
                                        <button 
                                            onClick={() => openResetPasswordModal(tech)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-600 rounded-lg text-sm font-semibold transition-colors"
                                            title="Şifre Sıfırla"
                                        >
                                            <KeyRound className="w-4 h-4" /> Şifre
                                        </button>
                                        <button 
                                            onClick={() => openDeleteModal(tech)}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg text-sm font-semibold transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 className="w-4 h-4" /> Sil
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-100 shadow-sm">
                            <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Henüz Usta Kaydı Yok</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Sisteme atanmış herhangi bir servis personeli bulunmuyor. Yeni bir usta ekleyerek başlayabilirsiniz.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Yeni Usta Ekleme Modalı */}
            <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <div className="p-8 bg-white">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <UserPlus className="w-6 h-6 text-indigo-500" />
                        Sisteme Yeni Usta Ekle
                    </h2>

                    <form onSubmit={submitAdd} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="add_name" value="Ad Soyad" />
                            <TextInput
                                id="add_name"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={addForm.data.name}
                                onChange={(e) => addForm.setData('name', e.target.value)}
                                required
                                isFocused
                                placeholder="Örn: Ahmet Usta"
                            />
                            <InputError className="mt-2" message={addForm.errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="add_email" value="E-posta Adresi (Giriş için kullanılacak)" />
                            <TextInput
                                id="add_email"
                                type="email"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={addForm.data.email}
                                onChange={(e) => addForm.setData('email', e.target.value)}
                                required
                                placeholder="ahmet@servispro.com"
                            />
                            <InputError className="mt-2" message={addForm.errors.email} />
                        </div>

                        <div>
                            <InputLabel htmlFor="add_phone" value="Telefon Numarası" />
                            <TextInput
                                id="add_phone"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={addForm.data.phone}
                                onChange={(e) => addForm.setData('phone', e.target.value)}
                                placeholder="0555 555 5555"
                            />
                            <InputError className="mt-2" message={addForm.errors.phone} />
                        </div>

                        <div>
                            <InputLabel htmlFor="add_password" value="Sisteme Giriş Şifresi" />
                            <TextInput
                                id="add_password"
                                type="password"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={addForm.data.password}
                                onChange={(e) => addForm.setData('password', e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            <InputError className="mt-2" message={addForm.errors.password} />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                            <SecondaryButton type="button" onClick={() => setIsAddModalOpen(false)}>
                                İptal
                            </SecondaryButton>
                            <PrimaryButton className="bg-indigo-600 hover:bg-indigo-700" disabled={addForm.processing}>
                                {addForm.processing ? 'Ekleniyor...' : 'Ustayı Kaydet'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Usta Düzenleme Modalı */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <div className="p-8 bg-white">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <Edit className="w-6 h-6 text-indigo-500" />
                        Usta Bilgilerini Düzenle
                    </h2>

                    <form onSubmit={submitEdit} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="edit_name" value="Ad Soyad" />
                            <TextInput
                                id="edit_name"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={editForm.errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="edit_email" value="E-posta Adresi" />
                            <TextInput
                                id="edit_email"
                                type="email"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData('email', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={editForm.errors.email} />
                        </div>

                        <div>
                            <InputLabel htmlFor="edit_phone" value="Telefon Numarası" />
                            <TextInput
                                id="edit_phone"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={editForm.data.phone}
                                onChange={(e) => editForm.setData('phone', e.target.value)}
                            />
                            <InputError className="mt-2" message={editForm.errors.phone} />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                            <SecondaryButton type="button" onClick={() => setIsEditModalOpen(false)}>
                                İptal
                            </SecondaryButton>
                            <PrimaryButton className="bg-indigo-600 hover:bg-indigo-700" disabled={editForm.processing}>
                                {editForm.processing ? 'Güncelleniyor...' : 'Güncelle'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Şifre Sıfırlama Modalı */}
            <Modal show={isResetPasswordModalOpen} onClose={() => setIsResetPasswordModalOpen(false)}>
                <div className="p-8 bg-white">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-2">
                        <KeyRound className="w-6 h-6 text-amber-500" />
                        Şifre Sıfırla
                    </h2>
                    <p className="text-slate-500 text-sm mb-6 pb-4 border-b border-slate-100">
                        <span className="font-bold text-slate-700">{selectedTechnician?.name}</span> için yeni bir giriş şifresi belirliyorsunuz.
                    </p>

                    <form onSubmit={submitResetPassword} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="reset_password" value="Yeni Şifre" />
                            <TextInput
                                id="reset_password"
                                type="password"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={resetPasswordForm.data.password}
                                onChange={(e) => resetPasswordForm.setData('password', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={resetPasswordForm.errors.password} />
                        </div>

                        <div>
                            <InputLabel htmlFor="reset_password_confirmation" value="Yeni Şifre (Tekrar)" />
                            <TextInput
                                id="reset_password_confirmation"
                                type="password"
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                value={resetPasswordForm.data.password_confirmation}
                                onChange={(e) => resetPasswordForm.setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={resetPasswordForm.errors.password_confirmation} />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                            <SecondaryButton type="button" onClick={() => setIsResetPasswordModalOpen(false)}>
                                İptal
                            </SecondaryButton>
                            <PrimaryButton className="bg-amber-500 hover:bg-amber-600 focus:bg-amber-600 active:bg-amber-700" disabled={resetPasswordForm.processing}>
                                {resetPasswordForm.processing ? 'Sıfırlanıyor...' : 'Şifreyi Güncelle'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Silme Onay Modalı */}
            <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} maxWidth="sm">
                <div className="p-6 bg-white text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                        Ustayı Silmek İstediğinize Emin Misiniz?
                    </h2>
                    <p className="text-slate-500 text-sm mb-6">
                        <span className="font-bold text-slate-700">{selectedTechnician?.name}</span> isimli ustayı siliyorsunuz. Bu işlem geri alınamaz.
                    </p>

                    <div className="flex justify-center gap-3">
                        <SecondaryButton onClick={() => setIsDeleteModalOpen(false)}>
                            Vazgeç
                        </SecondaryButton>
                        <DangerButton onClick={submitDelete}>
                            Evet, Sil
                        </DangerButton>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
}
