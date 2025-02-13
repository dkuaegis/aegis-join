import { ArrowLeft } from "lucide-react"
import { Button } from "../button"
import { Link } from "react-router-dom" 

interface ErrorMessageProps {
    code: string
    title: string
    description: string
}

export default function ErrorMessage({code, title, description}: ErrorMessageProps) {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-6xl font-bold text-muted-foreground">{code}</p>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button asChild>
          <Link to="/" className="gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </Button>
      </div>
    )
}