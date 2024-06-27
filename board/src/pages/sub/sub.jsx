import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './sub.scss';

const Sub = () => {
    const { idx } = useParams();
    const navigate = useNavigate();
    const apiUrl = `http://www.batangsoft.com/`;
    const [data, setData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        Modal.setAppElement('#root');

        fetch(`${apiUrl}bbs/${idx}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setData(data);
                } else {
                    console.error('Fetched data is not valid:', data);
                    setData(null);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [idx]);

    const handleDelete = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`${apiUrl}bbs/${idx}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password }),
                });

                if (response.ok) {
                    alert('삭제되었습니다');
                    closeModal();
                    navigate('/');
                } else if (response.status === 401) {
                    alert('삭제에 실패했습니다. 비밀번호를 확인해주세요.');
                } else {
                    alert('삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = (e) => {
        if (e.key === 'Enter') {
            handleDelete();
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className='subWrap'>
            <div className='item'>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
                <p>작성자: {data.writer}</p>
            </div>
            <button onClick={() => navigate('/')}>목록</button>
            <button onClick={openModal}>삭제</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="비밀번호 입력"
            >
                <h2>비밀번호 입력</h2>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyDown={handlePasswordSubmit}
                />
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </div>
    );
};

export default Sub;
