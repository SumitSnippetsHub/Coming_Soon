"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { contact, countryCodes } from "@/data/contact";
import { CustomSelect } from "@/components/ui/CustomSelect";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ProjectInquiryModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("input")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      !/^\d[\d\s-]{7,}$/.test(phone.trim()) ||
      !project ||
      message.trim().length < 12 ||
      !date ||
      !time
    ) {
      setError("Please complete all fields with a valid email and a little project detail.");
      return;
    }

    const url = new URL("https://mail.google.com/mail/");
    url.searchParams.set("view", "cm");
    url.searchParams.set("fs", "1");
    url.searchParams.set("to", contact.email);
    url.searchParams.set("su", `ZYNOVATE project inquiry from ${name.trim()}`);
    url.searchParams.set(
      "body",
      [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Mobile: ${countryCode} ${phone.trim()}`,
        `Project type: ${project}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        "",
        message.trim(),
      ].join("\n"),
    );
    window.open(url.toString(), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-3xl rounded-[1.75rem] border border-white/15 bg-background p-3 shadow-2xl sm:p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project inquiry"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="size-5" />
        </button>
        <p className="eyebrow text-primary">Start a project</p>
        <h2
          id="project-modal-title"
          className="display mt-2 max-w-lg text-2xl leading-none sm:text-4xl"
        >
          Tell us what you want to build.
        </h2>
        <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">
          Share the essentials and Gmail will open with a message ready to send to our team.
        </p>
        <form onSubmit={submit} className="mt-3 grid gap-2 sm:mt-4 sm:gap-2.5">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <label className="grid gap-1 text-xs font-medium">
              Name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-normal outline-none transition-colors focus:border-primary sm:px-3 sm:py-2 sm:text-sm"
              />
            </label>
            <label className="grid gap-1 text-xs font-medium">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-normal outline-none transition-colors focus:border-primary sm:px-3 sm:py-2 sm:text-sm"
              />
            </label>
          </div>
          <div className="grid grid-cols-[minmax(5.5rem,0.7fr)_minmax(0,1.3fr)] gap-2.5">
            <label className="grid gap-1 text-xs font-medium">
              Country code
              <CustomSelect
                value={countryCode}
                onChange={setCountryCode}
                options={countryCodes.map((item) => ({
                  value: item.code,
                  label: `${item.code} · ${item.label}`,
                }))}
                placeholder="Code"
                className="h-auto rounded-lg border border-border px-2.5 py-1.5 text-xs font-normal sm:px-3 sm:py-2 sm:text-sm"
              />
            </label>
            <label className="grid gap-1 text-xs font-medium">
              Mobile number
              <input
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="88009 04734"
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-normal outline-none transition-colors focus:border-primary sm:px-3 sm:py-2 sm:text-sm"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <label className="grid gap-1 text-xs font-medium">
              Project type
              <CustomSelect
                required
                value={project}
                onChange={setProject}
                options={contact.projectTypes}
                placeholder="Select project type"
                className="h-auto rounded-lg border border-border px-2.5 py-1.5 text-xs font-normal sm:px-3 sm:py-2 sm:text-sm"
              />
            </label>
            <label className="grid gap-1 text-xs font-medium">
              Preferred date
              <input
                required
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-normal outline-none focus:border-primary sm:px-3 sm:py-2 sm:text-sm"
              />
            </label>
            <label className="grid gap-1 text-xs font-medium">
              Preferred time
              <input
                required
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-normal outline-none focus:border-primary sm:px-3 sm:py-2 sm:text-sm"
              />
            </label>
          </div>
          <label className="grid gap-1 text-xs font-medium">
            Project details
            <textarea
              required
              minLength={12}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="What are you hoping to build?"
              rows={2}
              className="resize-none rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-normal outline-none transition-colors focus:border-primary sm:px-3 sm:py-2 sm:text-sm"
            />
          </label>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[0.68rem] text-muted-foreground">
              <Check className="size-3.5 text-primary" /> Gmail opens your draft.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm"
            >
              Open Gmail draft <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
