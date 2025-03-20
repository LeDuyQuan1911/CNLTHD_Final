import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HackerNew = () => {
    const [data, setData] = useState([]); // ✅ Khởi tạo data là một mảng rỗng
    const [loading, setLoading] = useState(false); // ✅ Khởi tạo loading là false
    const [query, setQuery] = useState("react");
    const [searchTerm, setSearchTerm] = useState("react"); // ✅ Lưu giá trị nhập trước khi tìm kiếm

    const fetchData = async () => {
        setLoading(true); // ✅ Bật trạng thái loading trước khi fetch
        try {
            const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${searchTerm}`);
            setData(response.data.hits); // ✅ Lưu danh sách bài báo vào state
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu:", err);
        } finally {
            setLoading(false); // ✅ Tắt trạng thái loading sau khi fetch xong
        }
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Kết quả tìm kiếm cho: {searchTerm}</h2>
            
            {/* Ô nhập liệu */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nhập từ khóa..."
                    className="border border-gray-300 px-4 py-2 rounded-lg flex-grow"
                />
                <button
                    onClick={() => {
                        setSearchTerm(query);
                        fetchData(); // Chỉ gọi API khi nhấn nút
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Tìm kiếm
                </button>
            </div>

            {/* Hiển thị danh sách bài viết */}
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <ul className="list-disc pl-4">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <li key={item.objectID}>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {item.title || "Không có tiêu đề"}
                                </a>
                            </li>
                        ))
                    ) : (
                        <p>Không tìm thấy kết quả nào.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default HackerNew;
