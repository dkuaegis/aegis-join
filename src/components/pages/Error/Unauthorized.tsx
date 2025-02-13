import ErrorMessage from "@/components/ui/custom/errorMessage"

export default function Unauthorized() {
  return (
    <ErrorMessage
      code="401"
      title="Unauthorized"
      description="Sorry, you need to be authenticated to access this page."
    />
  )
}

