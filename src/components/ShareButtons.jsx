import { Link2, MoreHorizontal } from 'lucide-react';
import { copyText, shareMix } from '../utils/download.js';

// ── Minimal inline brand glyphs (original simple paths) ─────────────────────
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.5-.9.9-1.1 2.2-.2 3.9a11.6 11.6 0 0 0 4.5 4.2c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.4-.2Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M21.9 3.3 2.7 10.8c-.8.3-.8 1.4.1 1.6l4.7 1.5 1.8 5.6c.3.8 1.3.9 1.8.2l2.6-3.1 4.9 3.6c.6.4 1.5.1 1.7-.6l2.1-14.1c.2-1-.9-1.7-1.5-1.2ZM8.6 13.1l9.7-6.1c.2-.1.4.1.2.3l-8 7.4-.3 3-1.6-4.6Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.6H7.7V14h2.7v8h3.1Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.1h1.7L7.4 4.8H5.6l11.1 14.3Z" />
    </svg>
  );
}

export default function ShareButtons({ mix, shareHref, onToast }) {
  const text = `${mix.a} + ${mix.b} = ${mix.title}! Make your own weird emoji mix on Mojimelt.`;
  const enc = encodeURIComponent;

  const targets = [
    {
      label: 'Share on WhatsApp',
      short: 'WhatsApp',
      href: `https://wa.me/?text=${enc(`${text} ${shareHref}`)}`,
      bg: 'bg-[#25D366] hover:bg-[#1fb857]',
      Icon: WhatsAppIcon,
    },
    {
      label: 'Share on Telegram',
      short: 'Telegram',
      href: `https://t.me/share/url?url=${enc(shareHref)}&text=${enc(text)}`,
      bg: 'bg-[#229ED9] hover:bg-[#1b8ac0]',
      Icon: TelegramIcon,
    },
    {
      label: 'Share on Facebook',
      short: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareHref)}`,
      bg: 'bg-[#1877F2] hover:bg-[#1466d1]',
      Icon: FacebookIcon,
    },
    {
      label: 'Post on X',
      short: 'X',
      href: `https://x.com/intent/post?text=${enc(text)}&url=${enc(shareHref)}`,
      bg: 'bg-slate-900 hover:bg-slate-700 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900',
      Icon: XIcon,
    },
  ];

  const onCopyLink = async () => {
    await copyText(shareHref);
    onToast?.('Link copied — share the weirdness!');
  };

  const onMore = async () => {
    const res = await shareMix({ title: `Mojimelt: ${mix.title}`, text, url: shareHref });
    onToast?.(res === 'shared' ? 'Shared!' : res === 'copied' ? 'Link copied to clipboard!' : 'Share dismissed.');
  };

  return (
    <div>
      <p className="text-xs font-extrabold tracking-widest text-slate-400 uppercase dark:text-slate-500">
        Share this mix
      </p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {targets.map(({ label, href, bg, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-extrabold text-white shadow-md transition hover:scale-105 active:scale-95 ${bg}`}
          >
            <Icon />
            {label.includes('WhatsApp') ? 'WhatsApp' : label.includes('Telegram') ? 'Telegram' : label.includes('Facebook') ? 'Facebook' : 'X'}
          </a>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onCopyLink}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-slate-200 bg-white px-2 py-2.5 text-xs font-extrabold text-slate-700 transition hover:scale-[1.02] hover:border-violet-300 active:scale-95 dark:border-white/15 dark:bg-white/10 dark:text-white"
          aria-label="Copy shareable link"
        >
          <Link2 size={15} aria-hidden /> Copy Link
        </button>
        <button
          type="button"
          onClick={onMore}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-slate-200 bg-white px-2 py-2.5 text-xs font-extrabold text-slate-700 transition hover:scale-[1.02] hover:border-violet-300 active:scale-95 dark:border-white/15 dark:bg-white/10 dark:text-white"
          aria-label="More share options"
        >
          <MoreHorizontal size={15} aria-hidden /> More…
        </button>
      </div>
    </div>
  );
}
