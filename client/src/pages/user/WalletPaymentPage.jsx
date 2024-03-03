import React, { lazy, Suspense } from 'react';

const WalletPayment = lazy(() => import("../../features/walletPayment/components/WalletPayment"));


const WalletPaymentPage=()=>{

    return <WalletPayment/>
}


export default WalletPaymentPage;