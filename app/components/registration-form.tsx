"use client";

import { useForm } from "@tanstack/react-form";
import styles from "./registration-form.module.css";

export type RegistrationFormValues = {
  name: string;
  email: string;
  message: string;
};

function requiredString(message: string) {
  return ({ value }: { value: string }) =>
    value.trim() === "" ? message : undefined;
}

function firstStringError(errors: ReadonlyArray<unknown>): string | undefined {
  for (const err of errors) {
    if (typeof err === "string") {
      return err;
    }
  }
  return undefined;
}

export function RegistrationForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
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
      <form.Field
        name="name"
        validators={{
          onChange: requiredString("Name is required"),
          onSubmit: requiredString("Name is required"),
        }}
      >
        {(field) => {
          const nameError = firstStringError(field.state.meta.errors);
          return (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="registration-name">
                Name
              </label>
              <input
                id="registration-name"
                className={styles.input}
                type="text"
                autoComplete="name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={nameError ? true : undefined}
                aria-describedby={
                  nameError ? "registration-name-error" : undefined
                }
              />
              {nameError ? (
                <p
                  id="registration-name-error"
                  className={styles.error}
                  role="alert"
                >
                  {nameError}
                </p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      <form.Field
        name="email"
        validators={{
          onChange: requiredString("Email is required"),
          onSubmit: requiredString("Email is required"),
        }}
      >
        {(field) => {
          const emailError = firstStringError(field.state.meta.errors);
          return (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="registration-email">
                Email
              </label>
              <input
                id="registration-email"
                className={styles.input}
                type="email"
                autoComplete="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={
                  emailError ? "registration-email-error" : undefined
                }
              />
              {emailError ? (
                <p
                  id="registration-email-error"
                  className={styles.error}
                  role="alert"
                >
                  {emailError}
                </p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      <form.Field
        name="message"
        validators={{
          onChange: requiredString("Message is required"),
          onSubmit: requiredString("Message is required"),
        }}
      >
        {(field) => {
          const messageError = firstStringError(field.state.meta.errors);
          return (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="registration-message">
                Message
              </label>
              <textarea
                id="registration-message"
                className={styles.textarea}
                rows={5}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={messageError ? true : undefined}
                aria-describedby={
                  messageError ? "registration-message-error" : undefined
                }
              />
              {messageError ? (
                <p
                  id="registration-message-error"
                  className={styles.error}
                  role="alert"
                >
                  {messageError}
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
