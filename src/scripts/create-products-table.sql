-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  category TEXT,
  image TEXT,
  rating JSONB
);

-- Insert sample data
INSERT INTO products (title, price, description, category, image, rating) VALUES
('Wireless Bluetooth Headphones', 79.99, 'High-quality wireless headphones with noise cancellation', 'Electronics', '/placeholder.svg?height=400&width=400', '{"rate": 4.5, "count": 128}'),
('Organic Cotton T-Shirt', 24.99, 'Comfortable organic cotton t-shirt in various colors', 'Clothing', '/placeholder.svg?height=400&width=400', '{"rate": 4.2, "count": 89}'),
('JavaScript: The Good Parts', 29.99, 'Essential guide to JavaScript programming', 'Books', '/placeholder.svg?height=400&width=400', '{"rate": 4.7, "count": 234}'),
('Smart Home Security Camera', 149.99, '1080p HD security camera with night vision', 'Electronics', '/placeholder.svg?height=400&width=400', '{"rate": 4.3, "count": 67}'),
('Yoga Mat Premium', 39.99, 'Non-slip yoga mat with carrying strap', 'Sports', '/placeholder.svg?height=400&width=400', '{"rate": 4.6, "count": 156}'),
('Ceramic Coffee Mug Set', 34.99, 'Set of 4 handcrafted ceramic coffee mugs', 'Home & Garden', '/placeholder.svg?height=400&width=400', '{"rate": 4.4, "count": 92}'),
('Wireless Phone Charger', 24.99, 'Fast wireless charging pad for smartphones', 'Electronics', '/placeholder.svg?height=400&width=400', '{"rate": 4.1, "count": 203}'),
('Running Shoes', 89.99, 'Lightweight running shoes with cushioned sole', 'Sports', '/placeholder.svg?height=400&width=400', '{"rate": 4.5, "count": 178}');

-- Enable Row Level Security (optional)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for authenticated users
CREATE POLICY "Enable all operations for authenticated users" ON products
FOR ALL USING (true);
