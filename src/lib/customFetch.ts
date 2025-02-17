import { toast } from "react-toastify";

async function fetchingWithToast(url: string, options: RequestInit = {}): Promise<Response> {

    const response = await fetch(url, options);
    
    if(!response.ok) {
        if(response.status === 401) {
            toast.error("인증되지 않았습니다!");
        } else
        if(response.status === 403) {
            toast.error(`페이지 접근 권한이 없습니다!`);
        } else
        if(response.status === 404) {
            toast.error(`존재하지 않습니다!`);
        }
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response;
}

export default fetchingWithToast;