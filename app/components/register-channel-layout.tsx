import type { ReactNode } from "react";
import Link from "next/link";
import { RegistrationForm, type FormType } from "./registration-form";

type RegisterChannelLayoutProps = {
  title: string;
  formType: FormType;
  children: ReactNode;
};

export function RegisterChannelLayout({
  title,
  formType,
  children,
}: RegisterChannelLayoutProps) {
  return (
    <main>
      <p>
        <Link href="/">Home</Link>
      </p>
      <h1>{title}</h1>
      <section>{children}</section>
      <hr />
      <RegistrationForm formType={formType} />
    </main>
  );
}
