import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eyebrow, Reveal } from "@/components/Reveal";

const ENDPOINT = "https://ryuga-astro-nexus-1.onrender.com/api/contact";

const fields = [
  { key: "name", label: "Name", type: "text", autoComplete: "name" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  { key: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

const inputClass = "rounded-xl border-white/10 bg-white/5 focus-visible:ring-offset-0";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set =
    (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent", { description: "We'll get back to you soon." });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Couldn't send", { description: data.message || "Please try again later." });
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error("Server error", { description: "Unable to send message. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-28 md:py-44">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow index="vi" label="Contact" />
            <h2 className="font-display text-6xl font-normal leading-[1] tracking-[-0.03em] md:text-8xl">
              Let&apos;s build <em className="text-primary">something.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Collaborations, workshops, sponsorships or just a question — we read everything.
            </p>

            <ul className="mt-10 space-y-3">
              <li>
                <a
                  href="mailto:ryuga.aerospace@gmail.com"
                  className="inline-flex items-center gap-3 text-lg transition-colors duration-150 hover:text-primary"
                >
                  <Mail className="h-5 w-5 text-primary" /> ryuga.aerospace@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919145397634"
                  className="inline-flex items-center gap-3 text-lg transition-colors duration-150 hover:text-primary"
                >
                  <Phone className="h-5 w-5 text-primary" /> 91453 97634
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/arc_pcce?igsh=czY3cHl6dHA5dnFp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-lg transition-colors duration-150 hover:text-primary"
                >
                  <Instagram className="h-5 w-5 text-primary" /> Instagram
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className="glass space-y-5 rounded-3xl p-7 md:p-9">
              {fields.map((f) => (
                <div key={f.key} className="space-y-2">
                  <Label htmlFor={f.key} className="label">
                    {f.label}
                  </Label>
                  <Input
                    id={f.key}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required
                    value={form[f.key]}
                    onChange={set(f.key)}
                    className={`h-12 ${inputClass}`}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="message" className="label">
                  Message
                </Label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={set("message")}
                  className={`min-h-36 ${inputClass}`}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full"
              >
                {loading ? "Sending…" : "Send message"}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
