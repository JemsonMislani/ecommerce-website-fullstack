import { useState } from "react";
import './customer-details.css';

export default function CheckoutForm() {
    const [cxform, setCxForm] = useState({
        email: '',
        first: '',
        last: '',
        address: '',
        city: '',
        postal: '',
        region: '',
        payment: '',
    });

    const [errors, setErrors] = useState({});

    const clientForm = (e) => {
        const { name, value } = e.target;
        setCxForm((data) => ({
            ...data, [name]: value
        }));

        setErrors((data) => ({
            ...data, [name]: '',
        }));
    }

    const validation = () => {
        let errors = {};

        if(!cxform.email) errors.email = 'Email is required';
        if(!cxform.first) errors.first = 'First name is required';
        if(!cxform.last) errors.last = 'Last name is required';
        if(!cxform.address) errors.address = 'Address is required';
        if(!cxform.city) errors.city = 'City is required';
        if(!cxform.postal) errors.postal = 'Postal is required';
        if(!cxform.region) errors.region = 'Region is required';
        if(!cxform.payment) errors.payment = 'Please select a payment method';

        setErrors(errors)
        return Object.keys(errors).length === 0;
    }

    return {
        cxform,
        errors,
        clientForm,
        validation
    }
}
