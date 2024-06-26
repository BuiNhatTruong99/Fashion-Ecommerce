import { useSnackbar, VariantType } from "notistack";

let useSnackbarRef: any;

class SnackBarMessage {
  success(msg: string) {
    this.toast(msg, "success");
  }
  warning(msg: string) {
    this.toast(msg, "warning");
  }
  info(msg: string) {
    this.toast(msg, "info");
  }
  error(msg: string) {
    this.toast(msg, "error");
  }
  toast(msg: string, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  }
}

export default SnackBarMessage;

export const SnackbarUtilsConfiguration: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};
