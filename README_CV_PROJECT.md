# CV Export Project - Frontend

Frontend cho ứng dụng CV Export sử dụng Angular 19.

## Cấu trúc Folder

```
src/app/
├── features/
│   ├── auth/
│   │   └── register/
│   │       ├── register.component.ts
│   │       ├── register.component.html
│   │       ├── register.component.css
│   │       └── register.component.spec.ts
│   └── cv-export/          # Folder dành cho tính năng xuất CV
├── shared/
│   ├── services/
│   │   └── user.service.ts  # Service xử lý API gọi
│   └── models/
│       └── user.model.ts    # Models để communicate với backend
├── app.component.ts
├── app.component.html
├── app.routes.ts
├── app.config.ts
└── ...
```

## Tính năng

### Authentication & User Management
- **Register Component**: Form đăng ký tài khoản
  - Xác thực input (username, email)
  - Gọi API đến `http://localhost:8081/api/users/register`
  - Xử lý success/error messages

### User Service
- `register(request: UserRegistrationRequest)`: Đăng ký tài khoản mới
- `getUser(id: number)`: Lấy thông tin user
- `getAllUsers()`: Lấy danh sách tất cả users

## API Endpoints

### Đăng ký tài khoản
- **URL**: `http://localhost:8081/api/users/register`
- **Method**: POST
- **Request Body**:
```json
{
  "id": 1,
  "username": "john",
  "email": "john@example.com"
}
```
- **Response**: UserResponse (id, username, email)

## Cách chạy

```bash
# Cài dependencies
npm install

# Chạy development server
npm start

# Build dự án
npm run build

# Chạy unit tests
npm test
```

## Form Validation

Form đăng ký yêu cầu:
- **Username**: Bắt buộc, tối thiểu 3 ký tự
- **Email**: Bắt buộc, phải đúng format email

## Styling

Component sử dụng CSS tùy chỉnh với:
- Gradient background cho thiết kế modern
- Responsive design cho mobile
- Button styles và form layouts
- Alert messages (success/error)

## Tiếp theo

Các tính năng sẽ được thêm vào:
- Login component
- CV Export feature
- User dashboard
- CV templates
