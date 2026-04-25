"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { ThemeToggle } from "../components/theme-toggle";
import styles from "./producers.module.css";

// ── Constants ────────────────────────────────────────────────────────────────

const EVENT_TYPES = ["Panel", "Workshop", "Experience", "Other"] as const;

const FORMAT_DEPTHS = ["Passive", "Interactive", "Immersive"] as const;

const AUDIENCE_OPTIONS = [
  "Founders",
  "Developers / Engineers",
  "Creatives",
  "Investors",
  "Students",
  "General Public",
  "Corporate / Enterprise",
  "Government / Civic",
  "TBD",
] as const;

const THEME_OPTIONS = [
  "AI / Emerging Tech",
  "Startups & Entrepreneurship",
  "Creative Tech / Art",
  "Workforce & Future of Work",
  "GovTech / Civic Innovation",
  "Climate / Sustainability",
  "Community / Culture",
] as const;

const DATE_OPTIONS = [
  { value: "", label: "Select a date…" },
  { value: "mon-aug10", label: "Mon · Aug 10, 2026" },
  { value: "tue-aug11", label: "Tue · Aug 11, 2026" },
  { value: "wed-aug12", label: "Wed · Aug 12, 2026" },
  { value: "thu-aug13", label: "Thu · Aug 13, 2026" },
  { value: "fri-aug14", label: "Fri · Aug 14, 2026" },
  { value: "sat-aug15", label: "Sat · Aug 15, 2026" },
  { value: "full-week", label: "Full Week (Aug 10–15)" },
  { value: "tbd", label: "TBD / Flexible" },
] as const;

const VENUE_OPTIONS = [
  { value: "yes", label: "Yes — we have a venue" },
  { value: "no", label: "No — we don't have one" },
  { value: "help", label: "Need help securing one" },
] as const;

const SUPPORT_OPTIONS = [
  "Marketing / Promotion",
  "Venue",
  "Speakers",
  "Sponsorship / Funding",
  "Production",
  "Volunteers",
  "Other",
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function requiredString(message: string) {
  return ({ value }: { value: string }) =>
    value.trim() === "" ? message : undefined;
}

function validEmail(message: string) {
  return ({ value }: { value: string }) =>
    value.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? message
      : undefined;
}

function firstStringError(errors: ReadonlyArray<unknown>): string | undefined {
  for (const err of errors) {
    if (typeof err === "string") return err;
  }
  return undefined;
}

function toggleArrayItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];
}

// ── Types ─────────────────────────────────────────────────────────────────────

