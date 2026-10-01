-- Seed test admin user for DolgIgorya
-- Email: admin@example.com
-- Password: password
--
-- Рекомендуемый способ (надёжнее SQL):
--   Dashboard → Authentication → Users → Add user
--   Email: admin@example.com, Password: password, Auto Confirm User: ON
--
-- Либо выполни этот скрипт в SQL Editor ПОСЛЕ schema.sql.

do $$
declare
  v_user_id uuid := gen_random_uuid();
  v_encrypted_pw text := crypt('password', gen_salt('bf'));
begin
  if exists (select 1 from auth.users where email = 'admin@example.com') then
    raise notice 'Admin user already exists';
    return;
  end if;

  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  ) values (
    '00000000-0000-0000-0000-000000000000',
    v_user_id,
    'authenticated',
    'authenticated',
    'admin@example.com',
    v_encrypted_pw,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Admin"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) values (
    gen_random_uuid(),
    v_user_id,
    format('{"sub":"%s","email":"admin@example.com"}', v_user_id)::jsonb,
    'email',
    v_user_id::text,
    now(),
    now(),
    now()
  );

  raise notice 'Created admin@example.com / password (id: %)', v_user_id;
end $$;
