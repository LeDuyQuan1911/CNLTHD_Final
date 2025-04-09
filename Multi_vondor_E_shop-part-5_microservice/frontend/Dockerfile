# Sử dụng image Node.js
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy tất cả code vào container
COPY . .

# Cài đặt dependencies
RUN yarn install

# Expose port
EXPOSE 3000

# Chạy frontend
CMD ["yarn", "start"]
