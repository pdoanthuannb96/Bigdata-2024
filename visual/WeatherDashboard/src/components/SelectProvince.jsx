import React from "react";
import { ConfigProvider, Select } from "antd";

const provinces = [
  { label: "Cả nước", value: "all" },
  { label: "An Giang", value: "AnGiang" },
  { label: "Bà Rịa - Vũng Tàu", value: "BaRiaVungTau" },
  { label: "Bạc Liêu", value: "BacLieu" },
  { label: "Bắc Giang", value: "BacGiang" },
  { label: "Bắc Kạn", value: "BacKan" },
  { label: "Bắc Ninh", value: "BacNinh" },
  { label: "Bến Tre", value: "BenTre" },
  { label: "Bình Dương", value: "BinhDuong" },
  { label: "Bình Định", value: "BinhDinh" },
  { label: "Bình Phước", value: "BinhPhuoc" },
  { label: "Bình Thuận", value: "BinhThuan" },
  { label: "Cà Mau", value: "CaMau" },
  { label: "Cần Thơ", value: "CanTho" },
  { label: "Cao Bằng", value: "CaoBang" },
  { label: "Đà Nẵng", value: "DaNang" },
  { label: "Đắk Lắk", value: "DakLak" },
  { label: "Đắk Nông", value: "DakNong" },
  { label: "Điện Biên", value: "DienBien" },
  { label: "Đồng Nai", value: "DongNai" },
  { label: "Đồng Tháp", value: "DongThap" },
  { label: "Gia Lai", value: "GiaLai" },
  { label: "Hà Giang", value: "HaGiang" },
  { label: "Hà Nam", value: "HaNam" },
  { label: "Hà Nội", value: "HaNoi" },
  { label: "Hà Tĩnh", value: "HaTinh" },
  { label: "Hải Dương", value: "HaiDuong" },
  { label: "Hải Phòng", value: "HaiPhong" },
  { label: "Hậu Giang", value: "HauGiang" },
  { label: "Hòa Bình", value: "HoaBinh" },
  { label: "Hưng Yên", value: "HungYen" },
  { label: "Khánh Hòa", value: "KhanhHoa" },
  { label: "Kiên Giang", value: "KienGiang" },
  { label: "Kon Tum", value: "KonTum" },
  { label: "Lai Châu", value: "LaiChau" },
  { label: "Lâm Đồng", value: "LamDong" },
  { label: "Lạng Sơn", value: "LangSon" },
  { label: "Lào Cai", value: "LaoCai" },
  { label: "Long An", value: "LongAn" },
  { label: "Nam Định", value: "NamDinh" },
  { label: "Nghệ An", value: "NgheAn" },
  { label: "Ninh Bình", value: "NinhBinh" },
  { label: "Ninh Thuận", value: "NinhThuan" },
  { label: "Phú Thọ", value: "PhuTho" },
  { label: "Phú Yên", value: "PhuYen" },
  { label: "Quảng Bình", value: "QuangBinh" },
  { label: "Quảng Nam", value: "QuangNam" },
  { label: "Quảng Ngãi", value: "QuangNgai" },
  { label: "Quảng Ninh", value: "QuangNinh" },
  { label: "Quảng Trị", value: "QuangTri" },
  { label: "Sóc Trăng", value: "SocTrang" },
  { label: "Sơn La", value: "SonLa" },
  { label: "Tây Ninh", value: "TayNinh" },
  { label: "Thái Bình", value: "ThaiBinh" },
  { label: "Thái Nguyên", value: "ThaiNguyen" },
  { label: "Thanh Hóa", value: "ThanhHoa" },
  { label: "Thừa Thiên Huế", value: "ThuaThienHue" },
  { label: "Tiền Giang", value: "TienGiang" },
  { label: "TP Hồ Chí Minh", value: "TPHoChiMinh" },
  { label: "Trà Vinh", value: "TraVinh" },
  { label: "Tuyên Quang", value: "TuyenQuang" },
  { label: "Vĩnh Long", value: "VinhLong" },
  { label: "Vĩnh Phúc", value: "VinhPhuc" },
  { label: "Yên Bái", value: "YenBai" },
];

const SelectProvince = ({ onChange, province }) => (
  <div style={{ backgroundColor: "#ffffff", width: "fit-content" }}>
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionFontSize: "18px",
          },
        },
      }}
    >
      <Select
        value={province}
        placeholder="Chọn tỉnh"
        options={provinces}
        onChange={onChange}
        size="large" // Config từ Ant Design
        style={{ width: 200 }}
      />
    </ConfigProvider>
  </div>
);

export default SelectProvince;
