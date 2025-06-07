import { getEnvValue } from "./config";

interface Config {
	port: number;
	env: string;
	access_secret: string;
	refresh_secret: string;
	razorpay_key_id: string;
	razorpay_key_secret: string;
}


export const envConfig: Config = {
	port: parseInt(getEnvValue('PORT', '8000'), 10),
	env: getEnvValue('NODE_ENV', "development"),
	access_secret: getEnvValue('ACCESS_SECRET'),
	refresh_secret: getEnvValue('REFRESH_SECRET'),
	razorpay_key_id: getEnvValue('RAZORPAY_KEY_ID'),
	razorpay_key_secret: getEnvValue('RAZORPAY_KEY_SECRET')
};