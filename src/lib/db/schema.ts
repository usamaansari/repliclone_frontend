import { pgTable, varchar, timestamp, integer, uuid, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique().default(''),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  address1: text('address1'),
  address2: text('address2'),
  city: varchar('city', { length: 100 }),
  province: varchar('province', { length: 100 }),
  postalCode: varchar('postal_code', { length: 20 }),
  country: varchar('country', { length: 100 }),
  phone: varchar('phone', { length: 30 }),
  emailVerified: integer('email_verified').default(0), // 0 = not verified, 1 = verified
  verificationToken: uuid('verification_token'),
  verificationTokenExpiry: timestamp('verification_token_expiry'),
  passwordResetToken: uuid('password_reset_token'),
  passwordResetExpiry: timestamp('password_reset_expiry'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

