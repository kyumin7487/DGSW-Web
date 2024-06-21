import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

const Main = () => {
    const apiUrl = `http://www.batangsoft.com/`;
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${apiUrl}bbs`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setData(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                    setData([]);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleItemClick = (idx) => {
        navigate(`/sub/${idx}`);
    };

    const handleWriteClick = () => {
        navigate('/write');
    };

    return (
        <div className='main-wrapper'>
            <button onClick={handleWriteClick} className='write-button'>글쓰기</button>
            <ul className='post-list'>
                {data.map((item) => (
                    <li key={item.idx} className='post-item' onClick={() => handleItemClick(item.idx)}>
                        <h2 className='post-title'>{item.title}</h2>
                        <p className='post-writer'>작성자: {item.writer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Main;
