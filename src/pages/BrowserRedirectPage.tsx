import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useExternalBrowser } from "@/hooks/useExternalBrowser";



const BrowserRedirectPage = () => {
    const { openInDefaultBrowser } = useExternalBrowser();
    openInDefaultBrowser();
    return (
        <div className="flex flex-col h-screen justify-center items-center space-y-4 mx-10 wrap-break-word">
            <Label className="text-3xl">
                카카오톡 브라우저에서 접속 중
            </Label>
            <Label className="text-xl text-muted-foreground">
                원활한 회원가입을 위해 외부 브라우저를 사용해주세요
            </Label>

      <div className="space-y-4 w-full max-w-sm">
        {/* 1단계 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gray-800">01</div>
            <div>
              <div className="text-gray-900 text-base font-semibold text-left">
                더보기 버튼 터치
              </div>
              <div className="text-gray-600 text-sm text-left">
                브라우저의{" "}
                <span className="font-mono bg-gray-200 px-1.5 py-0.5 rounded">
                  ⋯
                </span>{" "}
                또는{" "}
                <span className="font-mono bg-gray-200 px-1.5 py-0.5 rounded">
                  ⋮
                </span>{" "}
                버튼을 터치하세요
              </div>
            </div>
          </div>
        </div>

        {/* 2단계 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gray-800">02</div>
            <div>
              <div className="text-gray-900 text-base font-semibold text-left">
                다른 브라우저로 열기
              </div>
              <div className="text-gray-600 text-sm text-left">
                메뉴에서{" "}
                <span className="font-bold text-gray-800">
                  "다른 브라우저로 열기"
                </span>
                를 선택하세요
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="text-sm text-gray-500 text-center">
            <p>문제가 지속되면 동아리 운영진에게 문의해 주세요</p>
        </div>
        </div>
    )
}

export default BrowserRedirectPage;