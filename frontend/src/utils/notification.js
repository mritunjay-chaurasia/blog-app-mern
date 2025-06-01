import { toast } from 'react-toastify';

export const showToast = (type, msg) => {
    const config = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }

    switch (type.toLowerCase()) {
        case 'success':
            toast.success(msg, config);
            break;
        case 'info':
            toast.info(msg, config);
            break;
        case 'error':
            toast.error(msg, config);
            break;
        case 'warn':
            toast.warn(msg, config);
            break;
        default:
            toast(msg, config);
            break;
    }

}