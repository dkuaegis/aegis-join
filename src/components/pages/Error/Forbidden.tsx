import ErrorMessage from "@/components/ui/custom/errorMessage"

export default function Forbidden() {
  return (
    <ErrorMessage code="403" title="Forbidden" description="Sorry, you don't have permission to access this page." />
  )
}
