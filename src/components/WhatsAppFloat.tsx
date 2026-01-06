export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5583993711271"
      target="_blank"
      aria-label="Falar no WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex h-18 w-30 items-center justify-center
        rounded-full bg-secundary text-sky-700
        shadow-lg hover:scale-105 transition
        text-lg font-bold
        transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ...
      "
    >
      Whats'up
    </a>
  );
}
