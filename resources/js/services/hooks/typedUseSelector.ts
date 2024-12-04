import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector as selectorHook
} from "react-redux";
import {IRootState, TAppDispatch} from "@/services/reducers/root-reducer";

export const useSelectorTyped: TypedUseSelectorHook<IRootState> = selectorHook;
export const useDispatchTyped = () => useDispatch<TAppDispatch>;
