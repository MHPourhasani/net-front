import { Navigate } from "react-router-dom";
import { PATH } from "../../utils/path";
import { authToken } from "../../utils/storage";

const PrivateRoute = ({ children }: any) => {
    const token = authToken.get()?.access;

    return token ? children : <Navigate to={PATH.login} replace />;
};

export default PrivateRoute;
