import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InterestField {
	id: string;
	description: string;
	category?: string;
}

const interests: InterestField[] = [
	// Security
	{ id: "SECURITY_WEBHACKING", description: "웹해킹", category: "보안" },
	{ id: "SECURITY_SYSTEMHACKING", description: "시스템해킹", category: "보안" },
	{ id: "SECURITY_REVERSING", description: "리버싱", category: "보안" },
	{ id: "SECURITY_FORENSIC", description: "포렌식", category: "보안" },
	{ id: "SECURITY_MALWARE", description: "악성코드분석", category: "보안" },
	{ id: "SECURITY_CRYPTOGRAPHY", description: "암호학", category: "보안" },
	{ id: "SECURITY_ETC", description: "보안 기타", category: "보안" },

	// Web
	{ id: "WEB_FRONTEND", description: "프론트엔드", category: "웹" },
	{ id: "WEB_BACKEND", description: "백엔드", category: "웹" },
	{ id: "WEB_ETC", description: "웹 기타", category: "웹" },

	// Game
	{ id: "GAME_CLIENT", description: "클라이언트", category: "게임" },
	{ id: "GAME_SERVER", description: "서버", category: "게임" },
	{ id: "GAME_ETC", description: "게임 기타", category: "게임" },

	// Others
	{ id: "APP", description: "앱" },
	{ id: "DEVOPS", description: "DevOps" },
	{ id: "AI", description: "인공지능" },
	{ id: "NOT_SURE", description: "아직 잘 모르겠어요" },
	{ id: "ETC", description: "기타" },
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
	{} as Record<string, InterestField[]>,
);

function Survey() {
	return (
		<div className="space-y-4">
			<h3 className="font-semibold text-lg">설문조사</h3>
			<div className="space-y-2">
				<Label>관심분야 (다중 선택 가능)</Label>
				<div className="space-y-4">
					{Object.entries(groupedInterests).map(([category, fields]) => (
						<div key={category} className="space-y-2">
							<Label className="font-medium">{category}</Label>
							<div className="space-y-2 ml-4">
								{fields.map((field) => (
									<div key={field.id} className="flex items-center space-x-2">
										<Checkbox id={field.id} />
										<Label htmlFor={field.id}>{field.description}</Label>
									</div>
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
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="messageToManagement">운영진에게 하고 싶은 말</Label>
				<Textarea
					id="messageToManagement"
					name="messageToManagement"
					placeholder="예시로 작년과는 이런 점이 달라졌으면 좋겠어요!"
				/>
			</div>
		</div>
	);
}

export default Survey;
