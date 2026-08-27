import Image from "next/image";
import Link from "next/link";
import { conferencePackages, type ConferencePackage } from "./conferencePackages";

function ConferencePackageCard({ packageItem }: { packageItem: ConferencePackage }) {
  const quotationHref = `/contact/?project=conference-system&package=${encodeURIComponent(packageItem.name)}`;

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-orange-500/30 ${
        packageItem.featured
          ? "border-orange-400 shadow-[0_8px_24px_rgba(234,88,12,0.10)]"
          : "border-slate-200 shadow-sm hover:border-orange-200"
      }`}
    >
      {packageItem.featured ? (
        <span className="absolute right-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-full bg-orange-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm">
          Most Popular
        </span>
      ) : null}

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={packageItem.image.src}
          alt={packageItem.image.alt}
          fill
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.015]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className={`text-[11px] font-extrabold uppercase tracking-[0.16em] ${packageItem.featured ? "text-orange-700" : "text-slate-500"}`}>
          {packageItem.label}
        </p>
        <h3 className="mt-2 text-xl font-extrabold leading-7 tracking-tight text-slate-950">{packageItem.name}</h3>
        <p className="mt-1 text-sm font-semibold text-slate-600">{packageItem.subtitle}</p>

        <div className="mt-5 border-y border-slate-100 py-4">
          <p className="text-2xl font-extrabold tracking-tight text-slate-950">{packageItem.price}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">Complete Installed Package</p>
        </div>

        <ul className="mt-5 grid gap-2.5 text-sm leading-5 text-slate-700">
          {packageItem.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-6 grid gap-3 border-t border-slate-100 pt-4 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Capacity</dt>
            <dd className="mt-1 font-bold leading-5 text-slate-900">{packageItem.capacity}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">System Type</dt>
            <dd className="mt-1 font-bold leading-5 text-slate-900">{packageItem.systemType}</dd>
          </div>
        </dl>

        <Link
          href={quotationHref}
          aria-label={`${packageItem.ctaLabel} — ${packageItem.name}`}
          className={`mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 ${
            packageItem.featured
              ? "bg-orange-600 text-white hover:bg-orange-500"
              : "border border-slate-300 bg-white text-slate-900 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
          }`}
        >
          {packageItem.ctaLabel}
        </Link>
      </div>
    </article>
  );
}

export default function ConferencePackageCards() {
  return (
    <section className="mt-10" aria-labelledby="complete-conference-packages-title">
      <div className="max-w-4xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">Installed room packages</p>
        <h2 id="complete-conference-packages-title" className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
          Installed Conference System Packages
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
          These three project packages combine equipment, accessories, installation, and configuration for a room and participant capacity. They are installed project scopes, separate from the two ready-made catalog products listed below.
        </p>
      </div>

      <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {conferencePackages.map((packageItem) => (
          <ConferencePackageCard key={packageItem.id} packageItem={packageItem} />
        ))}
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Package prices are indicative and may vary depending on selected brand, room layout, cable length, speaker requirements and installation conditions.
      </p>
    </section>
  );
}
