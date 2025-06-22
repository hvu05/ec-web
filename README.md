# 🛒 E-Commerce Website - Tính năng chính

Dưới đây là các chức năng chính của website bán hàng, được chia thành hai luồng người dùng chính: **Người dùng (User)** và **Quản trị viên (Admin)**.

---
# 🛍️ EC-WEB – Dự án Website Thương Mại Điện Tử

Đây là frontend (ReactJS) của một hệ thống thương mại điện tử đơn giản, sử dụng React, Redux Toolkit, Axios, SCSS và Ant Design. Backend có thể chạy với Spring Boot và MySQL.

---

## 🚀 Tính năng chính

- Đăng nhập / Đăng ký người dùng
- Danh sách sản phẩm, chi tiết sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Giao diện đẹp mắt với Ant Design + SCSS
- Kết nối API thông qua Axios

---

## 📦 Công nghệ sử dụng

- React 18
- Redux Toolkit
- React Router v7
- Axios
- Ant Design 5
- SCSS (SASS)
- React Loading Skeleton

---

## ⚙️ Yêu cầu cài đặt

- Node.js >= 18.x
- npm >= 9.x
- (Tuỳ chọn) Docker nếu dùng backend với MySQL
(Nếu chưa có Nodejs thì cài Nodejs và npm)
---

## 📥 Cài đặt dự án

```bash
# Clone dự án
git clone 
cd ec-web

# Cài đặt thư viện
npm install

# Chạy chương trình
npm start
```

## 👤 Người dùng (User Flow)

### 1. Trang chủ
- Hiển thị danh sách sản phẩm nổi bật, banner quảng cáo.
- Có thể click vào sản phẩm để xem chi tiết.

### 2. Xem chi tiết sản phẩm
- Hiển thị thông tin chi tiết sản phẩm: hình ảnh, mô tả, giá, tình trạng còn hàng.

### 3. Tìm kiếm và lọc sản phẩm
- Tìm kiếm theo tên sản phẩm.
- Lọc theo danh mục, giá, thương hiệu...

### 4. Thêm vào giỏ hàng
- Chọn số lượng sản phẩm và thêm vào giỏ.
- Giỏ hàng hiển thị các mặt hàng đã chọn.

### 5. Thanh toán (Checkout)
- Nhập thông tin giao hàng, chọn phương thức thanh toán.
- Xác nhận đơn hàng.

### 6. Đăng nhập / Đăng ký                                {{{XONG}}}
- Người dùng có thể tạo tài khoản hoặc đăng nhập.
- Hỗ trợ xác thực tài khoản.

### 7. Theo dõi đơn hàng
- Xem lịch sử đơn hàng, trạng thái vận chuyển.

### 8. Hồ sơ người dùng
- Cập nhật thông tin cá nhân, mật khẩu.
- Quản lý địa chỉ giao hàng.

---

## 🛠️ Quản trị viên (Admin Flow)

### 1. Quản lý sản phẩm
- Thêm, sửa, xoá sản phẩm.
- Quản lý hình ảnh, mô tả, giá và danh mục.

### 2. Quản lý đơn hàng
- Xem danh sách đơn hàng.
- Cập nhật trạng thái đơn hàng (đang xử lý, đã giao, huỷ...).

### 3. Quản lý người dùng
- Xem danh sách người dùng.
- Phân quyền (user/admin), khoá tài khoản nếu cần.

---

### 4. Cấu trúc thư mục của dự án
```
e-commerce-web/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/               # Hình ảnh, icon, font, v.v.
│   ├── components/           # Các component tái sử dụng (Button, Header, Footer)
│   ├── layouts/              # Layouts chính (MainLayout, AdminLayout)
│   ├── pages/                # Trang chính (Home, ProductDetail, Cart, Checkout)
│   ├── routes/               # Định tuyến cho toàn bộ app
│   ├── services/             # API calls (axios, fetch)
│   ├── redux/                # State management (slice, store)
│   │   ├── slices/
│   │   └── store.js
│   ├── utils/                # Hàm tiện ích (format date, validate, v.v.)
│   ├── constants/            # Các hằng số dùng chung (routes, category types,...)
│   ├── App.js
│   ├── index.js
│   └── styles/               # SCSS hoặc CSS modules
│       └── global.scss
│
├── .env                     
├── .gitignore
├── package.json
├── README.md
```

## Chi tiết công việc

# Thứ 4 (18/06)
Install các package, dựng layout chung, viết Hooks Fetch API

# Thứ 5 (19/06)
Làm Menu, tạo trang đăng nhập, đăng ký, tạo Fake API với json-server

# Thứ 6 (20/06)
- Tạo trang chủ (Home): ProductList; dựng giao diện giỏ hàng; tạo Redux đếm số lượng trong giỏ hàng
- FIX: fix thêm tính năng ẩn mật khẩu ở trang đăng nhập

# Thứ 7 (21/06)
- Tạo giao diện page giỏ hàng
- Cài đặt để chạy BackEnd (Docker, MySQL)
- Hoàn thiện tính năng đăng ký, đăng nhập
- Push dự án bên FE lên Github