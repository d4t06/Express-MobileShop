# nodejs_mongoDB
Hi! Nguyen Huu Dat
Have a nice day

Create -> POST
Read -> GET
Update -> PUT, PATCH
Delete -> DELETE

### update thứ 3 ngày 31/1/2023
- find: không có thì vẫn trả về kết quả (nếu convert sang bolean thì vân là true)
- findOne: không có thì vẫn trả về null

### update thứ 5 16/3/2023
- Thêm sameSite:"none", secure: true cho cookie
- Thêm admin route, admin controller
- sign username và role_code vào token
- Chỉ trả về token khi đăng nhập và refresh token
- Fix can't set header... là do không return trong try catch

### update thứ 3 28/3/2023
- dùng mongoose virtual and poppulate để lấy dữ liệu giữa hai bảng

### update thứ 4 19/4/2023
- Trả về thêm page_size

### update thứ 7 27/5/2023
- Thêm admin controller
- Chức năng upload ảnh dùng multer
- Thêm image model
