import './cartToast.css';
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { formatPhp } from '../utils/formatPeso';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext)
export const CartToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);
    const timeoutRef = useRef(null);

    const showAddedAlert = (message, duration = 3000) => {
        clearTimeout(timeoutRef.current);
        setToast(message);
        timeoutRef.current = setTimeout(() => {
            setToast(null);
        }, duration);
    }

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return(
        <ToastContext.Provider 
            value={{toast, showAddedAlert}}>
            {children}
            {toast && (
        <div
            className="added-product-alert show"
            aria-live="polite"
            role="status"
        >
            <img
                src={`/images/${toast.image}`}
                alt={toast.name}
                className="toast-image"
            />
            <div className="toast-info">
                <h4>{toast.message}</h4>
                <p className='toast-name'>{toast.name}</p>
                <div className='toast-quan-price'>
                    <span>
                        Qty: {toast.item_quantity}
                    </span>
                    <span>
                        ₱{formatPhp(toast.subtotal)}
                    </span>
                </div>
            </div>
        </div>
            )}
        </ToastContext.Provider>
    );
}
