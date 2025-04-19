const path = require("path");

const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname, "../public/images/upload/"); // nên lưu vào thư mục uploads
    let extName = path.extname(fileObject.name); // lấy đuôi file
    let baseName = path.basename(fileObject.name, extName); // lấy tên file không có đuôi
    let finalName = baseName + "_" + Date.now() + extName; // tạo tên file mới
    let finalPath = uploadPath + "/" + finalName; // đường dẫn cuối cùng
    try {
        await fileObject.mv(finalPath); // di chuyển file
        return {
            success: true,
            path: finalPath,
            filename: fileObject.name,
        };
    } catch (err) {
        return {
            success: false,
            error: err.message || 'Internal Server Error',
        };
    }
};

const uploadMultipleFiles = async (fileArray) => {
    let results = [];

    if (!Array.isArray(fileArray)) {
        fileArray = [fileArray];
    }

    for (let file of fileArray) {
        const result = await uploadSingleFile(file);
        results.push(result);
    }

    const hasError = results.some(r => !r.success);

    return {
        success: !hasError,
        path: results.map(r => r.path),
        uploaded: results.filter(r => r.success),
        failed: results.filter(r => !r.success),
    };
};

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
}