import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import "./CheckoutForm.css";

const CheckoutForm = () => {
    const [shippingInfo, setShippingInfo] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    });

    const [billingInfo, setBillingInfo] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        expirationDate: "",
        securityCode: ""
    });

    const [orderItems, setOrderItems] = useState([
        { name: "Product 1", price: 10.99, quantity: 2 },
        { name: "Product 2", price: 5.99, quantity: 1 },
        { name: "Product 3", price: 15.99, quantity: 3 }
    ]);

    const [confirmOrder, setConfirmOrder] = useState(false);
    const [errors, setErrors] = useState({
        shippingInfo: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zip: ""
        },
        billingInfo: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zip: ""
        },
        paymentInfo: {
            cardNumber: "",
            expirationDate: "",
            securityCode: ""
        }
    });

    const handleShippingInfoChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevShippingInfo) => ({
            ...prevShippingInfo,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            shippingInfo: {
                ...prevErrors.shippingInfo,
                [name]: ""
            }
        }));
    };

    const handleBillingInfoChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo((prevBillingInfo) => ({
            ...prevBillingInfo,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            billingInfo: {
                ...prevErrors.billingInfo,
                [name]: ""
            }
        }));
    };

    const handlePaymentInfoChange = (e) => {
        const { name, value } = e.target;
        if (isNaN(value)) {
            setPaymentInfo((prevPaymentInfo) => ({
                ...prevPaymentInfo,
                [name]: value
            }));
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            paymentInfo: {
                ...prevErrors.paymentInfo,
                [name]: ""
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form data
        let errorsFound = false;
        const newErrors = {
            shippingInfo: {
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                state: "",
                zip: ""
            },
            billingInfo: {
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                state: "",
                zip: ""
            },
            paymentInfo: {
                cardNumber: "",
                expirationDate: "",
                securityCode: ""
            }
        };
        // Validate shipping information
        const { firstName, lastName, address, city, state, zip } = shippingInfo;
        if (!firstName) {
            newErrors.shippingInfo.firstName = "First name is required";
            errorsFound = true;
        }
        if (!lastName) {
            newErrors.shippingInfo.lastName = "Last name is required";
            errorsFound = true;
        }
        if (!address) {
            newErrors.shippingInfo.address = "Address is required";
            errorsFound = true;
        }
        if (!city) {
            newErrors.shippingInfo.city = "City is required";
            errorsFound = true;
        }
        if (!state) {
            newErrors.shippingInfo.state = "State is required";
            errorsFound = true;
        }
        if (!isNaN(zip) && zip.length >= 6) {
            newErrors.shippingInfo.zip = "Zip code is required and must be 6 digits";
            errorsFound = true;
        } else if (!/^[0-9]+$/.test(zip)) {
            newErrors.shippingInfo.zip = "Zip code must be 5 digits";
            errorsFound = true;
        }
        // Validate billing information
        const {
            firstName: billingFirstName,
            lastName: billingLastName,
            address: billingAddress,
            city: billingCity,
            state: billingState,
            zip: billingZip
        } = billingInfo;
        if (!billingFirstName) {
            newErrors.billingInfo.firstName = "First name is required";
            errorsFound = true;
        }
        if (!billingLastName) {
            newErrors.billingInfo.lastName = "Last name is required";
            errorsFound = true;
        }
        if (!billingAddress) {
            newErrors.billingInfo.address = "Address is required";
            errorsFound = true;
        }
        if (!billingCity) {
            newErrors.billingInfo.city = "City is required";
            errorsFound = true;
        }
        if (!billingState) {
            newErrors.billingInfo.state = "State is required";
            errorsFound = true;
        }
        if (!billingZip) {
            newErrors.billingInfo.zip = "Zip code is required";
            errorsFound = true;
        } else if (!/^\d{5}$/.test(billingZip)) {
            newErrors.billingInfo.zip = "Zip code must be 5 digits";
            errorsFound = true;
        }
        // Validate payment information
        const { cardNumber, expirationDate, securityCode } = paymentInfo;
        if (!cardNumber) {
            newErrors.paymentInfo.cardNumber = "Card number is required";
            errorsFound = true;
        }
        if (!expirationDate && /^\d{2}\/\d{2}$/) {
            newErrors.paymentInfo.expirationDate = "Expiration date is required";
            errorsFound = true;
        } else if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
            newErrors.paymentInfo.expirationDate =
                "Expiration date must be in MM/YY format";
            errorsFound = true;
        }
        if (!securityCode) {
            newErrors.paymentInfo.securityCode = "Security code is required";
            errorsFound = true;
        } else if (!/^\d{3}$/.test(securityCode)) {
            newErrors.paymentInfo.securityCode = "Security code must be 3 digits";
            errorsFound = true;
        }
        // Set errors and return if validation fails
        setErrors(newErrors);
        if (errorsFound) {
            return;
        }
        // Prepare order data
        const order = {
            shippingInfo,
            billingInfo,
            paymentInfo,
            items: orderItems,
            total: getTotal()
        };
        // Send order data to server or external service
        console.log(order);
        setConfirmOrder(true);
        // Reset
        // setShippingInfo({
        //     firstName: "",
        //     lastName: "",
        //     address: "",
        //     city: "",
        //     state: "",
        //     zip: ""
        // });
        // setBillingInfo({
        //     firstName: "",
        //     lastName: "",
        //     address: "",
        //     city: "",
        //     state: "",
        //     zip: ""
        // });
        // setPaymentInfo({
        //     cardNumber: "",
        //     expirationDate: "",
        //     securityCode: ""
        // });
        setOrderItems([]);

    };

    const getTotal = () => {
        return orderItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    return (
        <>
            {!confirmOrder &&
                <Form onSubmit={handleSubmit} className="checkout-form">
                    <h2>Shipping Information</h2>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={shippingInfo.firstName}
                            onChange={handleShippingInfoChange}
                            invalid={Boolean(errors.shippingInfo.firstName)}
                        />
                        <div className="invalid-feedback">{errors.shippingInfo.firstName}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={shippingInfo.lastName}
                            onChange={handleShippingInfoChange}
                            invalid={Boolean(errors.shippingInfo.lastName)}
                        />
                        <div className="invalid-feedback">{errors.shippingInfo.lastName}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            value={shippingInfo.address}
                            onChange={handleShippingInfoChange}
                            invalid={Boolean(errors.shippingInfo.address)}
                        />
                        <div className="invalid-feedback">{errors.shippingInfo.address}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input
                            type="text"
                            name="city"
                            id="city"
                            value={shippingInfo.city}
                            onChange={handleShippingInfoChange}
                            invalid={Boolean(errors.shippingInfo.city)}
                        />
                        <div className="invalid-feedback">{errors.shippingInfo.city}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="state">State</Label>
                        <Input
                            type="text"
                            name="state"
                            id="state"
                            value={shippingInfo.state}
                            onChange={handleShippingInfoChange}
                            invalid={Boolean(errors.shippingInfo.state)}
                        />
                        <div className="invalid-feedback">{errors.shippingInfo.state}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="zip">Zip Code</Label>
                        <Input
                            type="text"
                            name="zip"
                            id="zip"
                            value={shippingInfo.zip}
                            onChange={handleShippingInfoChange}
                            invalid={Boolean(errors.shippingInfo.zip)}
                            maxLength={6}
                        />
                        <div className="invalid-feedback">{errors.shippingInfo.zip}</div>
                    </FormGroup>

                    <h2>Billing Information</h2>
                    <FormGroup>
                        <Label for="billingFirstName">First Name</Label>
                        <Input
                            type="text"
                            name="firstName"
                            id="billingFirstName"
                            value={billingInfo.firstName}
                            onChange={handleBillingInfoChange}
                            invalid={Boolean(errors.billingInfo.firstName)}
                        />
                        <div className="invalid-feedback">{errors.billingInfo.firstName}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="billingLastName">Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            id="billingLastName"
                            value={billingInfo.lastName}
                            onChange={handleBillingInfoChange}
                            invalid={Boolean(errors.billingInfo.lastName)}
                        />
                        <div className="invalid-feedback">{errors.billingInfo.lastName}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="billingAddress">Address</Label>
                        <Input
                            type="text"
                            name="address"
                            id="billingAddress"
                            value={billingInfo.address}
                            onChange={handleBillingInfoChange}
                            invalid={Boolean(errors.billingInfo.address)}
                        />
                        <div className="invalid-feedback">{errors.billingInfo.address}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="billingCity">City</Label>
                        <Input
                            type="text"
                            name="city"
                            id="billingCity"
                            value={billingInfo.city}
                            onChange={handleBillingInfoChange}
                            invalid={Boolean(errors.billingInfo.city)}
                        />
                        <div className="invalid-feedback">{errors.billingInfo.city}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="billingState">State</Label>
                        <Input
                            type="text"
                            name="state"
                            id="billingState"
                            value={billingInfo.state}
                            onChange={handleBillingInfoChange}
                            invalid={Boolean(errors.billingInfo.state)}
                        />
                        <div className="invalid-feedback">{errors.billingInfo.state}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="billingZip">Zip Code</Label>
                        <Input
                            type="text"
                            name="zip"
                            id="billingZip"
                            value={billingInfo.zip}
                            onChange={handleBillingInfoChange}
                            invalid={Boolean(errors.billingInfo.zip)}
                            maxLength={6}
                        />
                        <div className="invalid-feedback">{errors.billingInfo.zip}</div>
                    </FormGroup>

                    <h2 className="form-section-title">Order Summary</h2>
                    <div className="order-summary">
                        <div className="item">
                            <p>Item 1</p>
                            <p>$10.00</p>
                        </div>
                        <div className="item">
                            <p>Item 2</p>
                            <p>$20.00</p>
                        </div>
                        <div className="item">
                            <p>Item 3</p>
                            <p>$30.00</p>
                        </div>
                        <div className="total">
                            <p>Total:</p>
                            <p>$60.00</p>
                        </div>
                    </div>

                    <h2>Payment Information</h2>
                    <FormGroup>
                        <Label for="cardNumber">Credit Card Number</Label>
                        <Input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentInfoChange}
                            invalid={Boolean(errors.paymentInfo.cardNumber)}
                            // maxLength={16}
                        />
                        <div className="invalid-feedback">{errors.paymentInfo.cardNumber}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="expirationDate">Expiration Date</Label>
                        <Input
                            type="text"
                            name="expirationDate"
                            id="expirationDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expirationDate}
                            onChange={handlePaymentInfoChange}
                            invalid={Boolean(errors.paymentInfo.expirationDate)}
                            // maxLength={5}
                        />
                        <div className="invalid-feedback">
                            {errors.paymentInfo.expirationDate}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="securityCode">Security Code</Label>
                        <Input
                            type="text"
                            name="securityCode"
                            id="securityCode"
                            value={paymentInfo.securityCode}
                            onChange={handlePaymentInfoChange}
                            invalid={Boolean(errors.paymentInfo.securityCode)}
                            // maxLength={3}
                        />
                        <div className="invalid-feedback">
                            {errors.paymentInfo.securityCode}
                        </div>
                    </FormGroup>

                    <Button type="submit" color="primary" block>
                        Submit
                    </Button>
                </Form>}
            {confirmOrder && <div>
                Form submitted Successfully
            </div>}
        </>
    );
};

export default CheckoutForm;
