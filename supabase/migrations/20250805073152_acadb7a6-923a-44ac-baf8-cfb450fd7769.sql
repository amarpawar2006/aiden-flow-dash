-- Create demo user accounts by inserting directly into auth.users
-- Note: This approach creates users without passwords, so we'll need to use the dashboard

-- First, let's create profiles for the demo users that can be referenced
-- We'll use placeholder user IDs that match what would be generated

-- Insert demo profiles with specific IDs for demo users
INSERT INTO public.profiles (id, user_id, full_name, email, role) VALUES 
('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Super Admin', 'admin@aiden.ai', 'super_admin'),
('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Team Leader', 'leader@aiden.ai', 'leadership'),
('33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Employee User', 'employee@aiden.ai', 'employee')
ON CONFLICT (user_id) DO NOTHING;