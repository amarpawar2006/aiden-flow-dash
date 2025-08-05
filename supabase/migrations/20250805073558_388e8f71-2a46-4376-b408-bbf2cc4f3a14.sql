-- Create a profile for the existing auth user amarpawar2007@gmail.com  
-- Using the user_id from auth logs: de6a11f2-45b1-4de4-9fd2-7cce1dd24b99
INSERT INTO public.profiles (id, user_id, full_name, email, role) 
VALUES (
  'de6a11f2-45b1-4de4-9fd2-7cce1dd24b99', 
  'de6a11f2-45b1-4de4-9fd2-7cce1dd24b99', 
  'Amar Pawar', 
  'amarpawar2007@gmail.com', 
  'super_admin'
) ON CONFLICT (user_id) DO NOTHING;