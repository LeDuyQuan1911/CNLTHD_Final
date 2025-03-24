# **CNLTHD_Project** 🚀

## 📌 **Giới thiệu**  
**Multi-vendor E-Shop** là một dự án thương mại điện tử sử dụng kiến trúc **Microservices** để tối ưu hóa hiệu suất và khả năng mở rộng. Dự án áp dụng công nghệ hiện đại, bao gồm **ReactJS, Node.js, Express.js, MongoDB** và **Docker** để triển khai.

---

## 👨‍💻 **Nhóm phát triển**  
1. **Lê Duy Quân** - [GitHub](https://github.com/LeDuyQuan1911/leduyquan.github.io/tree/gh-pages)  
2. **Nguyễn Thị Thảo Nguyên** - [GitHub](https://github.com/ThaoNguyen157/nguynt.github.io/tree/gh-pages)  
3. **Lê Trọng Luân** - [GitHub](https://github.com/trongluan23/Luan.github.io/tree/gh-pages)  

---

## 🚀 **Cách chạy dự án với Docker**  

### **1️⃣ Gắn thẻ (Tag) cho các Docker images**  
```bash
docker tag multi_vondor_e_shop-part-5-backend leduyquan2574/multi_vendor_backend:latest
docker tag multi_vondor_e_shop-part-5-frontend leduyquan2574/multi_vendor_frontend:latest
docker tag multi_vondor_e_shop-part-5-socket leduyquan2574/multi_vendor_socket:latest
```

### **2️⃣ Đẩy (Push) các images lên Docker Hub**  
```bash
docker push leduyquan2574/multi_vendor_backend:latest
docker push leduyquan2574/multi_vendor_frontend:latest
docker push leduyquan2574/multi_vendor_socket:latest
```

### **3️⃣ Chạy các containers**  
```bash
docker run -d --name multi_vendor_backend -p 8000:8000 leduyquan2574/multi_vendor_backend:latest
docker run -d --name multi_vendor_frontend -p 3000:3000 leduyquan2574/multi_vendor_frontend:latest
docker run -d --name multi_vendor_socket -p 4000:4000 leduyquan2574/multi_vendor_socket:latest
```

---

## 🛠 **Công nghệ sử dụng**  
- **Front-end:** ReactJS ⚛️  
- **Back-end:** Node.js / Express.js 🚀  
- **Database:** MongoDB 🗄  
- **Triển khai:** Docker 🐳  

---

## 📅 **Kế hoạch thực hiện**  

| **Thời gian** | **Công việc** |
|--------------|--------------|
| **Tuần 1 - 4** | Lựa chọn đề tài, nghiên cứu tài liệu & khóa học tham khảo 📚 |
| **Tuần 4 - 5** | Tìm hiểu Docker, ôn tập JavaScript 🐳 |
| **Tuần 5 - 6** | Ôn tập ReactJS ⚛️ |
| **Tuần 6 - 7** | Ôn tập Node.js 🚀 |
| **Tuần 7 - 8** | Tìm hiểu kiến trúc Microservices 🏗 |
| **Tuần 8 - 11** | Xây dựng các chức năng chính của website 🛠 |
| **Tuần 11 - 13** | Phát triển chức năng phụ, triển khai & testing 🧪 |
| **Tuần 13 - 15** | Hoàn thiện báo cáo 📑 |

---

## 📢 **Ghi chú**  
- Dự án sử dụng mô hình **Microservices** để tăng hiệu suất và khả năng mở rộng.
- Docker được sử dụng để triển khai và quản lý các service.
- Backend và Frontend chạy trên các cổng tương ứng **5000, 3000, 4000**.

---

## 📚 **Tài liệu tham khảo**  
- **JavaScript & ReactJS:** [EvonHub](https://evonhub.dev/)  
- **Microservices:**  
  - [Khóa học Microservices với NodeJS, React, TypeScript & Kubernetes](https://www.udemy.com/course/microservices-with-nodejs-react-typescript-and-kubernetes/)  
  - [Khóa học Microservices với Node.js và React](https://www.udemy.com/course/microservices-with-node-js-and-react/)  
- **Udacity:** [Khóa học Udacity](https://www.udacity.com/dashboard)  

---

🔥 **Cảm ơn bạn đã quan tâm đến dự án của chúng tôi!** 🚀