import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './user-account-page-address.css'
import "./user-account.css";
import Header from "../home-components/Header";
import FooterPage from "../home-components/FooterPage";
import useScrollAnimation from "../scrollAnimation/scrollAnimation";
import { philippineProvinces } from "../utils/philippineProvinces";

export default function AddressPage() {
    useScrollAnimation();
    const nav = useNavigate();
    const [usersDetails, setUsersDetails] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);


    const fetchUser = async () => {
    const token = localStorage.getItem("token");
    try {
        const result = await axios.get(
            "http://localhost:5000/api/account/me",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        setUsersDetails(result.data);
        setFormData(result.data);
        setEditMode(false);
    } catch(err) {
        console.log(err.response?.data || err);
    }
};

    useEffect(() => {
        fetchUser();
    }, [])

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleUpdateBtn = async () => {
    const token = localStorage.getItem("token");
    
    try {
        await axios.put(
            "http://localhost:5000/api/account/update",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        await fetchUser();
    } catch (err) {
        console.log(err.response?.data || err);
    }
};

    return(
        <>
            <Header/>
            <div className="address-page animation">
                <button
                    className="back-btn"
                    onClick={() => nav("/user-account-page")}
                >
                    Back to Account
                </button>
                <div className="address-header">
                    <h1>Saved Address</h1>
                    {
                        usersDetails?.has_address && (
                            <button className="add-new-add-btn">
                                Add New Address
                            </button>
                        )
                    }
                </div>
                {
                usersDetails?.has_address ? (
                    <div className="address-card">
                        <h3>Philippines (Default)</h3>
                        <p>
                            {usersDetails.first_name} {usersDetails.last_name}
                        </p>
                        <p>{usersDetails.address}</p>
                        {usersDetails.apartment_or_suite &&
                            <p>{usersDetails.apartment_or_suite}</p>}
                        <p>{usersDetails.city}</p>
                        <p>{usersDetails.region}</p>
                        <p>{usersDetails.postal_code}</p>
                        <p>{usersDetails.customer_phone}</p>
                        <div>
                            {
                                usersDetails?.has_address && (
                                    <button
                                        className="edit-btn"
                                        onClick={() => setEditMode(true)}
                                    >
                                        Edit Address
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    ) 
                    : 
                    (
                    <div className="empty-address">
                        <p>No saved addresses.</p>
                    </div>
                        )
                    }
                {
                    editMode && (
                        <div className="edit-address">
                            <h2>Edit Address</h2>
                            <div className="address-form">
                                <label>
                                    <span>First Name</span>
                                    <input
                                        name="first_name"
                                        value={formData.first_name || ""}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <span>Last Name</span>
                                    <input
                                        name="last_name"
                                        value={formData.last_name || ""}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <span>Company</span>
                                    <input
                                        name="company"
                                        value={formData.company || ""}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <span>Address</span>
                                    <input
                                        name="address"
                                        value={formData.address || ""}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <span>Apartment / Suite</span>
                                    <input
                                        name="apartment_or_suite"
                                        value={formData.apartment_or_suite || ""}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <span>City</span>
                                    <input
                                        name="city"
                                        value={formData.city || ""}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label htmlFor="">
                                    <span>Province</span>
                                <select
                                    name="region"
                                    value={formData.region || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select Province
                                    </option>
                                    {
                                        philippineProvinces.map((province) => (
                                            <option
                                                key={province}
                                                value={province}
                                            >
                                                {province}
                                            </option>
                                        ))
                                    }
                                </select>
                                </label>
                                <label>
                                    <span>ZIP Code</span>
                                    <input
                                        name="postal_code"
                                        value={formData.postal_code || ""}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="phone-field">
                                    <span>Phone</span>
                                    <input
                                        name="customer_phone"
                                        value={formData.customer_phone || ""}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="form-buttons">
                                <button onClick={() => setEditMode(false)}>
                                    Cancel
                                </button>
                                <button onClick={handleUpdateBtn}>
                                    Save
                                </button>
                            </div>
                        </div>
                        )
                    }
            </div>
            <FooterPage/>
        </>
    );
}