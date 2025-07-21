import { useState } from "react"
import { ChevronDown, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ConsentState, Chapter, Article, chapters  } from "@/constants/regulation"

export default function AegisConsentPage() {
  const [openChapters, setOpenChapters] = useState<string[]>([])
  const [consent, setConsent] = useState<ConsentState>({
    regulations: false,
    privacy: false,
  })

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => (prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]))
  }


  const handleConsentChange = (key: keyof ConsentState, checked: boolean) => {
    setConsent((prev) => ({ ...prev, [key]: checked }))
  }

  const allConsentsGiven = Object.values(consent).every(Boolean)

  const renderArticleContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2 ml-4">
          {content.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-gray-700 leading-relaxed text-sm">{item}</span>
            </li>
          ))}
        </ul>
      )
    }
    return <p className="text-gray-700 leading-relaxed text-sm">{content}</p>
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="p-6 border-b">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Aegis 회칙</h1>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-180px)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="border rounded-lg bg-white">
                  <Collapsible open={openChapters.includes(chapter.id)} onOpenChange={() => toggleChapter(chapter.id)}>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">{chapter.title}</span>
                        </div>
                        {openChapters.includes(chapter.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="space-y-4 mt-4">
                          {chapter.articles.map((article) => (
                            <div key={article.number} className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-900">
                                제{article.number}조 {article.title}
                              </h4>
                              {renderArticleContent(article.content)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Consent Section */}
          <div className="p-4 border-t bg-white space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3">
                <Checkbox
                  id="regulations"
                  checked={consent.regulations}
                  onCheckedChange={(checked) => handleConsentChange("regulations", checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="regulations" className="text-sm text-gray-700 cursor-pointer">
                  <span className="text-red-500">[필수]</span> Aegis 동아리 회칙에 동의합니다
                </label>
              </div>

              <div className="flex items-start space-x-3 p-3">
                <Checkbox
                  id="privacy"
                  checked={consent.privacy}
                  onCheckedChange={(checked) => handleConsentChange("privacy", checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
                  <span className="text-red-500">[필수]</span> 개인정보 수집 및 이용에 동의합니다
                </label>
              </div>
            </div>

            <Button
              className={`w-full h-12 text-base font-medium ${
                allConsentsGiven ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!allConsentsGiven}
            >
              동의하고 계속하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}