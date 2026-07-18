import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_Bengali, Roboto } from "next/font/google";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FloatingActions from "../components/common/FloatingActions";
import MobileBottomNav from "../components/common/MobileBottomNav";
import { siteConfig } from "../lib/site";
import { socialImageUrl, withTrailingSlash } from "../lib/seo";
import Script from "next/script";
import { GA_ID } from "@/lib/gtag";
import GaPageview from "@/components/analytics/GaPageview";
import { BRAND_NAME } from "@/lib/brand";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-roboto",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-noto-sans-bengali",
});

const siteUrl = `https://${siteConfig.domain}`;
const socialImage = socialImageUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: BRAND_NAME,
  description:
    "Sasha Corporation provides indoor, outdoor, rental and accessory solutions with planning, installation and long-term support.",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: withTrailingSlash("/"),
    siteName: BRAND_NAME,
    title: BRAND_NAME,
    description:
      "Trusted LED display solutions in Bangladesh with complete project support from planning to after-sales service.",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: BRAND_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description:
      "Indoor, outdoor, rental and LED accessory solutions with reliable installation and support.",
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: BRAND_NAME,
                  url: siteUrl,
                  logo: `${siteUrl}/sasha-corporation-final-l.webp`,
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: siteConfig.phone,
                      contactType: "customer support",
                      areaServed: "BD",
                      availableLanguage: ["en", "bn"],
                    },
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  name: BRAND_NAME,
                  url: siteUrl,
                  telephone: siteConfig.phone,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "1st Floor, 36-37 Umesh Datta Road, Bakshibazar",
                    addressLocality: "Dhaka",
                    postalCode: "1211",
                    addressCountry: "BD",
                  },
                },
                {
                  "@type": "WebSite",
                  name: BRAND_NAME,
                  url: siteUrl,
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/search/?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${roboto.variable} ${notoSansBengali.variable}`}>
        {GA_ID ? <GaPageview /> : null}
        <Header />
        <main id="main-content" className="pb-14 pt-2 md:pb-0">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <MobileBottomNav />
      </body>
    </html>
  );
}
