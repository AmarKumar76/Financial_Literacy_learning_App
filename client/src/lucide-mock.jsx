import React from 'react';

function createIcon(name, paths) {
  const IconComponent = (props) => {
    const size = props.size || 18;
    const color = props.color || 'currentColor';
    const className = props.className || '';
    const strokeWidth = props.strokeWidth || 2;
    const fill = props.fill || 'none';

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={props.style}
      >
        {paths}
      </svg>
    );
  };
  IconComponent.displayName = name;
  return IconComponent;
}

export const Home = createIcon('Home', <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />);
export const BookOpen = createIcon('BookOpen', <>
  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
</>);
export const Play = createIcon('Play', <polygon points="5 3 19 12 5 21 5 3" />);
export const BarChart3 = createIcon('BarChart3', <>
  <path d="M3 3v18h18" />
  <path d="M18 17V9" />
  <path d="M13 17V5" />
  <path d="M8 17v-3" />
</>);
export const Trophy = createIcon('Trophy', <>
  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
  <path d="M4 22h16" />
  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
  <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
</>);
export const Users = createIcon('Users', <>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
  <circle cx="9" cy="7" r="4" />
  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
</>);
export const FileText = createIcon('FileText', <>
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
  <polyline points="14 2 14 8 20 8" />
  <line x1="16" y1="13" x2="8" y2="13" />
  <line x1="16" y1="17" x2="8" y2="17" />
  <line x1="10" y1="9" x2="8" y2="9" />
</>);
export const Calculator = createIcon('Calculator', <>
  <rect width="16" height="20" x="4" y="2" rx="2" />
  <line x1="8" x2="16" y1="6" y2="6" />
  <line x1="16" x2="16" y1="14" y2="18" />
  <path d="M16 10h.01" />
  <path d="M12 10h.01" />
  <path d="M8 10h.01" />
  <path d="M12 14h.01" />
  <path d="M8 14h.01" />
  <path d="M12 18h.01" />
  <path d="M8 18h.01" />
</>);
export const PiggyBank = createIcon('PiggyBank', <>
  <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-3.5c1-.5 1.5-1 2.5-2 2.5 0 2.5-4 1-5 0-.5 0-1-1.5-1.5" />
  <path d="M16 11h.01" />
</>);
export const TrendingUp = createIcon('TrendingUp', <>
  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
  <polyline points="16 7 22 7 22 13" />
</>);
export const Target = createIcon('Target', <>
  <circle cx="12" cy="12" r="10" />
  <circle cx="12" cy="12" r="6" />
  <circle cx="12" cy="12" r="2" />
</>);
export const Zap = createIcon('Zap', <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />);
export const Star = createIcon('Star', <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />);
export const Flame = createIcon('Flame', <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />);
export const Search = createIcon('Search', <>
  <circle cx="11" cy="11" r="8" />
  <path d="m21 21-4.3-4.3" />
</>);
export const Bell = createIcon('Bell', <>
  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
</>);
export const ChevronDown = createIcon('ChevronDown', <path d="m6 9 6 6 6-6" />);
export const ChevronRight = createIcon('ChevronRight', <path d="m9 18 6-6-6-6" />);
export const ChevronLeft = createIcon('ChevronLeft', <path d="m15 18-6-6 6-6" />);
export const ArrowRight = createIcon('ArrowRight', <>
  <path d="M5 12h14" />
  <path d="m12 5 7 7-7 7" />
</>);
export const ArrowUp = createIcon('ArrowUp', <>
  <path d="m5 12 7-7 7 7" />
  <path d="M12 19V5" />
</>);
export const Check = createIcon('Check', <path d="M20 6 9 17l-5-5" />);
export const Crown = createIcon('Crown', <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 .616.492l5.628 1.876a.5.5 0 0 1 .207.828l-4.137 3.86a1 1 0 0 0-.27.834l.872 5.584a.5.5 0 0 1-.722.525l-5.01-2.483a1 1 0 0 0-.888 0l-5.01 2.483a.5.5 0 0 1-.722-.525l.872-5.584a1 1 0 0 0-.27-.834l-4.137-3.86a.5.5 0 0 1 .207-.828l5.628-1.876a1 1 0 0 0 .616-.492z" />);
export const Info = createIcon('Info', <>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4" />
  <path d="M12 8h.01" />
</>);
export const Quote = createIcon('Quote', <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 6-4 6zm11 0c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 6-4 6z" />);
export const Menu = createIcon('Menu', <>
  <line x1="4" x2="20" y1="12" y2="12" />
  <line x1="4" x2="20" y1="6" y2="6" />
  <line x1="4" x2="20" y1="18" y2="18" />
</>);
export const X = createIcon('X', <>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</>);
export const User = createIcon('User', <>
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</>);
export const Settings = createIcon('Settings', <>
  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
  <circle cx="12" cy="12" r="3" />
</>);
export const LogOut = createIcon('LogOut', <>
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  <polyline points="16 17 21 12 16 7" />
  <line x1="21" x2="9" y1="12" y2="12" />
</>);
export const Clock = createIcon('Clock', <>
  <circle cx="12" cy="12" r="10" />
  <polyline points="12 6 12 12 16 14" />
</>);
export const Lock = createIcon('Lock', <>
  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
</>);
export const Mail = createIcon('Mail', <>
  <rect width="20" height="16" x="2" y="4" rx="2" />
  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
</>);
export const LayoutDashboard = createIcon('LayoutDashboard', <>
  <rect width="7" height="9" x="3" y="3" rx="1" />
  <rect width="7" height="5" x="14" y="3" rx="1" />
  <rect width="7" height="9" x="14" y="12" rx="1" />
  <rect width="7" height="5" x="3" y="16" rx="1" />
</>);
export const Shield = createIcon('Shield', <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />);
export const PieChart = createIcon('PieChart', <>
  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
  <path d="M22 12A10 10 0 0 0 12 2v10z" />
</>);
export const Github = createIcon('Github', <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />);
export const Twitter = createIcon('Twitter', <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />);
export const Linkedin = createIcon('Linkedin', <>
  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
  <rect width="4" height="12" x="2" y="9" />
  <circle cx="4" cy="4" r="2" />
</>);
export const Award = createIcon('Award', <>
  <circle cx="12" cy="8" r="6" />
  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
</>);
export const ShieldAlert = createIcon('ShieldAlert', <>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  <line x1="12" x2="12" y1="8" y2="12" />
  <line x1="12" x2="12.01" y1="16" y2="16" />
</>);
export const DollarSign = createIcon('DollarSign', <>
  <line x1="12" x2="12" y1="2" y2="22" />
  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
</>);
export const Eye = createIcon('Eye', <>
  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
  <circle cx="12" cy="12" r="3" />
</>);
export const EyeOff = createIcon('EyeOff', <>
  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
  <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
  <line x1="2" x2="22" y1="2" y2="22" />
</>);
export const AlertCircle = createIcon('AlertCircle', <>
  <circle cx="12" cy="12" r="10" />
  <line x1="12" x2="12" y1="8" y2="12" />
  <line x1="12" x2="12.01" y1="16" y2="16" />
</>);
export const CheckCircle = createIcon('CheckCircle', <>
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  <polyline points="22 4 12 14.01 9 11.01" />
</>);
export const CheckCircle2 = createIcon('CheckCircle2', <>
  <circle cx="12" cy="12" r="10" />
  <path d="m9 12 2 2 4-4" />
</>);
export const XCircle = createIcon('XCircle', <>
  <circle cx="12" cy="12" r="10" />
  <path d="m15 9-6 6" />
  <path d="m9 9 6 6" />
</>);
export const Lightbulb = createIcon('Lightbulb', <>
  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.7 1.3 1.5 1.5 2.5" />
  <path d="M9 18h6" />
  <path d="M10 22h4" />
</>);
export const FileCheck = createIcon('FileCheck', <>
  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  <path d="m9 15 2 2 4-4" />
</>);
export const UserCheck = createIcon('UserCheck', <>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
  <circle cx="9" cy="7" r="4" />
  <polyline points="16 11 18 13 22 9" />
</>);
export const Sparkles = createIcon('Sparkles', <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />);
export const Medal = createIcon('Medal', <>
  <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
  <path d="M11 12 5.12 2.2" />
  <path d="m13 12 5.88-9.8" />
  <circle cx="12" cy="17" r="5" />
</>);
export const Brain = createIcon('Brain', <>
  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
  <path d="M15 13a3 3 0 1 0-6 0" />
</>);
export const Activity = createIcon('Activity', <path d="M22 12h-4l-3 9L9 3l-3 9H2" />);
export const Heart = createIcon('Heart', <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />);

export const Plus = createIcon('Plus', <path d="M12 5v14M5 12h14" />);
export const RefreshCw = createIcon('RefreshCw', <>
  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
  <path d="M21 3v5h-5" />
  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  <path d="M3 21v-5h5" />
</>);
export const Bot = createIcon('Bot', <>
  <path d="M12 8V4H8" />
  <rect width="16" height="12" x="4" y="8" rx="2" />
  <path d="M2 14h2" />
  <path d="M20 14h2" />
  <path d="M15 13v2" />
  <path d="M9 13v2" />
</>);
export const Send = createIcon('Send', <>
  <path d="m22 2-7 20-4-9-9-4Z" />
  <path d="M22 2 11 13" />
</>);
export const MessageSquare = createIcon('MessageSquare', <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />);
export const Trash2 = createIcon('Trash2', <>
  <path d="M3 6h18" />
  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  <line x1="10" x2="10" y1="11" y2="17" />
  <line x1="14" x2="14" y1="11" y2="17" />
</>);
export const Minimize2 = createIcon('Minimize2', <>
  <polyline points="4 14 10 14 10 20" />
  <polyline points="20 10 14 10 14 4" />
  <line x1="14" x2="21" y1="10" y2="3" />
  <line x1="3" x2="10" y1="21" y2="14" />
</>);
export const HelpCircle = createIcon('HelpCircle', <>
  <circle cx="12" cy="12" r="10" />
  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
  <line x1="12" x2="12.01" y1="17" y2="17" />
</>);

export default {
  Home,
  BookOpen,
  Play,
  BarChart3,
  Trophy,
  Users,
  FileText,
  Calculator,
  PiggyBank,
  TrendingUp,
  Target,
  Zap,
  Star,
  Flame,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Crown,
  Info,
  Quote,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Clock,
  Lock,
  Mail,
  LayoutDashboard,
  Shield,
  PieChart,
  Github,
  Twitter,
  Linkedin,
  Award,
  ShieldAlert,
  DollarSign,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  FileCheck,
  UserCheck,
  Sparkles,
  Medal,
  Brain,
  Activity,
  Heart,
  Plus,
  RefreshCw,
};
