# **CNLTHD_Project** 🚀

## 📌 **Giới thiệu**
**Multi-vendor E-Shop** là một dự án thương mại điện tử với **2 phiên bản triển khai**:

- ✅ **Phiên bản Monolithic:** Toàn bộ backend chạy tập trung trong một server duy nhất.
- ✅ **Phiên bản Microservices:** Mỗi chức năng chính như **Authentication, Product, Order, Payment, Chat,...** được tách thành các service độc lập, giao tiếp qua RESTful API, bảo mật bằng JWT.

👉 **Folder chứa phiên bản Microservices:** `Multi_vendor_E_shop-part-5_microservice`  
- **Frontend:** chạy port `3000`
- **Socket:** chạy port `5000`
- **Các service backend:** chạy từ port `4000` đến `4012`

---

## 👨‍💻 **Nhóm phát triển**
1. **Lê Duy Quân** - [GitHub](https://github.com/LeDuyQuan1911/leduyquan.github.io/tree/gh-pages)  
2. **Nguyễn Thị Thảo Nguyên** - [GitHub](https://github.com/ThaoNguyen157/nguynt.github.io/tree/gh-pages)  
3. **Lê Trọng Luân** - [GitHub](https://github.com/trongluan23/Luan.github.io/tree/gh-pages)  

---

## 🚀 **Cách chạy phiên bản Microservices bằng Docker**

### **1️⃣ Tag các Docker images**
```bash
docker tag multi_vendor_e_shop-part-5-backend leduyquan2574/multi_vendor_backend:latest
docker tag multi_vendor_e_shop-part-5-frontend leduyquan2574/multi_vendor_frontend:latest
docker tag multi_vendor_e_shop-part-5-socket leduyquan2574/multi_vendor_socket:latest


### **2️⃣ Push các images lên Docker Hub**

```bash
docker push leduyquan2574/multi_vendor_backend:latest
docker push leduyquan2574/multi_vendor_frontend:latest
docker push leduyquan2574/multi_vendor_socket:latest
```

### **3️⃣ Run các containers**

```bash
# Frontend chạy port 3000
docker run -d --name multi_vendor_frontend -p 3000:3000 leduyquan2574/multi_vendor_frontend:latest

# Socket chạy port 5000
docker run -d --name multi_vendor_socket -p 5000:5000 leduyquan2574/multi_vendor_socket:latest

# Các service backend chạy port 4000~4012 (ví dụ)
docker run -d --name auth_service -p 4000:4000 leduyquan2574/auth_service:latest
docker run -d --name product_service -p 4001:4001 leduyquan2574/product_service:latest
# ... Các service khác từ 4002 đến 4012
```

---

## 🛠 **Công nghệ sử dụng**

* **Frontend:** ReactJS ⚛️
* **Backend:** Node.js + Express.js 🚀
* **Database:** MongoDB 🗄️
* **Triển khai:** Docker 🐳
* **Kiến trúc:** Microservices 🔗

---

## 📅 **Kế hoạch thực hiện**

| **Thời gian**    | **Nội dung công việc**                       |
| ---------------- | -------------------------------------------- |
| **Tuần 1 - 4**   | Lựa chọn đề tài, nghiên cứu tài liệu 📚      |
| **Tuần 4 - 5**   | Tìm hiểu Docker, ôn tập JavaScript 🐳        |
| **Tuần 5 - 6**   | Ôn tập ReactJS ⚛️                            |
| **Tuần 6 - 7**   | Ôn tập Node.js 🚀                            |
| **Tuần 7 - 8**   | Tìm hiểu kiến trúc Microservices 🏗️         |
| **Tuần 8 - 11**  | Xây dựng các chức năng chính 🛠️             |
| **Tuần 11 - 13** | Hoàn thiện chức năng, triển khai, testing 🧪 |
| **Tuần 13 - 15** | Hoàn thiện báo cáo, chuẩn bị bảo vệ 📑       |

---

## 📢 **Ghi chú**

* ✅ **Monolithic:** Dễ triển khai, phù hợp scale nhỏ.
* ✅ **Microservices:** Tách module rõ ràng, dễ mở rộng.
* ✅ **Ports Microservices:**

  * Frontend: **3000**
  * Socket: **5000**
  * Backend services: **4000 → 4012**

---

## 📚 **Tài liệu tham khảo**

* **JavaScript & ReactJS:** [EvonHub](https://evonhub.dev/)
* **Microservices:**

  * [Microservices with NodeJS, React, TypeScript & Kubernetes](https://www.udemy.com/course/microservices-with-nodejs-react-typescript-and-kubernetes/)
  * [Microservices with Node.js and React](https://www.udemy.com/course/microservices-with-node-js-and-react/)
* **Udacity:** [Udacity Dashboard](https://www.udacity.com/dashboard)

---

🔥 **Cảm ơn bạn đã theo dõi dự án của nhóm chúng tôi!** 🚀

