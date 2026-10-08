import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "./supabase.js";
import logo from "./assets/shahinnovations-logo.png";
import WhatsAppInbox from "./WhatsAppInbox.jsx";

const PAGE_SIZE_OPTIONS = [10, 25, 50];

function Admin() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [activeSection, setActiveSection] = useState("overview");

  // ================= FETCH CUSTOMERS =================

  async function fetchCustomers() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Admin Supabase Error:", fetchError);
      setError(fetchError.message);
      setCustomers([]);
    } else {
      setCustomers(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ================= LOGOUT =================

  async function handleLogout() {
    setLoggingOut(true);

    const { error: logoutError } =
      await supabase.auth.signOut();

    if (logoutError) {
      console.error("Logout Error:", logoutError);
      setLoggingOut(false);
      setError(logoutError.message);
      return;
    }

    window.location.href = "/admin";
  }

  // ================= UPDATE STATUS =================

  async function handleStatusChange(customerId, newStatus) {
    setUpdatingId(customerId);
    setError("");

    const { error: updateError } = await supabase
      .from("customers")
      .update({ status: newStatus })
      .eq("id", customerId);

    if (updateError) {
      console.error("Status Update Error:", updateError);

      setError(
        `Unable to update status: ${updateError.message}`
      );

      setUpdatingId(null);
      return;
    }

    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: newStatus }
          : customer
      )
    );

    setSelectedCustomer((currentCustomer) =>
      currentCustomer?.id === customerId
        ? { ...currentCustomer, status: newStatus }
        : currentCustomer
    );

    setUpdatingId(null);
  }

  // ================= DELETE =================

  async function handleDelete(customer) {
    const confirmed = window.confirm(
      `Delete the enquiry from "${
        customer.name || "this customer"
      }"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(customer.id);
    setError("");

    const { error: deleteError } = await supabase
      .from("customers")
      .delete()
      .eq("id", customer.id);

    if (deleteError) {
      console.error("Delete Error:", deleteError);

      setError(
        `Unable to delete enquiry: ${deleteError.message}`
      );

      setDeletingId(null);
      return;
    }

    setCustomers((currentCustomers) =>
      currentCustomers.filter(
        (item) => item.id !== customer.id
      )
    );

    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer(null);
    }

    setDeletingId(null);
  }

  // ================= SEARCH + FILTER =================

  const filteredCustomers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesStatus =
        statusFilter === "all" ||
        customer.status === statusFilter;

      const matchesSearch =
        !searchValue ||
        customer.name
          ?.toLowerCase()
          .includes(searchValue) ||
        customer.email
          ?.toLowerCase()
          .includes(searchValue) ||
        customer.phone
          ?.toLowerCase()
          .includes(searchValue) ||
        customer.message
          ?.toLowerCase()
          .includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [customers, search, statusFilter]);

  // ================= PAGINATION =================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / pageSize)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  const paginatedCustomers =
    filteredCustomers.slice(startIndex, endIndex);

  const showingFrom =
    filteredCustomers.length === 0
      ? 0
      : startIndex + 1;

  const showingTo = Math.min(
    endIndex,
    filteredCustomers.length
  );

  function goToPage(page) {
    const nextPage = Math.min(
      Math.max(page, 1),
      totalPages
    );

    setCurrentPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleStatusFilterChange(value) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function handlePageSizeChange(value) {
    setPageSize(Number(value));
    setCurrentPage(1);
  }

  // ================= ANALYTICS =================

  const totalCount = customers.length;

  const newCount = customers.filter(
    (customer) => customer.status === "new"
  ).length;

  const contactedCount = customers.filter(
    (customer) => customer.status === "contacted"
  ).length;

  const convertedCount = customers.filter(
    (customer) => customer.status === "converted"
  ).length;

  const closedCount = customers.filter(
    (customer) => customer.status === "closed"
  ).length;

  const conversionRate =
    totalCount > 0
      ? ((convertedCount / totalCount) * 100).toFixed(1)
      : "0.0";

  const contactedRate =
    totalCount > 0
      ? ((contactedCount / totalCount) * 100).toFixed(1)
      : "0.0";

  const newRate =
    totalCount > 0
      ? ((newCount / totalCount) * 100).toFixed(1)
      : "0.0";

  const closedRate =
    totalCount > 0
      ? ((closedCount / totalCount) * 100).toFixed(1)
      : "0.0";

  const statusBars = [
    {
      label: "New",
      count: newCount,
      percentage: newRate,
      color: "bg-cyan-400",
      text: "text-cyan-400",
    },
    {
      label: "Contacted",
      count: contactedCount,
      percentage: contactedRate,
      color: "bg-yellow-400",
      text: "text-yellow-400",
    },
    {
      label: "Converted",
      count: convertedCount,
      percentage: conversionRate,
      color: "bg-green-400",
      text: "text-green-400",
    },
    {
      label: "Closed",
      count: closedCount,
      percentage: closedRate,
      color: "bg-slate-400",
      text: "text-slate-400",
    },
  ];

  // ================= STATUS STYLE =================

  function getStatusStyle(status) {
    if (status === "contacted") {
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
    }

    if (status === "converted") {
      return "border-green-500/30 bg-green-500/10 text-green-400";
    }

    if (status === "closed") {
      return "border-slate-500/30 bg-slate-500/10 text-slate-400";
    }

    return "border-cyan-500/30 bg-cyan-500/10 text-cyan-400";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HEADER ================= */}

      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">

          <Link to="/">
            <img
              src={logo}
              alt="ShahInnovations"
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-3">

            <Link
              to="/"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              ← Website
            </Link>

            {activeSection === "overview" && (
              <button
                onClick={fetchCustomers}
                disabled={loading}
                className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            )}

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </button>

          </div>
        </div>

        {/* ================= ADMIN TABS ================= */}

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3">

            <button
              type="button"
              onClick={() =>
                setActiveSection("overview")
              }
              className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeSection === "overview"
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              📊 Dashboard
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveSection("whatsapp")
              }
              className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeSection === "whatsapp"
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              💬 WhatsApp Inbox
            </button>

          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}

      {activeSection === "whatsapp" ? (
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <WhatsAppInbox />
        </div>
      ) : (
        <main className="mx-auto max-w-7xl px-6 py-10">

          {/* ================= TITLE ================= */}

          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              ShahInnovations
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-slate-400">
              Monitor enquiries, leads and business conversion.
            </p>
          </div>

          {/* ================= KPI CARDS ================= */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

            <AnalyticsCard
              label="Total Enquiries"
              value={totalCount}
              icon="📊"
              style="cyan"
            />

            <AnalyticsCard
              label="New Leads"
              value={newCount}
              icon="🆕"
              style="cyan"
            />

            <AnalyticsCard
              label="Contacted"
              value={contactedCount}
              icon="📞"
              style="yellow"
            />

            <AnalyticsCard
              label="Converted"
              value={convertedCount}
              icon="✅"
              style="green"
            />

            <AnalyticsCard
              label="Closed"
              value={closedCount}
              icon="❌"
              style="slate"
            />

            <AnalyticsCard
              label="Conversion Rate"
              value={`${conversionRate}%`}
              icon="🎯"
              style="green"
            />

          </div>

          {/* ================= ERROR ================= */}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* ================= ANALYTICS ================= */}

          <div className="mt-10 grid gap-6 lg:grid-cols-2">

            {/* Lead Distribution */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Analytics
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Lead Distribution
                  </h2>
                </div>

                <div className="text-3xl">
                  📈
                </div>

              </div>

              <div className="mt-8 space-y-6">

                {statusBars.map((item) => (
                  <div key={item.label}>

                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span
                          className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                        />

                        <span className="text-sm font-medium text-slate-300">
                          {item.label}
                        </span>

                      </div>

                      <div className="text-sm">

                        <span
                          className={`font-semibold ${item.text}`}
                        >
                          {item.count}
                        </span>

                        <span className="ml-2 text-slate-500">
                          {item.percentage}%
                        </span>

                      </div>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${item.percentage}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full ${item.color}`}
                      />

                    </div>

                  </div>
                ))}

              </div>

            </motion.div>

            {/* Conversion Overview */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                    Performance
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Conversion Overview
                  </h2>
                </div>

                <div className="text-3xl">
                  🎯
                </div>

              </div>

              <div className="mt-8 flex items-center justify-center">

                <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[14px] border-slate-800">

                  <div
                    className="absolute inset-[-14px] rounded-full"
                    style={{
                      background: `conic-gradient(#22d3ee ${conversionRate}%, transparent 0)`,
                      WebkitMask:
                        "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 0)",
                      mask:
                        "radial-gradient(farthest-side, transparent calc(100% - 14px), #000 0)",
                    }}
                  />

                  <div className="relative text-center">

                    <p className="text-4xl font-bold text-green-400">
                      {conversionRate}%
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                      Conversion
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Converted
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-400">
                    {convertedCount}
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Total Leads
                  </p>

                  <p className="mt-2 text-2xl font-bold text-cyan-400">
                    {totalCount}
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

          {/* ================= SEARCH + FILTER ================= */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">

            <div className="grid gap-4 md:grid-cols-[1fr_220px_150px]">

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Search enquiries
                </label>

                <input
                  type="search"
                  value={search}
                  onChange={(e) =>
                    handleSearchChange(e.target.value)
                  }
                  placeholder="Search name, email, phone or message..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    handleStatusFilterChange(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
                >
                  <option value="all">
                    All Statuses
                  </option>

                  <option value="new">
                    New
                  </option>

                  <option value="contacted">
                    Contacted
                  </option>

                  <option value="converted">
                    Converted
                  </option>

                  <option value="closed">
                    Closed
                  </option>
                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Per Page
                </label>

                <select
                  value={pageSize}
                  onChange={(e) =>
                    handlePageSizeChange(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">

              <span>
                Showing {showingFrom}–{showingTo} of{" "}
                {filteredCustomers.length} enquiries
              </span>

              <span>
                Page {safeCurrentPage} of {totalPages}
              </span>

            </div>

          </div>

          {/* ================= CUSTOMER ENQUIRIES ================= */}

          <div className="mt-10">

            <div className="mb-5">
              <h2 className="text-2xl font-bold">
                Customer Enquiries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Messages received from the Contact page
              </p>
            </div>

            {loading && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                <p className="text-cyan-400">
                  Loading customer enquiries...
                </p>
              </div>
            )}

            {!loading &&
              filteredCustomers.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">

                  <div className="text-4xl">
                    📭
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    No matching enquiries
                  </h3>

                  <p className="mt-2 text-slate-400">
                    Try changing your search or status filter.
                  </p>

                </div>
              )}

            {!loading &&
              paginatedCustomers.length > 0 && (
                <div className="grid gap-5">

                  {paginatedCustomers.map((customer) => (
                    <motion.div
                      key={customer.id}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/10"
                    >

                      <div className="grid gap-5 md:grid-cols-4">

                        <div>
                          <p className="text-xs uppercase tracking-wider text-slate-500">
                            Name
                          </p>

                          <p className="mt-2 font-semibold">
                            {customer.name || "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-slate-500">
                            Email
                          </p>

                          <p className="mt-2 break-all text-sm text-cyan-400">
                            {customer.email || "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-slate-500">
                            Phone
                          </p>

                          <p className="mt-2 font-semibold">
                            {customer.phone || "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-slate-500">
                            Date
                          </p>

                          <p className="mt-2 text-sm text-slate-300">
                            {customer.created_at
                              ? new Date(
                                  customer.created_at
                                ).toLocaleString()
                              : "—"}
                          </p>
                        </div>

                      </div>

                      <div className="mt-5 border-t border-white/10 pt-5">

                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                          <div className="flex-1">

                            <p className="text-xs uppercase tracking-wider text-slate-500">
                              Message
                            </p>

                            <p className="mt-2 line-clamp-2 leading-7 text-slate-300">
                              {customer.message ||
                                "No message"}
                            </p>

                          </div>

                          <div className="flex flex-wrap items-center gap-3">

                            <select
                              value={
                                customer.status || "new"
                              }
                              disabled={
                                updatingId === customer.id
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  customer.id,
                                  e.target.value
                                )
                              }
                              className={`rounded-xl border px-4 py-2 text-sm font-semibold outline-none ${getStatusStyle(
                                customer.status || "new"
                              )}`}
                            >

                              <option value="new">
                                🆕 New
                              </option>

                              <option value="contacted">
                                📞 Contacted
                              </option>

                              <option value="converted">
                                ✅ Converted
                              </option>

                              <option value="closed">
                                ❌ Closed
                              </option>

                            </select>

                            <button
                              onClick={() =>
                                setSelectedCustomer(customer)
                              }
                              className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
                            >
                              View Details
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(customer)
                              }
                              disabled={
                                deletingId === customer.id
                              }
                              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === customer.id
                                ? "Deleting..."
                                : "🗑 Delete"}
                            </button>

                          </div>

                        </div>

                      </div>

                    </motion.div>
                  ))}

                </div>
              )}

          </div>

          {/* ================= PAGINATION ================= */}

          {!loading &&
            filteredCustomers.length > 0 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row">

                <button
                  onClick={() =>
                    goToPage(safeCurrentPage - 1)
                  }
                  disabled={safeCurrentPage === 1}
                  className="w-full rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  )
                    .slice(
                      Math.max(
                        0,
                        safeCurrentPage - 3
                      ),
                      Math.min(
                        totalPages,
                        safeCurrentPage + 2
                      )
                    )
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() =>
                          goToPage(page)
                        }
                        className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
                          page === safeCurrentPage
                            ? "bg-cyan-400 text-slate-950"
                            : "border border-white/10 text-slate-400 hover:border-cyan-400 hover:text-cyan-400"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                </div>

                <button
                  onClick={() =>
                    goToPage(safeCurrentPage + 1)
                  }
                  disabled={
                    safeCurrentPage === totalPages
                  }
                  className="w-full rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
                >
                  Next →
                </button>

              </div>
            )}

        </main>
      )}

      {/* ================= DETAIL MODAL ================= */}

      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
            onClick={() =>
              setSelectedCustomer(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl md:p-8"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    Customer Details
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {selectedCustomer.name ||
                      "Unknown Customer"}
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setSelectedCustomer(null)
                  }
                  className="rounded-xl border border-white/10 px-3 py-2 text-xl text-slate-400 transition hover:border-white/30 hover:text-white"
                >
                  ✕
                </button>

              </div>

              <div className="mt-6">

                <span
                  className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyle(
                    selectedCustomer.status || "new"
                  )}`}
                >
                  {selectedCustomer.status ===
                    "contacted" &&
                    "📞 Contacted"}

                  {selectedCustomer.status ===
                    "converted" &&
                    "✅ Converted"}

                  {selectedCustomer.status ===
                    "closed" &&
                    "❌ Closed"}

                  {(!selectedCustomer.status ||
                    selectedCustomer.status ===
                      "new") &&
                    "🆕 New"}
                </span>

              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Email
                  </p>

                  {selectedCustomer.email ? (
                    <a
                      href={`mailto:${selectedCustomer.email}`}
                      className="mt-2 block break-all text-cyan-400 hover:underline"
                    >
                      {selectedCustomer.email}
                    </a>
                  ) : (
                    <p className="mt-2 text-slate-400">
                      Not provided
                    </p>
                  )}

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Phone
                  </p>

                  {selectedCustomer.phone ? (
                    <a
                      href={`tel:${selectedCustomer.phone}`}
                      className="mt-2 block text-cyan-400 hover:underline"
                    >
                      {selectedCustomer.phone}
                    </a>
                  ) : (
                    <p className="mt-2 text-slate-400">
                      Not provided
                    </p>
                  )}

                </div>

              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Message
                </p>

                <p className="mt-3 whitespace-pre-wrap leading-8 text-slate-300">
                  {selectedCustomer.message ||
                    "No message provided."}
                </p>

              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Submitted
                </p>

                <p className="mt-2 text-slate-300">
                  {selectedCustomer.created_at
                    ? new Date(
                        selectedCustomer.created_at
                      ).toLocaleString()
                    : "Unknown"}
                </p>

              </div>

              <div className="mt-8 flex justify-end">

                <button
                  onClick={() =>
                    setSelectedCustomer(null)
                  }
                  className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Close
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-10 border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 ShahInnovations Admin Dashboard
      </footer>

    </div>
  );
}

// ================= ANALYTICS CARD =================

function AnalyticsCard({
  label,
  value,
  icon,
  style,
}) {
  const styles = {
    cyan: "border-cyan-500/20 bg-cyan-500/5",
    yellow:
      "border-yellow-500/20 bg-yellow-500/5",
    green:
      "border-green-500/20 bg-green-500/5",
    slate:
      "border-slate-500/20 bg-slate-500/5",
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`rounded-2xl border p-5 ${styles[style]}`}
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {label}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <span className="text-2xl">
          {icon}
        </span>

      </div>
    </motion.div>
  );
}

export default Admin;