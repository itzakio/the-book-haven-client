import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {
     const {user, userLoading} = useAuth();
     const location = useLocation()

    if(userLoading){
        return <Loading/>
    }
    if(user && user.email){
        return children;
    }
    return <Navigate state={location.pathname} to="/login"/>
    
};

export default PrivateRoute;