import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Write = () => {
    const apiUrl = process.env.REACT_APP_API_URL || `http://www.batangsoft.com/`;

    const [title, setTitle] = useState(''); // 제목 상태 변수
    const [content, setContent] = useState(''); // 내용 상태 변수
    const [author, setAuthor] = useState(''); // 글쓴이 상태 변수
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수

    const [error, setError] = useState(''); // 오류 메시지 상태 변수
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 변수

    const navigate = useNavigate();

    // 입력값이 4자 이상인지 확인하는 함수입니다.
    const validateInput = (input: string): boolean => {
        return input.length >= 4; // 입력값이 4자 이상일 경우 true 반환
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 기본 폼 제출 동작을 방지합니다.

        if (!validateInput(title) || !validateInput(content) || !validateInput(author) || !validateInput(password)) {
            setError('모든 입력 항목은 4자 이상의 문자열이어야 합니다.'); // 입력값이 유효하지 않으면 오류 메시지를 설정합니다.
            return;
        }

        const postData = {
            title,
            content,
            writer: author,
            password
        };

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${apiUrl}bbs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                alert('게시물이 성공적으로 등록되었습니다.');
                setTitle('');
                setContent('');
                setAuthor('');
                setPassword('');
                navigate('/');
            } else {
                alert('게시물 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('게시물 등록 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>게시물 작성</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label>글쓴이:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <button type="submit" disabled={isLoading}>저장</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default Write;
