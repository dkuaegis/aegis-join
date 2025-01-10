import Everytime from "@/components/Everytime";
import PersonalInfo from "@/components/PersonalInfo";
import Survey from "@/components/Survey";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

function App() {
	const [currentStep, setCurrentStep] = useState(1);
	const components = [
		<PersonalInfo key="personal-info" />,
		<Survey key="survey" />,
		<Everytime key="everytime" />,
	];
	const totalSteps = components.length;

	const handleNext = () => {
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<div className="mx-auto w-full max-w-md px-4 py-8">
			<div className="mb-6">
				<h1 className="font-bold text-2xl">동아리 회원 가입</h1>
				<Progress
					value={(currentStep / totalSteps) * 100}
					className="mt-4 w-full"
				/>
			</div>
			<div className="space-y-6 mb-6">{components[currentStep - 1]}</div>

			<div className="flex justify-between">
				{currentStep > 1 && (
					<Button type="button" onClick={handlePrevious}>
						이전
					</Button>
				)}
				{currentStep < totalSteps && (
					<Button
						type="button"
						onClick={handleNext}
						className={currentStep === 1 ? "ml-auto" : ""}
					>
						다음
					</Button>
				)}
			</div>
		</div>
	);
}

export default App;
