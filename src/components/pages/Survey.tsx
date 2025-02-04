import { Checkbox } from "@/components/ui/checkbox";
import { EtcInput } from "@/components/ui/etcinput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useValidation } from "@/lib/context/validationContext";
import { ValidationActions } from "@/lib/reducer/validationReducer";
import {
  type GetSurveyForm,
  InterestField,
  type PostSurveyForm,
} from "@/types/api/survey";
import { ValidState } from "@/types/state/valid";
import { CodeXml, Ellipsis, Gamepad2, GlobeLock } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface InterestItem {
  id: InterestField;
  description: string;
  category?: string;
}

const interests: InterestItem[] = [
  // 보안
  {
    id: InterestField.SECURITY_WEBHACKING,
    description: "웹해킹",
    category: "보안",
  },
  {
    id: InterestField.SECURITY_SYSTEMHACKING,
    description: "시스템해킹",
    category: "보안",
  },
  {
    id: InterestField.SECURITY_REVERSING,
    description: "리버싱",
    category: "보안",
  },
  {
    id: InterestField.SECURITY_FORENSIC,
    description: "포렌식",
    category: "보안",
  },
  {
    id: InterestField.SECURITY_MALWARE,
    description: "악성코드분석",
    category: "보안",
  },
  {
    id: InterestField.SECURITY_CRYPTOGRAPHY,
    description: "암호학",
    category: "보안",
  },
  {
    id: InterestField.SECURITY_NOT_SURE,
    description: "분야를 아직 정하지 못 했어요",
    category: "보안",
  },
  { id: InterestField.SECURITY_ETC, description: "기타", category: "보안" },

  // 웹
  { id: InterestField.WEB_FRONTEND, description: "프론트엔드", category: "웹" },
  { id: InterestField.WEB_BACKEND, description: "백엔드", category: "웹" },
  {
    id: InterestField.WEB_NOT_SURE,
    description: "분야를 아직 정하지 못 했어요",
    category: "웹",
  },
  { id: InterestField.WEB_ETC, description: "기타", category: "웹" },

  // 게임
  {
    id: InterestField.GAME_CLIENT,
    description: "클라이언트",
    category: "게임",
  },
  { id: InterestField.GAME_SERVER, description: "서버", category: "게임" },
  {
    id: InterestField.GAME_NOT_SURE,
    description: "분야를 아직 정하지 못 했어요",
    category: "게임",
  },
  { id: InterestField.GAME_ETC, description: "기타", category: "게임" },

  // 기타
  { id: InterestField.APP, description: "앱" },
  { id: InterestField.DEVOPS, description: "DevOps" },
  { id: InterestField.AI, description: "인공지능" },
  { id: InterestField.NOT_SURE, description: "아직 잘 모르겠어요" },
  { id: InterestField.ETC, description: "기타" },
];

const groupedETC = new Set([
  InterestField.SECURITY_ETC,
  InterestField.WEB_ETC,
  InterestField.GAME_ETC,
  InterestField.ETC,
]);

const LabelIcons: Record<string, React.ComponentType> = {
  보안: GlobeLock,
  웹: CodeXml,
  게임: Gamepad2,
  기타: Ellipsis,
};

function isETC(field: InterestField): boolean {
  return groupedETC.has(field);
}

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

