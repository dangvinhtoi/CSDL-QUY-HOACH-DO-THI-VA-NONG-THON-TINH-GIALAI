import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, FileText, Download, Upload, X, Layers, ListFilter, MapPin, PieChart, CheckCircle, Clock, BarChart, Layout, User, LogIn, LogOut, Lock, AlertTriangle, Database, RefreshCcw, Key, Phone, Mail, ClipboardCheck, Smartphone, ShieldCheck } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
  apiKey: "mock-api-key",
  authDomain: "mock-project.firebaseapp.com",
  projectId: "mock-project",
  storageBucket: "mock-project.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const OLD_REGIONS = [
  {
    province: 'Bình Định',
    districts: [
      { name: 'TP Quy Nhơn', communes: ['P. Quy Nhơn', 'P. Quy Nhơn Đông', 'P. Quy Nhơn Tây', 'P. Quy Nhơn Nam', 'P. Quy Nhơn Bắc', 'Xã Nhơn Châu'] },
      { name: 'Thị xã An Nhơn', communes: ['P. An Nhơn', 'P. An Nhơn Bắc', 'P. An Nhơn Đông', 'P. An Nhơn Nam', 'P. Bình Định', 'Xã An Nhơn Tây'] },
      { name: 'Thị xã Hoài Nhơn', communes: ['P. Bồng Sơn', 'P. Tam Quan', 'P. Hoài Nhơn', 'P. Hoài Nhơn Bắc', 'P. Hoài Nhơn Nam', 'P. Hoài Nhơn Đông', 'P. Hoài Nhơn Tây'] },
      { name: 'Huyện Phù Mỹ', communes: ['Xã Phù Mỹ', 'Xã Phù Mỹ Đông', 'Xã Phù Mỹ Tây', 'Xã Phù Mỹ Bắc', 'Xã Phù Mỹ Nam', 'Xã An Lương', 'Xã Bình Dương'] },
      { name: 'Huyện Tuy Phước', communes: ['Xã Tuy Phước', 'Xã Tuy Phước Bắc', 'Xã Tuy Phước Đông', 'Xã Tuy Phước Tây'] },
      { name: 'Huyện Phù Cát', communes: ['Xã Phù Cát', 'Xã Cát Tiến', 'Xã Cát Hanh', 'Xã Cát Khánh', 'Xã Đề Gi'] },
      { name: 'Huyện Tây Sơn', communes: ['Xã Tây Sơn', 'Xã Bình Khê', 'Xã Bình An', 'Xã Bình Hiệp', 'Xã Bình Phú'] },
      { name: 'Huyện Vĩnh Thạnh', communes: ['Xã Vĩnh Thạnh', 'Xã Vĩnh Quang', 'Xã Vĩnh Sơn', 'Xã Vĩnh Thịnh'] },
      { name: 'Huyện Hoài Ân', communes: ['Xã Hoài Ân', 'Xã Ân Tường', 'Xã Ân Tường Tây', 'Xã Ân Hảo', 'Xã Ân Hữu', 'Xã Kim Sơn', 'Xã Vạn Đức'] },
      { name: 'Huyện An Lão', communes: ['Xã An Lão', 'Xã An Vinh', 'Xã An Hòa', 'Xã An Toàn'] },
      { name: 'Huyện Vân Canh', communes: ['Xã Vân Canh', 'Xã Canh Vinh', 'Xã Canh Liên'] },
    ]
  },
  {
    province: 'Gia Lai',
    districts: [
      { name: 'TP Pleiku', communes: ['Xã Biển Hồ', 'Xã Gào', 'Xã Diên Phú'] },
      { name: 'Thị xã An Khê', communes: ['P. An Khê', 'Xã Cửu An', 'Xã Xuân An', 'Xã Ngô Mây'] },
      { name: 'Thị xã Ayun Pa', communes: ['Xã Ia Rbol', 'P. Ayun Pa'] },
      { name: 'Huyện Đức Cơ', communes: ['Xã Ia Dơk', 'Xã Ia Krêl', 'Xã Ia Nan', 'Xã Ia Dom', 'Xã Ia Pnôn'] },
      { name: 'Huyện Chư Păh', communes: ['Xã Chư Păh', 'Xã Ia Khươl', 'Xã Ia Phí', 'Xã Nghĩa Hòa', 'Xã Hòa Hội'] },
      { name: 'Huyện Kbang', communes: ['Xã Kbang', 'Xã Krong', 'Xã Kông Bơ La', 'Xã Tơ Tung', 'Xã Sơn Lang'] },
      { name: 'Huyện Kông Chro', communes: ['Xã Kông Chro', 'Xã Đăk Song', 'Xã Chơ Long', 'Xã Ya Ma', 'Xã Chư Krey', 'Xã SRó'] },
      { name: 'Huyện Đak Đoa', communes: ['Xã Đak Đoa', 'Xã Đak Sơmei', 'Xã Kdang', 'Xã Ia Băng'] },
      { name: 'Huyện Chư Sê', communes: ['Xã Chư Sê', 'Xã Al Bá', 'Xã Bờ Ngoong'] },
      { name: 'Huyện Mang Yang', communes: ['Xã Mang Yang', 'Xã Lơ Pang', 'Xã Kon Chiêng', 'Xã Hra', 'Xã Ayun'] },
      { name: 'Huyện Chư Prông', communes: ['Xã Chư Prông', 'Xã Bàu Cạn', 'Xã Ia Boòng', 'Xã Ia Pia', 'Xã Ia Tôr', 'Xã Ia Púch', 'Xã Ia Mơ', 'Xã Ia Bang'] },
      { name: 'Huyện Chư Pưh', communes: ['Xã Chư Pưh', 'Xã Ia Hrú', 'Xã Ia Le', 'Xã Ia Dreh'] },
      { name: 'Huyện Phú Thiện', communes: ['Xã Phú Thiện', 'Xã Ia Ake', 'Xã Chư A Thai'] },
      { name: 'Huyện Ia Pa', communes: ['Xã Ia Pa', 'Xã Pờ Tó'] },
      { name: 'Huyện Krông Pa', communes: ['Xã Phú Túc', 'Xã Ia Rsai', 'Xã Uar', 'Xã Ia Hiao'] },
      { name: 'Huyện Đak Pơ', communes: ['Xã Đak Pơ', 'Xã Cư An'] },
      { name: 'Huyện Ia Grai', communes: ['Xã Ia Grai', 'Xã Ia Krái', 'Xã Ia Hrung', 'Xã Ia Chia', 'Xã Ia O'] },
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('chung');
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  const initialRecords = useMemo(() => {
    const list = [];
    let idCounter = 1;
    OLD_REGIONS.forEach(prov => {
      prov.districts.forEach(dist => {
        dist.communes.forEach(comm => {
          if (idCounter <= 135) {
            const approved = idCounter % 3 !== 0;
            list.push({
              id: idCounter,
              tinhMoi: 'Gia Lai',
              tinhCu: prov.province,
              huyen: dist.name,
              xa: comm,
              tenQh: `Quy hoạch chung xây dựng ${comm}, Huyện ${dist.name}, Tỉnh Gia Lai`,
              dienTich: (1200 + (idCounter * 35)).toFixed(1),
              danSo: (4500 + (idCounter * 125)).toLocaleString(),
              cqToChuc: `Sở Xây dựng Tỉnh Gia Lai`,
              cqPheDuyet: approved ? 'UBND Tỉnh Gia Lai' : 'Sở Xây dựng Tỉnh Gia Lai',
              qdPheDuyet: approved ? `${100 + idCounter}/QĐ-UBND` : 'Đang triển khai / Đang lấy ý kiến',
              status: approved ? 'approved' : 'pending'
            });
            idCounter++;
          }
        });
      });
    });
    return list;
  }, []);

  const [records, setRecords] = useState(initialRecords);

  const stats = useMemo(() => {
    const total = records.length;
    const approved = records.filter(r => r.status === 'approved').length;
    const pending = total - approved;
    const percentage = total > 0 ? ((approved / total) * 100).toFixed(1) : 0;
    return { total, approved, pending, percentage };
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchSearch = r.xa.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.huyen.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.tenQh.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDistrict = districtFilter === '' || r.huyen === districtFilter;
      return matchSearch && matchDistrict;
    });
  }, [records, searchTerm, districtFilter]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-blue-800 text-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full text-blue-800">
              <Layers size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">CSDL QUY HOẠCH GIA LAI</h1>
              <p className="text-xs text-blue-200">Hệ thống quản lý quy hoạch & tra cứu sáp nhập đơn vị hành chính</p>
            </div>
          </div>
          <div className="text-right text-xs md:text-sm">
            <span className="bg-blue-700 px-3 py-1.5 rounded text-blue-100 border border-blue-600 font-mono">
              Cập nhật dữ liệu: Toàn bộ {stats.total} Đơn vị hành chính
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <nav className="flex border-b border-slate-200 bg-white rounded-t-lg shadow-sm overflow-x-auto">
          <button 
            onClick={() => setActiveTab('chung')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${activeTab === 'chung' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <PieChart size={18} /> THỐNG KÊ TIẾN ĐỘ
          </button>
          <button 
            onClick={() => setActiveTab('danhsach')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${activeTab === 'danhsach' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <ListFilter size={18} /> CHI TIẾT ĐƠN VỊ HÀNH CHÍNH
          </button>
        </nav>

        {activeTab === 'chung' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Tổng đồ án quy hoạch</p>
                  <h3 className="text-3xl font-bold text-slate-700 mt-1">{stats.total}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Database size={24} /></div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Đã Phê Duyệt Quy Hoạch</p>
                  <h3 className="text-3xl font-bold text-emerald-600 mt-1">{stats.approved} <span className="text-sm font-normal text-slate-400">({stats.percentage}%)</span></h3>
                </div>
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600"><CheckCircle size={24} /></div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Đang Thẩm Định / Triển Khai</p>
                  <h3 className="text-3xl font-bold text-amber-600 mt-1">{stats.pending} <span className="text-sm font-normal text-slate-400">({(100 - stats.percentage).toFixed(1)}%)</span></h3>
                </div>
                <div className="bg-amber-100 p-3 rounded-xl text-amber-600"><Clock size={24} /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <BarChart size={20} className="text-blue-600" /> Tiến Độ Phê Duyệt Quy Hoạch Tổng Thể
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-600">Đồ án đã ban hành quyết định chính thức</span>
                    <span className="font-semibold text-emerald-600">{stats.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${stats.percentage}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-600">Đồ án đang thẩm định, lập quy hoạch hoặc lấy ý kiến phối hợp</span>
                    <span className="font-semibold text-amber-600">{(100 - stats.percentage).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: `${100 - stats.percentage}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'danhsach' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm xã, phường, huyện hoặc nội dung quy hoạch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[200px]"
              >
                <option value="">-- Tất cả Quận/Huyện --</option>
                <option value="TP Quy Nhơn">TP Quy Nhơn</option>
                <option value="Thị xã An Nhơn">Thị xã An Nhơn</option>
                <option value="Thị xã Hoài Nhơn">Thị xã Hoài Nhơn</option>
                <option value="Huyện Phù Mỹ">Huyện Phù Mỹ</option>
                <option value="Huyện Tuy Phước">Huyện Tuy Phước</option>
                <option value="Huyện Phù Cát">Huyện Phù Cát</option>
                <option value="TP Pleiku">TP Pleiku</option>
                <option value="Thị xã An Khê">Thị xã An Khê</option>
                <option value="Huyện Đức Cơ">Huyện Đức Cơ</option>
                <option value="Huyện Chư Prông">Huyện Chư Prông</option>
              </select>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                    <th className="p-3 text-center w-12">STT</th>
                    <th className="p-3 w-48">Huyện / Xã</th>
                    <th className="p-3">Tên Đồ Án Quy Hoạch</th>
                    <th className="p-3 text-right w-32">Diện Tích (ha)</th>
                    <th className="p-3 text-center w-48">Trạng Thái / Quyết Định</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="p-3">
                          <span className="font-semibold block text-slate-800">{row.huyen}</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><MapPin size={12} /> {row.xa}</span>
                        </td>
                        <td className="p-3 font-medium text-slate-600">{row.tenQh}</td>
                        <td className="p-3 text-right font-mono text-slate-600 font-medium">{row.dienTich}</td>
                        <td className="p-3 text-center">
                          {row.status === 'approved' ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold border border-emerald-200">
                                <CheckCircle size={12} /> Đã phê duyệt
                              </span>
                              <span className="block text-[11px] font-mono text-slate-400">{row.qdPheDuyet}</span>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs font-semibold border border-amber-200">
                                <Clock size={12} /> Đang xử lý
                              </span>
                              <span className="block text-[11px] text-slate-400">{row.qdPheDuyet}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-400">
                        <AlertTriangle className="mx-auto mb-2 text-slate-300" size={32} />
                        Không tìm thấy dữ liệu đơn vị hành chính nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
