import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type ConsentState, chapters } from "@/constants/regulation";

const Agreement = () => {
  const [openChapters, setOpenChapters] = useState<string[]>([]);
  const [consent, setConsent] = useState<ConsentState>({
    regulations: false,
    privacy: false,
  });

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleConsentChange = (key: keyof ConsentState, checked: boolean) => {
    setConsent((prev) => ({ ...prev, [key]: checked }));
  };

  const allConsentsGiven = Object.values(consent).every(Boolean);

  const renderArticleContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="ml-4 space-y-2">
          {content.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 이 목록은 정적이며 순서가 바뀌지 않으므로 인덱스를 key로 사용합니다.
            <li key={index} className="flex items-start space-x-2">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
              <span className="text-gray-700 text-sm leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-700 text-sm leading-relaxed">{content}</p>;
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto min-h-screen max-w-md bg-white">
        <div className="flex h-[calc(100vh-180px)] flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="rounded-lg border bg-white">
                  <Collapsible
                    open={openChapters.includes(chapter.id)}
                    onOpenChange={() => toggleChapter(chapter.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900 text-sm">
                            {chapter.title}
                          </span>
                        </div>
                        {openChapters.includes(chapter.id) ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="border-gray-100 border-t px-4 pb-4">
                        <div className="mt-4 space-y-4">
                          {chapter.articles.map((article) => (
                            <div key={article.number} className="space-y-2">
                              <h4 className="font-medium text-gray-900 text-sm">
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
          <div className="space-y-4 border-t bg-white p-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3">
                <Checkbox
                  id="regulations"
                  checked={consent.regulations}
                  onCheckedChange={(checked) =>
                    handleConsentChange("regulations", checked as boolean)
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor="regulations"
                  className="cursor-pointer text-gray-700 text-sm"
                >
                  <span className="text-red-500">[필수]</span> Aegis 동아리
                  회칙에 동의합니다
                </label>
              </div>

              <div className="flex items-start space-x-3 p-3">
                <Checkbox
                  id="privacy"
                  checked={consent.privacy}
                  onCheckedChange={(checked) =>
                    handleConsentChange("privacy", checked as boolean)
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor="privacy"
                  className="cursor-pointer text-gray-700 text-sm"
                >
                  <span className="text-red-500">[필수]</span> 개인정보 수집 및
                  이용에 동의합니다
                </label>
              </div>
            </div>

            <Button
              className={`h-12 w-full font-medium text-base ${
                allConsentsGiven
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "cursor-not-allowed bg-gray-300"
              }`}
              disabled={!allConsentsGiven}
            >
              동의하고 계속하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agreement;