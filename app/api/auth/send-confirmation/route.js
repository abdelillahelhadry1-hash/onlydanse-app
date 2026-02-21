import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const { email } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // 1. Generate confirmation link
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // 2. Send your branded email via Resend
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "OnlyDanse <no-reply@onlydanse.com>",
      to: email,
      subject: "Confirm your OnlyDanse account",
      html: `
        <div style="font-family: sans-serif; padding: 24px;">
          <h2>Welcome to OnlyDanse 💃🕺</h2>
          <p>Thanks for joining our dance community. Tap the button below to confirm your email and activate your account.</p>
          <a href="${data.properties.action_link}"
             style="display:inline-block; padding:12px 20px; background:#4f46e5; color:white; border-radius:8px; text-decoration:none; margin-top:16px;">
             Confirm Email
          </a>
          <p style="margin-top:24px; font-size:12px; color:#666;">
            If you didn’t create this account, you can safely ignore this email.
          </p>
        </div>
      `,
    }),
  });

  return NextResponse.json({ success: true });
}
