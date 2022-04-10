import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetFilter } from "../../../query/querySlice";

function ShowAll () {
    const dispatch = useDispatch();

    return (
        <div className="show-all">
            <Link to="/query">
                <button onClick={() => dispatch(resetFilter())} className="show-all__button">
                    See All Parts
                </button>
            </Link>
        </div>
    );
}

export default ShowAll;