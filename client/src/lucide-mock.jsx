import React from 'react';

const createMockIcon = (emoji) => ({ size, color, className, style }) => (
  <span style={{ fontSize: size || 16, color, ...style }} className={className} role="img" aria-hidden="true">
    {emoji}
  </span>
);

export const BookOpen = createMockIcon('📖');
export const LayoutDashboard = createMockIcon('📊');
export const Trophy = createMockIcon('🏆');
export const User = createMockIcon('👤');
export const Shield = createMockIcon('🛡️');
export const Bell = createMockIcon('🔔');
export const Clock = createMockIcon('🕒');
export const LogOut = createMockIcon('🚪');
export const Menu = createMockIcon('☰');
export const X = createMockIcon('❌');
export const Zap = createMockIcon('⚡');
export const TrendingUp = createMockIcon('📈');
export const Star = createMockIcon('⭐');
export const Target = createMockIcon('🎯');
export const UserCheck = createMockIcon('✅');
export const ArrowRight = createMockIcon('➡️');
export const ChevronRight = createMockIcon('❯');
export const Sparkles = createMockIcon('✨');
export const Mail = createMockIcon('✉️');
export const Lock = createMockIcon('🔒');

export const Medal = createMockIcon('🏅');
export const Github = createMockIcon('🐙');
export const Twitter = createMockIcon('🐦');
export const Linkedin = createMockIcon('🔗');
export const Eye = createMockIcon('👁️');
export const EyeOff = createMockIcon('🙈');
export const AlertCircle = createMockIcon('⚠️');
export const CheckCircle = createMockIcon('✅');
