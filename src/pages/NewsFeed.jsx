import { Link } from "react-router-dom";

const ARTICLES_DATA = [
    {
     id: 'future-of-js', 
     title: 'Статья 1',
     description: 'Описанние статьи 1'   
    },
    {
     id: 'css-modules', 
     title: 'Статья 2',
     description: 'Описанние статьи 2'   
    },
    {
     id: 'react-router-v6', 
     title: 'Статья 3',
     description: 'Описанние статьи 3'   
    }
]
function NewsFeed(){
    return (
        <>
            <h1>Лента свежих новостей</h1>
            <div>
                {ARTICLES_DATA.map((article) => (
                    <article key={article.id}>
                        <h2>{article.title}</h2>
                        <h2>{article.description}</h2>
                        <Link to={`/news/${article.id}`}>
                            Читать полностью
                        </Link>
                    </article>
                ) )}
            </div>
        </>
    );
};
export default NewsFeed;