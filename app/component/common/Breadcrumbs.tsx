import React from 'react';
import Link from 'next/link';
import { FiChevronRight, FiHome } from 'react-icons/fi';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-2 sm:py-3">
      <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[#980E27] transition-colors"
          >
            <FiHome className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <FiChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#980E27] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#980E27]">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}