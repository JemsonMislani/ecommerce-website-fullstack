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
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addMode, setAddMode] = useState(false);


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
    } catch(err) {
        console.log(err.response?.data || err);
    }
};

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
            "http://localhost:5000/api/account/address",
            {
                addressId: selectedAddressId,
                ...formData
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        await fetchAddresses();
        await fetchUser();
        setEditMode(false);
        setSelectedAddressId(null);
    } catch (err) {
        console.log(err.response?.data || err);
    }
};

    const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
        try {
            const result = await axios.get(
                "http://localhost:5000/api/account/address",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setAddresses(result.data);
        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    const handleCreateAddressBtn = async () => {
    const token = localStorage.getItem("token");
        try {
            await axios.post(
                "http://localhost:5000/api/account/address",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setAddMode(false);
            setFormData({});
            await fetchAddresses();
            await fetchUser();
        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    const handleSetDefaultBtn = async (addressId) => {
    const token = localStorage.getItem("token");
        try {
            await axios.put(
                "http://localhost:5000/api/account/address/default",
                {
                    addressId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            await fetchUser();
            await fetchAddresses();
        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    const handleDeleteAddressBtn = async (addressId) => {
        if (!window.confirm("Delete this address?")) return;
        const token = localStorage.getItem("token");
        try {
            await axios.delete(
                `http://localhost:5000/api/account/address/${encodeURIComponent(addressId)}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            await fetchAddresses();
            await fetchUser();
        } catch(err){
            console.log(err.response?.data || err);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchAddresses();
    }, [])

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
                            <button
                                className="add-new-add-btn"
                                onClick={() => {
                                    setEditMode(false);

                                    setFormData({
                                        first_name: "",
                                        last_name: "",
                                        company: "",
                                        address: "",
                                        apartment_or_suite: "",
                                        city: "",
                                        region: "",
                                        postal_code: "",
                                        customer_phone: ""
                                    });

                                    setAddMode(true);
                                }}>
                                Add New Address
                            </button>
            <div>
                {addMode && (
                    <div className="edit-address">
                            <h2>Add New Address</h2>
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
                                <button
                                    onClick={() => {
                                        setAddMode(false);
                                        setFormData({});
                                    }}
                                >Cancel
                                </button>
                                <button onClick={handleCreateAddressBtn}>
                                    Add Address
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            {
                addresses.length > 0 ? (
                    addresses.map((address) => (
                    <div
                        className="address-card"
                        key={address.id}
                        >
                        <h3>
                            {address.id === usersDetails?.address_id
                                ? "Philippines (Default)"
                                : "Philippines"}
                        </h3>
                        <p>{address.firstName} {address.lastName}</p>
                        <p>{address.address1}</p>
                        {address.address2 &&
                        <p>{address.address2}</p>}
                        <p>{address.city}</p>
                        <p>{address.province}</p>
                        <p>{address.zip}</p>
                        <p>{address.phone}</p>
                        <div className="address-actions">
                            <div className="address-left-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        setAddMode(false);
                                        setSelectedAddressId(address.id);
                                        setFormData({});

                                        setFormData({
                                            first_name: address.firstName,
                                            last_name: address.lastName,
                                            company: address.company || "",
                                            address: address.address1 || "",
                                            apartment_or_suite: address.address2 || "",
                                            city: address.city || "",
                                            region: address.province || "",
                                            postal_code: address.zip || "",
                                            customer_phone: address.phone || ""
                                        });
                                        setEditMode(true);
                                    }}
                                >Edit Address
                                </button>
                                <label className="default-address">
                                    <input
                                        type="checkbox"
                                        checked={address.id === usersDetails?.address_id}
                                        disabled={address.id === usersDetails?.address_id}
                                        onChange={() => handleSetDefaultBtn(address.id)}
                                    />
                                    {
                                        address.id === usersDetails?.address_id
                                            ? "Default Address"
                                            : "Set as Default"
                                    }
                                </label>
                            </div>
                            {
                                address.id !== usersDetails?.address_id && (
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteAddressBtn(address.id)}
                                    >Delete
                                    </button>
                                )
                            }
                        </div>
                    </div>
                ))
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
                        <button
                            onClick={() => {
                                setEditMode(false);
                                setSelectedAddressId(null);
                                setFormData({});
                            }}>Cancel
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