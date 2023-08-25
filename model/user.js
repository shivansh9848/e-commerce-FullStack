import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: Buffer,
      required: true,
    },
    address: {
      type: [mongoose.Mixed],
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    name: { type: String },
    salt: {
      type: Buffer,
    },
    resetPasswordToken: { type: String, default: "" },
  },
  { timestamps: true }
);
const virtualId = UserSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const User = mongoose.model("User", UserSchema, "users");

export default User;

// [
//     {
//       "email": "rai.shivansh9848@gmail.com",
//       "password": "1",
//       "id": 1,
//       "address": [],
//       "role": "admin"
//     },
// {
//   "email": "demo@gmail.com",
//   "password": "1",
//   "id": 2,
//   "address": [
//     {
//       "full-name": "SHIVANSH RAI",
//       "email-add": "rai.shivansh9848@gmail.com",
//       "phone-number": "07667290163",
//       "street-address": "BH1 ,IIITM Campus",
//       "city": "GWALIOR",
//       "state": "Andhra Pradesh",
//       "postal-code": "474015"
//     }
//   ],
//   "role": "user"
// },
//     {
//       "email": "imt_2021092@iiitm.ac.in",
//       "password": "Honeyrai@123",
//       "id": 3,
//       "address": [],
//       "role": "user"
//     },
//     {
//       "email": "a9848@gmail.com",
//       "password": "Honeyrai@123",
//       "role": "user",
//       "address": [
//         {
//           "full-name": "SHIVANSH RAI",
//           "email-add": "rai.shivansh9848@gmail.com",
//           "phone-number": "07667290163",
//           "street-address": "BH1 ,IIITM Campus,MORENA LINK ROAD, ROOM 305 BH1(ARAVALLI HOSTEL)",
//           "city": "GWALIOR",
//           "state": "Himachal Pradesh",
//           "postal-code": "474015"
//         }
//       ],
//       "id": 4
//     }
//   ]
