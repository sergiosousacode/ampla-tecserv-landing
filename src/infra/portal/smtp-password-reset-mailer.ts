import net from "node:net";
import tls from "node:tls";
import type { Socket } from "node:net";
import type { PasswordResetMailer } from "@/application/portal/password-reset";

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
}

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password =
    process.env.SMTP_PASS?.trim() || process.env.SMTP_PASSWORD?.trim();
  
  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.NEXT_PUBLIC_EMAIL?.trim() ||
    user;

  if (!host || !user || !password || !from) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    user,
    password,
    from,
  };
}

function escapeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function formatAddress(email: string, name?: string) {
  if (!name) {
    return `<${email}>`;
  }

  return `"${escapeHeader(name).replace(/"/g, "'")}" <${email}>`;
}

function encodeBase64(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}

function readLine(socket: Socket): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";

    function cleanup() {
      socket.off("data", onData);
      socket.off("error", onError);
    }

    function onError(error: Error) {
      cleanup();
      reject(error);
    }

    function onData(chunk: Buffer) {
      data += chunk.toString("utf8");

      const lines = data.split(/\r?\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1];

      if (lastLine && /^\d{3} /.test(lastLine)) {
        cleanup();
        resolve(data);
      }
    }

    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function sendCommand(
  socket: Socket,
  command: string,
  expected: number[],
  label = command
) {
  socket.write(`${command}\r\n`);
  const response = await readLine(socket);
  const code = Number(response.slice(0, 3));

  if (!expected.includes(code)) {
    throw new Error(`SMTP command failed (${label}): ${response.trim()}`);
  }

  return response;
}

function connect(config: SmtpConfig): Promise<Socket> {
  return new Promise((resolve, reject) => {
    if (config.secure) {
      const socket = tls.connect(config.port, config.host, {
        servername: config.host,
      });

      socket.once("secureConnect", () => resolve(socket));
      socket.once("error", reject);
      return;
    }

    const socket = net.connect(config.port, config.host);
    socket.once("connect", () => resolve(socket));
    socket.once("error", reject);
  });
}

async function upgradeToTls(socket: Socket, config: SmtpConfig): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const secureSocket = tls.connect({
      socket,
      servername: config.host,
    });

    secureSocket.once("secureConnect", () => resolve(secureSocket));
    secureSocket.once("error", reject);
  });
}

async function sendSmtpMail(config: SmtpConfig, input: {
  to: string;
  subject: string;
  text: string;
}) {
  let socket = await connect(config);

  await readLine(socket);
  await sendCommand(socket, "EHLO ampla-tecserv", [250]);

  if (!config.secure) {
    await sendCommand(socket, "STARTTLS", [220]);
    socket = await upgradeToTls(socket, config);
    await sendCommand(socket, "EHLO ampla-tecserv", [250]);
  }

  await sendCommand(socket, "AUTH LOGIN", [334]);
  await sendCommand(socket, encodeBase64(config.user), [334], "AUTH USER");
  await sendCommand(socket, encodeBase64(config.password), [235], "AUTH PASSWORD");
  await sendCommand(socket, `MAIL FROM:<${config.from}>`, [250]);
  await sendCommand(socket, `RCPT TO:<${input.to}>`, [250, 251]);
  await sendCommand(socket, "DATA", [354]);

  const message = [
    `From: ${formatAddress(config.from, "Ampla TecServ")}`,
    `To: ${formatAddress(input.to)}`,
    `Subject: ${escapeHeader(input.subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    input.text,
    ".",
  ].join("\r\n");

  await sendCommand(socket, message, [250]);
  await sendCommand(socket, "QUIT", [221]);
  socket.end();
}

export const smtpPasswordResetMailer: PasswordResetMailer = {
  async sendPasswordReset(input) {
    const expiresAt = input.expiresAt.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
    const text = [
      `Olá, ${input.name}.`,
      "",
      "Recebemos uma solicitação para redefinir sua senha no Portal de Serviços da Ampla TecServ.",
      `Acesse o link abaixo até ${expiresAt}:`,
      "",
      input.resetUrl,
      "",
      "Se você não solicitou essa alteração, ignore esta mensagem.",
    ].join("\n");
    const config = getSmtpConfig();

    if (!config) {
      if (process.env.NODE_ENV !== "production") {
        console.info("[password-reset]", input.resetUrl);
        return;
      }

      throw new Error("SMTP precisa estar configurado para enviar redefinicao de senha.");
    }

    await sendSmtpMail(config, {
      to: input.to,
      subject: "Redefinição de senha do Portal Ampla TecServ",
      text,
    });
  },
};
