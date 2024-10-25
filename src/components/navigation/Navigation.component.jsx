import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";


export default function Navigation() {
    const dispatch = useDispatch();
    
    return (
        <>
        <h1>navigation</h1>
        <button onClick={() => dispatch(logoutUser())}>
            Logout
        </button>
        </>
    );
};