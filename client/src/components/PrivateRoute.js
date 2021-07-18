
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({children, hasAccess, redirectTo, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            hasAccess ? children : <Redirect to={redirectTo} />
        )} />
    );
};

export default PrivateRoute;