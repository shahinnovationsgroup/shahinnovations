import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { supabase } from "./supabase";

const PAGE_SIZE = 20;

const STATUS_OPTIONS = [
  { value: "all", label: "All conversations" },
  { value: "open", label: "Open" },
  { value: "waiting", label: "Waiting" },
  { value: "human", label: "Human" },
  { value: "closed", label: "Closed" },
];

const statusMeta = {
  open: {
    label: "Open",
    className:
      "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  },
  waiting: {
    label: "Waiting",
    className:
      "bg-amber-400/10 text-amber-300 border-amber-400/20",
  },
  human: {
    label: "Human",
    className:
      "bg-violet-400/10 text-violet-300 border-violet-400/20",
  },
  closed: {
    label: "Closed",
    className:
      "bg-slate-400/10 text-slate-300 border-slate-400/20",
  },
};

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getCustomerName(contact) {
  return (
    contact?.name ||
    contact?.profile_name ||
    contact?.phone ||
    "Unknown Customer"
  );
}

function getInitials(contact) {
  const name = getCustomerName(contact);

  if (!name) return "?";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getStatusMeta(status) {
  return (
    statusMeta[status] || {
      label: status || "Unknown",
      className:
        "bg-slate-400/10 text-slate-300 border-slate-400/20",
    }
  );
}

function MessageBubble({ message }) {
  const isOutgoing = message.direction === "outgoing";

  return (
    <div
      className={`flex ${
        isOutgoing ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
          isOutgoing
            ? "rounded-br-md bg-cyan-400 text-slate-950"
            : "rounded-bl-md border border-white/10 bg-white/5 text-slate-100"
        }`}
      >
        <div className="mb-1 flex items-center gap-2 text-[11px] opacity-70">
          <span>
            {isOutgoing ? "ShahInnovations" : "Customer"}
          </span>

          {message.message_type ? (
            <>
              <span>•</span>
              <span>{message.message_type}</span>
            </>
          ) : null}
        </div>

        <p className="whitespace-pre-wrap break-words text-sm leading-6">
          {message.body || "[No text content]"}
        </p>

        <div
          className={`mt-2 text-[10px] ${
            isOutgoing ? "text-slate-800/70" : "text-slate-400"
          }`}
        >
          {formatTime(message.created_at)}
          {message.status ? ` • ${message.status}` : ""}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="flex h-full min-h-[300px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
        💬
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function WhatsAppInbox() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] =
    useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loadingConversations, setLoadingConversations] =
    useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [mobileView, setMobileView] = useState("list");

  const messagesEndRef = useRef(null);

  const loadConversations = useCallback(
    async (showLoader = true) => {
      if (showLoader) {
        setLoadingConversations(true);
      }

      setError("");

      const { data, error: queryError } = await supabase
        .from("whatsapp_conversations")
        .select(`
          id,
          created_at,
          updated_at,
          contact_id,
          status,
          assigned_to,
          last_message_at,
          unread_count,
          whatsapp_contacts (
            id,
            phone,
            name,
            profile_name,
            email,
            status,
            source,
            last_message_at
          )
        `)
        .order("last_message_at", {
          ascending: false,
          nullsFirst: false,
        })
        .limit(200);

      if (queryError) {
        setError(
          queryError.message ||
            "Unable to load WhatsApp conversations."
        );
        setConversations([]);
      } else {
        setConversations(data || []);
      }

      if (showLoader) {
        setLoadingConversations(false);
      }
    },
    []
  );

  const loadMessages = useCallback(async (conversationId) => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    setLoadingMessages(true);
    setError("");

    const { data, error: queryError } = await supabase
      .from("whatsapp_messages")
      .select(`
        id,
        created_at,
        conversation_id,
        external_message_id,
        direction,
        sender_phone,
        recipient_phone,
        message_type,
        body,
        status,
        error_message
      `)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .limit(500);

    if (queryError) {
      setError(
        queryError.message ||
          "Unable to load WhatsApp messages."
      );
      setMessages([]);
    } else {
      setMessages(data || []);
    }

    setLoadingMessages(false);
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const contact = conversation.whatsapp_contacts;

      const matchesStatus =
        statusFilter === "all" ||
        conversation.status === statusFilter;

      if (!matchesStatus) return false;

      if (!query) return true;

      const searchable = [
        contact?.name,
        contact?.profile_name,
        contact?.phone,
        contact?.email,
        conversation.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [conversations, search, statusFilter]);

  const stats = useMemo(() => {
    const total = conversations.length;

    const open = conversations.filter(
      (item) => item.status === "open"
    ).length;

    const waiting = conversations.filter(
      (item) => item.status === "waiting"
    ).length;

    const human = conversations.filter(
      (item) => item.status === "human"
    ).length;

    const closed = conversations.filter(
      (item) => item.status === "closed"
    ).length;

    const unread = conversations.reduce(
      (sum, item) => sum + Number(item.unread_count || 0),
      0
    );

    return {
      total,
      open,
      waiting,
      human,
      closed,
      unread,
    };
  }, [conversations]);

  const selectConversation = useCallback(
    async (conversation) => {
      setSelectedConversation(conversation);
      setMobileView("messages");
      setNotice("");

      await loadMessages(conversation.id);

      if (Number(conversation.unread_count || 0) > 0) {
        const { error: updateError } = await supabase
          .from("whatsapp_conversations")
          .update({
            unread_count: 0,
            updated_at: new Date().toISOString(),
          })
          .eq("id", conversation.id);

        if (!updateError) {
          setConversations((current) =>
            current.map((item) =>
              item.id === conversation.id
                ? {
                    ...item,
                    unread_count: 0,
                  }
                : item
            )
          );

          setSelectedConversation((current) =>
            current
              ? {
                  ...current,
                  unread_count: 0,
                }
              : current
          );
        }
      }
    },
    [loadMessages]
  );

  const updateConversationStatus = async (newStatus) => {
    if (!selectedConversation) return;

    setUpdatingStatus(true);
    setError("");
    setNotice("");

    const { data, error: updateError } = await supabase
      .from("whatsapp_conversations")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selectedConversation.id)
      .select(`
        id,
        created_at,
        updated_at,
        contact_id,
        status,
        assigned_to,
        last_message_at,
        unread_count,
        whatsapp_contacts (
          id,
          phone,
          name,
          profile_name,
          email,
          status,
          source,
          last_message_at
        )
      `)
      .single();

    if (updateError) {
      setError(
        updateError.message ||
          "Unable to update conversation status."
      );
    } else {
      setSelectedConversation(data);

      setConversations((current) =>
        current.map((item) =>
          item.id === data.id ? data : item
        )
      );

      setNotice(
        `Conversation marked as ${
          getStatusMeta(newStatus).label
        }.`
      );
    }

    setUpdatingStatus(false);
  };

  const refreshAll = async () => {
    setRefreshing(true);
    setNotice("");
    setError("");

    await loadConversations(false);

    if (selectedConversation?.id) {
      await loadMessages(selectedConversation.id);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    const channel = supabase
      .channel("shahinnovations-whatsapp-inbox")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "whatsapp_conversations",
        },
        async () => {
          await loadConversations(false);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "whatsapp_messages",
        },
        async (payload) => {
          await loadConversations(false);

          const conversationId =
            payload?.new?.conversation_id ||
            payload?.old?.conversation_id;

          if (
            selectedConversation?.id &&
            conversationId === selectedConversation.id
          ) {
            await loadMessages(selectedConversation.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [
    loadConversations,
    loadMessages,
    selectedConversation?.id,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const selectedContact =
    selectedConversation?.whatsapp_contacts || null;

  const selectedStatus = selectedConversation
    ? getStatusMeta(selectedConversation.status)
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl">
                💬
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/70">
                  ShahInnovations
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  WhatsApp Inbox
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Manage customer conversations securely from one
                  place.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-200">
              Automation Ready
            </span>

            <button
              type="button"
              onClick={refreshAll}
              disabled={refreshing}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Total
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              {stats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
            <p className="text-xs uppercase tracking-wider text-emerald-300/70">
              Open
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-300">
              {stats.open}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">
            <p className="text-xs uppercase tracking-wider text-amber-300/70">
              Waiting
            </p>
            <p className="mt-2 text-2xl font-bold text-amber-300">
              {stats.waiting}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-400/10 bg-violet-400/5 p-4">
            <p className="text-xs uppercase tracking-wider text-violet-300/70">
              Human
            </p>
            <p className="mt-2 text-2xl font-bold text-violet-300">
              {stats.human}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-400/10 bg-slate-400/5 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Closed
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-300">
              {stats.closed}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
            <p className="text-xs uppercase tracking-wider text-cyan-300/70">
              Unread
            </p>
            <p className="mt-2 text-2xl font-bold text-cyan-300">
              {stats.unread}
            </p>
          </div>
        </div>

        {/* Notices */}
        {error ? (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            <strong className="mr-2">Error:</strong>
            {error}
          </div>
        ) : null}

        {notice ? (
          <div className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {notice}
          </div>
        ) : null}

        {/* Main Inbox */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/20">
          <div className="grid min-h-[700px] lg:grid-cols-[380px_minmax(0,1fr)]">
            {/* Conversation List */}
            <aside
              className={`border-white/10 lg:border-r ${
                mobileView === "messages"
                  ? "hidden lg:block"
                  : "block"
              }`}
            >
              <div className="border-b border-white/10 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold">
                    Conversations
                  </h2>

                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400">
                    {filteredConversations.length}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search customer, phone, email..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {STATUS_OPTIONS.map((option) => {
                    const active =
                      statusFilter === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setStatusFilter(option.value)
                        }
                        className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                          active
                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {loadingConversations ? (
                  <div className="space-y-3 p-4">
                    {Array.from({ length: 6 }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="animate-pulse rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                        >
                          <div className="flex gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/10" />

                            <div className="flex-1">
                              <div className="h-3 w-1/2 rounded bg-white/10" />
                              <div className="mt-2 h-3 w-3/4 rounded bg-white/5" />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <EmptyState
                    title="No conversations"
                    description={
                      search || statusFilter !== "all"
                        ? "No conversations match your current search or filter."
                        : "WhatsApp conversations will appear here when customer messages are received."
                    }
                  />
                ) : (
                  <div className="divide-y divide-white/5">
                    {filteredConversations
                      .slice(0, PAGE_SIZE)
                      .map((conversation) => {
                        const contact =
                          conversation.whatsapp_contacts;

                        const meta = getStatusMeta(
                          conversation.status
                        );

                        const active =
                          selectedConversation?.id ===
                          conversation.id;

                        return (
                          <button
                            type="button"
                            key={conversation.id}
                            onClick={() =>
                              selectConversation(conversation)
                            }
                            className={`w-full text-left transition ${
                              active
                                ? "bg-cyan-400/10"
                                : "hover:bg-white/[0.03]"
                            }`}
                          >
                            <div className="flex gap-3 p-4">
                              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-semibold text-cyan-300">
                                {getInitials(contact)}

                                {Number(
                                  conversation.unread_count || 0
                                ) > 0 ? (
                                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-slate-950">
                                    {conversation.unread_count >
                                    99
                                      ? "99+"
                                      : conversation.unread_count}
                                  </span>
                                ) : null}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="truncate font-medium text-white">
                                    {getCustomerName(contact)}
                                  </p>

                                  <span className="shrink-0 text-[10px] text-slate-500">
                                    {formatTime(
                                      conversation.last_message_at
                                    )}
                                  </span>
                                </div>

                                <p className="mt-1 truncate text-xs text-slate-500">
                                  {contact?.phone || "No phone"}
                                </p>

                                <div className="mt-2 flex items-center justify-between gap-2">
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[10px] ${meta.className}`}
                                  >
                                    {meta.label}
                                  </span>

                                  {conversation.assigned_to ? (
                                    <span className="text-[10px] text-slate-500">
                                      Assigned
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>

              {filteredConversations.length > PAGE_SIZE ? (
                <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-slate-500">
                  Showing first {PAGE_SIZE} conversations.
                  Use search/filter to find a specific customer.
                </div>
              ) : null}
            </aside>

            {/* Message Panel */}
            <section
              className={`min-w-0 ${
                mobileView === "list"
                  ? "hidden lg:flex"
                  : "flex"
              } flex-col`}
            >
              {!selectedConversation ? (
                <EmptyState
                  title="Select a conversation"
                  description="Choose a customer conversation from the left to view the complete WhatsApp message history."
                />
              ) : (
                <>
                  {/* Conversation Header */}
                  <div className="border-b border-white/10 bg-slate-900/95 p-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setMobileView("list")}
                        className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 lg:hidden"
                      >
                        ←
                      </button>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-semibold text-cyan-300">
                        {getInitials(selectedContact)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="truncate font-semibold text-white">
                          {getCustomerName(selectedContact)}
                        </h2>

                        <p className="truncate text-xs text-slate-500">
                          {selectedContact?.phone || "No phone"}
                          {selectedContact?.email
                            ? ` • ${selectedContact.email}`
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <span
                          className={`hidden rounded-full border px-2.5 py-1 text-xs sm:inline-flex ${selectedStatus?.className}`}
                        >
                          {selectedStatus?.label}
                        </span>

                        {selectedConversation.status !==
                        "human" ? (
                          <button
                            type="button"
                            onClick={() =>
                              updateConversationStatus(
                                "human"
                              )
                            }
                            disabled={updatingStatus}
                            className="rounded-lg border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-xs font-medium text-violet-300 transition hover:bg-violet-400/20 disabled:opacity-50"
                          >
                            {updatingStatus
                              ? "Updating..."
                              : "Take Over"}
                          </button>
                        ) : null}

                        {selectedConversation.status ===
                        "closed" ? (
                          <button
                            type="button"
                            onClick={() =>
                              updateConversationStatus("open")
                            }
                            disabled={updatingStatus}
                            className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300 transition hover:bg-emerald-400/20 disabled:opacity-50"
                          >
                            Reopen
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              updateConversationStatus("closed")
                            }
                            disabled={updatingStatus}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Message History */}
                  <div className="flex-1 overflow-y-auto bg-slate-950/50 p-4 sm:p-6">
                    {loadingMessages ? (
                      <div className="flex h-full min-h-[400px] items-center justify-center">
                        <div className="text-sm text-slate-500">
                          Loading messages...
                        </div>
                      </div>
                    ) : messages.length === 0 ? (
                      <EmptyState
                        title="No messages"
                        description="This conversation does not have any stored messages yet."
                      />
                    ) : (
                      <div className="space-y-3">
                        {messages.map((message) => (
                          <MessageBubble
                            key={message.id}
                            message={message}
                          />
                        ))}

                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/10 bg-slate-900/95 p-4">
                    <div className="rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-lg">
                          🔒
                        </div>

                        <div>
                          <p className="text-sm font-medium text-amber-200">
                            Secure messaging mode
                          </p>

                          <p className="mt-1 text-xs leading-5 text-amber-200/60">
                            Real Gupshup sending will be enabled
                            only after the Meta WhatsApp account
                            restriction is resolved. No
                            credentials are exposed in this
                            dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>

        {/* Security footer */}
        <div className="mt-4 flex flex-col gap-1 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            ShahInnovations • WhatsApp Admin Console
          </span>

          <span>
            Protected by Supabase Authentication + Row Level
            Security
          </span>
        </div>
      </div>
    </div>
  );
}