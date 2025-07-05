const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://akshargohel18:akshargohel18@cluster0.zdjlt4c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));


const AdminLoginSchema = new mongoose.Schema({
 users: [
    {
      email: String,
      password: String,
    },
  ],
});
const AdminLogin = mongoose.model("AdminLogin", AdminLoginSchema);
// ✅ Get all users
app.get("/api/adminlogin", async (req, res) => {
  try {
    const Users = await AdminLogin.find();
    res.json(Users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});
// POST: Login
app.post("/api/adminlogin", async (req, res) => {
  try {
    const User = req.body.users;
    let existingUser = await AdminLogin.findOne();
    if (!existingUser) {
      const newUsers = new AdminLogin({ users: User });
      await newUsers.save();
      return res
        .status(201)
        .json({ message: "New User Registered", adminlogin: newUsers });
    } 
    existingUser.users.push(User);
    await existingUser.save();
    res.status(200).json({ message: "New User Registered", adminlogin: existingUser });
  } catch (error) {
    console.error("❌ Error Login:", error);
    res.status(500).json({ message: "Failed to save/update Users", error });
  }
});


const LoginSchema = new mongoose.Schema({
 users: [
    {
      email: String,
      password: String,
    },
  ],
});
const Login = mongoose.model("Login", LoginSchema);
// ✅ Get all users
app.get("/api/login", async (req, res) => {
  try {
    const Users = await Login.find();
    res.json(Users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});
// POST: Login
app.post("/api/login", async (req, res) => {
  try {
    const User = req.body.users;
    let existingUser = await Login.findOne();
    if (!existingUser) {
      const newUsers = new Login({ users: User });
      await newUsers.save();
      return res
        .status(201)
        .json({ message: "New User Registered", login: newUsers });
    } 
    existingUser.users.push(User);
    await existingUser.save();
    res.status(200).json({ message: "New User Registered", login: existingUser });
  } catch (error) {
    console.error("❌ Error Login:", error);
    res.status(500).json({ message: "Failed to save/update Users", error });
  }
});

const productSchema = new mongoose.Schema({
  pname: String,
  image: String,
  oldPrice: Number,
  price: Number,
  rating: Number,
  quantity: { type: Number, min: 1 },
});
const Product = mongoose.model("Product", productSchema);
// ✅ Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
const multer = require("multer");
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "../public/images")));const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.json({ path: `/images/${req.file.originalname}` });
});
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Server Error" });
  }
});
app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Server Error" });
  }
});
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


const cartItemSchema = new mongoose.Schema({
  loginId: String,
  pname: String,
  image: String,
  oldPrice: Number,
  price: Number,
  quantity: { type: Number, min: 1 },
});
const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
});
const Cart = mongoose.model("Cart", cartSchema);
// GET: Fetch All Carts
app.get("/api/cart", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carts", error });
  }
});
// POST: Add A New Item
app.post("/api/cart", async (req, res) => {
  try {
    const newItems = req.body.items; 
    const loginId = newItems.loginId;
    let existingCart = await Cart.findOne({"items.loginId": loginId });
    if (!existingCart) {
      const newCart = new Cart({ items: [newItems] });
      await newCart.save();
      return res.status(201).json({ message: "New cart created", cart: newCart });
    }
    const index = existingCart.items.findIndex(
      (item) => item.pname === newItems.pname && item.loginId === loginId
    );
    if (index !== -1) {
      existingCart.items[index].quantity += 1;
    } else {
      existingCart.items.push(newItems);
    }
    await existingCart.save();
    res.status(200).json({ message: "Cart updated", cart: existingCart });
  } catch (error) {
    res.status(500).json({ message: "Failed to save/update cart", error });
  }
});

