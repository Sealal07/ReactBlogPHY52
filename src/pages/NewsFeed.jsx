import { Link, useSearchParams } from "react-router-dom";
// http:localhost/news?search=react&category=frontend

const ARTICLES_DATA = [
    {
     id: 'future-of-js', 
     title: 'Статья 1',
     description: 'Описанние статьи 1',
     category: 'javascript'   
    },
    {
     id: 'css-modules', 
     title: 'Статья 2',
     description: 'Описанние статьи 2',
     category: 'css'   
    },
    {
     id: 'react-router-v6', 
     title: 'Статья 3',
     description: 'Описанние статьи 3',
     category: 'react'   
    }
]
function NewsFeed(){
    // useSearchParams позволяет доставать параметры url
    const [searchParams, setSearchParams] = useSearchParams();
    // достаем текущие значения фильтров
    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';

    const handleSearchChange = (event) => {
        const text = event.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (text) {
            newParams.set('search', text); //устанавливаем текст в URL
        }else {
            newParams.delete('search');//если поле очистили
        }
        setSearchParams(newParams); // обновляем URL адрес
    }

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (category){
            newParams.set('category', category);
        }else{
            newParams.delete('category');
        }
        setSearchParams(newParams);
    }
    // ФИЛЬТРАЦИЯ НА ОСНОВЕ ПОЛУЧЕННЫХ ЗНАЧЕНИЙ
    const filteredArticles = ARTICLES_DATA.filter((article) => {
        // в нижнем регстре, в описании или названии
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
        const matchesCategory = categoryQuery === '' || article.category === categoryQuery;
        return matchesSearch && matchesCategory;
    });

    const handleResetFilters = () => {
        setSearchParams({}); //передаем пустой объект, URL становится /news
    };


    return (
        <>
            <h1>Лента свежих новостей</h1>
            {/* БЛОК ФИЛЬТРОВ И ПОИСКА */}
            <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center'
            }}>
                {/* ПОЛЕ ПОИСКА ТЕКСТОВОЕ */}
                <div>
                    <label htmlFor="search-input">Поиск по тексту</label>
                    <input 
                        type="text"
                        id="search-input"
                        value={searchQuery}
                        onInput={handleSearchChange}
                    />
                </div>
                {/* Выпадающий список категорий */}
                <div>
                    <label htmlFor="category-select">Категории</label>
                    <select
                        id="category-select"
                        value={categoryQuery}
                        onChange={handleCategoryChange}
                    >
                        <option value=''>Все категории</option>
                        <option value='react'>React</option>
                        <option value='css'>CSS</option>
                        <option value='javascript'>JavaScript</option>
                    </select>
                </div>
                {/* КНОПКА СБРОСА ПАРАМЕТРОВ */}
                {(searchQuery || categoryQuery) && (
                    <button onClick={handleResetFilters}>
                        Сбросить фильтры
                    </button>
                )}
            </div>
            <div>
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                       <article key={article.id}>
                            <h2>{article.title}</h2>
                            <h2>{article.description}</h2>
                            <span>{article.category.toUpperCase()}</span>
                            <Link to={`/news/${article.id}`}>
                                Читать полностью
                            </Link>
                        </article> 
                    ))
                ) : (
                    <p>По вашему запросу ничего не найдено</p>
                )}
            {/* 
                {ARTICLES_DATA.map((article) => (
                    <article key={article.id}>
                        <h2>{article.title}</h2>
                        <h2>{article.description}</h2>
                        <Link to={`/news/${article.id}`}>
                            Читать полностью
                        </Link>
                    </article>
                ) )} */}
            </div>
        </>
    );
};
export default NewsFeed;