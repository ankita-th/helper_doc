import { useDispatch } from "react-redux";
import { setSnackBarSlice } from "../../Redux/CommonSlice";
import { SNACKBAR_TYPE } from "../../Constant/Constant";

export const useSnackBar = () => {
  const dispatch = useDispatch();

  const showSuccessSnackBar = (message) => {
    dispatch(
      setSnackBarSlice({
        show: true,
        msg: message,
        type: SNACKBAR_TYPE.SUCCESS,
      })
    );
  };

  const showErrorSnackBar = (message) => {
    dispatch(
      setSnackBarSlice({
        show: true,
        msg: message,
        type: SNACKBAR_TYPE.ERROR,
      })
    );
  };

  return {
    showSuccessSnackBar,
    showErrorSnackBar,
  };
};
