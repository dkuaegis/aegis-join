import { toast } from "react-toastify";

async function fetchingWithToast(url: string, options: RequestInit = {}): Promise<Response> {

    const response = await fetch(url, {
        // credentials: "include",
        ...options
    });
    
    if(!response.ok) {
        const data = await response.json();
        toast.error(`${response.status} 에러!  ${data.message}`, {
            theme: "colored",
            className: "bg-red-300 text-white rounded-lg shadow-lg p-4",
        })
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response;
}

export default fetchingWithToast;