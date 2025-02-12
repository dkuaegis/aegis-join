import { Coupon } from "./Coupon.Types";


export const fetchCoupon = async (): Promise<Coupon[]> => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/coupon`);
    if(!response.ok) {
        throw new Error("fetch error: COUPON");
    }
    return response.json();
    
}

// const submitCoupon = async () => {
//     if (loading === LoadingState.LOADING) return;

//     setLoading(LoadingState.LOADING);

//     const payload = selectedCoupons;
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/payments`,
//         {
//           // credentials: "include",
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("에러남");
//       }
//       setLoading(LoadingState.SUCCESS);
//     } catch (err: unknown) {
//       setLoading(LoadingState.ERROR);
//     }

//     setTimeout(() => setLoading(LoadingState.IDLE), 1500);
//   };