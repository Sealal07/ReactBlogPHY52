import { createContext, useContext, useState, useEffect } from 'react';


// контекст это "коробка" в которой будут лежать данные об авторизации
const AuthContext = createContext(null);

function AuthProvider({ children }){

    // для хранения текущего вошедшего пользователя
    const [currentUser, setCurrentUser] = useState(()=>{
        const savedUser = localStorage.getItem('active_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const register = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some(u => u.username === username);
        if (userExists){
            return {success: false, message: 'пользователь с таким именем уже существует'};
        }
        const newUser = {id: Date.now().toString(), username, password};
        users.push(newUser);
        localStorage.setItem('users',  JSON.stringify(users));
        return {success: true, message: 'регистрация успешна'};
    };

    const login = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && 
                                     u.password === password
        );
        if (user){
            setCurrentUser(user);
            localStorage.setItem('active_user', JSON.stringify(user));
            return {success: true};
        }else{
            return {success: false, message: 'неверное имя или пароль'}
        }
    };
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('active_user');
        
    };

    // добавить проброс
}
// создаем собственный хук для удобного использования контекста в других комп.
function useAuth(){
    return useContext(AuthContext);
}
export default useAuth;