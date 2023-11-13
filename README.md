# Landing page Business Analysis(BA)

## 1. Địa chỉ dự kiến:

- 

## 2. Cấu trúc thư mục:

```bash
└── landing-ba

  └── dist //thư mục chứa file production (minified, cache bursted)
    └── assets // Chứa js và css
    └── img // Chứa img
    └── index.html

  └── src //thư mục chứa file development (file gốc, làm việc tại đây, sẽ build ra production tại /dist)
    └── assets
      └── css
      └── js
    └── public
      └── img
    └── index.html
  └── Vite.config.js //cấu hình chung cho production và development mode của Vite
```

## 3. Lần đầu clone project:

- Tải node modules: chạy lệnh sau tại thư mục landing-ba

```bash
npm install #hoặc
yarn install
```

## 4. Quy trình phát triển

- Dev sẽ có 2 bước: A. Development mode -> B. Production mode

A. Development mode //chỉnh sửa, update thêm xóa,...

B. Production mode //build ra file thành phẩm sau khi đã sửa

### A. Development mode:

- Bắt đầu chế độ development: chạy lệnh sau tại thư mục landing-ba

```bash
npm run dev
yarn dev
```

- Development mode sẽ tạo ra 1 dev server tại http://127.0.0.1:5173/, chỉnh sửa file sẽ update live tại đây
- Làm việc với các file tại folder landing-ba/src
- Sau khi hoàn thành, bấm Ctrl + C để tắt server dev. Chuyển sang Production mode

### B. Production mode:

- Bắt đầu chế độ production: chạy lệnh sau tại thư mục landing-ba

```bash
npm run build #hoặc
yarn build

# tiếp theo chạy build
npm preview #hoặc
yarn preview
```

- Production mode sẽ tạo ra 1 product server tại http://127.0.0.1:4173/, view product tại đây.

- Sau khi chạy xong, Vite sẽ build ra các file thành phẩm tại landing-ba/dist
- Deploy bằng landing-ba/dist
- Nếu chỉnh sửa tiếp, quay về bước A. Development mode# landing-ba
