import type { SolutionTool } from "@/data/solutions";
import { cn } from "@/lib/utils";

function Svg({ children, className, viewBox = "0 0 24 24" }: { children: React.ReactNode; className?: string; viewBox?: string }) {
  return (
    <svg aria-hidden viewBox={viewBox} className={cn("size-[14px] shrink-0", className)}>
      {children}
    </svg>
  );
}

const icons: Record<SolutionTool, () => React.ReactElement> = {
  Codex: () => (
    <Svg>
      <circle cx="12" cy="12" r="11" fill="#5b63f6" />
      <path d="M8.2 6.4c2.2-1.6 5.4-1.6 7.6 0 2.2 1.6 3.2 4.5 2.4 7.1-.8 2.6-3.3 4.4-6.2 4.4s-5.4-1.8-6.2-4.4c-.8-2.6.2-5.5 2.4-7.1Z" fill="#8f97ff" opacity=".55" />
      <path d="m8.3 9.6 2.6 2.4-2.6 2.4" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.6 15h3.4" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
    </Svg>
  ),
  "Claude Code": () => (
    <Svg viewBox="0 0 16 12" className="w-[16px]">
      <path fill="#D97757" d="M3 0h10v1h1v3h2v2h-2v2h-1v4h-2v-2H9v2H7v-2H5v2H3V8H2V6H0V4h2V1h1z" />
      <path fill="#1a1a1a" d="M5 3h1v2H5zm5 0h1v2h-1z" />
    </Svg>
  ),
  Astro: () => (
    <Svg>
      <path fill="#BC52EE" d="M8.6 2.6c.2-.6.6-.9 1.1-.9h4.6c.5 0 .9.3 1.1.9l4.3 13.3c-1.6-.8-3.4-1.4-5.3-1.7L12.6 7.6c-.1-.4-.6-.4-.7 0l-1.9 6.6c-1.9.3-3.7.9-5.3 1.7L8.6 2.6Z" />
      <path fill="#FF5D01" d="M8.4 18.2c-.6 1.6-.2 3.3 1.5 4.3-.2-1.1.4-1.9 1.4-2 1.8-.2 2.9.6 3.3-1.5.1-.4 0-.8-.2-1.1-1.8.6-4.2.6-6 .3Z" />
    </Svg>
  ),
  "Next.js": () => (
    <Svg>
      <circle cx="12" cy="12" r="11.5" fill="#000" />
      <path d="M9 16.5V7.5l8 10.5M15.2 7.5v6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  ),
  Vercel: () => (
    <Svg>
      <path fill="#000" d="M12 2.5 23 21.5H1L12 2.5Z" />
    </Svg>
  ),
  Shopify: () => (
    <Svg viewBox="0 0 48 48">
      <path fill="#95BF47" d="M11 15.5 14 13h20l3 2.5L39 42H9l2-26.5Z" />
      <path fill="#5E8E3E" d="M34 13 37 15.5 39 42h-7l2-29Z" />
      <path d="M18.5 15v-2.5a5.5 5.5 0 0 1 11 0V15" fill="none" stroke="#5E8E3E" strokeWidth="2.4" strokeLinecap="round" />
      <path fill="#fff" d="M23.6 34.4c-2.4 0-4.2-1-4.9-1.6l1.2-3.1c.9.7 2.4 1.5 3.8 1.5 1 0 1.5-.4 1.5-1 0-.8-.8-1.1-2.2-1.7-1.9-.8-3.4-1.9-3.4-4.1 0-2.6 2.2-4.6 5.6-4.6 1.8 0 3.2.4 4 .9l-1.1 3c-.7-.4-1.8-.8-3-.8-1 0-1.4.4-1.4.9 0 .7.8 1 2.3 1.7 2.1.9 3.3 2.1 3.3 4.1 0 2.7-2.2 4.8-5.7 4.8Z" />
    </Svg>
  ),
  Stripe: () => (
    <Svg>
      <path fill="#635BFF" d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
    </Svg>
  ),
  Analytics: () => (
    <Svg>
      <rect x="16" y="2" width="6" height="20" rx="3" fill="#F9AB00" />
      <rect x="9" y="9" width="6" height="13" rx="3" fill="#E37400" />
      <circle cx="5" cy="19" r="3" fill="#E37400" />
    </Svg>
  ),
  Supabase: () => (
    <Svg>
      <path fill="#249361" d="M13.4 22.6c-.6.7-1.7.3-1.7-.6V14h8.6c1.6 0 2.4 1.8 1.4 3l-8.3 5.6Z" />
      <path fill="#3ECF8E" d="M10.6 1.4c.6-.7 1.7-.3 1.7.6V10H3.7c-1.6 0-2.4-1.8-1.4-3L10.6 1.4Z" />
      <path fill="#3ECF8E" d="M12.3 10h8c1.6 0 2.4 1.8 1.4 3l-8.3 9.6c-.6.7-1.7.3-1.7-.6V10h.6Z" opacity=".9" />
    </Svg>
  ),
  n8n: () => (
    <Svg viewBox="0 0 28 16" className="w-[20px]">
      <g fill="none" stroke="#EA4B71" strokeWidth="1.8">
        <circle cx="4" cy="8" r="2.4" />
        <circle cx="13" cy="8" r="2.4" />
        <circle cx="23.5" cy="3.6" r="2.4" />
        <circle cx="23.5" cy="12.4" r="2.4" />
        <path d="M6.4 8h4.2M15.4 8h1.8c1.6 0 2-4.4 3.9-4.4M17.2 8c1.6 0 2 4.4 3.9 4.4" />
      </g>
    </Svg>
  ),
  Make: () => (
    <Svg>
      <rect x="2" y="5" width="4" height="15" rx="1.2" fill="#6D00CC" transform="rotate(-14 4 12.5)" />
      <rect x="9.2" y="4" width="4" height="16" rx="1.2" fill="#9A26E8" transform="rotate(-14 11.2 12)" />
      <rect x="17.5" y="4" width="4" height="16" rx="1.2" fill="#C42BEB" />
    </Svg>
  ),
  "Microsoft 365": () => (
    <Svg>
      <rect x="2" y="2" width="9.4" height="9.4" fill="#F25022" />
      <rect x="12.6" y="2" width="9.4" height="9.4" fill="#7FBA00" />
      <rect x="2" y="12.6" width="9.4" height="9.4" fill="#00A4EF" />
      <rect x="12.6" y="12.6" width="9.4" height="9.4" fill="#FFB900" />
    </Svg>
  ),
  Sheets: () => (
    <Svg>
      <path fill="#0F9D58" d="M14.5 1H6a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.5L14.5 1Z" />
      <path fill="#87CEAC" d="M14.5 1v4a1.5 1.5 0 0 0 1.5 1.5h4L14.5 1Z" />
      <path fill="#fff" d="M7.5 10.5h9v7h-9v-7Zm1.4 1.3v1.6h2.4v-1.6H8.9Zm3.8 0v1.6h2.4v-1.6h-2.4Zm-3.8 2.9v1.6h2.4v-1.6H8.9Zm3.8 0v1.6h2.4v-1.6h-2.4Z" />
    </Svg>
  ),
};

export function ToolIcon({ name }: { name: SolutionTool }) {
  const Icon = icons[name];
  return <Icon />;
}
