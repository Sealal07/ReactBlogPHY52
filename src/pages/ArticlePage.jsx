import { useParams, useNavigate } from "react-router-dom";

function ArticlePage(){
    const { articleId } = useParams();
    const navigate = useNavigate(); //  возвращает функцию с помощью которой можно програмно менять URL
    
    const handleGoBack = () => {
        navigate(-1);
    };   
    const handleGoHome = () => {
        navigate('/news');
    };

    return (
        <>
            <button onClick={handleGoBack}> --Назад в ленту </button>
            <div>
                <h1>Вы читаете статью {articleId}</h1>
                <p>здесь полноценный текст статьи</p>
            </div>
            <button onClick={handleGoHome}> На главную ленту </button>
        </>
    );
    
}

export default ArticlePage;