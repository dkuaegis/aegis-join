import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";

const StudentResidentNumber = () => {
    return (
        <div className="space-y-2">
            <Label htmlFor="registrationNumber">주민등록번호</Label>
            <div className="flex items-center space-x-2">
                <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="생년월일 6자리"
                    className="h-12 text-base text-left"
                    aria-invalid="false"
                    maxLength={6}
                />
                <span className="text-xl font-bold text-gray-400">-</span>
                <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="성별"
                    className="h-12 text-base text-center w-16"
                    aria-invalid="false"
                    maxLength={1}
                />
                <div className="flex space-x-1">
                    {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default StudentResidentNumber;