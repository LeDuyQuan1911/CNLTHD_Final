// Định nghĩa middleware
function logTimeMiddleware(req, res, next) {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
    
    next(); // Cho phép request tiếp tục đi tiếp
  }
  
module.exports = logTimeMiddleware;
  