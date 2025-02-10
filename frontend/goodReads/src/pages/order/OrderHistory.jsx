import React, { useEffect } from 'react';

const OrderHistory = () => {
    const headers = {
        id: localStorage.getItem('id'),
        authToken: `bearer ${localStorage.getItem("token")}`  
    }

    useEffect();

    return (
        <>
        <div>order history</div>
        </>
    );
}

export default OrderHistory;