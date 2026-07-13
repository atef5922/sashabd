"use client";

type EmailRevealProps = {
  user: string;
  domain: string;
  className?: string;
  title?: string;
  prefix?: string;
  label?: string;
  loadingLabel?: string;
};

export default function EmailReveal({ user, domain, className, title, prefix = "", label }: EmailRevealProps) {
  const email = `${user}@${domain}`;

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      title={title ?? `Email ${email}`}
    >
      <span>{`${prefix}${label ?? email}`}</span>
    </a>
  );
}
