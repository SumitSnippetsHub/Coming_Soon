"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Network,
  Phone,
  Rocket,
  Send,
  Target,
  UserRound,
  Wallet,
  X,
  createLucideIcon,
  type LucideIcon,
} from "lucide-react";

import {
  contact,
  contactCall,
  contactChannels,
  contactErrors,
  contactFormCopy,
  contactIntro,
  contactPlaceholderNotice,
  contactSteps,
  contactSuccess,
} from "@/data/contact";
import { social } from "@/data/social";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const Linkedin = createLucideIcon("Linkedin", [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "linkedin-path",
    },
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "linkedin-rect" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "linkedin-circle" }],
]);

const Github = createLucideIcon("Github", [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "github-mark",
    },
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "github-tail" }],
]);

const Instagram = createLucideIcon("Instagram", [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "instagram-frame" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "instagram-lens" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "instagram-dot" }],
]);

const stepIcons = { MessageCircle, Network, Rocket } as const;

const rise = "motion-safe:translate-y-6 motion-safe:opacity-0";
const medalRise = "motion-safe:translate-y-4 motion-safe:opacity-0";

type Field = "name" | "email" | "projectType" | "budget" | "message";
type ErrorField = Field | "consent";
type Values = Record<Field, string>;
type Errors = Partial<Record<ErrorField, string>>;

const empty: Values = { name: "", email: "", projectType: "", budget: "", message: "" };
const fieldOrder: ErrorField[] = ["name", "email", "projectType", "budget", "message", "consent"];

const channelIcons = { email: Mail, phone: Phone, location: MapPin } as const;

function socialIcon(label: string): LucideIcon | null {
  if (label === "LinkedIn") return Linkedin;
  if (label === "GitHub") return Github;
  if (label === "Instagram") return Instagram;
  if (label === "X") return X;
  return null;
}

function validate(values: Values, agreed: boolean): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = contactErrors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = contactErrors.email;
  if (!values.projectType) errors.projectType = contactErrors.projectType;
  if (!values.budget) errors.budget = contactErrors.budget;
  if (values.message.trim().length < 12) errors.message = contactErrors.message;
  else if (values.message.length > contactFormCopy.message.max)
    errors.message = contactErrors.messageLength;
  if (!agreed) errors.consent = contactErrors.consent;
  return errors;
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatCallDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function buildMonth(cursor: Date) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const lead = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: { key: string; date: Date; inMonth: boolean }[] = [];

  for (let index = 0; index < lead; index += 1) {
    const date = new Date(year, month, index - lead + 1);
    cells.push({ key: dayKey(date), date, inMonth: false });
  }
  for (let day = 1; day <= days; day += 1) {
    const date = new Date(year, month, day);
    cells.push({ key: dayKey(date), date, inMonth: true });
  }

  const tail = (7 - (cells.length % 7)) % 7;
  for (let index = 1; index <= tail; index += 1) {
    const date = new Date(year, month, days + index);
    cells.push({ key: dayKey(date), date, inMonth: false });
  }
  return cells;
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

function useSubmitMotion() {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isTouchDevice()) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.28}px, 0)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return { ref, onMouseMove, onMouseLeave };
}

function shell(invalid: boolean) {
  return cn(
    "rounded-xl border bg-background/70 transition-colors duration-200 focus-within:border-primary",
    invalid ? "border-destructive" : "border-border",
  );
}

