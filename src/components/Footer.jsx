import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center text-small md:text-base text-slate-200 p-4 bg-slate-800 -">
      &copy; {new Date().getFullYear()} Airspace. All rights reserved.
    </footer>
  );
}
