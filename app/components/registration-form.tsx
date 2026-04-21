"use client";

import { useForm } from "@tanstack/react-form";
import styles from "./registration-form.module.css";

export type FormType = "sponsor" | "producer" | "vendor";

export type RegistrationFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  budget: string;
  message: string;
};

const BUDGET_OPTIONS = [
  { value: "", label: "Select a tier…" },
  { value: "10k", label: "$10k – City of Trees" },
  { value: "25k", label: "$25k – Capitol Corridor" },
  { value: "50k", label: "$50k+ – Tower Bridge" },
  { value: "custom", label: "Custom / Undecided" },
] as const;

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
    if (typeof err === "string") {
      return err;
    }
  }
  return undefined;
}

export function RegistrationForm({ formType }: { formType: FormType }) {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      budget: "",
      message: "",
    } satisfies RegistrationFormValues,
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      noValidate
    >
      {/* First name + Last name row */}
      <div className={styles.row}>
        <form.Field
          name="firstName"
          validators={{
            onChange: requiredString("First name is required"),
            onSubmit: requiredString("First name is required"),
          }}
        >
          {(field) => {
            const err = firstStringError(field.state.meta.errors);
            return (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="reg-firstName">
                  First name
                </label>
                <input
                  id="reg-firstName"
                  className={styles.input}
                  type="text"
                  autoComplete="given-name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={err ? "reg-firstName-error" : undefined}
                />
                {err ? (
                  <p id="reg-firstName-error" className={styles.error} role="alert">
                    {err}
                  </p>
                ) : null}
              </div>
            );
          }}
        </form.Field>

        <form.Field
          name="lastName"
          validators={{
            onChange: requiredString("Last name is required"),
            onSubmit: requiredString("Last name is required"),
          }}
        >
          {(field) => {
            const err = firstStringError(field.state.meta.errors);
            return (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="reg-lastName">
                  Last name
                </label>
                <input
                  id="reg-lastName"
                  className={styles.input}
                  type="text"
                  autoComplete="family-name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={err ? "reg-lastName-error" : undefined}
                />
                {err ? (
                  <p id="reg-lastName-error" className={styles.error} role="alert">
                    {err}
                  </p>
                ) : null}
              </div>
            );
          }}
        </form.Field>
      </div>

      {/* Company */}
      <form.Field
        name="company"
        validators={{
          onChange: requiredString("Company is required"),
          onSubmit: requiredString("Company is required"),
        }}
      >
        {(field) => {
          const err = firstStringError(field.state.meta.errors);
          return (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="reg-company">
                Company
              </label>
              <input
                id="reg-company"
                className={styles.input}
                type="text"
                autoComplete="organization"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={err ? true : undefined}
                aria-describedby={err ? "reg-company-error" : undefined}
              />
              {err ? (
                <p id="reg-company-error" className={styles.error} role="alert">
                  {err}
                </p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      {/* Email */}
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
              <label className={styles.label} htmlFor="reg-email">
                Email
              </label>
              <input
                id="reg-email"
                className={styles.input}
                type="email"
                autoComplete="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={err ? true : undefined}
                aria-describedby={err ? "reg-email-error" : undefined}
              />
              {err ? (
                <p id="reg-email-error" className={styles.error} role="alert">
                  {err}
                </p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      {/* Budget — sponsor-only field */}
      {formType === "sponsor" && (
        <form.Field
          name="budget"
          validators={{
            onChange: requiredString("Please select a budget tier"),
            onSubmit: requiredString("Please select a budget tier"),
          }}
        >
          {(field) => {
            const err = firstStringError(field.state.meta.errors);
            return (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="reg-budget">
                  Budget / tier
                </label>
                <select
                  id="reg-budget"
                  className={styles.select}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={err ? "reg-budget-error" : undefined}
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {err ? (
                  <p id="reg-budget-error" className={styles.error} role="alert">
                    {err}
                  </p>
                ) : null}
              </div>
            );
          }}
        </form.Field>
      )}

      {/* Message */}
      <form.Field
        name="message"
        validators={{
          onChange: requiredString("Message is required"),
          onSubmit: requiredString("Message is required"),
        }}
      >
        {(field) => {
          const err = firstStringError(field.state.meta.errors);
          return (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="reg-message">
                Message
              </label>
              <textarea
                id="reg-message"
                className={styles.textarea}
                rows={5}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={err ? true : undefined}
                aria-describedby={err ? "reg-message-error" : undefined}
              />
              {err ? (
                <p id="reg-message-error" className={styles.error} role="alert">
                  {err}
                </p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      <button className={styles.submit} type="submit">
        Submit
      </button>
    </form>
  );
}