function Survey() {
  const [checkBox, setCheckBox] = useState<Map<InterestField, boolean>>(
    new Map()
  );
  const [interestEtcField, setInterestEtcField] = useState<
    Map<InterestField, string>
  >(new Map());
  const [registrationReason, setRegistrationReason] = useState<string>("");
  const [feedBack, setFeedBack] = useState<string>("");
  const surveyFormRef = useRef<PostSurveyForm>({
    interestFields: [],
    interestEtc: {} as Record<InterestField, string>,
    registrationReason: "",
    feedBack: "",
  });

  const { validationState, validationDispatch } = useValidation();
  const setValid = useCallback(
    () =>
      validationDispatch({
        type: ValidationActions.SET_VALID,
        field: "survey",
      }),
    [validationDispatch]
  );
  const setInvalid = useCallback(
    () =>
      validationDispatch({
        type: ValidationActions.SET_INVALID,
        field: "survey",
      }),
    [validationDispatch]
  );

  const valid = validationState.survey;

  const etcExist = useCallback(
    (field: InterestField): boolean => {
      const value = interestEtcField.get(field);
      return value !== undefined && value.trim() !== "";
    },
    [interestEtcField]
  );

  // ref 로 최신상태를 갱신.
  useEffect(() => {
    surveyFormRef.current = {
      interestFields: Array.from(checkBox.entries())
        .filter(([_, isChecked]) => isChecked)
        .map(([field]) => field),
      interestEtc: Object.fromEntries(interestEtcField) as Record<
        InterestField,
        string
      >,
      registrationReason: registrationReason,
      feedBack: feedBack,
    };
  }, [checkBox, interestEtcField, registrationReason, feedBack]);

  useEffect(() => {
    setInvalid();
    console.log("MOUNTED");
    const getSurveyData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/survey`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("가져오는데 에러");
        }
        const data: GetSurveyForm = await response.json();

        // 응답 객체를 상태에 넣어주기.
        setCheckBox(
          new Map(
            data.interestFields.map((field: InterestField) => [field, true])
          )
        );
        setInterestEtcField(
          new Map(
            Object.entries(data.interestEtc).map(([key, value]) => [
              key as InterestField,
              value,
            ])
          )
        );
        setRegistrationReason(data.registrationReason || "");
        setFeedBack(data.feedBack || "");
        console.log("GET", data);
      } catch (error) {}
    };

    getSurveyData();

    return () => {
      const postSurveyData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/survey/post`,
            {
              credentials: "include",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(surveyFormRef.current),
            }
          );
          if (!response.ok) {
            throw new Error("POST 하는데 에러!!");
          }
          console.log("POST");
        } catch (error) {
          console.log(`error ${error}`);
        }
      };

      postSurveyData();
    };
  }, [setInvalid]);

  const validateSurveyForm = useCallback(() => {
    // 가입 이유가 비어있지 않고 체크박스가 활성화 되어야 valid. 하지만 etc 필드가 체크됐을 때, 비어있으면 안된다.
    // 체크박스의 활성화 됨을 볼 때, 어느 체크박스 하나라도 활성화 되어있으면 ok.

    const isRegistrationReasonValid = registrationReason.trim() !== "";
    const isCheckBoxValid = Array.from(checkBox.values()).some(
      (isChecked) => isChecked
    );
    const isEveryEtcValid = Array.from(checkBox.entries()).every(
      ([field, isChecked]) =>
        !isChecked ||
        (isETC(field)
          ? (interestEtcField.get(field) ?? "").trim() !== ""
          : true)
    );

    if (isRegistrationReasonValid && isCheckBoxValid && isEveryEtcValid) {
      setValid();
    } else {
      setInvalid();
    }
  }, [checkBox, interestEtcField, registrationReason, setValid, setInvalid]);

  useEffect(() => {
    validateSurveyForm();
  }, [validateSurveyForm]);

  function checkedItemHandler(isChecked: boolean | string, id: InterestField) {
    if (typeof isChecked === "boolean") {
      setCheckBox((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, isChecked);
        return newMap;
      });
    }
  }

  const handleFeedbackTextareaChange = (value: string) => setFeedBack(value);
  const handleReasonTextareaChange = (value: string) =>
    setRegistrationReason(value);
  const handleEtcTextareaChange = (field: InterestField, value: string) => {
    setInterestEtcField((prev) => {
      const newMap = new Map<InterestField, string>(prev);
      newMap.set(field, value);
      return newMap;
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">설문조사</h3>
      <div className="space-y-2">
        <Label>관심분야 (다중 선택 가능)</Label>
        <div className="space-y-4">
          {Object.entries(groupedInterests).map(([category, fields]) => {
            const IconComponent = LabelIcons[category];
            return (
              <div key={category} className="mt-4">
                <div className="flex">
                  <IconComponent />
                  <Label className="pl-2 font-medium text-xl">{category}</Label>
                </div>
                <div className="mx-4 mt-2 grid gap-y-4">
                  {fields.map((field) => (
                    <React.Fragment key={field.id}>
                      <div
                        key={field.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={field.id}
                          checked={checkBox.get(field.id) || etcExist(field.id)}
                          onCheckedChange={(checked) =>
                            checkedItemHandler(checked, field.id)
                          }
                        />
                        <Label htmlFor={field.id}>{field.description}</Label>
                        {isETC(field.id) && (
                          <EtcInput
                            className={`${
                              checkBox.get(field.id)
                                ? "visibility-visible opacity-100"
                                : "visibility-hidden opacity-0"
                            }`}
                            id={field.id}
                            name={field.id}
                            placeholder="기타 관심 분야를 작성해주세요"
                            maxLength={20}
                            value={interestEtcField.get(field.id)||""}
                            onValueChange={(value) =>
                              handleEtcTextareaChange(field.id, value)
                            }
                          />
                        )}
                      </div>
                      {isETC(field.id) && (
                        <p
                          className={`pl-2 text-red-500 text-xs ${
                            valid === ValidState.SHOW_ERROR &&
                            checkBox.get(field.id) &&
                            (interestEtcField.get(field.id) ?? "").trim() === ""
                              ? "visibility-visible opacity-100"
                              : "visibility-hidden opacity-0"
                          }`}
                        >
                          기타 분야를 작성해주세요
                        </p>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p
        className={`text-red-500 text-xs ${
          (valid === ValidState.SHOW_ERROR) &&
          !Array.from(checkBox.values()).some((isChecked) => isChecked)
            ? "visibility-visible opacity-100"
            : "visibility-hidden opacity-0"
        }`}
      >
        적어도 하나의 분야를 선택해주세요!
      </p>

      <div className="space-y-2">
        <Label htmlFor="joinReason" className="flex items-end text-xl">
          가입 이유{" "}
          <span
            className={`pb-1 pl-2 text-red-500 text-xs ${valid === ValidState.SHOW_ERROR ? "visibility-visible opacity-100" : "visibility-hidden opacity-0"}`}
          >
            *필수 항목입니다
          </span>
        </Label>
        <Textarea
          id="joinReason"
          name="joinReason"
          placeholder="동아리에서 어떤 활동을 하고 싶으신가요?"
          maxLength={511}
          value={registrationReason}
          onValueChange={handleReasonTextareaChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="messageToManagement" className="text-xl">
          운영진에게 하고 싶은 말
        </Label>

        <Textarea
          id="messageToManagement"
          name="messageToManagement"
          placeholder="예시로 작년과는 이런 점이 달라졌으면 좋겠어요!"
          maxLength={511}
          value={feedBack}
          onValueChange={handleFeedbackTextareaChange}
        />
      </div>
    </div>
  );
}

export default Survey;
