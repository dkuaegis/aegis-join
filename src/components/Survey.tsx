import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EtcInput } from "@/components/ui/etcinput";
import { useState, useEffect } from "react";
import { SurveyForm, InterestField } from "@/types/api/survey";

interface InterestItem {
  id: InterestField;
  description: string;
  category?: string;
}

export const interests: InterestItem[] = [
  // 보안
  { id: InterestField.SECURITY_WEBHACKING, description: "웹해킹", category: "보안" },
  { id: InterestField.SECURITY_SYSTEMHACKING, description: "시스템해킹", category: "보안" },
  { id: InterestField.SECURITY_REVERSING, description: "리버싱", category: "보안" },
  { id: InterestField.SECURITY_FORENSIC, description: "포렌식", category: "보안" },
  { id: InterestField.SECURITY_MALWARE, description: "악성코드분석", category: "보안" },
  { id: InterestField.SECURITY_CRYPTOGRAPHY, description: "암호학", category: "보안" },
  { id: InterestField.SECURITY_ETC, description: "기타", category: "보안" },

  // 웹
  { id: InterestField.WEB_FRONTEND, description: "프론트엔드", category: "웹" },
  { id: InterestField.WEB_BACKEND, description: "백엔드", category: "웹" },
  { id: InterestField.WEB_ETC, description: "기타", category: "웹" },

  // 게임
  { id: InterestField.GAME_CLIENT, description: "클라이언트", category: "게임" },
  { id: InterestField.GAME_SERVER, description: "서버", category: "게임" },
  { id: InterestField.GAME_ETC, description: "기타", category: "게임" },

  // 기타
  { id: InterestField.APP, description: "앱" },
  { id: InterestField.DEVOPS, description: "DevOps" },
  { id: InterestField.AI, description: "인공지능" },
  { id: InterestField.NOT_SURE, description: "아직 잘 모르겠어요" },
  { id: InterestField.ETC, description: "기타" },
];

const groupedInterests = interests.reduce(
  (acc, interest) => {
    if (interest.category) {
      if (!acc[interest.category]) {
        acc[interest.category] = [];
      }
      acc[interest.category].push(interest);
    } else {
      if (!acc.기타) {
        acc.기타 = [];
      }
      acc.기타.push(interest);
    }
    return acc;
  },
  {} as Record<string, InterestItem[]>
);

const groupedETC = new Set([
  InterestField.SECURITY_ETC,
  InterestField.WEB_ETC,
  InterestField.GAME_ETC,
  InterestField.ETC
]);

function isETC(field: InterestField): boolean {
  return groupedETC.has(field);
}

function Survey() {
  const [interestEtcField, setInterestEtcField] = useState<Map<InterestField,string>>(new Map);
  const [registrationReason, setRegistrationReason] = useState<string>("");
  const [feedBack, setFeedBack] = useState<string>("");
  const [checkBox, setCheckBox] = useState<Map<InterestField,boolean>>(new Map);

  const [surveyForm, setSurveyForm] = useState<SurveyForm>();

  useEffect(() => {
    setSurveyForm({
      interestFields: Array.from(checkBox.entries())
        .filter(([_,isChecked]) => isChecked)
        .map(([field]) => field as InterestField),
      interestEtc: Object.fromEntries(interestEtcField)  as Record<InterestField, string>,
      registrationReason,
      feedBack
    });
    console.log(surveyForm);
  },[interestEtcField, registrationReason, feedBack, checkBox]);

  function checkedItemHandler(isChecked:boolean | string, id: InterestField) { 
    if(typeof isChecked === 'boolean') {
      setCheckBox((prev) => {
        const newMap = new Map(prev);
        newMap.set(id,isChecked);
        return newMap;
      })
    }
  }

  const handleFeedbackTextareaChange = (value: string) => {
    setFeedBack(value);
  }

  const handleReasonTextareaChange = (value: string) => {
    setRegistrationReason(value);
  }

  const handleEtcTextareaChange = (field: InterestField,value: string) => {
    setInterestEtcField((prev) => {
      const newMap = new Map<InterestField,string>(prev);
      newMap.set(field,value);
      return newMap;
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">설문조사</h3>
      <div className="space-y-2">
        <Label>관심분야 (다중 선택 가능)</Label>
        <div className="space-y-4">
          {Object.entries(groupedInterests).map(([category, fields]) => (
            <div key={category} className="space-y-2">
              <Label className="font-medium">{category}</Label>
              <div className="ml-4 space-y-2">
                {fields.map((field) => (
                  <>
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox id={field.id} onCheckedChange={(checked) => checkedItemHandler(checked, field.id)}  />
                    <Label htmlFor={field.id}>{field.description}</Label>
                    {checkBox.get(field.id) && isETC(field.id) &&
                    <EtcInput 
                      id={field.id}
                      name={field.id} 
                      placeholder="기타 관심 분야를 작성해주세요"
                      maxLength={20}   
                      onValueChange={(value) => handleEtcTextareaChange(field.id, value)}
                    />
                  }
                  </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="joinReason">가입 이유</Label>
        <Textarea
          id="joinReason"
          name="joinReason"
          placeholder="동아리에서 어떤 활동을 하고 싶으신가요?"
          maxLength={511}
          onValueChange={handleReasonTextareaChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="messageToManagement">운영진에게 하고 싶은 말</Label>
        <Textarea
          id="messageToManagement"
          name="messageToManagement"
          placeholder="예시로 작년과는 이런 점이 달라졌으면 좋겠어요!"
          maxLength={511}
          onValueChange={handleFeedbackTextareaChange}
        />
      </div>
    </div>
  );
}

export default Survey;
