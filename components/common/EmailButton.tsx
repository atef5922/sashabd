"use client";

type EmailButtonProps = {
  email: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
};

export default function EmailButton({ email, className, children, title, style }: EmailButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title ?? `Email ${email}`}
      className={className}
      style={style}
      onClick={() => {
        window.location.href = `mailto:${email}`;
      }}
    >
      {children}
    </button>
  );
}
