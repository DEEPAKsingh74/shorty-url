import { envConfig } from "@/config/env_config";
import Razorpay from "razorpay";


const RAZORPAY_KEY_ID = envConfig.razorpay_key_id
const RAZORPAY_KEY_SECRET = envConfig.razorpay_key_secret


export const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID!,
  key_secret: RAZORPAY_KEY_SECRET!,
});