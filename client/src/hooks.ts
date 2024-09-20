import { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";

// create dispatch hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
