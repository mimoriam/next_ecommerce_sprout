"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Sproud and Scribble - Confirmation Email",
    html: `<p>Click to <a href='${confirmLink}'>confirm your email</a></p>`,
  });
  if (error) return console.log(error);
  if (data) return data;
};