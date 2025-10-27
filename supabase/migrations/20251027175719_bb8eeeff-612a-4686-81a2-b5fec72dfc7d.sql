-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create notes table
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  pdf_url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user course progress table
CREATE TABLE public.user_course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Notes policies
CREATE POLICY "Users can view their own notes"
  ON public.notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes"
  ON public.notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes"
  ON public.notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes"
  ON public.notes FOR DELETE
  USING (auth.uid() = user_id);

-- Courses policies (public read)
CREATE POLICY "Anyone can view courses"
  ON public.courses FOR SELECT
  TO authenticated
  USING (true);

-- User course progress policies
CREATE POLICY "Users can view their own progress"
  ON public.user_course_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress"
  ON public.user_course_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_course_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger function for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample courses
INSERT INTO public.courses (title, description, category, pdf_url, thumbnail_url) VALUES
  ('Introduction to Machine Learning', 'Learn the fundamentals of machine learning algorithms and applications', 'Technology', 'https://example.com/ml-intro.pdf', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'),
  ('Advanced React Patterns', 'Master advanced React patterns and best practices for scalable applications', 'Technology', 'https://example.com/react-advanced.pdf', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'),
  ('Data Structures & Algorithms', 'Comprehensive guide to data structures and algorithms', 'Computer Science', 'https://example.com/dsa.pdf', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea'),
  ('Digital Marketing Fundamentals', 'Learn the essentials of digital marketing strategies', 'Business', 'https://example.com/digital-marketing.pdf', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'),
  ('Python for Data Science', 'Master Python programming for data analysis and visualization', 'Data Science', 'https://example.com/python-ds.pdf', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935');