import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Payment() {
    return(
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">송금 안내</h3>
            <Alert>
                <AlertTitle>시간표 제출 안내</AlertTitle>
                <AlertDescription>
            활동을 계획할 때 수업과 겹치지 않게 계획하기 위해서 시간표가 필요해요.
            시간표 정보는 익명으로 저장돼요.
        </AlertDescription>
        </Alert>
        </div>
        );
}

export default Payment;