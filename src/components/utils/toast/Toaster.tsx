import { toast } from "react-toastify";
import styles from "./Toaster.module.scss";
import classNames from "classnames";

type ToastType = 'info' | 'error'

export default function toaster({ type, text }: {type: ToastType, text: string}) {
    let color = type === 'info' ? 'rgb(119, 245, 203)' : 'rgb(242, 80, 80)';
    
    return toast(text,
    {
        style: {backgroundColor: color},
        className: classNames(`${styles.toast__container} ${styles[type]}`),
    }
  );
}