// PATCH: Update Quantity Of A Specific Item
app.patch("/api/cart/update", async (req, res) => {
  const { productId, quantity,loginId } = req.body;
  try {
    const cart = await Cart.findOne({"items.loginId":loginId});
    if (!cart) 
    return res.status(404).json({ message: "Item not found in cart" });
    const item = cart.items.find(
      (item) => item._id.toString() === productId.toString()
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    item.quantity = quantity < 1 ? 1 : quantity;
    await cart.save();
    res.json({ message: "Quantity updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});
// PATCH: Delete Cart Specific Item
app.patch("/api/cart/delete", async (req, res) => {
  try {
    const { productId,loginId } = req.body;
    const cart = await Cart.findOne({"items.loginId": loginId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
      cart.items = cart.items.filter(
      (item) => item._id.toString() !== productId
    );
    if (cart.items.length === 0) {
    await Cart.deleteOne({ _id: cart._id });
    return res.status(200).json({ message: "cart item deleted" });
    }
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Server error while deleting cart item" });
  }
});

app.delete("/api/cart/clear", async (req, res) => {
  try {
    const {loginId} = req.body;
    const cart = await Cart.findOne({"items.loginId": loginId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart Cleared Successfully", cart });
  } catch (error) {
    console.error("Error Clearing Cart:", error);
    res.status(500).json({ message: "Server error while Clearing cart" });
  }
});



const AddressSchema = new mongoose.Schema({
  addresses: [
    {
      loginId: String,
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
// GET: Fetch All Address
app.get("/api/address", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch addresses", error: err.message });
  }
});
// POST: Add New Address
app.post("/api/address", async (req, res) => {
  try {
    const newAddress = req.body.newAddress;
    const loginId = newAddress.loginId;
    let existing = await Address.findOne({"addresses.loginId": loginId });
    if (!existing) {
      const saveAddress = new Address({ addresses: [newAddress] });
      await saveAddress.save();
      return res
        .status(201)
        .json({ message: "Address added", address: saveAddress });
    }
    existing.addresses.push(newAddress);
    await existing.save();
    res.status(200).json({ message: "Address added", address: existing });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
// PATCH: Update Specific Address
app.patch("/api/address/update", async (req, res) => {
  try {
    const {EditAddress,loginId} = req.body;
    let existing = await Address.findOne({"addresses.loginId": loginId });
    if (!existing) {
      return res.status(404).json({ message: "No address found" });
    }
    const index = existing.addresses.findIndex(
      (item) => item._id.toString() === EditAddress._id.toString()
    );
    if (index === -1) {
      return res.status(404).json({ message: "Address not found for update" });
    }
    existing.addresses[index] = EditAddress;
    await existing.save();
    res.status(200).json({ message: "Address updated" });
  } catch (err) {
    console.error("Error updating address:", err);
    res
      .status(500)
      .json({ message: "Error updating address", error: err.message });
  }
});
// PATCH: Delete Specific Address
app.patch("/api/address/delete", async (req, res) => {
  try {
    const { AddressId,loginId } = req.body;
    const address = await Address.findOne({"addresses.loginId":loginId});
    if (!address) {
      return res
        .status(404)
        .json({ message: `Address with id '${AddressId}' not found` });
    }
     address.addresses = address.addresses.filter(
      (item) => item._id.toString() !== AddressId
    );
    if (address.addresses.length === 0) {
      await Address.deleteOne({ _id: address._id });
      return res.status(200).json({ message: "Address deleted (empty document)" });
    }
     await address.save();
    res.status(200).json({ message: `Address removed`, address: address });
  } catch (error) {
    console.error("Error deleting Address:", error);
    res.status(500).json({ message: "Server error while deleting Address" });
  }
});

    
  
const orderproductSchema = new mongoose.Schema({
  pname: String,
  image: String,
  oldPrice: Number,
  price: Number,
  quantity: { type: Number, min: 1 },
  orderedDate: String,
  orderedTime: String,
});

const shippingSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  address: String,
  city: String,
  state: String,
  pincode: Number,
  addressType: String,
});

const orderSchema = new mongoose.Schema({
  loginId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: [orderproductSchema],
  shippingAddress: shippingSchema,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
// GET: Fetch All Address
app.get("/api/order", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch addresses", error: err.message });
  }
});
app.post("/api/order", async (req, res) => {
  try {
    const {loginId, product, shippingAddress } = req.body.addOrders;
    const newOrder = new Order({
      loginId,
      product,
      shippingAddress,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    res
      .status(500)
      .json({ message: "Failed to save order", error: error.message });
  }
});

const wishlistItemSchema = new mongoose.Schema({
  loginId: String,
  pname: String,
  image: String,
  rating: String,
  oldPrice: Number,
  price: Number,
});

const wishlistSchema = new mongoose.Schema({
  items: [wishlistItemSchema],
  createdAt: { type: Date, default: Date.now },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// GET: Fetch All Wishlist
app.get("/api/wishlist", async (req, res) => {
  try {
    const wishlist = await Wishlist.find();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error });
  }
});
// POST: Add A New Item
app.post("/api/wishlist", async (req, res) => {
  try {
    const newItems = req.body.addToWishlist;
    const loginId = newItems.loginId;
    let existingWishlist = await Wishlist.findOne({"items.loginId":loginId});
    if (!existingWishlist) {
      const newWishlist = new Wishlist({ items: [newItems] });
      await newWishlist.save();
      return res
        .status(201)
        .json({ message: "New Wishlist created", wishlist: newWishlist });
    }
    existingWishlist.items.push(newItems);
    await existingWishlist.save();
    res
      .status(200)
      .json({ message: "Wishlist updated", wishlist: existingWishlist });
  } catch (error) {
    console.error("❌ Error wishlist:", error);
    res.status(500).json({ message: "Failed to save/update wishlist", error });
  }
});
// PATCH: Delete wishlist Specific Item
app.patch("/api/wishlist/delete", async (req, res) => {
  try {
    const { wishlistId,loginId } = req.body;
    const wishlist = await Wishlist.findOne({"items.loginId": loginId });
    if (!wishlist) {
      return res.status(404).json({ message: "wishlist not found" });
    }
    wishlist.items = wishlist.items.filter(
      (item) => item._id.toString() !== wishlistId
    );
    if (wishlist.items.length === 0) {
      await wishlist.deleteOne({ _id: wishlist._id });
      return res
        .status(200)
        .json({ message: "wishlist deleted because it's empty" });
    }
    await wishlist.save();
    res.status(200).json({ message: "Item removed from wishlist", wishlist });
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    res
      .status(500)
      .json({ message: "Server error while deleting wishlist item" });
  }
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// 📥 POST: Add a new contact message
app.post("/api/contactus", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully", newContact });
  } catch (error) {
    console.error("❌ Error submitting contact form:", error);
    res.status(500).json({ message: "Failed to save contact", error });
  }
});

// 📤 GET: Fetch all contact messages
app.get("/api/contactus", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error("❌ Error fetching contact messages:", error);
    res.status(500).json({ message: "Failed to fetch contact messages", error });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
