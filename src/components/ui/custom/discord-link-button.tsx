import { Button } from "@/components/ui/button";
import DiscordIcon from "@/assets/discordIcon.svg";

interface DiscordLinkButtonProps {
    text: string,
    url: string,
}

const DiscordLinkButton = ({ text, url} : DiscordLinkButtonProps) => {
  return (
    <Button
      variant="discord"
      size="lg"
      className="w-full"
      asChild
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={DiscordIcon}
          alt="Discord Icon"
          className="h-6 w-6"
        />
        <span className="text-base">{text}</span>
      </a>
    </Button>
  );
}

export default DiscordLinkButton;