type ProducerFormValues = {
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  eventTitle: string;
  shortDescription: string;
  eventType: string;
  hostedBefore: string;
  formatDepth: string;
  uniqueAspect: string;
  primaryAudience: string[];
  themeAlignment: string[];
  preferredDate: string;
  expectedAttendance: string;
  venueStatus: string;
  pricingModel: string;
  supportNeeds: string[];
  seekingCollaborators: string;
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProducersPage() {
  const form = useForm({
    defaultValues: {
      orgName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      eventTitle: "",
      shortDescription: "",
      eventType: "",
      hostedBefore: "",
      formatDepth: "",
      uniqueAspect: "",
      primaryAudience: [] as string[],
      themeAlignment: [] as string[],
      preferredDate: "",
      expectedAttendance: "",
      venueStatus: "",
      pricingModel: "",
      supportNeeds: [] as string[],
      seekingCollaborators: "",
    } satisfies ProducerFormValues,
    onSubmit: ({ value }) => {
      console.log("[producers] form submitted", value);
    },
  });

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← Home
        </Link>
        <ThemeToggle />
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {/* ── Page Header ── */}
          <div className={styles.pageHeader}>
            <p className={styles.sysTag}>// CALL_FOR_PARTNERS.EXE</p>
            <h1 className={styles.pageTitle}>Call for Partners</h1>
            <p className={styles.pageSubtitle}>Event Producers</p>
            <p className={styles.pageLead}>
              Bring your event to Sacramento Tech Week 2026. Submit your
              proposal below and our team will follow up within two business
              days.
            </p>
          </div>

          {/* ── Form ── */}
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
            noValidate
          >
            {/* ── Section 1: Organization Information ── */}
            <fieldset className={styles.section}>
              <legend className={styles.sectionLegend}>
                <span className={styles.sectionNum}>01</span>
                <span className={styles.sectionTitle}>
                  Organization Information
                </span>
              </legend>

              <div className={styles.fields}>
                <form.Field
                  name="orgName"
                  validators={{
                    onChange: requiredString("Organization name is required"),
                    onSubmit: requiredString("Organization name is required"),
                  }}
                >
                  {(field) => {
                    const err = firstStringError(field.state.meta.errors);
                    return (
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="p-orgName">
                          Organization Name{" "}
                          <span className={styles.req}>*</span>
                        </label>
                        <input
                          id="p-orgName"
                          className={styles.input}
                          type="text"
                          autoComplete="organization"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={err ? true : undefined}
                          aria-describedby={
                            err ? "p-orgName-err" : undefined
                          }
                        />
                        {err && (
                          <p
                            id="p-orgName-err"
                            className={styles.error}
                            role="alert"
                          >
                            {err}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                <form.Field
                  name="contactName"
                  validators={{
                    onChange: requiredString(
                      "Primary contact name is required"
                    ),
                    onSubmit: requiredString(
                      "Primary contact name is required"
                    ),
                  }}
                >
                  {(field) => {
                    const err = firstStringError(field.state.meta.errors);
                    return (
                      <div className={styles.field}>
                        <label
                          className={styles.label}
                          htmlFor="p-contactName"
                        >
                          Primary Contact Name{" "}
                          <span className={styles.req}>*</span>
                        </label>
                        <input
                          id="p-contactName"
                          className={styles.input}
                          type="text"
                          autoComplete="name"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={err ? true : undefined}
                          aria-describedby={
                            err ? "p-contactName-err" : undefined
                          }
                        />
                        {err && (
                          <p
                            id="p-contactName-err"
                            className={styles.error}
                            role="alert"
                          >
                            {err}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                <form.Field
                  name="email"
                  validators={{
                    onChange: (ctx) =>
                      requiredString("Email is required")(ctx) ??
                      validEmail("Enter a valid email address")(ctx),
                    onSubmit: (ctx) =>
                      requiredString("Email is required")(ctx) ??
                      validEmail("Enter a valid email address")(ctx),
                  }}
                >
                  {(field) => {
                    const err = firstStringError(field.state.meta.errors);
                    return (
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="p-email">
                          Email Address <span className={styles.req}>*</span>
                        </label>
                        <input
                          id="p-email"
                          className={styles.input}
                          type="email"
                          autoComplete="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={err ? true : undefined}
                          aria-describedby={err ? "p-email-err" : undefined}
                        />
                        {err && (
                          <p
                            id="p-email-err"
                            className={styles.error}
                            role="alert"
                          >
                            {err}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                <div className={styles.row}>
                  <form.Field name="phone">
                    {(field) => (
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="p-phone">
                          Phone Number
                        </label>
                        <input
                          id="p-phone"
                          className={styles.input}
                          type="tel"
                          autoComplete="tel"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="website">
                    {(field) => (
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="p-website">
                          Website / Social Link
                        </label>
                        <input
                          id="p-website"
                          className={styles.input}
                          type="url"
                          autoComplete="url"
                          placeholder="https://"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </fieldset>

            {/* ── Section 2: Event Overview ── */}
            <fieldset className={styles.section}>
              <legend className={styles.sectionLegend}>
                <span className={styles.sectionNum}>02</span>
                <span className={styles.sectionTitle}>Event Overview</span>
              </legend>

              <div className={styles.fields}>
                <form.Field
                  name="eventTitle"
                  validators={{
                    onChange: requiredString("Event title is required"),
                    onSubmit: requiredString("Event title is required"),
                  }}
                >
                  {(field) => {
                    const err = firstStringError(field.state.meta.errors);
                    return (
                      <div className={styles.field}>
                        <label
                          className={styles.label}
                          htmlFor="p-eventTitle"
                        >
                          Event Title <span className={styles.req}>*</span>
                        </label>
                        <input
                          id="p-eventTitle"
                          className={styles.input}
                          type="text"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={err ? true : undefined}
                          aria-describedby={
                            err ? "p-eventTitle-err" : undefined
                          }
                        />
                        {err && (
                          <p
                            id="p-eventTitle-err"
                            className={styles.error}
                            role="alert"
                          >
                            {err}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                <form.Field name="shortDescription">
                  {(field) => (
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="p-shortDesc">
                        Short Description
                        <span className={styles.hint}> — 1–2 sentences</span>
                      </label>
                      <textarea
                        id="p-shortDesc"
                        className={styles.textarea}
                        rows={3}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="eventType">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>Event Type</span>
                      <div className={styles.radioGroup}>
                        {EVENT_TYPES.map((type) => (
                          <label key={type} className={styles.radioOption}>
                            <input
                              type="radio"
                              className={styles.radioInput}
                              name="p-eventType"
                              value={type}
                              checked={field.state.value === type}
                              onChange={() => field.handleChange(type)}
                            />
                            <span className={styles.radioMark} aria-hidden />
                            <span className={styles.optionLabel}>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>

                <form.Field name="hostedBefore">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>
                        Has this event been hosted before?
                      </span>
                      <div className={styles.radioGroup}>
                        {(["Yes", "No"] as const).map((val) => (
                          <label key={val} className={styles.radioOption}>
                            <input
                              type="radio"
                              className={styles.radioInput}
                              name="p-hostedBefore"
                              value={val}
                              checked={field.state.value === val}
                              onChange={() => field.handleChange(val)}
                            />
                            <span className={styles.radioMark} aria-hidden />
                            <span className={styles.optionLabel}>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>
              </div>
            </fieldset>

            {/* ── Section 3: Experience Design ── */}
            <fieldset className={styles.section}>
              <legend className={styles.sectionLegend}>
                <span className={styles.sectionNum}>03</span>
                <span className={styles.sectionTitle}>Experience Design</span>
              </legend>

              <div className={styles.fields}>
                <form.Field name="formatDepth">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>
                        Event Format Depth
                      </span>
                      <div className={styles.radioGroup}>
                        {FORMAT_DEPTHS.map((depth) => (
                          <label key={depth} className={styles.radioOption}>
                            <input
                              type="radio"
                              className={styles.radioInput}
                              name="p-formatDepth"
                              value={depth}
                              checked={field.state.value === depth}
                              onChange={() => field.handleChange(depth)}
                            />
                            <span className={styles.radioMark} aria-hidden />
                            <span className={styles.optionLabel}>{depth}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>

                <form.Field name="uniqueAspect">
                  {(field) => (
                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="p-uniqueAspect"
                      >
                        What makes this event unique?
                        <span className={styles.hint}> — optional</span>
                      </label>
                      <textarea
                        id="p-uniqueAspect"
                        className={styles.textarea}
                        rows={4}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            </fieldset>

            {/* ── Section 4: Audience & Themes ── */}
            <fieldset className={styles.section}>
              <legend className={styles.sectionLegend}>
                <span className={styles.sectionNum}>04</span>
                <span className={styles.sectionTitle}>
                  Audience &amp; Themes
                </span>
              </legend>

              <div className={styles.fields}>
                <form.Field name="primaryAudience">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>Primary Audience</span>
                      <div className={styles.checkboxGrid}>
                        {AUDIENCE_OPTIONS.map((option) => (
                          <label
                            key={option}
                            className={styles.checkboxOption}
                          >
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              value={option}
                              checked={field.state.value.includes(option)}
                              onChange={() =>
                                field.handleChange(
                                  toggleArrayItem(
                                    field.state.value,
                                    option
                                  )
                                )
                              }
                            />
                            <span
                              className={styles.checkboxMark}
                              aria-hidden
                            />
                            <span className={styles.optionLabel}>
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>

                <form.Field name="themeAlignment">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>Theme Alignment</span>
                      <div className={styles.checkboxGrid}>
                        {THEME_OPTIONS.map((option) => (
                          <label
                            key={option}
                            className={styles.checkboxOption}
                          >
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              value={option}
                              checked={field.state.value.includes(option)}
                              onChange={() =>
                                field.handleChange(
                                  toggleArrayItem(
                                    field.state.value,
                                    option
                                  )
                                )
                              }
                            />
                            <span
                              className={styles.checkboxMark}
                              aria-hidden
                            />
                            <span className={styles.optionLabel}>
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>
              </div>
            </fieldset>

            {/* ── Section 5: Event Logistics ── */}
            <fieldset className={styles.section}>
              <legend className={styles.sectionLegend}>
                <span className={styles.sectionNum}>05</span>
                <span className={styles.sectionTitle}>Event Logistics</span>
              </legend>

              <div className={styles.fields}>
                <form.Field name="preferredDate">
                  {(field) => (
                    <div className={styles.field}>
                      <label
                        className={styles.label}
                        htmlFor="p-preferredDate"
                      >
                        Preferred Date
                      </label>
                      <select
                        id="p-preferredDate"
                        className={styles.select}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      >
                        {DATE_OPTIONS.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            disabled={opt.value === ""}
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </form.Field>

                <form.Field name="expectedAttendance">
                  {(field) => (
                    <div className={`${styles.field} ${styles.fieldHalf}`}>
                      <label
                        className={styles.label}
                        htmlFor="p-attendance"
                      >
                        Expected Attendance
                      </label>
                      <input
                        id="p-attendance"
                        className={styles.input}
                        type="number"
                        min="0"
                        step="1"
                        placeholder="e.g. 150"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="venueStatus">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>
                        Do you already have a venue?
                      </span>
                      <div className={styles.radioGroup}>
                        {VENUE_OPTIONS.map((opt) => (
                          <label key={opt.value} className={styles.radioOption}>
                            <input
                              type="radio"
                              className={styles.radioInput}
                              name="p-venueStatus"
                              value={opt.value}
                              checked={field.state.value === opt.value}
                              onChange={() => field.handleChange(opt.value)}
                            />
                            <span className={styles.radioMark} aria-hidden />
                            <span className={styles.optionLabel}>
                              {opt.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>

                <form.Field name="pricingModel">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>
                        Is this event free or paid?
                      </span>
                      <div className={styles.radioGroup}>
                        {(["Free", "Paid", "TBD"] as const).map((val) => (
                          <label key={val} className={styles.radioOption}>
                            <input
                              type="radio"
                              className={styles.radioInput}
                              name="p-pricingModel"
                              value={val}
                              checked={field.state.value === val}
                              onChange={() => field.handleChange(val)}
                            />
                            <span className={styles.radioMark} aria-hidden />
                            <span className={styles.optionLabel}>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>
              </div>
            </fieldset>

            {/* ── Section 6: Support ── */}
            <fieldset className={styles.section}>
              <legend className={styles.sectionLegend}>
                <span className={styles.sectionNum}>06</span>
                <span className={styles.sectionTitle}>Support</span>
              </legend>

              <div className={styles.fields}>
                <form.Field name="supportNeeds">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>
                        What support do you need?
                      </span>
                      <div className={styles.checkboxGrid}>
                        {SUPPORT_OPTIONS.map((option) => (
                          <label
                            key={option}
                            className={styles.checkboxOption}
                          >
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              value={option}
                              checked={field.state.value.includes(option)}
                              onChange={() =>
                                field.handleChange(
                                  toggleArrayItem(
                                    field.state.value,
                                    option
                                  )
                                )
                              }
                            />
                            <span
                              className={styles.checkboxMark}
                              aria-hidden
                            />
                            <span className={styles.optionLabel}>
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>

                <form.Field name="seekingCollaborators">
                  {(field) => (
                    <div className={styles.field}>
                      <span className={styles.label}>
                        Are you looking for collaborators?
                      </span>
                      <div className={styles.radioGroup}>
                        {(["Yes", "No"] as const).map((val) => (
                          <label key={val} className={styles.radioOption}>
                            <input
                              type="radio"
                              className={styles.radioInput}
                              name="p-seekingCollaborators"
                              value={val}
                              checked={field.state.value === val}
                              onChange={() => field.handleChange(val)}
                            />
                            <span className={styles.radioMark} aria-hidden />
                            <span className={styles.optionLabel}>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>
              </div>
            </fieldset>

            {/* ── Submit ── */}
            <div className={styles.submitWrap}>
              <button type="submit" className={styles.submitBtn}>
                Submit Proposal
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
