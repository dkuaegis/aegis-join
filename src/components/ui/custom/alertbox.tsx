import { Alert, AlertDescription, AlertTitle } from "../alert";
import type { ReactNode } from "react";

/*
icon 에는 아이콘을 전달해주면 됩니다.
*/
interface AlertBoxProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const AlertBox = ({
    icon,
    title,
    description,
}: AlertBoxProps) => {
return (
    <Alert>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
    </Alert>
    );
};


export default AlertBox;