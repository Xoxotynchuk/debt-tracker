import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project") &&
    supabaseAnonKey !== "your-anon-key" &&
    !supabaseUrl.includes("placeholder.supabase.co")
);

function createSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    console.warn(
      "[DolgIgorya] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Create .env.local from .env.example."
    );
  }

  return createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-key",
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );
}

export const supabase = createSupabaseClient();

export function getSupabaseConfigError(): string | null {
  if (isSupabaseConfigured) return null;
  return "Не настроен Supabase: добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY в файл .env.local и перезапустите npm run dev.";
}

export function mapAuthError(message: string | undefined | null): string {
  if (!message) return "Неизвестная ошибка авторизации";

  const lower = message.toLowerCase();
  if (
    lower.includes("load failed") ||
    lower.includes("failed to fetch") ||
    lower.includes("networkerror") ||
    lower.includes("fetch failed")
  ) {
    if (!isSupabaseConfigured) {
      return "Не удалось связаться с Supabase: не заданы переменные окружения. Создайте .env.local (см. .env.example) и перезапустите сервер.";
    }
    return "Не удалось связаться с Supabase. Проверьте URL проекта, anon key и доступ в интернет.";
  }

  if (lower.includes("invalid login credentials")) {
    return "Неверный email или пароль";
  }

  if (lower.includes("email not confirmed")) {
    return "Email не подтверждён. Отключите Confirm email в Supabase Auth или подтвердите почту.";
  }

  if (lower.includes("user already registered")) {
    return "Пользователь с таким email уже зарегистрирован";
  }

  return message;
}
