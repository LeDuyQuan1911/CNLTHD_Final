# Sử dụng image Node.js
FROM node:18

# Đặt thư mục làm việc
WORKDIR /socket

# Copy tất cả code vào container
COPY . .

# Cài đặt dependencies
RUN yarn install

# Expose port
EXPOSE 4000

# Chạy socket server
CMD ["node", "index.js"]
