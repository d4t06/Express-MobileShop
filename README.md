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