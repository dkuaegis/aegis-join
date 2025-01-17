import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckCircleIcon, CircleHelp, ExternalLink, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

function Discord() {

    const [discordLink ,setDiscordLink] = useState<string>("");
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isDiscordInvitedSuccess, setIsDiscordInvitedSuccess] = useState<boolean>(false);  
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        const fetchDiscordLink = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_GET_DISCORD_URL);
                if (!response.ok) {
                    throw new Error(`HTTP ERROR! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setDiscordLink(data.discordLink);
            } catch (err: any) {
                setError(err.message)
            } finally {
                setIsChecking(true);
            }
        };

        fetchDiscordLink();
        
    }, []);

    const startPolling = useCallback(() => {
        let attempts = 0;
        const interval = 2000;

        const poll = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_GET_DISCORD_CHECK);
                if (!response.ok) {
                    throw new Error("HTTP ERROR");
                }
                const data = await response.json();

                if (data.status === "COMPLETE") {
                    setIsDiscordInvitedSuccess(true);
                    setIsChecking(false);
                    return;
                }
                attempts++;
                setTimeout(poll, interval);
            } catch (err: any) {
                setIsChecking(false);
            }
        };

        setIsChecking(true);
        poll();
    }, []);

    function discordCheck() {
        window.open(discordLink, '_blank');
        startPolling();
    }

    return(
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">디스코드 연동</h3>
            <Alert>
                <CircleHelp className="h-4 w-4" />
                <AlertTitle>디스코드 연동이 왜 필요한가요?</AlertTitle>
                <AlertDescription>
                어쩌구 저쩌구
                </AlertDescription>
            </Alert>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <span className="text-sm font-medium truncate shadow-none">{discordLink}</span>
                <Button 
                className="shadow-none"
                variant="secondary"
                onClick={() => discordCheck()}
                >
                참여하기
                <ExternalLink className="h-4 w-2 mr-2"  />
                </Button>
            </div>
            <div className="flex items-center justify-center">
                {isDiscordInvitedSuccess ?  
                (<>
                <CheckCircleIcon className="h-8 w-8 text-green-400"/>
                <p className="pl-4 text-green-400">가입 확인이 완료되었습니다 !</p>
                 </>) :
                (<>
                <LoaderCircle 
                    className="h-8 w-8 animate-spin text-gray-500"
                    style={{ animation: 'spin 3s linear infinite'}}
                />
                <p className="pl-4" >디스코드 가입 확인 중입니다 . . .</p>
                </>)
                }
            </div>
        </div>
        );
}

export default Discord;