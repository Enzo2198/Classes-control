import {Avatar} from "@mui/material";
import type {User} from "../../utils/types/user.ts";

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
  const color: string =
    '#' +
    ((hash >> 24) & 0xFF).toString(16).padStart(2, '0') +
    ((hash >> 16) & 0xFF).toString(16).padStart(2, '0') +
    ((hash >> 8) & 0xFF).toString(16).padStart(2, '0');
  return color;
}

interface AvatarDefaultProps {
  user?: User | null,
  width?: number | string,
  height?: number | string,
  mr?: number | string
}

export default function AvatarDefault({user, mr = 2}: AvatarDefaultProps) {
  const hasAvatar = !!user?.profile?.url
  const name = user?.name ?? ''

  return (
    <Avatar
      src={hasAvatar ? user?.profile.url : undefined}
      sx={{
        backgroundColor: hasAvatar ? 'transparent' : stringToColor(name),
        mr
      }}
    >
      {!hasAvatar && getInitials(name)}
    </Avatar>
  )
}