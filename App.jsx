<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSDL QUY HOẠCH GIA LAI & TRA CỨU SÁP NHẬP ĐVHC</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- React 18 & ReactDOM CDN -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- Babel Standalone -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <style>
    .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 10px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    @media print {
      body * { visibility: hidden; }
      .print-area, .print-area * { visibility: visible; }
      .print-area { position: absolute; left: 0; top: 0; width: 100%; }
    }
  </style>
</head>
<body class="bg-slate-100 text-slate-800 font-sans antialiased">
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useMemo, useRef } = React;

    // ==========================================
    // LUCIDE SVG ICONS COMPONENTS (STANDALONE)
    // ==========================================
    const Search = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    );
    const Plus = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    );
    const Edit2 = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
    );
    const Trash2 = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
    );
    const FileText = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    );
    const Download = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    );
    const Upload = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
    );
    const X = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    );
    const Layers = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    );
    const ListFilter = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 6h18M7 12h10M10 18h4"/></svg>
    );
    const MapPin = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    );
    const PieChart = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
    );
    const CheckCircle = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    );
    const Clock = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    );
    const BarChart = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
    );
    const Layout = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
    );
    const User = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    );
    const LogIn = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
    );
    const LogOut = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    );
    const Lock = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    );
    const AlertTriangle = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    );
    const Database = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
    );
    const RefreshCcw = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
    );
    const Key = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 2l-2 2m-1.5 1.5L16 7l-3 3 1.5 1.5L13 13l-1.5-1.5L10 13l-1.5-1.5L7 13l-2 2h3v2h2v2h2l3.5-3.5"/><circle cx="7.5" cy="7.5" r="3.5"/></svg>
    );
    const Phone = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    );
    const Mail = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    );
    const ClipboardCheck = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><polyline points="9 14 11 16 15 11"/></svg>
    );
    const Smartphone = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
    );
    const ShieldCheck = ({ className = "w-4 h-4" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
    );

    // ==========================================
    // 1. DỮ LIỆU HÀNH CHÍNH & MẪU SÁP NHẬP
    // ==========================================
    const appId = "gialai-planning-app";

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
          { name: 'Huyện Vân Canh', communes: ['Xã Vân Canh', 'Xã Canh Vinh', 'Xã Canh Liên'] }
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
          { name: 'Huyện Kbang', communes: ['Xã Kbang', 'Xã Krong', 'Xã Kông Bơ La', 'Xã Tơ Tung', 'Xã Sơn Lang', 'Xã Đông', 'Xã Nghĩa An', 'Xã Đăk Hlơ', 'Xã Ya Hội'] },
          { name: 'Huyện Kông Chro', communes: ['Xã Kông Chro', 'Xã Đăk Song', 'Xã Chơ Long', 'Xã Ya Ma', 'Xã Chư Krey', 'Xã SRó', 'Xã Đak Rong'] },
          { name: 'Huyện Đak Đoa', communes: ['Xã Đak Đoa', 'Xã Đak Sơmei', 'Xã Kdang', 'Xã Ia Băng'] },
          { name: 'Huyện Chư Sê', communes: ['Xã Chư Sê', 'Xã Al Bá', 'Xã Bờ Ngoong'] },
          { name: 'Huyện Mang Yang', communes: ['Xã Mang Yang', 'Xã Lơ Pang', 'Xã Kon Chiêng', 'Xã Hra', 'Xã Ayun'] },
          { name: 'Huyện Chư Prông', communes: ['Xã Chư Prông', 'Xã Bàu Cạn', 'Xã Ia Boòng', 'Xã Ia Pia', 'Xã Ia Tôr', 'Xã Ia Púch', 'Xã Ia Mơ', 'Xã Ia Bang'] },
          { name: 'Huyện Chư Pưh', communes: ['Xã Chư Pưh', 'Xã Ia Hrú', 'Xã Ia Le', 'Xã Ia Dreh'] },
          { name: 'Huyện Phú Thiện', communes: ['Xã Phú Thiện', 'Xã Ia Ake', 'Xã Chư A Thai'] },
          { name: 'Huyện Ia Pa', communes: ['Xã Ia Pa', 'Xã Pờ Tó'] },
          { name: 'Huyện Krông Pa', communes: ['Xã Phú Túc', 'Xã Ia Rsai', 'Xã Uar', 'Xã Ia Hiao', 'Xã Chư Rcăm'] },
          { name: 'Huyện Đak Pơ', communes: ['Xã Đak Pơ', 'Xã Cư An', 'Xã Hội Sơn'] },
          { name: 'Huyện Ia Grai', communes: ['Xã Ia Grai', 'Xã Ia Krái', 'Xã Ia Hrung', 'Xã Ia Chia', 'Xã Ia O'] }
        ]
      }
    ];

    const generate135Records = () => {
      const data = [];
      let idCounter = 1;
      OLD_REGIONS.forEach(prov => {
        prov.districts.forEach(dist => {
          dist.communes.forEach(comm => {
            const i = idCounter++;
            const isApproved = i % 3 !== 0;
            data.push({
              id: i,
              tinhMoi: 'Gia Lai',
              tinhCu: prov.province,
              huyen: dist.name,
              xa: comm,
              tenQh: `Quy hoạch chung xây dựng ${comm.toLowerCase()} (Định hướng đến 2045)`,
              dienTich: (50 + (i % 150)).toFixed(2),
              danSo: (5000 + (i * 120)).toLocaleString('en-US'),
              cqToChuc: `UBND ${comm.replace('Xã ', 'xã ').replace('P. ', 'phường ')}`,
              cqPheDuyet: isApproved ? `UBND Tỉnh ${prov.province}` : `UBND ${dist.name}`,
              cqThamDinh: 'Phòng Kinh tế & Hạ tầng / Quản lý Đô thị',
              bcThamDinh: isApproved ? `${100 + i}/BC-UBND` : 'Đang cập nhật',
              yKienSxd: 'Đã thống nhất theo kết luận thẩm định',
              qdPheDuyet: isApproved ? `${1000 + i}/QĐ-UBND` : 'Đang trình duyệt',
              congBo: isApproved ? 'Đã công bố' : 'Chưa công bố',
              camMoc: isApproved ? 'Đã cắm mốc' : 'Chưa cắm mốc',
              keHoach: isApproved ? 'Đã ban hành' : 'Đang xây dựng',
              file: 'https://drive.google.com',
              mapLink: 'https://maps.google.com',
              tinhHinhGuiHoSo: isApproved ? 'Đã gửi' : 'Chưa gửi',
              ghiChu: 'Theo Nghị quyết sáp nhập đơn vị hành chính'
            });
          });
        });
      });
      return data;
    };

    const generateDetailRecords = () => {
      const data = [];
      let idCounter = 1;
      let globalIndex = 0;
      OLD_REGIONS.forEach(prov => {
        prov.districts.forEach(dist => {
          dist.communes.forEach(comm => {
            globalIndex++;
            const numProjects = (globalIndex % 3) + 1;
            for (let j = 0; j < numProjects; j++) {
              const i = idCounter++;
              const isApproved = i % 4 !== 0;
              data.push({
                id: i,
                tinhMoi: 'Gia Lai',
                tinhCu: prov.province,
                huyen: dist.name,
                xa: comm,
                tenQh: j === 0 
                  ? `Quy hoạch chi tiết khu trung tâm ${comm.toLowerCase()} (Tỷ lệ 1/500)` 
                  : `Quy hoạch chi tiết điểm dân cư số ${j} thuộc ${comm.toLowerCase()} (Tỷ lệ 1/500)`,
                dienTich: (10 + (i % 40)).toFixed(2),
                danSo: (1000 + (i * 15)).toLocaleString('en-US'),
                cqToChuc: `UBND ${comm.replace('Xã ', 'xã ').replace('P. ', 'phường ')}`,
                cqPheDuyet: `UBND ${dist.name}`,
                cqThamDinh: 'Phòng Kinh tế / Quản lý Đô thị',
                bcThamDinh: isApproved ? `${200 + i}/BC-UBND` : 'Đang cập nhật',
                yKienSxd: 'Phân cấp địa phương',
                qdPheDuyet: isApproved ? `${2000 + i}/QĐ-UBND` : 'Đang cập nhật',
                congBo: isApproved ? 'Đã công bố' : 'Chưa công bố',
                camMoc: isApproved ? 'Đã cắm mốc' : 'Chưa cắm mốc',
                keHoach: isApproved ? 'Đã ban hành' : 'Đang cập nhật',
                file: 'https://drive.google.com',
                mapLink: 'https://maps.google.com',
                tinhHinhGuiHoSo: isApproved ? 'Đã gửi' : 'Chưa gửi',
                ghiChu: 'Cụ thể hóa QHC'
              });
            }
          });
        });
      });
      return data;
    };

    const generateMergedData = () => {
      const specificMerges = {
        'P. Quy Nhơn': ['Phường Hải Cảng', 'Phường Thị Nại', 'Phường Trần Phú', 'Phường Đống Đa'],
        'P. Quy Nhơn Đông': ['Xã Nhơn Hội', 'Xã Nhơn Lý', 'Xã Nhơn Hải', 'Phường Nhơn Bình'],
        'P. Quy Nhơn Tây': ['Phường Bùi Thị Xuân', 'Xã Phước Mỹ'],
        'P. Quy Nhơn Nam': ['Phường Ngô Mây', 'Phường Nguyễn Văn Cừ', 'Phường Quang Trung', 'Phường Ghềnh Ráng'],
        'P. Quy Nhơn Bắc': ['Phường Trần Quang Diệu', 'Phường Nhơn Phú'],
        'Xã Tuy Phước': ['Thị trấn Diêu Trì', 'Thị trấn Tuy Phước', 'Xã Phước Nghĩa', 'Xã Phước Lộc', 'Xã Phước Thuận'],
        'P. Hoài Nhơn Đông': ['Phường Hoài Hương', 'Phường Hoài Xuân', 'Xã Hoài Mỹ'],
        'P. Hoài Nhơn Tây': ['Phường Hoài Tân', 'Phường Hoài Đức'],
        'P. Hoài Nhơn Bắc': ['Phường Hoài Thanh Tây', 'Xã Hoài Châu', 'Xã Hoài Châu Bắc'],
        'P. Hoài Nhơn Nam': ['Xã Hoài Sơn', 'Xã Hoài Phú'],
        'P. Hoài Nhơn': ['Phường Hoài Thanh', 'Các khu vực sáp nhập liền kề'],
        'Xã Phù Mỹ': ['Thị trấn Phù Mỹ', 'Xã Mỹ Lộc', 'Xã Mỹ Hòa', 'Xã Mỹ Trinh'],
        'Xã Phù Cát': ['Thị trấn Ngô Mây', 'Xã Cát Trinh', 'Xã Cát Tân'],
        'Xã Tây Sơn': ['Thị trấn Phú Phong', 'Xã Bình Nghi'],
        'Xã Lơ Pang': ['Xã Lơ Pang (cũ)', 'Xã Kon Thụp', 'Xã Đê Ar'],
        'Xã Kon Chiêng': ['Xã Kon Chiêng (cũ)', 'Xã Đăk Trôi'],
        'Xã Hra': ['Xã Hra (cũ)', 'Xã Đak Ta Ley'],
        'Xã Ayun': ['Xã Ayun (cũ)', 'Xã Đăk Jơ Ta'],
        'Xã Mang Yang': ['Thị trấn Kon Dơng', 'Xã Đak Yă', 'Xã Đăk Drăng', 'Xã Hải Yang'],
        'Xã Ia Grai': ['Thị trấn Ia Kha', 'Xã Ia Grăng', 'Xã Ia Bă'],
        'Xã Ia Krái': ['Xã Ia Tô', 'Xã Ia Krái (cũ)', 'Xã Ia Khai'],
        'Xã Ia Hrung': ['Xã Ia Sao', 'Xã Ia Yok', 'Xã Ia Hrung (cũ)', 'Xã Ia Dêr'],
        'P. An Khê': ['Phường An Phú', 'Phường An Tân', 'Xã Tú An'],
        'Xã Chư Păh': ['Thị trấn Phú Hòa', 'Xã Nghĩa Hưng'],
        'Xã Đak Đoa': ['Thị trấn Đak Đoa', 'Xã Hneng']
      };
      const list = [];
      let id = 1;
      OLD_REGIONS.forEach(prov => {
        prov.districts.forEach(dist => {
          dist.communes.forEach(comm => {
            if (specificMerges[comm]) {
              list.push({
                id: id++,
                tinhCu: prov.province,
                huyen: dist.name,
                xaMoi: comm,
                cacXaCu: specificMerges[comm],
                canCu: 'Nghị quyết 1664/NQ-UBTVQH15'
              });
            }
          });
        });
      });
      return list;
    };

    const generateInitialContacts = () => [
      { id: '1', donVi: 'UBND TP Pleiku', hoTen: 'Nguyễn Văn A', dienThoai: '0912345678', chucDanh: 'Trưởng phòng QLĐÔ', email: 'nguyenvana@gialai.gov.vn' },
      { id: '2', donVi: 'UBND Thị xã An Khê', hoTen: 'Trần Thị B', dienThoai: '0987654321', chucDanh: 'Phó Trưởng phòng KT&HT', email: 'tranthib@gialai.gov.vn' },
      { id: '3', donVi: 'UBND Huyện Đak Đoa', hoTen: 'Lê Văn C', dienThoai: '0905123456', chucDanh: 'Chuyên viên QLĐT', email: 'levanc@gialai.gov.vn' },
      { id: '4', donVi: 'UBND TP Quy Nhơn', hoTen: 'Phạm Văn D', dienThoai: '0935111222', chucDanh: 'Trưởng phòng QLĐÔ', email: 'phamvand@binhdinh.gov.vn' },
      { id: '5', donVi: 'UBND Thị xã Hoài Nhơn', hoTen: 'Hoàng Thị E', dienThoai: '0978333444', chucDanh: 'Chuyên viên KT-HT', email: 'hoangthie@binhdinh.gov.vn' }
    ];

    const generateInitialReviews = () => [
      { id: '1', tinhCu: 'Gia Lai', huyen: 'Huyện Đak Đoa', noiDung: 'Rà soát định hướng phát triển không gian vùng huyện, kết nối hạ tầng giao thông với TP Pleiku.', coQuan: 'Sở Xây dựng Gia Lai', trangThai: 'Đã hoàn thành', file: 'https://drive.google.com', ghiChu: 'Đã tích hợp vào QHC tỉnh' },
      { id: '2', tinhCu: 'Gia Lai', huyen: 'Thị xã An Khê', noiDung: 'Đánh giá thực trạng phát triển đô thị khu vực phía Đông tỉnh Gia Lai.', coQuan: 'UBND TX An Khê', trangThai: 'Đang rà soát', file: '', ghiChu: 'Đang lấy ý kiến các Sở ngành' },
      { id: '3', tinhCu: 'Bình Định', huyen: 'TP Quy Nhơn', noiDung: 'Rà soát quỹ đất phát triển đô thị dịch vụ du lịch ven biển Quy Nhơn.', coQuan: 'Sở Xây dựng Bình Định', trangThai: 'Đã hoàn thành', file: 'https://drive.google.com', ghiChu: 'Đã phê duyệt điều cục bộ' },
      { id: '4', tinhCu: 'Bình Định', huyen: 'Huyện Tuy Phước', noiDung: 'Đánh giá tiêu chí nâng loại đô thị phụ cận TP Quy Nhơn.', coQuan: 'UBND Huyện Tuy Phước', trangThai: 'Chưa rà soát', file: '', ghiChu: 'Dự kiến triển khai Q3/2026' }
    ];

    const COLUMNS = [
      { key: 'stt', label: 'STT', width: 'w-12' },
      { key: 'tinhMoi', label: 'Tỉnh mới', width: 'w-24' },
      { key: 'tinhCu', label: 'Tỉnh cũ', width: 'w-24' },
      { key: 'huyen', label: 'Huyện/Thị xã', width: 'w-36' },
      { key: 'xa', label: 'Xã/Phường', width: 'w-36' },
      { key: 'tenQh', label: 'Tên quy hoạch', width: 'min-w-[250px] max-w-[350px]' },
      { key: 'dienTich', label: 'Diện tích (ha)', width: 'w-28' },
      { key: 'danSo', label: 'Dân số (2025/2035/2045)', width: 'w-32' },
      { key: 'cqToChuc', label: 'CQ tổ chức lập', width: 'w-40' },
      { key: 'cqPheDuyet', label: 'CQ phê duyệt', width: 'w-40' },
      { key: 'cqThamDinh', label: 'CQ thẩm định', width: 'w-40' },
      { key: 'bcThamDinh', label: 'BC thẩm định', width: 'w-36' },
      { key: 'yKienSxd', label: 'Ý kiến Sở XD', width: 'w-36' },
      { key: 'qdPheDuyet', label: 'QĐ phê duyệt', width: 'w-36' },
      { key: 'congBo', label: 'Công bố', width: 'w-28' },
      { key: 'camMoc', label: 'Cắm mốc', width: 'w-28' },
      { key: 'keHoach', label: 'Kế hoạch TH', width: 'w-36' },
      { key: 'file', label: 'Đính kèm', width: 'w-24' },
      { key: 'mapLink', label: 'Bản đồ', width: 'w-24' },
      { key: 'tinhHinhGuiHoSo', label: 'Gửi hồ sơ SXD', width: 'w-36' },
      { key: 'ghiChu', label: 'Ghi chú', width: 'min-w-[150px] max-w-[250px]' }
    ];

    // CSV Parsers
    const parseCSVLine = (text) => {
      const rows = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char === '"' && text[i+1] === '"') { current += '"'; i++; }
        else if (char === '"') { inQuotes = !inQuotes; }
        else if (char === '\n' && !inQuotes) { rows.push(current); current = ''; }
        else { current += char; }
      }
      if (current) rows.push(current);
      return rows;
    };

    const parseCSVColumns = (row, separator) => {
      const cols = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < row.length; i++) {
        let char = row[i];
        if (char === '"' && row[i+1] === '"') { current += '"'; i++; }
        else if (char === '"') { inQuotes = !inQuotes; }
        else if (char === separator && !inQuotes) { cols.push(current.trim()); current = ''; }
        else { current += char; }
      }
      cols.push(current.trim());
      return cols;
    };

    // ==========================================
    // MAIN APP COMPONENT
    // ==========================================
    function App() {
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [showLoginModal, setShowLoginModal] = useState(false);
      const [showDbModal, setShowDbModal] = useState(false);
      const [showChangePassModal, setShowChangePassModal] = useState(false);
      const [showForgotPassModal, setShowForgotPassModal] = useState(false);

      const [loginForm, setLoginForm] = useState({ username: '', password: '' });
      const [loginError, setLoginError] = useState('');
      const [changePassForm, setChangePassForm] = useState({ current: '', newPass: '', confirm: '' });
      const [changePassError, setChangePassError] = useState('');
      const [adminPassword, setAdminPassword] = useState('123456');

      const [forgotPassStep, setForgotPassStep] = useState(1);
      const [recoveryPhone, setRecoveryPhone] = useState('');
      const [recoveryOTP, setRecoveryOTP] = useState('');
      const [realGeneratedOTP, setRealGeneratedOTP] = useState('');
      const [newRecoveryPass, setNewRecoveryPass] = useState('');
      const [recoveryError, setRecoveryError] = useState('');

      const ADMIN_PHONE = '0385118757';
      const ADMIN_EMAIL = 'dangvinhtoi@gmail.com';

      const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
      const [notification, setNotification] = useState('');
      const [activeTab, setActiveTab] = useState('STATS_CHUNG');

      // STATE DATA COLLECTIONS
      const [data, setData] = useState([]);
      const [detailData, setDetailData] = useState([]);
      const [mergedData, setMergedData] = useState([]);
      const [contactData, setContactData] = useState([]);
      const [reviewData, setReviewData] = useState([]);

      // FILTERS QH CHUNG
      const [searchTerm, setSearchTerm] = useState('');
      const [filterHuyen, setFilterHuyen] = useState('');
      const [filterTinhTrang, setFilterTinhTrang] = useState('');
      const [filterThamQuyen, setFilterThamQuyen] = useState('');
      const [filterCongBo, setFilterCongBo] = useState('');
      const [filterCamMoc, setFilterCamMoc] = useState('');
      const [filterKeHoach, setFilterKeHoach] = useState('');
      const [filterGuiSXD, setFilterGuiSXD] = useState('');

      // FILTERS QH CHI TIẾT
      const [detailSearchTerm, setDetailSearchTerm] = useState('');
      const [detailFilterHuyen, setDetailFilterHuyen] = useState('');
      const [detailFilterXa, setDetailFilterXa] = useState('');
      const [detailFilterTinhTrang, setDetailFilterTinhTrang] = useState('');
      const [detailFilterCongBo, setDetailFilterCongBo] = useState('');
      const [detailFilterCamMoc, setDetailFilterCamMoc] = useState('');
      const [detailFilterGuiSXD, setDetailFilterGuiSXD] = useState('');

      // FILTERS SÁP NHẬP
      const [mergeFilterHuyen, setMergeFilterHuyen] = useState('');
      const [mergeFilterXa, setMergeFilterXa] = useState('');

      // FILTERS LIÊN HỆ
      const [contactSearchTerm, setContactSearchTerm] = useState('');
      const [contactFilterHuyen, setContactFilterHuyen] = useState('');

      // FILTERS RÀ SOÁT
      const [reviewSearchTerm, setReviewSearchTerm] = useState('');
      const [reviewFilterHuyen, setReviewFilterHuyen] = useState('');
      const [reviewFilterStatus, setReviewFilterStatus] = useState('');

      // MODALS FORM STATES
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingRecord, setEditingRecord] = useState(null);
      const [formData, setFormData] = useState({});

      const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
      const [editingMergeRecord, setEditingMergeRecord] = useState(null);
      const [mergeFormData, setMergeFormData] = useState({});

      const [isContactModalOpen, setIsContactModalOpen] = useState(false);
      const [editingContactRecord, setEditingContactRecord] = useState(null);
      const [contactFormData, setContactFormData] = useState({});

      const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
      const [editingReviewRecord, setEditingReviewRecord] = useState(null);
      const [reviewFormData, setReviewFormData] = useState({});

      // SMART REPORT MODAL
      const [reportModal, setReportModal] = useState({ isOpen: false, type: '' });
      const [reportFile, setReportFile] = useState(null);
      const [reportProgress, setReportProgress] = useState(0);
      const [reportStatus, setReportStatus] = useState('');
      const [showGeneratedReport, setShowGeneratedReport] = useState(false);

      // INIT DATA ON LOAD
      useEffect(() => {
        setData(generate135Records());
        setDetailData(generateDetailRecords());
        setMergedData(generateMergedData());
        setContactData(generateInitialContacts());
        setReviewData(generateInitialReviews());
      }, []);

      const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(''), 4000);
      };

      const openConfirm = (title, message, onConfirm) => setConfirmDialog({ isOpen: true, title, message, onConfirm });
      const closeConfirm = () => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });

      // STATS COMPUTATIONS
      const statsOverview = useMemo(() => {
        const total = data.length;
        const approved = data.filter(item => item.qdPheDuyet && item.qdPheDuyet !== 'Đang cập nhật' && item.qdPheDuyet !== 'Đang trình duyệt' && item.qdPheDuyet.trim() !== '').length;
        const approvedPercent = total > 0 ? Math.round((approved / total) * 100) : 0;
        const pending = total - approved;
        const pendingPercent = 100 - approvedPercent;
        return { total, approved, approvedPercent, pending, pendingPercent };
      }, [data]);

      const detailedStats = useMemo(() => {
        const res = { 'Bình Định': [], 'Gia Lai': [] };
        OLD_REGIONS.forEach(prov => {
          const key = prov.province;
          prov.districts.forEach(dist => {
            const distDetail = detailData.filter(d => d.huyen === dist.name);
            const total = distDetail.length;
            const approved = distDetail.filter(d => d.qdPheDuyet && d.qdPheDuyet !== 'Đang cập nhật' && d.qdPheDuyet.trim() !== '').length;
            const pending = total - approved;
            res[key].push({ name: dist.name, total, approved, pending });
          });
        });
        return res;
      }, [detailData]);

      // EXPORT EXCEL (CSV)
      const handleExportExcel = (exportData, sheetName, isDetail = false) => {
        if (!exportData || exportData.length === 0) return showNotification('Không có dữ liệu để xuất!');
        const headers = COLUMNS.map(col => `${isDetail && col.key === 'danSo' ? 'Dân số' : col.label}`).join(',');
        const rows = exportData.map((row, index) => {
          return COLUMNS.map(col => {
            const val = col.key === 'stt' ? (index + 1) : (row[col.key] || '');
            return `"${val.toString().replace(/"/g, '""').replace(/(\r\n|\n|\r)/gm, " ")}"`;
          }).join(',');
        });
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${sheetName}_${new Date().getTime()}.csv`;
        link.click();
      };

      const handleExportMergeExcel = () => {
        if (filteredMergeData.length === 0) return showNotification('Không có dữ liệu để xuất!');
        const headers = '"STT","Huyện/Thị xã","Tỉnh cũ","Tên Xã/Phường MỚI","Các Xã/Phường/Thị trấn CŨ","Căn cứ pháp lý"';
        const rows = filteredMergeData.map((row, index) => {
          const cacXaCuStr = Array.isArray(row.cacXaCu) ? row.cacXaCu.join('; ') : row.cacXaCu || '';
          return `"${index + 1}","${row.huyen || ''}","${row.tinhCu || ''}","${row.xaMoi || ''}","${cacXaCuStr}","${row.canCu || ''}"`;
        });
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `TraCuuSapNhap_${new Date().getTime()}.csv`;
        link.click();
      };

      const handleExportContactExcel = () => {
        if (filteredContactData.length === 0) return showNotification('Không có dữ liệu để xuất!');
        const headers = '"STT","Đơn vị","Họ và tên","Điện thoại","Chức danh","Email"';
        const rows = filteredContactData.map((row, index) => 
          `"${index + 1}","${row.donVi || ''}","${row.hoTen || ''}","${row.dienThoai || ''}","${row.chucDanh || ''}","${row.email || ''}"`
        );
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `DanhBa_LienHe_${new Date().getTime()}.csv`;
        link.click();
      };

      const handleExportReviewExcel = () => {
        if (filteredReviewData.length === 0) return showNotification('Không có dữ liệu để xuất!');
        const headers = '"STT","Tỉnh (Cũ)","Huyện/Thị xã (Cũ)","Nội dung định hướng phát triển","Đơn vị phụ trách","Trạng thái rà soát","Ghi chú","Đính kèm"';
        const rows = filteredReviewData.map((row, index) => 
          `"${index + 1}","${row.tinhCu || ''}","${row.huyen || ''}","${(row.noiDung || '').replace(/"/g, '""')}","${row.coQuan || ''}","${row.trangThai || ''}","${(row.ghiChu || '').replace(/"/g, '""')}","${row.file || ''}"`
        );
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `RaSoatDinhHuong_${new Date().getTime()}.csv`;
        link.click();
      };

      // BACKUP & RESTORE JSON DB
      const handleExportDB = () => {
        const exportObj = { qhChung: data, qhChiTiet: detailData, qhSapNhap: mergedData, qhLienHe: contactData, qhRaSoat: reviewData };
        const jsonString = JSON.stringify(exportObj, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", url);
        downloadAnchorNode.setAttribute("download", `QuyHoachGiaLai_Backup_${new Date().getTime()}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        URL.revokeObjectURL(url);
        showNotification('Đã tải xuống bản sao lưu dữ liệu (.json)!');
      };

      const handleImportDB = (e) => {
        const file = e.target.files;
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            let rawData = event.target.result;
            if (rawData.charCodeAt(0) === 0xFEFF) rawData = rawData.slice(1);
            const jsonData = JSON.parse(rawData);
            if (!jsonData || typeof jsonData !== 'object') return showNotification('Lỗi: File dữ liệu không hợp lệ!');
            
            if (jsonData.qhChung) setData(jsonData.qhChung);
            if (jsonData.qhChiTiet) setDetailData(jsonData.qhChiTiet);
            if (jsonData.qhSapNhap) setMergedData(jsonData.qhSapNhap);
            if (jsonData.qhLienHe) setContactData(jsonData.qhLienHe);
            if (jsonData.qhRaSoat) setReviewData(jsonData.qhRaSoat);

            showNotification('Khôi phục dữ liệu từ file sao lưu thành công!');
            setShowDbModal(false);
          } catch(err) {
            showNotification('Lỗi đọc file JSON: ' + err.message);
          }
        };
        reader.readAsText(file, "UTF-8");
        e.target.value = '';
      };

      const handleResetToDefaultDB = () => {
        openConfirm('Xác nhận khôi phục', 'Bạn có chắc chắn muốn khôi phục CSDL về dữ liệu gốc mặc định?', () => {
          closeConfirm();
          setData(generate135Records());
          setDetailData(generateDetailRecords());
          setMergedData(generateMergedData());
          setContactData(generateInitialContacts());
          setReviewData(generateInitialReviews());
          setShowDbModal(false);
          showNotification('Khôi phục CSDL gốc thành công!');
        });
      };

      // IMPORT CSV
      const handleImportCSV = (e, type) => {
        const file = e.target.files;
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            let rawData = event.target.result;
            if (rawData.charCodeAt(0) === 0xFEFF) rawData = rawData.slice(1);
            const lines = parseCSVLine(rawData).filter(l => l.trim());
            if (lines.length < 2) return showNotification('File không có dữ liệu!');

            let separator = ',';
            if (lines.indexOf(';') > lines.indexOf(',')) separator = ';';
            else if (lines.indexOf('\t') > lines.indexOf(',')) separator = '\t';

            const headers = parseCSVColumns(lines, separator).map(h => h.toLowerCase().trim().replace(/['"]/g, ''));
            const recordsToSave = [];
            let lastDonVi = '';
            let lastHuyen = '';
            let lastTinh = '';

            for (let i = 1; i < lines.length; i++) {
              let cols = parseCSVColumns(lines[i], separator);
              
              if (type === 'SAPNHAP' && cols.length > headers.length && headers.length >= 2) {
                const diff = cols.length - headers.length;
                const lastCol = cols.pop();
                const mergedVal = cols.splice(headers.length - 2, diff + 1).join(', ');
                cols.push(mergedVal);
                cols.push(lastCol);
              }

              const rawItem = {};
              headers.forEach((h, index) => { rawItem[h] = cols[index] ? cols[index].trim() : ''; });

              const getVal = (keys) => {
                for (let k of keys) {
                  const found = Object.keys(rawItem).find(rk => rk.includes(k));
                  if (found && rawItem[found]) return rawItem[found];
                }
                return '';
              };

              if (type === 'CHUNG' || type === 'CHITIET') {
                const item = {
                  id: parseInt(getVal(['stt','id'])) || (Date.now() + i),
                  tinhMoi: getVal(['tỉnh mới','tỉnh']), tinhCu: getVal(['tỉnh cũ']),
                  huyen: getVal(['huyện','thị xã','thành phố']), xa: getVal(['xã','phường']),
                  tenQh: getVal(['tên quy hoạch','tên qh']), dienTich: getVal(['diện tích']), danSo: getVal(['dân số']),
                  cqToChuc: getVal(['tổ chức','cq tổ chức']), cqPheDuyet: getVal(['cơ quan phê duyệt','cq phê duyệt']),
                  cqThamDinh: getVal(['thẩm định','cq thẩm định']), bcThamDinh: getVal(['báo cáo thẩm định','bc thẩm định']),
                  yKienSxd: getVal(['ý kiến','sxd']), qdPheDuyet: getVal(['quyết định','qđ']),
                  congBo: getVal(['công bố']), camMoc: getVal(['cắm mốc']), keHoach: getVal(['kế hoạch']),
                  file: getVal(['file','đính kèm', 'tài liệu']), mapLink: getVal(['bản đồ','link']),
                  tinhHinhGuiHoSo: getVal(['gửi hồ sơ','sxd']), ghiChu: getVal(['ghi chú'])
                };
                if (item.huyen && item.xa) recordsToSave.push(item);
              } else if (type === 'LIENHE') {
                let donVi = getVal(['đơn vị', 'đơn vi', 'huyện', 'xã', 'phường']);
                if (donVi) lastDonVi = donVi; else donVi = lastDonVi;

                const hoTen = getVal(['họ và tên', 'họ tên', 'tên']);
                const dienThoai = getVal(['điện thoại', 'sđt', 'sdt']);
                const chucDanh = getVal(['chức danh', 'chức vụ']);
                const email = getVal(['email', 'thư']);

                if (hoTen || dienThoai) {
                  recordsToSave.push({ id: Date.now().toString() + i, donVi, hoTen, dienThoai, chucDanh, email });
                }
              } else if (type === 'SAPNHAP') {
                let tinh = getVal(['tỉnh']);
                let huyen = getVal(['huyện', 'thị xã', 'thành phố']);
                if (tinh) lastTinh = tinh; else tinh = lastTinh;
                if (huyen) lastHuyen = huyen; else huyen = lastHuyen;

                const xaMoi = getVal(['xã mới', 'phường mới', 'tên xã']);
                let cacXaCuStr = getVal(['xã cũ', 'phường cũ', 'thị trấn cũ', 'bị sáp nhập']);
                const canCu = getVal(['căn cứ', 'pháp lý']) || 'Nghị quyết 1664/NQ-UBTVQH15';

                if (xaMoi) {
                  const cacXaCu = cacXaCuStr ? cacXaCuStr.split(/[,;]/).map(s => s.trim()).filter(Boolean) : [];
                  recordsToSave.push({ id: Date.now().toString() + i, tinhCu: tinh, huyen, xaMoi, cacXaCu, canCu });
                }
              }
            }

            if (recordsToSave.length === 0) return showNotification('Không tìm thấy dữ liệu hợp lệ trong file CSV!');

            openConfirm('Xác nhận Nạp dữ liệu', `Hệ thống tìm thấy ${recordsToSave.length} dòng hợp lệ. Dữ liệu cũ sẽ bị XÓA và nạp lại bằng dữ liệu mới. Xác nhận?`, () => {
              closeConfirm();
              setShowDbModal(false);
              if (type === 'CHUNG') setData(recordsToSave);
              else if (type === 'CHITIET') setDetailData(recordsToSave);
              else if (type === 'LIENHE') setContactData(recordsToSave);
              else if (type === 'SAPNHAP') setMergedData(recordsToSave);
              showNotification(`Đã nạp thành công ${recordsToSave.length} dòng!`);
            });
          } catch (error) {
            showNotification('Lỗi đọc file: ' + error.message);
          }
        };
        reader.readAsText(file, "UTF-8");
        e.target.value = '';
      };

      // AUTHENTICATION LOGIC
      const handleLogin = (e) => {
        e.preventDefault();
        if (loginForm.username === 'admin' && loginForm.password === adminPassword) {
          setIsLoggedIn(true);
          setShowLoginModal(false);
          setLoginForm({ username: '', password: '' });
          setLoginError('');
          showNotification('Đăng nhập thành công!');
        } else {
          setLoginError('Tài khoản hoặc mật khẩu không đúng!');
        }
      };

      const handleChangePassword = (e) => {
        e.preventDefault();
        if (changePassForm.current !== adminPassword) {
          setChangePassError('Mật khẩu hiện tại không chính xác!');
          return;
        }
        if (changePassForm.newPass !== changePassForm.confirm) {
          setChangePassError('Xác nhận mật khẩu mới không khớp!');
          return;
        }
        if (changePassForm.newPass.length < 6) {
          setChangePassError('Mật khẩu mới phải từ 6 ký tự!');
          return;
        }
        setAdminPassword(changePassForm.newPass);
        setShowChangePassModal(false);
        setChangePassForm({ current: '', newPass: '', confirm: '' });
        setChangePassError('');
        showNotification('Đổi mật khẩu thành công!');
      };

      const handleSendOTP = (e) => {
        e.preventDefault();
        if (recoveryPhone !== ADMIN_PHONE && recoveryPhone !== ADMIN_EMAIL) {
          setRecoveryError('Số điện thoại hoặc Email không khớp với thông tin đã đăng ký!');
          return;
        }
        setRecoveryError('');
        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setRealGeneratedOTP(randomOtp);
        showNotification(`Mã OTP gửi đến ${recoveryPhone} là: ${randomOtp}`);
        setForgotPassStep(2);
      };

      const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (recoveryOTP !== realGeneratedOTP) {
          setRecoveryError('Mã OTP không chính xác!');
          return;
        }
        setRecoveryError('');
        setForgotPassStep(3);
      };

      const handleResetPassword = (e) => {
        e.preventDefault();
        if (newRecoveryPass.length < 6) {
          setRecoveryError('Mật khẩu mới phải từ 6 ký tự!');
          return;
        }
        setAdminPassword(newRecoveryPass);
        setShowForgotPassModal(false);
        setForgotPassStep(1);
        setRecoveryPhone('');
        setRecoveryOTP('');
        setNewRecoveryPass('');
        showNotification('Đã đặt lại mật khẩu thành công! Vui lòng đăng nhập.');
      };

      // RECORD MODAL HANDLERS (CRUD)
      const openModal = (record = null, isDetail = false) => {
        if (record) {
          setEditingRecord({ ...record, _isDetail: isDetail });
          setFormData({ ...record });
        } else {
          setEditingRecord({ _isDetail: isDetail });
          setFormData({
            tinhMoi: 'Gia Lai', tinhCu: 'Gia Lai', huyen: '', xa: '', tenQh: '', dienTich: '', danSo: '',
            cqToChuc: '', cqPheDuyet: '', cqThamDinh: '', bcThamDinh: 'Đang cập nhật',
            yKienSxd: 'Đang cập nhật', qdPheDuyet: 'Đang cập nhật', congBo: 'Chưa công bố',
            camMoc: 'Chưa cắm mốc', keHoach: 'Đang cập nhật', file: '', mapLink: '',
            tinhHinhGuiHoSo: 'Chưa gửi', ghiChu: ''
          });
        }
        setIsModalOpen(true);
      };

      const handleSave = (e) => {
        e.preventDefault();
        const isDetail = editingRecord?._isDetail;
        const newRecord = { ...formData };
        delete newRecord._isDetail;

        if (editingRecord?.id) {
          if (isDetail) setDetailData(prev => prev.map(item => item.id === editingRecord.id ? newRecord : item));
          else setData(prev => prev.map(item => item.id === editingRecord.id ? newRecord : item));
        } else {
          newRecord.id = Date.now();
          if (isDetail) setDetailData(prev => [newRecord, ...prev]);
          else setData(prev => [newRecord, ...prev]);
        }
        setIsModalOpen(false);
        showNotification('Đã lưu hồ sơ thành công!');
      };

      const handleDelete = (id, isDetail = false) => {
        openConfirm('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa hồ sơ này?', () => {
          if (isDetail) setDetailData(prev => prev.filter(item => item.id !== id));
          else setData(prev => prev.filter(item => item.id !== id));
          closeConfirm();
          showNotification('Đã xóa hồ sơ.');
        });
      };

      const openMergeModal = (record = null) => {
        if (record) {
          setEditingMergeRecord(record);
          setMergeFormData({ ...record, cacXaCuStr: Array.isArray(record.cacXaCu) ? record.cacXaCu.join(', ') : record.cacXaCu });
        } else {
          setEditingMergeRecord(null);
          setMergeFormData({ tinhCu: 'Gia Lai', huyen: '', xaMoi: '', cacXaCuStr: '', canCu: 'Nghị quyết 1664/NQ-UBTVQH15' });
        }
        setIsMergeModalOpen(true);
      };

      const handleSaveMerge = (e) => {
        e.preventDefault();
        const newRecord = {
          ...mergeFormData,
          cacXaCu: mergeFormData.cacXaCuStr ? mergeFormData.cacXaCuStr.split(/[,;]/).map(s => s.trim()).filter(Boolean) : []
        };
        delete newRecord.cacXaCuStr;

        if (editingMergeRecord?.id) {
          setMergedData(prev => prev.map(item => item.id === editingMergeRecord.id ? newRecord : item));
        } else {
          newRecord.id = Date.now();
          setMergedData(prev => [newRecord, ...prev]);
        }
        setIsMergeModalOpen(false);
        showNotification('Đã lưu sáp nhập!');
      };

      const handleDeleteMerge = (id) => {
        openConfirm('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa dữ liệu sáp nhập này?', () => {
          setMergedData(prev => prev.filter(item => item.id !== id));
          closeConfirm();
          showNotification('Đã xóa sáp nhập.');
        });
      };

      const openContactModal = (record = null) => {
        if (record) {
          setEditingContactRecord(record);
          setContactFormData({ ...record });
        } else {
          setEditingContactRecord(null);
          setContactFormData({ donVi: '', hoTen: '', dienThoai: '', chucDanh: '', email: '' });
        }
        setIsContactModalOpen(true);
      };

      const handleSaveContact = (e) => {
        e.preventDefault();
        const newRecord = { ...contactFormData };
        if (editingContactRecord?.id) {
          setContactData(prev => prev.map(item => item.id === editingContactRecord.id ? newRecord : item));
        } else {
          newRecord.id = Date.now().toString();
          setContactData(prev => [newRecord, ...prev]);
        }
        setIsContactModalOpen(false);
        showNotification('Đã lưu danh bạ!');
      };

      const handleDeleteContact = (id) => {
        openConfirm('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa liên hệ này?', () => {
          setContactData(prev => prev.filter(item => item.id !== id));
          closeConfirm();
          showNotification('Đã xóa liên hệ.');
        });
      };

      const openReviewModal = (record = null) => {
        if (record) {
          setEditingReviewRecord(record);
          setReviewFormData({ ...record });
        } else {
          setEditingReviewRecord(null);
          setReviewFormData({ tinhCu: 'Gia Lai', huyen: '', noiDung: '', coQuan: '', trangThai: 'Chưa rà soát', file: '', ghiChu: '' });
        }
        setIsReviewModalOpen(true);
      };

      const handleSaveReview = (e) => {
        e.preventDefault();
        const newRecord = { ...reviewFormData };
        if (editingReviewRecord?.id) {
          setReviewData(prev => prev.map(item => item.id === editingReviewRecord.id ? newRecord : item));
        } else {
          newRecord.id = Date.now().toString();
          setReviewData(prev => [newRecord, ...prev]);
        }
        setIsReviewModalOpen(false);
        showNotification('Đã lưu rà soát!');
      };

      const handleDeleteReview = (id) => {
        openConfirm('Xác nhận xóa', 'Xóa dữ liệu rà soát này?', () => {
          setReviewData(prev => prev.filter(item => item.id !== id));
          closeConfirm();
          showNotification('Đã xóa rà soát.');
        });
      };

      // SMART REPORT GENERATION
      const openReportModal = (type) => {
        setReportModal({ isOpen: true, type });
        setReportFile(null);
        setReportProgress(0);
        setReportStatus('');
        setShowGeneratedReport(false);
      };

      const handleGenerateSmartReport = () => {
        if (!reportFile) return showNotification('Vui lòng tải lên file mẫu hoặc đề cương báo cáo (PDF/DOCX)!');
        setReportProgress(10);
        setReportStatus('Đang đọc cấu trúc file báo cáo...');
        setTimeout(() => { setReportProgress(35); setReportStatus('Đang nhận diện các trường dữ liệu trống...'); }, 1000);
        setTimeout(() => { setReportProgress(65); setReportStatus('Đang truy xuất CSDL Quy hoạch để tổng hợp số liệu...'); }, 2500);
        setTimeout(() => { setReportProgress(90); setReportStatus('Đang điền số liệu và định dạng lại văn bản...'); }, 4000);
        setTimeout(() => {
          setReportProgress(100);
          setReportStatus('Hoàn tất!');
          setTimeout(() => setShowGeneratedReport(true), 500);
        }, 5000);
      };

      // FILTERED DATASETS
      const filteredData = useMemo(() => {
        return data.filter(item => {
          const matchSearch = (item.tenQh || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (item.xa || '').toLowerCase().includes(searchTerm.toLowerCase());
          const matchHuyen = filterHuyen === '' ? true : item.huyen === filterHuyen;
          const isPheDuyet = item.qdPheDuyet && item.qdPheDuyet !== 'Đang cập nhật' && item.qdPheDuyet !== 'Đang trình duyệt' && item.qdPheDuyet.trim() !== '';
          const matchTinhTrang = filterTinhTrang === '' ? true : filterTinhTrang === 'Đã phê duyệt' ? isPheDuyet : !isPheDuyet;
          const matchThamQuyen = filterThamQuyen === '' ? true : (item.cqPheDuyet || '').toLowerCase().includes(filterThamQuyen.toLowerCase());
          
          const isCongBo = (item.congBo || '').toLowerCase().includes('đã');
          const matchCongBo = filterCongBo === '' ? true : filterCongBo === 'Đã công bố' ? isCongBo : !isCongBo;
          
          const isCamMoc = (item.camMoc || '').toLowerCase().includes('đã');
          const matchCamMoc = filterCamMoc === '' ? true : filterCamMoc === 'Đã cắm mốc' ? isCamMoc : !isCamMoc;

          const isKeHoach = (item.keHoach || '').toLowerCase().includes('đã');
          const matchKeHoach = filterKeHoach === '' ? true : filterKeHoach === 'Đã ban hành' ? isKeHoach : !isKeHoach;

          const isGuiSXD = (item.tinhHinhGuiHoSo || '').toLowerCase().includes('đã');
          const matchGuiSXD = filterGuiSXD === '' ? true : filterGuiSXD === 'Đã gửi' ? isGuiSXD : !isGuiSXD;

          return matchSearch && matchHuyen && matchTinhTrang && matchThamQuyen && matchCongBo && matchCamMoc && matchKeHoach && matchGuiSXD;
        });
      }, [data, searchTerm, filterHuyen, filterTinhTrang, filterThamQuyen, filterCongBo, filterCamMoc, filterKeHoach, filterGuiSXD]);

      const filteredDetailData = useMemo(() => {
        return detailData.filter(item => {
          const matchSearch = (item.xa || '').toLowerCase().includes(detailSearchTerm.toLowerCase()) || 
                              (item.tenQh || '').toLowerCase().includes(detailSearchTerm.toLowerCase());
          const matchHuyen = detailFilterHuyen === '' ? true : item.huyen === detailFilterHuyen;
          const matchXa = detailFilterXa === '' ? true : item.xa === detailFilterXa;
          const isPheDuyet = item.qdPheDuyet && item.qdPheDuyet !== 'Đang cập nhật' && item.qdPheDuyet.trim() !== '';
          const matchTinhTrang = detailFilterTinhTrang === '' ? true : detailFilterTinhTrang === 'Đã phê duyệt' ? isPheDuyet : !isPheDuyet;

          const isCongBo = (item.congBo || '').toLowerCase().includes('đã');
          const matchCongBo = detailFilterCongBo === '' ? true : detailFilterCongBo === 'Đã công bố' ? isCongBo : !isCongBo;
          
          const isCamMoc = (item.camMoc || '').toLowerCase().includes('đã');
          const matchCamMoc = detailFilterCamMoc === '' ? true : detailFilterCamMoc === 'Đã cắm mốc' ? isCamMoc : !isCamMoc;

          const isGuiSXD = (item.tinhHinhGuiHoSo || '').toLowerCase().includes('đã');
          const matchGuiSXD = detailFilterGuiSXD === '' ? true : detailFilterGuiSXD === 'Đã gửi' ? isGuiSXD : !isGuiSXD;

          return matchSearch && matchHuyen && matchXa && matchTinhTrang && matchCongBo && matchCamMoc && matchGuiSXD;
        });
      }, [detailData, detailSearchTerm, detailFilterHuyen, detailFilterXa, detailFilterTinhTrang, detailFilterCongBo, detailFilterCamMoc, detailFilterGuiSXD]);

      const filteredMergeData = useMemo(() => {
        return mergedData.filter(item => {
          return (mergeFilterHuyen === '' || item.huyen === mergeFilterHuyen) &&
                 (mergeFilterXa === '' || item.xaMoi === mergeFilterXa);
        });
      }, [mergedData, mergeFilterHuyen, mergeFilterXa]);

      const filteredContactData = useMemo(() => {
        return contactData.filter(item => {
          const matchSearch = (item.hoTen || '').toLowerCase().includes(contactSearchTerm.toLowerCase()) || 
                              (item.dienThoai || '').includes(contactSearchTerm) || 
                              (item.chucDanh || '').toLowerCase().includes(contactSearchTerm.toLowerCase());
          const matchHuyen = contactFilterHuyen === '' ? true : (item.donVi || '').includes(contactFilterHuyen);
          return matchSearch && matchHuyen;
        });
      }, [contactData, contactSearchTerm, contactFilterHuyen]);

      const filteredReviewData = useMemo(() => {
        return reviewData.filter(item => {
          const matchSearch = (item.noiDung || '').toLowerCase().includes(reviewSearchTerm.toLowerCase()) || 
                              (item.coQuan || '').toLowerCase().includes(reviewSearchTerm.toLowerCase());
          const matchHuyen = reviewFilterHuyen === '' ? true : item.huyen === reviewFilterHuyen;
          const matchStatus = reviewFilterStatus === '' ? true : item.trangThai === reviewFilterStatus;
          return matchSearch && matchHuyen && matchStatus;
        });
      }, [reviewData, reviewSearchTerm, reviewFilterHuyen, reviewFilterStatus]);

      return (
        <div className="h-screen w-full bg-slate-100 font-sans text-slate-800 flex flex-col overflow-hidden relative">
          {/* NOTIFICATION TOAST */}
          {notification && (
            <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 z-">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium text-sm">{notification}</span>
            </div>
          )}

          {/* HEADER */}
          <header className="bg-blue-800 text-white p-4 shadow-md z-40 shrink-0">
            <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg"><MapPin className="text-blue-800 h-6 w-6" /></div>
                <div>
                  <h1 className="text-xl font-bold uppercase tracking-wide">CSDL QUY HOẠCH GIA LAI</h1>
                  <p className="text-blue-200 text-sm">Hệ thống quản lý quy hoạch & tra cứu sáp nhập ĐVHC</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 border-blue-700 pt-3 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold mb-0.5">Tác giả thực hiện</p>
                  <p className="text-sm font-bold text-white">Phòng Quy hoạch kiến trúc và Phát triển đô thị - Sở Xây dựng Gia Lai</p>
                  <p className="text-xs text-emerald-300 mt-1 flex items-center md:justify-end gap-1 font-medium"><Clock className="h-3.5 w-3.5" /> Giai đoạn cập nhật: Từ 01/7/2025</p>
                </div>
                <div className="border-l border-blue-600 pl-5 flex items-center">
                  {isLoggedIn ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-sm font-bold text-white flex items-center gap-1.5"><User className="w-4 h-4 text-emerald-400"/> Admin</span>
                      <div className="flex gap-2">
                        <button onClick={() => setShowDbModal(true)} className="text-xs bg-indigo-500/20 hover:bg-indigo-500 text-indigo-100 hover:text-white border border-indigo-500/50 px-2 py-1 rounded transition-colors flex items-center gap-1 font-medium"><Database className="w-3 h-3"/> Quản lý CSDL</button>
                        <button onClick={() => setShowChangePassModal(true)} className="text-xs bg-amber-500/20 hover:bg-amber-500 text-amber-100 hover:text-white border border-amber-500/50 px-2 py-1 rounded transition-colors flex items-center gap-1 font-medium"><Key className="w-3 h-3"/> Đổi MK</button>
                        <button onClick={() => setIsLoggedIn(false)} className="text-xs bg-red-500/20 hover:bg-red-500 text-red-100 hover:text-white border border-red-500/50 px-2 py-1 rounded transition-colors flex items-center gap-1 font-medium"><LogOut className="w-3 h-3"/> Đăng xuất</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setShowLoginModal(true)} className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm flex items-center gap-1.5"><LogIn className="w-4 h-4"/> Đăng nhập</button>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* TABS NAVIGATION */}
          <div className="bg-white border-b border-slate-200 px-4 md:px-6 pt-4 flex gap-4 overflow-x-auto custom-scrollbar shrink-0">
            <button onClick={() => setActiveTab('STATS_CHUNG')} className={`pb-3 px-2 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'STATS_CHUNG' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-emerald-600'}`}><PieChart className="h-5 w-5" /> THỐNG KÊ QUY HOẠCH CHUNG</button>
            <button onClick={() => setActiveTab('STATS_CHITIET')} className={`pb-3 px-2 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'STATS_CHITIET' ? 'border-purple-500 text-purple-600' : 'border-transparent text-slate-500 hover:text-purple-600'}`}><BarChart className="h-5 w-5" /> THỐNG KÊ QUY HOẠCH CHI TIẾT</button>
            <button onClick={() => setActiveTab('MAIN')} className={`pb-3 px-2 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'MAIN' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-blue-600'}`}><ListFilter className="h-5 w-5" /> BẢNG THEO DÕI QUY HOẠCH CHUNG</button>
            <button onClick={() => setActiveTab('REVIEW')} className={`pb-3 px-2 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'REVIEW' ? 'border-rose-500 text-rose-600' : 'border-transparent text-slate-500 hover:text-rose-600'}`}><ClipboardCheck className="h-5 w-5" /> RÀ SOÁT ĐỊNH HƯỚNG PHÁT TRIỂN CỤM HUYỆN CŨ</button>
            <button onClick={() => setActiveTab('MAIN_CHITIET')} className={`pb-3 px-2 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'MAIN_CHITIET' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'}`}><Layout className="h-5 w-5" /> BẢNG THEO DÕI QUY HOẠCH CHI TIẾT</button>
            <button onClick={() => setActiveTab('MERGE')} className={`pb-3 px-2 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'MERGE' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-amber-600'}`}><Layers className="h-5 w-5" /> TRA CỨU SÁP NHẬP ĐVHC</button>
            <button onClick={() => setActiveTab('CONTACTS')} className={`pb-3 px-2 font-bold text-sm md:text-base border-b-4 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'CONTACTS' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-slate-500 hover:text-cyan-600'}`}><User className="h-5 w-5" /> ĐẦU MỐI LIÊN HỆ CÁC XÃ/PHƯỜNG</button>
          </div>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 p-4 md:p-6 min-h-0 flex flex-col overflow-hidden">
            {/* TAB 1: THỐNG KÊ QUY HOẠCH CHUNG */}
            {activeTab === 'STATS_CHUNG' && (
              <div className="flex flex-col flex-1 min-h-0 gap-6 overflow-y-auto custom-scrollbar pr-2 pb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center shrink-0">
                  <div><h2 className="text-xl font-bold text-slate-800 uppercase">Thống kê tiến độ quy hoạch chung ĐT & NT</h2><p className="text-slate-500 text-sm mt-1">Cập nhật theo Kế hoạch 159/KH-UBND</p></div>
                  <button onClick={() => openReportModal('CHUNG')} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200 font-medium text-sm hover:bg-emerald-100 shadow-sm"><FileText className="h-4 w-4" /> Xuất Báo Cáo Thông Minh</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 border-b-4 border-b-blue-500"><div className="p-4 bg-blue-50 rounded-full text-blue-600"><Layers className="h-8 w-8" /></div><div><p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Tổng số ĐVHC</p><p className="text-3xl font-bold text-slate-800">{statsOverview.total}</p></div></div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 border-b-4 border-b-emerald-500"><div className="p-4 bg-emerald-50 rounded-full text-emerald-600"><CheckCircle className="h-8 w-8" /></div><div><p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Đã phê duyệt</p><div className="flex items-baseline gap-2"><p className="text-3xl font-bold text-slate-800">{statsOverview.approved}</p><span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 rounded-full">{statsOverview.approvedPercent}%</span></div></div></div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 border-b-4 border-b-amber-500"><div className="p-4 bg-amber-50 rounded-full text-amber-600"><Clock className="h-8 w-8" /></div><div><p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Đang triển khai</p><div className="flex items-baseline gap-2"><p className="text-3xl font-bold text-slate-800">{statsOverview.pending}</p><span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 rounded-full">{statsOverview.pendingPercent}%</span></div></div></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shrink-0 mt-2">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                    <h3 className="font-bold text-slate-700 w-full text-left mb-8 uppercase flex items-center gap-2"><PieChart className="h-5 w-5 text-blue-600" /> Tỷ lệ hoàn thành quy hoạch</h3>
                    <div className="relative w-56 h-56">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path className="text-amber-400" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-emerald-500" strokeDasharray={`${statsOverview.approvedPercent}, 100`} strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-slate-800">{statsOverview.approvedPercent}%</span>
                        <span className="text-sm font-medium text-slate-500">Đã phê duyệt</span>
                      </div>
                    </div>
                    <div className="flex w-full justify-center gap-8 mt-10">
                      <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-emerald-500"></span><span className="text-sm font-medium text-slate-700">Đã phê duyệt ({statsOverview.approved})</span></div>
                      <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-amber-400"></span><span className="text-sm font-medium text-slate-700">Đang triển khai ({statsOverview.pending})</span></div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 className="font-bold text-slate-700 w-full text-left mb-6 uppercase flex items-center gap-2"><ListFilter className="h-5 w-5 text-blue-600" /> Chi tiết phân bổ tiến độ</h3>
                    <div className="space-y-6 flex-1 mt-4">
                      <div>
                        <div className="flex justify-between items-center mb-3"><span className="text-base font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">Nhóm Đã Phê Duyệt</span><span className="font-bold text-slate-800">{statsOverview.approved} đơn vị</span></div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${statsOverview.approvedPercent}%` }}></div></div>
                      </div>
                      <div className="mt-8">
                        <div className="flex justify-between items-center mb-3"><span className="text-base font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-md">Nhóm Đang Triển Khai</span><span className="font-bold text-slate-800">{statsOverview.pending} đơn vị</span></div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="h-full bg-amber-400 rounded-full" style={{ width: `${statsOverview.pendingPercent}%` }}></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: THỐNG KÊ QUY HOẠCH CHI TIẾT */}
            {activeTab === 'STATS_CHITIET' && (
              <div className="flex flex-col flex-1 min-h-0 gap-6 overflow-y-auto custom-scrollbar pr-2 pb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center shrink-0">
                  <div><h2 className="text-xl font-bold text-slate-800 uppercase flex items-center gap-2"><BarChart className="h-6 w-6 text-purple-600" /> Thống kê quy hoạch chi tiết theo Huyện/Thị xã</h2></div>
                  <button onClick={() => openReportModal('CHITIET')} className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-200 font-medium text-sm hover:bg-purple-100 shadow-sm"><FileText className="h-4 w-4" /> Xuất Báo Cáo Thông Minh</button>
                </div>
                {['Bình Định', 'Gia Lai'].map(khuVuc => (
                  <div key={khuVuc} className="mb-4 shrink-0">
                    <h3 className="text-lg font-bold text-slate-700 mb-4 pl-2 border-l-4 border-purple-500 uppercase">Khu vực Tỉnh {khuVuc} (Cũ)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {detailedStats[khuVuc].map((dist, idx) => {
                        const percent = dist.total > 0 ? Math.round((dist.approved / dist.total) * 100) : 0;
                        return (
                          <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex justify-between items-start mb-4"><h4 className="font-bold text-slate-800">{dist.name}</h4><span className="bg-slate-100 px-2.5 py-1 rounded-full text-xs font-bold">{dist.total} đơn vị</span></div>
                            <div className="flex justify-between text-sm font-medium mb-2"><span className="text-emerald-600">Duyệt: {dist.approved}</span><span className="text-amber-600">Đang lập: {dist.pending}</span></div>
                            <div className="w-full bg-slate-100 h-2.5 rounded-full"><div className="h-full rounded-full bg-purple-500" style={{ width: `${percent}%` }}></div></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: BẢNG THEO DÕI QUY HOẠCH CHUNG */}
            {activeTab === 'MAIN' && (
              <div className="flex flex-col flex-1 min-h-0 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4 shrink-0 border border-slate-200">
                  <div className="flex flex-col xl:flex-row justify-between gap-4">
                    <div className="flex flex-wrap flex-1 gap-3">
                      <div className="relative w-full md:w-48"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-4 w-4 text-slate-400" /></div><input type="text" className="block w-full pl-9 pr-3 py-2 border rounded-lg text-sm" placeholder="Tìm xã, tên QH..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                      <select className="w-full md:w-40 py-2 px-3 border rounded-lg text-sm font-medium" value={filterHuyen} onChange={(e) => setFilterHuyen(e.target.value)}><option value="">- Tất cả Huyện -</option>{OLD_REGIONS.flatMap(p => p.districts).map(d => <option key={d.name} value={d.name}>{d.name}</option>)}</select>
                      <select className="w-full md:w-36 py-2 px-3 border rounded-lg text-sm font-medium" value={filterTinhTrang} onChange={(e) => setFilterTinhTrang(e.target.value)}><option value="">- Tình trạng phê duyệt -</option><option value="Đã phê duyệt">Đã phê duyệt</option><option value="Chưa phê duyệt">Chưa phê duyệt</option></select>
                      <select className="w-full md:w-36 py-2 px-3 border rounded-lg text-sm font-medium" value={filterThamQuyen} onChange={(e) => setFilterThamQuyen(e.target.value)}><option value="">- Thẩm quyền phê duyệt -</option><option value="UBND tỉnh">UBND tỉnh</option><option value="UBND xã">UBND xã/phường</option></select>
                      <select className="w-full md:w-36 py-2 px-3 border rounded-lg text-sm font-medium" value={filterCongBo} onChange={(e) => setFilterCongBo(e.target.value)}><option value="">- Tình trạng công bố -</option><option value="Đã công bố">Đã công bố</option><option value="Chưa công bố">Chưa công bố</option></select>
                      <select className="w-full md:w-36 py-2 px-3 border rounded-lg text-sm font-medium" value={filterCamMoc} onChange={(e) => setFilterCamMoc(e.target.value)}><option value="">- Tình trạng cắm mốc -</option><option value="Đã cắm mốc">Đã cắm mốc</option><option value="Chưa cắm mốc">Chưa cắm mốc</option></select>
                      <select className="w-full md:w-36 py-2 px-3 border rounded-lg text-sm font-medium" value={filterKeHoach} onChange={(e) => setFilterKeHoach(e.target.value)}><option value="">- Kế hoạch thực hiện -</option><option value="Đã ban hành">Đã ban hành KH</option><option value="Chưa ban hành">Chưa ban hành</option></select>
                      <select className="w-full md:w-36 py-2 px-3 border rounded-lg text-sm font-medium" value={filterGuiSXD} onChange={(e) => setFilterGuiSXD(e.target.value)}><option value="">- Gửi hồ sơ về SXD -</option><option value="Đã gửi">Đã gửi Sở XD</option><option value="Chưa gửi">Chưa gửi Sở XD</option></select>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleExportExcel(filteredData, 'DS_QuyHoachChung', false)} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border font-medium text-sm hover:bg-emerald-100"><Download className="h-4 w-4" /> Xuất Excel</button>
                      {isLoggedIn && (<button onClick={() => openModal(null, false)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700"><Plus className="h-4 w-4" /> Thêm hồ sơ</button>)}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border flex-1 min-h-0 flex flex-col relative">
                  <div className="p-3 border-b bg-slate-50 flex justify-between items-center"><h2 className="font-bold text-blue-900">DANH SÁCH TIẾN ĐỘ LẬP QUY HOẠCH CHUNG ĐT & NT</h2><span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Hiển thị: {filteredData.length} / {data.length}</span></div>
                  <div className="overflow-auto flex-1 custom-scrollbar pb-2">
                    <table className="w-max min-w-full divide-y border-collapse">
                      <thead className="bg-slate-100 sticky top-0 z-10"><tr>{COLUMNS.map((col) => <th key={col.key} className={`px-3 py-3 text-left text-xs font-bold text-slate-700 uppercase border-x bg-slate-200/90 ${col.width}`}>{col.label}</th>)}{isLoggedIn && <th className="px-3 py-3 text-center text-xs font-bold text-slate-700 uppercase border-x bg-slate-200 sticky right-0 z-20 w-20">Thao tác</th>}</tr></thead>
                      <tbody className="bg-white divide-y">
                        {filteredData.map((row, index) => (
                          <tr key={row.id} className="hover:bg-blue-50/60 group">
                            <td className="px-3 py-2 text-center text-sm border-x">{index + 1}</td>
                            {COLUMNS.slice(1).map(col => (
                              <td key={`${row.id}-${col.key}`} className={`px-3 py-2 text-sm border-x align-middle whitespace-normal break-words ${col.width}`}>
                                {col.key === 'tenQh' ? (<div className="font-semibold text-blue-900">{row[col.key]}</div>) 
                                : col.key === 'file' && row[col.key] ? (<a href={row[col.key].startsWith('http') ? row[col.key] : `https://${row[col.key]}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded border hover:bg-blue-100 transition-colors font-medium"><Download className="h-3 w-3 mr-1" /> Tải về</a>)
                                : col.key === 'mapLink' && row[col.key] ? (<a href={row[col.key].startsWith('http') ? row[col.key] : `https://${row[col.key]}`} target="_blank" rel="noopener noreferrer" className="inline-flex text-emerald-600 bg-emerald-50 px-2 py-1 rounded border hover:bg-emerald-100 font-medium transition-colors"><MapPin className="h-3 w-3 mr-1 mt-0.5" /> Map</a>)
                                : col.key === 'qdPheDuyet' ? (<div className={row[col.key] && row[col.key] !== 'Đang cập nhật' && row[col.key] !== 'Đang trình duyệt' ? 'font-bold text-emerald-600' : 'text-slate-400 italic'}>{row[col.key]}</div>)
                                : (<div className={!row[col.key] || row[col.key]==='Đang cập nhật' ? 'text-slate-400 italic' : ''}>{row[col.key] || '---'}</div>)}
                              </td>
                            ))}
                            {isLoggedIn && (
                              <td className="px-2 py-2 text-center border-x bg-white group-hover:bg-blue-50/60 sticky right-0 z-10 shadow-[-4px_0_10px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-center gap-1"><button onClick={() => openModal(row, false)} className="p-1.5 text-blue-600 hover:bg-blue-200 rounded"><Edit2 className="h-4 w-4" /></button><button onClick={() => handleDelete(row.id, false)} className="p-1.5 text-red-600 hover:bg-red-200 rounded"><Trash2 className="h-4 w-4" /></button></div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BẢNG RÀ SOÁT CỤM HUYỆN CŨ */}
            {activeTab === 'REVIEW' && (
              <div className="flex flex-col flex-1 min-h-0 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4 border shrink-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-4 w-4 text-slate-400" /></div><input type="text" className="block w-full pl-9 pr-3 py-2 border rounded-lg text-sm" placeholder="Tìm nội dung..." value={reviewSearchTerm} onChange={(e) => setReviewSearchTerm(e.target.value)} /></div>
                    <select className="w-full md:w-56 py-2 px-3 border rounded-lg text-sm font-medium" value={reviewFilterHuyen} onChange={(e) => setReviewFilterHuyen(e.target.value)}><option value="">- Huyện/Thị xã cũ -</option>{[...new Set(OLD_REGIONS.flatMap(p => p.districts.map(d => d.name)))].map(h => <option key={h} value={h}>{h}</option>)}</select>
                    <select className="w-full md:w-48 py-2 px-3 border rounded-lg text-sm font-medium" value={reviewFilterStatus} onChange={(e) => setReviewFilterStatus(e.target.value)}><option value="">- Trạng thái rà soát -</option><option value="Đã hoàn thành">Đã hoàn thành</option><option value="Đang rà soát">Đang rà soát</option><option value="Chưa rà soát">Chưa rà soát</option></select>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={handleExportReviewExcel} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border font-medium text-sm hover:bg-emerald-100"><Download className="h-4 w-4" /> Xuất Excel</button>
                      {isLoggedIn && (<button onClick={() => openReviewModal()} className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-rose-700"><Plus className="h-4 w-4" /> Thêm dữ liệu</button>)}
                    </div>
