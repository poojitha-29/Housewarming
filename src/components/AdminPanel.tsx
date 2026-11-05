import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEventConfig, FullEventConfig } from "../context/EventContext";
import {
  Settings,
  X,
  Save,
  RotateCcw,
  Download,
  Check,
  DoorOpen,
  Calendar,
  MapPin,
  Phone,
  Image,
  User,
  Lock,
  Plus,
  Trash2
} from "lucide-react";

const checkIsAdminUrl = () => {
  if (typeof window === "undefined") return false;
  const searchParams = new URLSearchParams(window.location.search);
  const hasAdminQuery = searchParams.has("admin") && searchParams.get("admin") !== "false";
  const hasAdminHash = window.location.hash.toLowerCase().includes("admin");
  return hasAdminQuery || hasAdminHash;
};

export default function AdminPanel() {
  const { config, updateConfig, resetConfig, exportConfigJson } = useEventConfig();
  
  // Only enabled if URL contains ?admin or #admin or via secret shortcut
  const [isAdminMode, setIsAdminMode] = useState(checkIsAdminUrl);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<"door" | "hosts" | "events" | "venue" | "contact" | "gallery">("door");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local draft state for editing
  const [draft, setDraft] = useState<FullEventConfig>(config);

  // Listen to URL changes (?admin or #admin) and secret keyboard shortcut (Ctrl+Shift+A)
  React.useEffect(() => {
    const handleUrlChange = () => {
      const active = checkIsAdminUrl();
      setIsAdminMode(active);
      if (active) {
        setIsOpen(true);
      }
    };

    // Auto-open on initial load if URL has admin
    if (checkIsAdminUrl()) {
      setIsOpen(true);
    }

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);

    // Secret shortcut for host: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsAdminMode(true);
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // If not in admin mode, do NOT render anything – completely invisible to guests!
  if (!isAdminMode) {
    return null;
  }

  const handleOpen = () => {
    setDraft(config);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setPinError(false);
    setPinInput("");
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1208 (Flat Number)
    if (pinInput.trim() === "1208") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSave = () => {
    updateConfig(draft);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all information back to default settings?")) {
      resetConfig();
      setDraft(config);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  // Gallery handlers
  const handleAddPhoto = () => {
    setDraft((prev) => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        { src: "/urbanrise/hero-tower.jpg", label: "New Photo" }
      ]
    }));
  };

  const handleRemovePhoto = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleUpdatePhoto = (index: number, field: "src" | "label", value: string) => {
    setDraft((prev) => ({
      ...prev,
      gallery: prev.gallery.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    }));
  };

  return (
    <>
      {/* ── FLOATING ADMIN BUTTON (Discreet bottom-left) ── */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={handleOpen}
          className="bg-black/85 hover:bg-black text-[#E0A458] border border-[#E0A458]/40 hover:border-[#E0A458] px-3.5 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer group"
          title="Open Admin Panel to edit event details"
        >
          <Settings size={14} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Admin Edit</span>
        </button>
      </div>

      {/* ── ADMIN MODAL ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#1C1917] text-[#FAF8F5] border border-[#C5A880]/30 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#E0A458]/20 border border-[#E0A458]/40 flex items-center justify-center text-[#E0A458]">
                    <Settings size={16} />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-serif font-bold text-[#F3E5AB]">
                      Event Configuration &amp; Content Editor
                    </h2>
                    <p className="text-[11px] text-[#A8A29E]">
                      Edit any text, timing, address, contact, or photo across the entire invitation.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* PIN AUTHENTICATION OVERLAY */}
              {!isAuthenticated ? (
                <div className="p-8 sm:p-12 flex flex-col items-center text-center max-w-sm mx-auto my-auto">
                  <div className="w-14 h-14 rounded-full bg-[#E0A458]/20 border border-[#E0A458]/50 flex items-center justify-center text-[#E0A458] mb-4">
                    <Lock size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#F3E5AB]">Admin Authentication</h3>
                  <p className="text-xs text-[#A8A29E] mt-1.5 mb-6">
                    Enter the access PIN to customize invitation details. (Default PIN is <strong className="text-[#E0A458]">1208</strong>)
                  </p>

                  <form onSubmit={handlePinSubmit} className="w-full space-y-3">
                    <input
                      type="password"
                      maxLength={6}
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Enter PIN (1208)"
                      autoFocus
                      className="w-full text-center tracking-widest text-lg font-mono py-2.5 px-4 rounded-xl bg-black/60 border border-white/20 focus:outline-none focus:border-[#E0A458] text-white"
                    />

                    {pinError && (
                      <p className="text-xs text-red-400">Incorrect PIN. Try default: 1208</p>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPinInput("1208");
                          setIsAuthenticated(true);
                        }}
                        className="flex-1 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white/80 transition-colors"
                      >
                        Quick Fill 1208
                      </button>

                      <button
                        type="submit"
                        className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#9E1B32] hover:bg-[#801426] text-white transition-colors shadow-sm"
                      >
                        Unlock Editor
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {/* TABS NAVIGATION */}
                  <div className="flex items-center gap-1 p-2 sm:px-4 border-b border-white/10 bg-black/20 overflow-x-auto text-xs font-medium">
                    {[
                      { id: "door", label: "Entrance Door", icon: DoorOpen },
                      { id: "hosts", label: "Hosts & Invocation", icon: User },
                      { id: "events", label: "Schedule (2 Days)", icon: Calendar },
                      { id: "venue", label: "Venue & Map", icon: MapPin },
                      { id: "contact", label: "Contact & RSVP", icon: Phone },
                      { id: "gallery", label: "4K Photos", icon: Image },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as typeof activeTab)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#E0A458] text-[#1C1917] font-bold shadow-sm"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <Icon size={13} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* TAB CONTENT (Scrollable) */}
                  <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
                    {/* TAB 1: FRONT DOOR */}
                    {activeTab === "door" && (
                      <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                          <h4 className="text-sm font-serif font-bold text-[#F3E5AB] mb-3">
                            Front Door Appearance (Screenshot 1 &amp; 2)
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Top Subtitle Badge
                              </label>
                              <input
                                type="text"
                                value={draft.door.badge}
                                onChange={(e) =>
                                  setDraft({ ...draft, door: { ...draft.door, badge: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Family Heading
                              </label>
                              <input
                                type="text"
                                value={draft.door.familyTitle}
                                onChange={(e) =>
                                  setDraft({ ...draft, door: { ...draft.door, familyTitle: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                CTA Ring Prompt
                              </label>
                              <input
                                type="text"
                                value={draft.door.ctaPrompt}
                                onChange={(e) =>
                                  setDraft({ ...draft, door: { ...draft.door, ctaPrompt: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Flat Number (Plaque)
                              </label>
                              <input
                                type="text"
                                value={draft.door.flatNumber}
                                onChange={(e) =>
                                  setDraft({ ...draft, door: { ...draft.door, flatNumber: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Nameplate Line 1
                              </label>
                              <input
                                type="text"
                                value={draft.door.nameplateLine1}
                                onChange={(e) =>
                                  setDraft({ ...draft, door: { ...draft.door, nameplateLine1: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Nameplate Line 2
                              </label>
                              <input
                                type="text"
                                value={draft.door.nameplateLine2}
                                onChange={(e) =>
                                  setDraft({ ...draft, door: { ...draft.door, nameplateLine2: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Interior Welcome Title
                              </label>
                              <input
                                type="text"
                                value={draft.door.welcomeInteriorTitle}
                                onChange={(e) =>
                                  setDraft({
                                    ...draft,
                                    door: { ...draft.door, welcomeInteriorTitle: e.target.value }
                                  })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Interior Welcome Subtitle
                              </label>
                              <input
                                type="text"
                                value={draft.door.welcomeInteriorSubtitle}
                                onChange={(e) =>
                                  setDraft({
                                    ...draft,
                                    door: { ...draft.door, welcomeInteriorSubtitle: e.target.value }
                                  })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: HOSTS & INVOCATION */}
                    {activeTab === "hosts" && (
                      <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                          <h4 className="text-sm font-serif font-bold text-[#F3E5AB] mb-3">
                            Hosts &amp; Invocations (Screenshot 3)
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Host 1 Name
                              </label>
                              <input
                                type="text"
                                value={draft.hosts.name1}
                                onChange={(e) =>
                                  setDraft({ ...draft, hosts: { ...draft.hosts, name1: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Host 2 Name
                              </label>
                              <input
                                type="text"
                                value={draft.hosts.name2}
                                onChange={(e) =>
                                  setDraft({ ...draft, hosts: { ...draft.hosts, name2: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Combined Display Names
                              </label>
                              <input
                                type="text"
                                value={draft.hosts.displayName}
                                onChange={(e) =>
                                  setDraft({ ...draft, hosts: { ...draft.hosts, displayName: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Family Title Heading
                              </label>
                              <input
                                type="text"
                                value={draft.hosts.familyTitle}
                                onChange={(e) =>
                                  setDraft({ ...draft, hosts: { ...draft.hosts, familyTitle: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Subtitle / Daughters
                              </label>
                              <input
                                type="text"
                                value={draft.hosts.daughters}
                                onChange={(e) =>
                                  setDraft({ ...draft, hosts: { ...draft.hosts, daughters: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Sanskrit Invocation Shloka
                              </label>
                              <input
                                type="text"
                                value={draft.sanskritBlessing.shloka}
                                onChange={(e) =>
                                  setDraft({
                                    ...draft,
                                    sanskritBlessing: { ...draft.sanskritBlessing, shloka: e.target.value }
                                  })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Invitation Sentence
                              </label>
                              <input
                                type="text"
                                value={draft.invitationMessage}
                                onChange={(e) => setDraft({ ...draft, invitationMessage: e.target.value })}
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Poster Invitation Message
                              </label>
                              <textarea
                                rows={2}
                                value={draft.posterMessage}
                                onChange={(e) => setDraft({ ...draft, posterMessage: e.target.value })}
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: TWO CELEBRATIONS SCHEDULE */}
                    {activeTab === "events" && (
                      <div className="space-y-4">
                        {draft.events.map((ev, index) => (
                          <div key={ev.id} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <h4 className="text-sm font-serif font-bold text-[#F3E5AB] mb-3 flex items-center gap-2">
                              <span>{index === 0 ? "🚪 Event 1: Night Celebration" : "🪔 Event 2: Morning Puja"}</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                  Event Title
                                </label>
                                <input
                                  type="text"
                                  value={ev.title}
                                  onChange={(e) => {
                                    const updated = [...draft.events];
                                    updated[index] = { ...updated[index], title: e.target.value };
                                    setDraft({ ...draft, events: updated });
                                  }}
                                  className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                  Date (YYYY-MM-DD)
                                </label>
                                <input
                                  type="date"
                                  value={ev.date}
                                  onChange={(e) => {
                                    const updated = [...draft.events];
                                    updated[index] = { ...updated[index], date: e.target.value };
                                    setDraft({ ...draft, events: updated });
                                  }}
                                  className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                  Display Date Text
                                </label>
                                <input
                                  type="text"
                                  value={ev.displayDate}
                                  onChange={(e) => {
                                    const updated = [...draft.events];
                                    updated[index] = { ...updated[index], displayDate: e.target.value };
                                    setDraft({ ...draft, events: updated });
                                  }}
                                  className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                  Day of Week
                                </label>
                                <input
                                  type="text"
                                  value={ev.day}
                                  onChange={(e) => {
                                    const updated = [...draft.events];
                                    updated[index] = { ...updated[index], day: e.target.value };
                                    setDraft({ ...draft, events: updated });
                                  }}
                                  className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                  Timing (e.g. Evening onwards / 6:30 PM)
                                </label>
                                <input
                                  type="text"
                                  value={ev.time}
                                  onChange={(e) => {
                                    const updated = [...draft.events];
                                    updated[index] = { ...updated[index], time: e.target.value };
                                    setDraft({ ...draft, events: updated });
                                  }}
                                  className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                  Description
                                </label>
                                <textarea
                                  rows={2}
                                  value={ev.description}
                                  onChange={(e) => {
                                    const updated = [...draft.events];
                                    updated[index] = { ...updated[index], description: e.target.value };
                                    setDraft({ ...draft, events: updated });
                                  }}
                                  className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB 4: VENUE & MAP */}
                    {activeTab === "venue" && (
                      <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                          <h4 className="text-sm font-serif font-bold text-[#F3E5AB] mb-3">
                            Venue, Address &amp; Maps Link
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Venue / Community Name
                              </label>
                              <input
                                type="text"
                                value={draft.venue.name}
                                onChange={(e) =>
                                  setDraft({ ...draft, venue: { ...draft.venue, name: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Apartment / Tower / Flat
                              </label>
                              <input
                                type="text"
                                value={draft.venue.apartment}
                                onChange={(e) =>
                                  setDraft({ ...draft, venue: { ...draft.venue, apartment: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Address Line 1
                              </label>
                              <input
                                type="text"
                                value={draft.venue.addressLine1}
                                onChange={(e) =>
                                  setDraft({ ...draft, venue: { ...draft.venue, addressLine1: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Address Line 2 (Landmark)
                              </label>
                              <input
                                type="text"
                                value={draft.venue.addressLine2}
                                onChange={(e) =>
                                  setDraft({ ...draft, venue: { ...draft.venue, addressLine2: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                value={draft.venue.city}
                                onChange={(e) =>
                                  setDraft({ ...draft, venue: { ...draft.venue, city: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Pincode
                              </label>
                              <input
                                type="text"
                                value={draft.venue.pincode}
                                onChange={(e) =>
                                  setDraft({ ...draft, venue: { ...draft.venue, pincode: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Google Maps URL
                              </label>
                              <input
                                type="text"
                                value={draft.venue.googleMapsUrl}
                                onChange={(e) =>
                                  setDraft({ ...draft, venue: { ...draft.venue, googleMapsUrl: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 5: CONTACT & RSVP */}
                    {activeTab === "contact" && (
                      <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                          <h4 className="text-sm font-serif font-bold text-[#F3E5AB] mb-3">
                            Contact Phone &amp; WhatsApp Links
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Contact Phone Number
                              </label>
                              <input
                                type="text"
                                value={draft.hosts.contact}
                                onChange={(e) =>
                                  setDraft({ ...draft, hosts: { ...draft.hosts, contact: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                Phone Dialer URI
                              </label>
                              <input
                                type="text"
                                value={draft.hosts.phoneLink}
                                onChange={(e) =>
                                  setDraft({ ...draft, hosts: { ...draft.hosts, phoneLink: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none font-mono"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-semibold text-[#A8A29E] mb-1">
                                WhatsApp RSVP Link (Full URL)
                              </label>
                              <input
                                type="text"
                                value={draft.hosts.whatsappLink}
                                onChange={(e) =>
                                  setDraft({ ...draft, hosts: { ...draft.hosts, whatsappLink: e.target.value } })
                                }
                                className="w-full text-xs bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-white focus:border-[#E0A458] focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 6: 4K PHOTOS GALLERY */}
                    {activeTab === "gallery" && (
                      <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-serif font-bold text-[#F3E5AB]">
                              Community Showcase Photos
                            </h4>
                            <button
                              onClick={handleAddPhoto}
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#E0A458]/20 text-[#E0A458] border border-[#E0A458]/40 hover:bg-[#E0A458]/30 flex items-center gap-1 cursor-pointer"
                            >
                              <Plus size={12} />
                              <span>Add Photo</span>
                            </button>
                          </div>

                          <div className="space-y-2.5">
                            {draft.gallery.map((photo, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/10"
                              >
                                <img
                                  src={photo.src}
                                  alt={photo.label}
                                  className="w-12 h-10 object-cover rounded-lg border border-white/20"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/urbanrise/hero-tower.jpg";
                                  }}
                                />
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={photo.label}
                                    onChange={(e) => handleUpdatePhoto(i, "label", e.target.value)}
                                    placeholder="Photo Label"
                                    className="text-xs bg-black/50 border border-white/20 rounded-lg px-2.5 py-1.5 text-white"
                                  />
                                  <input
                                    type="text"
                                    value={photo.src}
                                    onChange={(e) => handleUpdatePhoto(i, "src", e.target.value)}
                                    placeholder="Image URL"
                                    className="text-xs bg-black/50 border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-mono"
                                  />
                                </div>
                                <button
                                  onClick={() => handleRemovePhoto(i)}
                                  className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-white/5"
                                  title="Delete photo"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleReset}
                        className="text-xs text-white/60 hover:text-white hover:bg-white/10 py-2 px-3 rounded-xl border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Reset to initial configuration"
                      >
                        <RotateCcw size={13} />
                        <span>Reset Defaults</span>
                      </button>

                      <button
                        onClick={exportConfigJson}
                        className="text-xs text-[#E0A458] hover:bg-[#E0A458]/10 py-2 px-3 rounded-xl border border-[#E0A458]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Download backup JSON"
                      >
                        <Download size={13} />
                        <span>Export JSON</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {savedSuccess && (
                        <span className="text-xs text-[#4CAF50] font-semibold flex items-center gap-1 animate-pulse">
                          <Check size={14} />
                          <span>Saved &amp; Applied Live!</span>
                        </span>
                      )}

                      <button
                        onClick={handleSave}
                        className="bg-[#9E1B32] hover:bg-[#7F1426] text-white text-xs font-bold py-2 px-5 rounded-xl shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Save size={14} />
                        <span>Save &amp; Apply Changes</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
