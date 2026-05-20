import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }){

    const location= useLocation(); //записываем, откуда пришел пользователь
    const currentUser = useAuth();

    // ЕСЛИ НЕ АВТОРИЗОВАН
    if(!currentUser){
        // state-сохраняет текущий адрес,чтобы после логина вернуть юзера назад
        return <Navigate to='/login' state={{ from: location}} replace />
    }    
    // ЕСЛИ АВТОРИЗОВАН возвращаем дочерний компонент (dashboard)
    return children;
}
export default ProtectedRoute;