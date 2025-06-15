import ratelimit from "../config/upstash.js";
import { newError } from "../utils/apiResponse.js";


const RateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit('my-rate-limit');

        if (!success) {
            return newError('Too many Requests, Try again later', 429)
        }

        next()
    } catch (error) {
        throw error
    }
}

export default RateLimiter