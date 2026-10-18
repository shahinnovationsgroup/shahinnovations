
import { Link } from "react-router-dom";
import logo from "./assets/shahinnovations-logo.png";

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const services = [
  { icon: "⌘", name: "Web Solutions" },
  { icon: "▣", name: "App Development" },
  { icon: "☁", name: "Cloud Solutions" },
  { icon: "⚙", name: "IT Consulting" },
];

export default function Footer() {
  return (
    <footer className="relative isolate mt-0 overflow-hidden border-t border-blue-500/30 bg-[#050B16] text-slate-300">

      {/* Decorative blue background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-96 rounded-full bg-blue-600/15 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-52 w-80 rounded-full bg-sky-500/10 blur-[90px]"
      />

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:px-8 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.25fr_0.7fr_1.05fr] lg:gap-14 lg:px-10 lg:py-14">

        {/* Company information */}
        <div className="min-w-0">

          <Link
            to="/"
            aria-label="ShahInnovations Home"
            className="inline-flex max-w-full items-center"
          >
            <img
              src={logo}
              alt="ShahInnovations"
              className="h-16 w-auto max-w-full object-contain object-left sm:h-20"
            />
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            We create modern digital solutions with innovative technology,
            helping businesses grow in the digital world.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-2xl text-sky-400 shadow-lg shadow-blue-950/30 transition duration-300 hover:border-sky-400/60 hover:bg-blue-500/20">
                  {service.icon}
                </div>

                <span className="mt-2 text-xs leading-5 text-slate-300">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore links */}
        <div className="border-t border-slate-800 pt-8 md:border-t-0 md:pt-0 lg:border-l lg:border-t-0 lg:pl-10">

          <h2 className="text-xl font-bold text-white">
            Explore
          </h2>

          <div className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-sky-400 to-blue-600" />

          <nav
            aria-label="Footer navigation"
            className="mt-6 flex flex-col items-start gap-4"
          >
            {exploreLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="group inline-flex items-center gap-3 text-sm text-slate-300 transition-colors duration-200 hover:text-sky-400 sm:text-base"
              >
                <span className="text-xl text-sky-400 transition-transform duration-200 group-hover:translate-x-1">
                  ›
                </span>

                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact information */}
        <div className="border-t border-slate-800 pt-8 md:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-10">

          <h2 className="text-xl font-bold text-white">
            Contact
          </h2>

          <div className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-sky-400 to-blue-600" />

          <div className="mt-6 space-y-5">

            {/* Phone */}
            <a
              href="tel:+919130704919"
              className="group flex items-start gap-3"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-xl text-sky-400 transition group-hover:bg-blue-500/20">
                ☎
              </span>

              <span className="min-w-0">
                <span className="block text-sm text-slate-400">
                  Phone
                </span>

                <span className="mt-1 block text-sm text-white transition group-hover:text-sky-400 sm:text-base">
                  +91 9130704919
                </span>
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:shahinnovationsgroup@gmail.com"
              className="group flex items-start gap-3"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-xl text-sky-400 transition group-hover:bg-blue-500/20">
                ✉
              </span>

              <span className="min-w-0">
                <span className="block text-sm text-slate-400">
                  Email
                </span>

                <span className="mt-1 block break-all text-sm text-white transition group-hover:text-sky-400 sm:text-base">
                  shahinnovationsgroup@gmail.com
                </span>
              </span>
            </a>

            {/* Office */}
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-xl text-sky-400">
                ⌖
              </span>

              <div className="min-w-0">
                <span className="block text-sm text-slate-400">
                  Office
                </span>

                <p className="mt-1 text-sm leading-6 text-white sm:text-base">
                  Milly Colony, Near Safa Masjid, Dharashiv (Osmanabad)
                  413501, Maharashtra
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp contact */}
          <a
            href="https://wa.me/919130704919"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-600/15 px-5 py-3 text-sm font-semibold text-sky-300 transition duration-300 hover:border-sky-400/60 hover:bg-blue-600/30"
          >
            <span aria-hidden="true">☏</span>
            Chat on WhatsApp
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="relative border-t border-blue-500/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:px-8 md:flex-row md:px-10 md:text-left">

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-sky-400">
              ShahInnovations
            </span>
            . All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Technology · Innovation · Digital Solutions
          </p>

          <button
            type="button"
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg shadow-blue-900/40 transition duration-300 hover:scale-105 hover:bg-sky-500"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
