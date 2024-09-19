"use client";
import React from "react";
import SideNavigationBarItem from "./SideNavigationBarItem";
import {
  AreaChartIcon,
  BookCheckIcon,
  ContactIcon,
  DollarSignIcon,
  FileSpreadsheetIcon,
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingCartIcon,
  SquareUserRoundIcon,
  UndoDotIcon,
  UsersIcon,
  UsersRoundIcon,
  WarehouseIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {};

export default function SideNavigationBar({}: Props) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:block min-w-[17rem] bg-white shadow-lg border-r min-h-screen px-5">
      <div className="h-[6rem] flex justify-center items-center bg-gray-300 mb-5 mt-2">
        LOGO
      </div>
      <SideNavigationBarItem
        title={"Dashboard"}
        icon={<LayoutDashboardIcon className="w-5 h-5" />}
        href="/dashboard"
        active={pathname.startsWith("/dashboard")}
      />
      <div className="text-sm text-slate-500 my-5 uppercase">Inventory</div>
      <SideNavigationBarItem
        title={"Inventory Manage"}
        icon={<PackageIcon className="w-5 h-5" />}
        href="/inventory"
        active={pathname.startsWith("/inventory")}
      />

      <div className="text-sm text-slate-500 my-5 uppercase">Purchases</div>
      <div className="grid gap-3">
        <SideNavigationBarItem
          title={"Supplier"}
          icon={<SquareUserRoundIcon className="w-5 h-5" />}
          href="/suppliers"
          active={pathname.startsWith("/suppliers")}
        />
        <SideNavigationBarItem
          title={"Purchase Order"}
          icon={<ShoppingCartIcon className="w-5 h-5" />}
          href="/purchaseOrders"
          active={pathname.startsWith("/purchaseOrders")}
        />
        <SideNavigationBarItem
          title={"Purchases Received"}
          icon={<BookCheckIcon className="w-5 h-5" />}
          href="/purchaseOrderReceives"
          active={pathname.startsWith("/purchaseOrderReceives")}
        />
        <SideNavigationBarItem
          title={"Stock Returns"}
          icon={<UndoDotIcon className="w-5 h-5" />}
          href="/stockReturns"
          active={pathname.startsWith("/stockReturns")}
        />
      </div>
      <div className="text-sm text-slate-500 my-5 uppercase">Sales</div>
      <div className="grid gap-3">
        <SideNavigationBarItem
          title={"Customers"}
          icon={<UsersIcon className="w-5 h-5" />}
          href="/customers"
          active={pathname.startsWith("/customers")}
        />
        <SideNavigationBarItem
          title={"Sales Reps"}
          icon={<UsersRoundIcon className="w-5 h-5" />}
          href="/salesReps"
          active={pathname.startsWith("/salesReps")}
        />
        <SideNavigationBarItem
          title={"Invoices"}
          icon={<FileSpreadsheetIcon className="w-5 h-5" />}
          href="/invoices"
          active={pathname.startsWith("/invoices")}
        />
        <SideNavigationBarItem
          title={"Sales Returns"}
          icon={<UndoDotIcon className="w-5 h-5" />}
          href="/salesReturns"
          active={pathname.startsWith("/salesReturns")}
        />
      </div>
      <div className="text-sm text-slate-500 my-5 uppercase">FINANCE</div>
      <SideNavigationBarItem
        title={"Payments Received"}
        icon={<DollarSignIcon className="w-5 h-5" />}
        href="/paymentReceives"
        active={pathname.startsWith("/paymentReceives")}
      />
      <SideNavigationBarItem
        title={"Set Off Payments"}
        icon={<DollarSignIcon className="w-5 h-5" />}
        href="/setOffs"
        active={pathname.startsWith("/setOffs")}
      />
      <SideNavigationBarItem
        title={"Credit Notes"}
        icon={<DollarSignIcon className="w-5 h-5" />}
        href="/creditNotes"
        active={pathname.startsWith("/creditNotes")}
      />
      <div className="text-sm text-slate-500 my-5 uppercase">Other</div>
      <SideNavigationBarItem
        title={"Analytical Reports"}
        icon={<AreaChartIcon className="w-5 h-5" />}
        href="/reports"
        active={pathname.startsWith("/reports")}
      />
    </div>
  );
}
