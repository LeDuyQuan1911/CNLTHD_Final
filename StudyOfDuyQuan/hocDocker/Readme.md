# 🚀 Multi Vendor E-Shop - Docker Setup Guide

## 📌 Mô tả
Hướng dẫn cách tạo, build và chạy ứng dụng Multi Vendor E-Shop với Docker và Docker Compose. Bao gồm backend (Node.js), frontend (React), và database (MongoDB).

---

## 🛠 Bước 1: Viết Dockerfile

### 📄 Dockerfile cho Backend (Node.js)
```dockerfile
# Sử dụng image Node.js chính thức
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng 8000
EXPOSE 8000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]
```

### 📄 Dockerfile cho Frontend (React)
```dockerfile
# Sử dụng image Node.js để build
FROM node:18 as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Sử dụng server Nginx để phục vụ frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📄 Bước 2: Viết docker-compose.yml
Tạo tệp `docker-compose.yml` để chạy nhiều container cùng lúc.

```yaml
version: "3.8"
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/mydatabase

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## 🏗 Bước 3: Build và chạy Docker Compose

### 🔹 Build và chạy container
```sh
docker-compose up --build -d
```

### 🔹 Kiểm tra container đang chạy
```sh
docker ps
```

### 🔹 Tắt tất cả container
```sh
docker-compose down
```

---

## 🔗 Bước 4: Đẩy Image lên Docker Hub

### 🔹 Đăng nhập vào Docker Hub
```sh
docker login
```

### 🔹 Gán (tag) image trước khi đẩy lên
```sh
docker tag multi_vendor_backend leduyquan/multi_vendor_backend:latest
docker tag multi_vendor_frontend leduyquan/multi_vendor_frontend:latest
```

### 🔹 Đẩy image lên Docker Hub
```sh
docker push leduyquan/multi_vendor_backend:latest
docker push leduyquan/multi_vendor_frontend:latest
```

---

## 📥 Bước 5: Client khác lấy và chạy container từ Docker Hub

### 🔹 Pull image từ Docker Hub
```sh
docker pull leduyquan/multi_vendor_backend:latest
docker pull leduyquan/multi_vendor_frontend:latest
```

### 🔹 Chạy container
```sh
docker run -d -p 8000:8000 leduyquan/multi_vendor_backend
docker run -d -p 3000:3000 leduyquan/multi_vendor_frontend
```

---

🎉 **Xong! Bạn đã tạo, chạy và đẩy Docker container lên Docker Hub thành công!** 🚀

