import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PersonalInfo() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">기본 인적사항</h3>
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" name="name" placeholder="홍길동" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthDate">생년월일</Label>
        <Input id="birthDate" name="birthDate" placeholder="020101" />
      </div>
      <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">남자</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">여자</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Label htmlFor="studentId">학번</Label>
        <Input id="studentId" name="studentId" placeholder="32000000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">전화번호</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="010-1234-5678"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">소속</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="학과 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="software">SW융합대학 소프트웨어학과</SelectItem>
            <SelectItem value="computer">SW융합대학 컴퓨터공학과</SelectItem>
            <SelectItem value="mobile">
              SW융합대학 모바일시스템공학과
            </SelectItem>
            <SelectItem value="security">SW융합대학 사이버보안학과</SelectItem>
            <SelectItem value="data">
              SW융합대학 통계데이터사이언스학과
            </SelectItem>
            <SelectItem value="sw">SW융합대학 SW융합학부</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="academicStatus">모집 학기 기준 학적</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="학적 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enrolled">재학</SelectItem>
            <SelectItem value="leave">휴학</SelectItem>
            <SelectItem value="graduated">졸업</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="academicYear">모집 학기 기준 학년</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="학년 선택" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4].map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}학년
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="academicSemester">모집 학기 기준 학기</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="학기 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1학기</SelectItem>
            <SelectItem value="2">2학기</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default PersonalInfo;