function iconClass() {
  return "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary";
}

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);
  const [callDate, setCallDate] = useState<Date | null>(null);
  const [callTime, setCallTime] = useState<string | null>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
      tl.fromTo(
        "[data-contact-copy]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
      )
        .fromTo(
          "[data-contact-medal]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          "-=0.32",
        )
        .fromTo(
          "[data-contact-meta]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
          "-=0.28",
        )
        .fromTo(
          "[data-contact-card]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85 },
          "-=0.3",
        );
    }, section);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const update = (field: Field, value: string) => {
    const nextValue = field === "message" ? value.slice(0, contactFormCopy.message.max) : value;
    const next = { ...values, [field]: nextValue };
    setValues(next);
    if (attempted) setErrors(validate(next, agreed));
  };

  const changeAgreement = (checked: boolean) => {
    setAgreed(checked);
    if (attempted) setErrors(validate(values, checked));
  };

  const reset = () => {
    setSent(false);
    setValues(empty);
    setErrors({});
    setAttempted(false);
    setAgreed(false);
    setCallDate(null);
    setCallTime(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, agreed);
    setAttempted(true);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      form.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const subject = `ZYNOVATE project inquiry from ${values.name.trim()}`;
    const lines = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Project type: ${values.projectType}`,
      `Budget range: ${values.budget}`,
    ];
    if (callDate) lines.push(`Preferred call date: ${formatCallDate(callDate)}`);
    if (callTime) lines.push(`Preferred call time (IST): ${callTime}`);
    lines.push("", values.message.trim());

    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.searchParams.set("view", "cm");
    gmailUrl.searchParams.set("fs", "1");
    gmailUrl.searchParams.set("to", contact.email);
    gmailUrl.searchParams.set("su", subject);
    gmailUrl.searchParams.set("body", lines.join("\n"));
    window.open(gmailUrl.toString(), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={root}
      aria-labelledby="contact-title"
      className="relative min-h-0 bg-background py-16 md:py-20 lg:flex lg:h-[100svh] lg:max-h-[100svh] lg:items-center lg:overflow-hidden lg:py-0"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-20 size-[34rem] rounded-full bg-sand/80 blur-3xl" />
        <div className="absolute -left-36 top-1/4 size-[30rem] rounded-full bg-blush blur-3xl" />
        <div className="absolute bottom-0 right-[18%] size-[24rem] rounded-full bg-sand/60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[86rem] gap-12 px-5 sm:px-6 md:gap-14 md:px-8 lg:max-h-full lg:grid-cols-[minmax(14rem,18.5rem)_minmax(0,1fr)] lg:items-center lg:gap-x-6 lg:px-6 xl:gap-x-10 xl:px-10">
        <div className="min-w-0">
          <p data-contact-copy className={cn(rise, "eyebrow text-primary")}>
            {contactIntro.eyebrow}
          </p>
          <h2
            id="contact-title"
            data-contact-copy
            className={cn(
              rise,
              "display mt-4 max-w-[min(10ch,100%)] pb-[0.06em] text-[clamp(2.75rem,5.6vw,4.7rem)] leading-[0.94] lg:mt-2 lg:max-w-[min(8.2ch,100%)] lg:text-[clamp(2.45rem,3.15vw,3.15rem)]",
            )}
          >
            {contactIntro.title}
          </h2>
          <p
            data-contact-copy
            className={cn(
              rise,
              "mt-5 max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg lg:mt-2.5 lg:text-sm lg:leading-snug",
            )}
          >
            {contactIntro.description} {contactIntro.response}
          </p>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-3 lg:mt-4 lg:gap-2">
            {contactSteps.map((step) => {
              const Icon = stepIcons[step.icon];
              return (
                <div
                  key={step.title}
                  data-contact-medal
                  className={cn(medalRise, "min-w-0 text-center")}
                >
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-blush text-primary sm:size-14 lg:size-10">
                    <Icon aria-hidden className="size-5 lg:size-4" strokeWidth={1.6} />
                  </span>
                  <p className="mt-3 text-sm font-semibold lg:mt-1.5 lg:text-[0.8125rem]">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground lg:mt-0.5 lg:text-[0.68rem] lg:leading-tight">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {contact.isPlaceholder ? (
            <p
              data-contact-meta
              className={cn(
                rise,
                "mt-8 max-w-sm text-xs leading-relaxed text-muted-foreground lg:mt-3 lg:leading-snug",
              )}
            >
              {contactPlaceholderNotice}
            </p>
          ) : null}

          <dl
            className={cn(
              "grid max-w-sm gap-4 lg:gap-2",
              contact.isPlaceholder ? "mt-4 lg:mt-2" : "mt-10 lg:mt-4",
            )}
          >
            <ChannelRow
              icon={channelIcons.email}
              label={contactChannels.email}
              value={
                <a className="font-medium hover:text-primary" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              }
            />
            <ChannelRow
              icon={channelIcons.phone}
              label={contactChannels.phone}
              value={
                <a
                  className="font-medium hover:text-primary"
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                >
                  {contact.phone}
                </a>
              }
            />
            <ChannelRow
              icon={channelIcons.location}
              label={contactChannels.location}
              value={<span className="font-medium">{contact.location}</span>}
            />
          </dl>

          <div
            data-contact-meta
            className={cn(
              rise,
              "mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-5 lg:mt-3 lg:gap-2 lg:pt-2.5",
            )}
          >
            <p className="eyebrow text-muted-foreground">{contactChannels.follow}</p>
            <ul className="flex flex-wrap gap-2">
              {social.map((item) => {
                const Icon = socialIcon(item.label);
                const className =
                  "inline-flex size-8 items-center justify-center rounded-full border border-border bg-blush text-primary";
                const glyph = Icon ? (
                  <Icon aria-hidden className="size-3.5" strokeWidth={1.75} />
                ) : (
                  <span aria-hidden className="text-[10px] font-semibold">
                    {item.label.slice(0, 1)}
                  </span>
                );
                return (
                  <li key={item.label}>
                    {item.isPlaceholder || item.href === "#" ? (
                      <span
                        aria-disabled="true"
                        aria-label={`${item.label}, placeholder`}
                        className={className}
                      >
                        {glyph}
                      </span>
                    ) : (
                      <a
                        href={item.href}
                        aria-label={item.label}
                        className={cn(
                          className,
                          "transition-transform duration-200 hover:-translate-y-0.5",
                        )}
                      >
                        {glyph}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          data-contact-card
          className={cn(
            rise,
            "min-w-0 rounded-[1.75rem] border border-border bg-card shadow-float",
          )}
        >
          {sent ? (
            <div
              role="status"
              className="flex min-h-[28rem] flex-col justify-center px-6 py-14 sm:px-10"
            >
              <p className="eyebrow text-primary">{contactSuccess.eyebrow}</p>
              <h3 className="mt-4 max-w-md text-3xl font-semibold tracking-tight">
                {contactSuccess.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                {contactSuccess.body}
              </p>
              <button
                type="button"
                suppressHydrationWarning
                onClick={reset}
                className="mt-8 w-fit rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
              >
                {contactSuccess.again}
              </button>
            </div>
          ) : (
            <form
              ref={form}
              noValidate
              onSubmit={onSubmit}
              aria-label={contactFormCopy.formLabel}
              className="flex flex-col p-4 sm:p-6 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.88fr)] lg:grid-rows-[auto_auto] lg:gap-x-0 lg:gap-y-2.5 lg:p-4 xl:p-5"
            >
              <div className="order-1 min-w-0 lg:order-none lg:col-start-1 lg:row-start-1 lg:pr-4 xl:pr-5">
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl lg:text-base xl:text-lg">
                  {contactFormCopy.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground lg:mt-1 lg:text-xs lg:leading-snug">
                  {contactFormCopy.intro}
                </p>
                <div className="mt-6 grid gap-4 lg:mt-2.5 lg:gap-2">
                  <TextField
                    name="name"
                    type="text"
                    label={contactFormCopy.name.label}
                    placeholder={contactFormCopy.name.placeholder}
                    value={values.name}
                    autoComplete="name"
                    error={errors.name}
                    errorId="error-name"
                    icon={UserRound}
                    onChange={(value) => update("name", value)}
                  />
                  <TextField
                    name="email"
                    type="email"
                    label={contactFormCopy.email.label}
                    placeholder={contactFormCopy.email.placeholder}
                    value={values.email}
                    autoComplete="email"
                    error={errors.email}
                    errorId="error-email"
                    icon={Mail}
                    onChange={(value) => update("email", value)}
                  />
                  <div className="grid gap-4 sm:grid-cols-2 lg:gap-2">
                    <SelectField
                      name="projectType"
                      label={contactFormCopy.projectType.label}
                      placeholder={contactFormCopy.projectType.placeholder}
                      value={values.projectType}
                      options={contact.projectTypes}
                      error={errors.projectType}
                      errorId="error-project"
                      icon={Target}
                      onChange={(value) => update("projectType", value)}
                    />
                    <SelectField
                      name="budget"
                      label={contactFormCopy.budget.label}
                      placeholder={contactFormCopy.budget.placeholder}
                      value={values.budget}
                      options={contact.budgetRanges}
                      error={errors.budget}
                      errorId="error-budget"
                      icon={Wallet}
                      onChange={(value) => update("budget", value)}
                    />
                  </div>
                  <label className="group block min-w-0">
                    <span className="mb-1.5 block text-sm font-medium text-foreground transition-colors duration-200 group-focus-within:text-primary lg:mb-1 lg:text-xs">
                      {contactFormCopy.message.label}
                      <span aria-hidden="true" className="text-primary">
                        {" "}
                        *
                      </span>
                    </span>
                    <span className={cn("relative block", shell(Boolean(errors.message)))}>
                      <MessageSquare
                        aria-hidden
                        className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary"
                      />
                      <textarea
                        name="message"
                        aria-required="true"
                        rows={4}
                        maxLength={contactFormCopy.message.max}
                        value={values.message}
                        placeholder={contactFormCopy.message.placeholder}
                        onChange={(event) => update("message", event.target.value)}
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby={errors.message ? "error-message" : undefined}
                        suppressHydrationWarning
                        className="min-h-32 w-full resize-y bg-transparent pb-7 pl-10 pr-3 pt-3 text-base text-foreground placeholder:text-muted-foreground lg:min-h-[4.25rem] lg:resize-none lg:pb-6 lg:pt-2"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute bottom-2.5 right-3 text-xs tabular-nums text-muted-foreground"
                      >
                        {values.message.length}/{contactFormCopy.message.max}
                      </span>
                    </span>
                    {errors.message ? (
                      <FieldError id="error-message" message={errors.message} />
                    ) : null}
                  </label>
                </div>
              </div>

              <CallColumn
                date={callDate}
                time={callTime}
                onDate={setCallDate}
                onTime={setCallTime}
              />

              <div className="order-3 mt-8 min-w-0 lg:order-none lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-start lg:pr-4 xl:pr-5">
                <label className="flex items-start gap-2.5">
                  <span className="relative mt-0.5 size-4 shrink-0">
                    <input
                      name="consent"
                      type="checkbox"
                      checked={agreed}
                      aria-required="true"
                      onChange={(event) => changeAgreement(event.target.checked)}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "error-consent" : undefined}
                      suppressHydrationWarning
                      className="peer absolute inset-0 z-10 size-4 cursor-pointer opacity-0 focus-visible:outline-none"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-[4px] border bg-background transition-colors duration-200 peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:shadow-[0_0_0_5px_var(--cream)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-ring",
                        errors.consent ? "border-destructive" : "border-primary/45",
                      )}
                    />
                    <Check
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-primary-foreground opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-sm leading-snug text-foreground">
                    {contactFormCopy.consent}
                  </span>
                </label>
                {errors.consent ? <FieldError id="error-consent" message={errors.consent} /> : null}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-2">
                  <SubmitButton />
                  <p className="max-w-[14rem] text-xs leading-relaxed text-muted-foreground">
                    {contactIntro.response}
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ChannelRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
}) {
  return (
    <div data-contact-meta className={cn(rise, "flex gap-3")}>
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.75} />
      <div className="min-w-0">
        <dt className="eyebrow text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm text-foreground lg:mt-0.5 lg:text-[0.8125rem] lg:leading-tight">
          {value}
        </dd>
      </div>
    </div>
  );
}

function TextField({
  name,
  type,
  label,
  placeholder,
  value,
  autoComplete,
  error,
  errorId,
  icon: Icon,
  onChange,
}: {
  name: Field;
  type: "text" | "email";
  label: string;
  placeholder: string;
  value: string;
  autoComplete: string;
  error: string | undefined;
  errorId: string;
  icon: LucideIcon;
  onChange: (value: string) => void;
}) {
  return (
    <label className="group block min-w-0">
      <span className="mb-1.5 block text-sm font-medium text-foreground transition-colors duration-200 group-focus-within:text-primary lg:mb-1 lg:text-xs">
        {label}
        <span aria-hidden="true" className="text-primary">
          {" "}
          *
        </span>
      </span>
      <span className={cn("relative block", shell(Boolean(error)))}>
        <Icon aria-hidden className={iconClass()} strokeWidth={1.75} />
        <input
          name={name}
          type={type}
          aria-required="true"
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          suppressHydrationWarning
          className="h-12 w-full min-w-0 bg-transparent pl-10 pr-3 text-base text-foreground placeholder:text-muted-foreground lg:h-9"
        />
      </span>
      {error ? <FieldError id={errorId} message={error} /> : null}
    </label>
  );
}

function SelectField({
  name,
  label,
  placeholder,
  value,
  options,
  error,
  errorId,
  icon: Icon,
  onChange,
}: {
  name: Field;
  label: string;
  placeholder: string;
  value: string;
  options: readonly string[];
  error: string | undefined;
  errorId: string;
  icon: LucideIcon;
  onChange: (value: string) => void;
}) {
  return (
    <label className="group block min-w-0">
      <span className="mb-1.5 block text-sm font-medium text-foreground transition-colors duration-200 group-focus-within:text-primary lg:mb-1 lg:text-xs">
        {label}
        <span aria-hidden="true" className="text-primary">
          {" "}
          *
        </span>
      </span>
      <span className={cn("relative block", shell(Boolean(error)))}>
        <Icon aria-hidden className={iconClass()} strokeWidth={1.75} />
        <select
          name={name}
          aria-required="true"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          suppressHydrationWarning
          className={cn(
            "h-12 w-full min-w-0 appearance-none bg-transparent pl-10 pr-9 text-base lg:h-9",
            value ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-foreground">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </span>
      {error ? <FieldError id={errorId} message={error} /> : null}
    </label>
  );
}

function SubmitButton() {
  const { ref, onMouseMove, onMouseLeave } = useSubmitMotion();
  return (
    <button
      ref={ref}
      type="submit"
      suppressHydrationWarning
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-soft transition-transform duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 sm:w-auto lg:h-10"
    >
      <Send aria-hidden className="size-4" strokeWidth={1.75} />
      {contactFormCopy.submit}
      <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
    </button>
  );
}

function CallColumn({
  date,
  time,
  onDate,
  onTime,
}: {
  date: Date | null;
  time: string | null;
  onDate: (date: Date | null) => void;
  onTime: (time: string | null) => void;
}) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const today = new Date();
  const cells = buildMonth(cursor);
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    cursor,
  );

  return (
    <div className="order-2 mt-8 min-w-0 border-t border-border pt-8 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0 xl:pl-5">
      <h3 className="text-lg font-semibold tracking-tight sm:text-xl lg:text-base xl:text-lg">
        {contactCall.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground lg:mt-1 lg:text-xs lg:leading-snug">
        {contactCall.intro}
      </p>

      <div className="mt-5 lg:mt-2.5">
        <div className="flex items-center justify-between gap-3">
          <p id="call-month-label" suppressHydrationWarning className="text-sm font-semibold">
            {monthLabel}
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              suppressHydrationWarning
              aria-label={contactCall.previousMonth}
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              className="grid size-8 place-items-center rounded-full text-foreground transition-colors duration-200 hover:bg-secondary"
            >
              <ChevronLeft aria-hidden className="size-4" />
            </button>
            <button
              type="button"
              suppressHydrationWarning
              aria-label={contactCall.nextMonth}
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              className="grid size-8 place-items-center rounded-full text-foreground transition-colors duration-200 hover:bg-secondary"
            >
              <ChevronRight aria-hidden className="size-4" />
            </button>
          </div>
        </div>

        <div
          role="group"
          aria-labelledby="call-month-label"
          className="mt-3 grid grid-cols-7 gap-y-1 lg:mt-1.5 lg:gap-y-0"
        >
          {contactCall.weekdays.map((day) => (
            <div
              key={day}
              className="py-1 text-center text-[0.68rem] font-medium tracking-wide text-muted-foreground lg:py-0.5 lg:text-[0.62rem]"
            >
              {day}
            </div>
          ))}
          {cells.map((cell) => {
            const selected = date ? sameDay(date, cell.date) : false;
            const isToday = sameDay(cell.date, today);
            return (
              <button
                key={cell.key}
                type="button"
                suppressHydrationWarning
                aria-pressed={selected}
                aria-current={isToday ? "date" : undefined}
                aria-label={formatCallDate(cell.date)}
                onClick={() => onDate(selected ? null : cell.date)}
                className={cn(
                  "mx-auto flex aspect-square w-full min-w-0 max-w-8 items-center justify-center rounded-full text-sm transition duration-200 ease-[var(--ease-out-expo)] lg:max-w-7 lg:text-xs",
                  selected && "scale-105 bg-primary text-primary-foreground",
                  !selected && cell.inMonth && "text-foreground hover:bg-secondary",
                  !selected && !cell.inMonth && "text-muted-foreground opacity-55",
                  isToday && !selected && "ring-1 ring-inset ring-primary/45",
                )}
              >
                {cell.date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <p
        id="call-time-label"
        className="mb-2.5 mt-5 text-sm font-semibold lg:mb-1.5 lg:mt-2.5 lg:text-xs"
      >
        {contactCall.timeLabel}
      </p>
      <div
        role="group"
        aria-labelledby="call-time-label"
        className="grid grid-cols-3 gap-2 lg:gap-1.5"
      >
        {contactCall.slots.map((slot) => {
          const selected = time === slot;
          return (
            <button
              key={slot}
              type="button"
              suppressHydrationWarning
              aria-pressed={selected}
              onClick={() => onTime(selected ? null : slot)}
              className={cn(
                "min-w-0 rounded-full border px-1 py-2 text-center text-[0.7rem] font-medium leading-tight transition duration-200 ease-[var(--ease-out-expo)] sm:text-xs lg:py-1 lg:text-[0.68rem]",
                selected
                  ? "scale-[1.03] border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/35 hover:bg-secondary",
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex gap-3 rounded-2xl bg-secondary/80 p-3.5 lg:mt-2.5 lg:gap-2 lg:p-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-background text-primary lg:size-8">
          <CalendarClock aria-hidden className="size-4 lg:size-3.5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold lg:text-xs">{contactCall.noteTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground lg:mt-0.5 lg:text-[0.68rem] lg:leading-snug">
            {contactCall.noteBody}
          </p>
        </div>
      </div>
    </div>
  );
}
