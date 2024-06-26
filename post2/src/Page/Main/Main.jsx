import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import './Main.css';

const Main = () => {
    const apiUrl = `http://www.batangsoft.com/`;
    const [data, setData] = useState([]);
    const navigate = useNavigate();

   useEffect(() => {
    fetch(`${apiUrl}bbs`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                setData(data)
            }
            else {
                console.log('error', data);
                setData([]);
            }
        })
   }, [])

    const handleItemClick = (idx) => {
    navigate(`/Sub/${idx}`);
    };

    const handleWriteClick = () => {
    navigate(`/Write`);
    };

    return (
    <div className="mainWrapper">
        <button onClick={handleWriteClick} className="writeButton">글 쓰기</button>
        <ul className="postList">
            {data.map((item) => (
                <li key={item.idx} className="postitem" onClick={() => handleItemClick(item.idx)}>
                    <h2 className="posttitle">{item.title}</h2>
                </li>
            ))}
        </ul>
    </div>
    );
}

export default Main;