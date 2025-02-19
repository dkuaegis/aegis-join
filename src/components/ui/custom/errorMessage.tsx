import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../button";

interface ErrorMessageProps {
  code: string;
  title: string;
  description: string;
}

export default function ErrorMessage({
  code,
  title,
  description,
}: ErrorMessageProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-bold text-6xl text-muted-foreground">{code}</p>
        <h1 className="font-bold text-2xl tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button asChild>
        <Link to="/" className="gap-2">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
