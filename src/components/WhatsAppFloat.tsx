export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5599999999999"
      target="_blank"
      aria-label="Falar no WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full bg-secondary text-white
        shadow-lg hover:scale-105 transition
      "
    >
      Whats
    </a>
  );
}
