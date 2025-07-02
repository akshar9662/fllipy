import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

// Connect only once
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


const AddressSchema = new mongoose.Schema({
  addresses: [
    {
      name: String,
      phone: Number,
      address: String,
      city: String,
      state: String,
      pincode: Number,
      addressType: String,
    },
  ],
});

const Address = mongoose.model("Address", AddressSchema);
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const addresses = await Address.find();
      res.status(200).json(addresses);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch addresses", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
