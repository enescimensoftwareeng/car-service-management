import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Package,
    Plus,
    Search,
    Edit2,
    Trash2,
    AlertTriangle,
    X
} from 'lucide-react';

export default function PartsIndex({ auth, parts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPart, setEditingPart] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        purchase_price: '',
        sale_price: '',
        stock: '',
    });

    const filteredParts = parts.filter(part =>
        part.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openAddModal = () => {
        reset();
        clearErrors();
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        reset();
        clearErrors();
    };

    const openEditModal = (part) => {
        setEditingPart(part);
        setData({
            name: part.name,
            purchase_price: part.purchase_price,
            sale_price: part.sale_price,
            stock: part.stock,
        });
        clearErrors();
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingPart(null);
        reset();
        clearErrors();
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        post(route('parts.store'), {
            onSuccess: () => closeAddModal(),
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(route('parts.update', editingPart.id), {
            onSuccess: () => closeEditModal(),
        });
    };

    const handleDelete = (part) => {
        if (confirm('Bu parçayı silmek istediğinize emin misiniz?')) {
            destroy(route('parts.destroy', part.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Depo & Yedek Parça" />

            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                                <Package className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Depo Yönetimi</h1>
                        </div>
                        <p className="text-slate-500 font-medium">Yedek parçaları, fiyatları ve stokları buradan yönetebilirsiniz.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Parça ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-64 pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>

                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Yeni Parça Ekle</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200">
                                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Parça Adı</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Alış Fiyatı</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Satış Fiyatı</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Stok</th>
                                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredParts.length > 0 ? (
                                    filteredParts.map((part) => (
                                        <tr key={part.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-slate-800 text-[15px]">{part.name}</div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="font-semibold text-slate-600">
                                                    {Number(part.purchase_price).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="font-bold text-slate-900">
                                                    {Number(part.sale_price).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm ${part.stock < 20 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                                    {part.stock < 20 && <AlertTriangle className="w-4 h-4" />}
                                                    {part.stock} Adet
                                                </div>
                                                {part.stock < 20 && (
                                                    <div className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">Kritik Stok</div>
                                                )}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => openEditModal(part)}
                                                        className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                                                        title="Düzenle / Stok Ekle"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(part)}
                                                        className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                                                        title="Sil"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400">
                                                <Package className="w-12 h-12 mb-3 opacity-20" />
                                                <p className="font-semibold text-slate-500">Parça bulunamadı.</p>
                                                {searchTerm && <p className="text-sm mt-1">Arama kriterlerinize uyan kayıt yok.</p>}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-xl font-black text-slate-900">Yeni Parça Ekle</h2>
                            <button onClick={closeAddModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="p-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Parça Adı</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Alış Fiyatı (₺)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.purchase_price}
                                            onChange={e => setData('purchase_price', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                            required
                                        />
                                        {errors.purchase_price && <p className="text-red-500 text-sm mt-1">{errors.purchase_price}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Satış Fiyatı (₺)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.sale_price}
                                            onChange={e => setData('sale_price', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                            required
                                        />
                                        {errors.sale_price && <p className="text-red-500 text-sm mt-1">{errors.sale_price}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Başlangıç Stok Adedi</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                        required
                                    />
                                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={closeAddModal} className="px-5 py-3 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                                    İptal
                                </button>
                                <button type="submit" disabled={processing} className="px-5 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50">
                                    Kaydet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-xl font-black text-slate-900">Parçayı Düzenle</h2>
                            <button onClick={closeEditModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Parça Adı</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Alış Fiyatı (₺)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.purchase_price}
                                            onChange={e => setData('purchase_price', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                            required
                                        />
                                        {errors.purchase_price && <p className="text-red-500 text-sm mt-1">{errors.purchase_price}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Satış Fiyatı (₺)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.sale_price}
                                            onChange={e => setData('sale_price', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                            required
                                        />
                                        {errors.sale_price && <p className="text-red-500 text-sm mt-1">{errors.sale_price}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Stok Adedi (Güncel)</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                        required
                                    />
                                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={closeEditModal} className="px-5 py-3 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                                    İptal
                                </button>
                                <button type="submit" disabled={processing} className="px-5 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50">
                                    Değişiklikleri Kaydet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
