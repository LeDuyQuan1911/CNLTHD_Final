# Sử dụng image Node.js
FROM node:18

# Đặt thư mục làm việc
WORKDIR /server

# Copy tất cả code vào container
COPY . .

# Cài đặt dependencies
RUN yarn install

# Expose port (phải trùng với `docker-compose.yml`)
EXPOSE 8000

# Chạy backend
CMD ["yarn", "start"]
