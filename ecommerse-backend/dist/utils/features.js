import mongoose from "mongoose";
export const connectDB = () => {
    mongoose
        .connect("mongodb+srv://zeeshanelahi:Zeeshan93052@cluster0.s6fdfsk.mongodb.net/Ecommerce2024?retryWrites=true&w=majority", {
        dbName: "Ecommerce2024",
    })
        .then((c) => console.log(`DB connected to ${c.connection.host} `))
        .catch((e) => console.log(e));
};
