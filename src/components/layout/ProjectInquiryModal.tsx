"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { contact } from "@/data/contact";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ProjectInquiryModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
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
      !project ||
      message.trim().length < 12
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
        `Project type: ${project}`,
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
        className="relative max-h-[calc(100svh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-white/15 bg-background p-5 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project inquiry"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="size-5" />
        </button>
        <p className="eyebrow text-primary">Start a project</p>
        <h2
          id="project-modal-title"
          className="display mt-3 max-w-lg text-4xl leading-none sm:text-5xl"
        >
          Tell us what you want to build.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Share the essentials and Gmail will open with a message ready to send to our team.
        </p>
        <form onSubmit={submit} className="mt-7 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none transition-colors focus:border-primary"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none transition-colors focus:border-primary"
              />
            </label>
          </div>
          <label className="grid gap-1.5 text-sm font-medium">
            Project type
            <select
              required
              value={project}
              onChange={(event) => setProject(event.target.value)}
              className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none transition-colors focus:border-primary"
            >
              <option value="">Select project type</option>
              {contact.projectTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Project details
            <textarea
              required
              minLength={12}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="What are you hoping to build?"
              rows={4}
              className="resize-y rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none transition-colors focus:border-primary"
            />
          </label>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-4 text-primary" /> No server storage. Gmail opens your draft.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Open Gmail draft <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
