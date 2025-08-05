-- Fix security warnings by adding search_path to functions

-- Drop the existing function and recreate with proper security settings
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop and recreate the user creation function with proper security settings
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    'employee'
  );
  RETURN NEW;
END;
$$;

-- Create security definer function to check user role (to avoid recursive RLS issues)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE sql 
SECURITY DEFINER 
STABLE
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

-- Update the RLS policies to use the security definer function
DROP POLICY IF EXISTS "Super admins can update any profile" ON public.profiles;
CREATE POLICY "Super admins can update any profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (public.get_current_user_role() = 'super_admin');

DROP POLICY IF EXISTS "Super admins can delete any profile" ON public.profiles;
CREATE POLICY "Super admins can delete any profile" 
ON public.profiles 
FOR DELETE 
TO authenticated 
USING (public.get_current_user_role() = 'super_admin');