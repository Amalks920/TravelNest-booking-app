import { useEffect } from "react";


const useHandlePayment=async ()=>{



    useEffect( ()=>{

        (async ()=>{
            try {
                const stripe = await loadStripe('pk_test_51McT8uSJpQVF6jBTNlHodKtVtviDTJ5I2ApQv9ag4Nr4iwvzERcDxveeDcbIWA8TYpPIM2XqbYqSjAtlUfa7kldc00nshn8huB');  
            console.log(stripe)
            } catch (error) {
                console.log(error)
            }
        })();

    },[])

    return 
}

export default useHandlePayment;