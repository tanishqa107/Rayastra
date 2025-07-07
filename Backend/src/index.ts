import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

//@ts-ignore
app.post("/api/v1/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword }])
      .select("user_id")
      .single();

    if (error) {
        console.log(error?.message);
      return res.status(500).json({ message: "Failed to create user", error: error.message });
      
    }

    res.status(201).json({ message: "User created", user_id: data.user_id });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@ts-ignore
app.post("/api/v1/signin", async (req: Request, res: Response) => {
  try {
    const { enteredemail, enteredpassword } = req.body;

    if (!enteredemail || !enteredpassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("password")
      .eq("email", enteredemail)
      .single();

    if (error) {
      return res.status(401).json({ message: "Invalid email or password", error: error.message });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(enteredpassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
     console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


//@ts-ignore
app.post('/api/v1/handleInfo', async (req, res) => {
  const { email, name, class: classLevel, board, city } = req.body;

  try {
    const { data, error } = await supabase
      .from('info')
      .insert([{ email, name, class: classLevel, board, city }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: 'Failed to insert info', error: error.message });
    }

    res.status(201).json({ message: 'Info saved successfully', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//@ts-ignore
app.get('/api/v1/getUserInfo', async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const { data, error } = await supabase
      .from('info') // your Supabase table name
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ message:'Something went wrong' });
  }
});




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
