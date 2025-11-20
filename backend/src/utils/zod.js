import { z } from "zod";

export const checkRegisterUserSchema = z.object({
    name: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["farmer", "consumer"], "Role must be either farmer, consumer."),
    phoneNumber: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .transform(val => parseInt(val, 10)),

    location: z.object({
        state: z.string().min(2, "State must be at least 2 characters long"),
        city: z.string().min(2, "City must be at least 2 characters long"),
    }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const checkLoginIncomingData = z.object({
    email:z.email("Invalid email."),
    password:z.string().min(8, "Password must be at least 8 character long.")
})


