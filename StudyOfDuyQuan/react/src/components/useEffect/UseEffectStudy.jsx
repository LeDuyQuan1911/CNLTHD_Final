import React, { useEffect, useState } from "react";
import axios from "axios";

const UseEffectStudy = () => {
    const [pictures, setPictures] = useState([]); // State lưu danh sách ảnh
    const [loading, setLoading] = useState(false); // State loading
    const [more, setMore] = useState(10);
    const [page, setPage] = useState(1); // Lưu trang hiện tại

    useEffect(() => {
        setLoading(true); // Bật trạng thái loading
        axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`)
            .then(response => {
                console.log(response);
                setPictures(prevPictures => [...prevPictures, ...response.data]); // Nối dữ liệu mới vào danh sách cũ
                setLoading(false);
            }) 
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu: ", error);
                setLoading(false);
            });
    }, [page]); // Chạy lại mỗi khi `page` thay đổi

    return (
        <div>
            <h2>Danh sách người dùng</h2>
            
            {/* Hiển thị danh sách ảnh */}
            <div className="flex flex-wrap gap-4 justify-center">
                {pictures.length > 0 && pictures.map(picture => (
                    <img 
                        key={picture.id} 
                        className="w-[200px] h-[200px] object-cover rounded-lg shadow-lg" 
                        src={picture.download_url} 
                        alt={picture.author}
                    />
                ))}
            </div>

            {/* Nút "More..." */}
            <button 
                onClick={() => setPage(page + 1)} 
                className="block mx-auto mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                {loading ? "Đang tải..." : "More..."}
            </button>
        </div>
    );
};

export default UseEffectStudy;
