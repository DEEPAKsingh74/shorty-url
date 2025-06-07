import path from 'path';
import dotenv from "dotenv"
import { InternalServerError } from '@utils/error_handler/ErrorStatus';
import logger from '@infra/logger/Logger';

dotenv.config({ path: path.join(__dirname, '../../local.env') });

export function getEnvValue(key: string, defaultValue?: string): string {
	const value = process.env[key] || defaultValue;
	if (!value) {
		logger.error(`Missing environment variable ${key}`);
		throw new InternalServerError(`Missing environment variable ${key}`);
	}
	return value;
}