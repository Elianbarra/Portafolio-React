import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";

const LoginDemo = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState("login");
  const [fields, setFields] = useState({ email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setFields({ email: "", password: "", confirmPassword: "" });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const stored = JSON.parse(localStorage.getItem(fields.email) || "null");
    if (stored && stored.password === fields.password) {
      setMessage(t("playground.login.loginSuccess"));
    } else {
      setMessage(t("playground.login.loginFailed"));
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (fields.password !== fields.confirmPassword) {
      setMessage(t("playground.login.passwordMismatch"));
      return;
    }
    if (localStorage.getItem(fields.email)) {
      setMessage(t("playground.login.emailTaken"));
      return;
    }
    localStorage.setItem(fields.email, JSON.stringify({ email: fields.email, password: fields.password }));
    setMessage(t("playground.login.signupSuccess"));
    switchMode("login");
  };

  return (
    <PlaygroundShell title={t("playground.login.title")} description={t("playground.login.description")}>
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-6 flex rounded-full border border-white/10 bg-white/5 p-1">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              onClick={() => switchMode(tab)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold capitalize transition ${
                mode === tab ? "bg-accent text-ink-950" : "text-slate-300"
              }`}
            >
              {tab === "signup" ? t("playground.login.signUp") : t("playground.login.logIn")}
            </button>
          ))}
        </div>

        <form onSubmit={mode === "login" ? handleLogin : handleSignUp} className="card space-y-4 p-6">
          <label className="block text-sm">
            <span className="mb-1.5 block text-slate-300">{t("playground.login.email")}</span>
            <input
              type="email"
              name="email"
              required
              value={fields.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 outline-none focus:border-accent/60"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-slate-300">{t("playground.login.password")}</span>
            <input
              type="password"
              name="password"
              required
              value={fields.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 outline-none focus:border-accent/60"
            />
          </label>
          {mode === "signup" && (
            <label className="block text-sm">
              <span className="mb-1.5 block text-slate-300">{t("playground.login.confirmPassword")}</span>
              <input
                type="password"
                name="confirmPassword"
                required
                value={fields.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-slate-100 outline-none focus:border-accent/60"
              />
            </label>
          )}
          <button type="submit" className="btn-primary w-full">
            {mode === "signup" ? t("playground.login.signUp") : t("playground.login.logIn")}
          </button>
          {message && <p className="text-center text-sm text-accent">{message}</p>}
        </form>
      </div>
    </PlaygroundShell>
  );
};

export default LoginDemo;
