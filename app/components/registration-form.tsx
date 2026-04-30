"use client";

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
  { value: "10k", label: "$10k - City of Trees" },
  { value: "25k", label: "$25k - Capitol Corridor" },
  { value: "50k", label: "$50k+ - Tower Bridge" },
  { value: "custom", label: "Custom / Undecided" },
] as const;

export function RegistrationForm({ formType }: { formType: FormType }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(Object.fromEntries(data.entries()));
      }}
    >
      <div>
        <div>
          <label htmlFor="reg-firstName">First name</label>
          <input id="reg-firstName" name="firstName" type="text" required />
        </div>
        <div>
          <label htmlFor="reg-lastName">Last name</label>
          <input id="reg-lastName" name="lastName" type="text" required />
        </div>
      </div>
      <div>
        <label htmlFor="reg-company">Company</label>
        <input id="reg-company" name="company" type="text" required />
      </div>
      <div>
        <label htmlFor="reg-email">Email</label>
        <input id="reg-email" name="email" type="email" required />
      </div>

      {formType === "sponsor" && (
        <div>
          <label htmlFor="reg-budget">Budget / tier</label>
          <select id="reg-budget" name="budget" required>
            <option value="">Select a tier...</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="reg-message">Message</label>
        <textarea id="reg-message" name="message" rows={5} required />
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  );
}
