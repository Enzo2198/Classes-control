import {Avatar} from "@mui/material";

// get the initial characters of fullName
function getInitials(fullName: string): string {
  if (!fullName) return '';

  const words = fullName.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0,2).toUpperCase();
  }
  const first = words[0]?.[0] || '';
  const last = words[words.length - 1]?.[0] || '';

  return (first + last).toUpperCase();
}

// get random color based on fullName
function stringToColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff)
    .toString(16)
    .toUpperCase();

  return "#" + "00000".substring(0, 6 - c.length) + c;
}

interface AvatarUser {
  name: string;
  profile?: {url?: string};
}

interface AvatarDefaultProps {
  user: AvatarUser | null,
  width?: number | string,
  height?: number | string,
  mr?: number | string
}

export default function AvatarDefault({user, mr = 2}: AvatarDefaultProps) {
  const hasAvatar = !!user?.profile?.url
  const name = user?.name ?? ''

  return (
    <Avatar
      src={hasAvatar ? user?.profile?.url : undefined}
      sx={{
        backgroundColor: hasAvatar ? 'transparent' : stringToColor(name),
        mr
      }}
    >
      {!hasAvatar && getInitials(name)}
    </Avatar>
  )
}