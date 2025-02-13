import ErrorMessage from "@/components/ui/custom/errorMessage"

export default function NotFound() {
  return (
    <ErrorMessage code="404" title="Page Not Found" description="Sorry, we couldn't find the page you're looking for." />
  )
}
