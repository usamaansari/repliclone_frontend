import { 
  pgTable, 
  varchar, 
  timestamp, 
  integer, 
  uuid, 
  text, 
  jsonb, 
  boolean,
  numeric,
  pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const industryEnum = pgEnum('industry_type', ['car_sales', 'real_estate', 'custom']);
export const subscriptionTierEnum = pgEnum('subscription_tier', ['free', 'basic', 'pro', 'enterprise']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'inactive', 'cancelled', 'trial']);
export const cloneStatusEnum = pgEnum('clone_status', ['pending', 'processing', 'active', 'inactive', 'failed']);
export const integrationTypeEnum = pgEnum('integration_type', ['website', 'widget', 'api', 'webhook']);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  companyName: varchar('company_name', { length: 255 }),
  industry: industryEnum('industry'),
  phone: varchar('phone', { length: 30 }),
  address1: text('address1'),
  address2: text('address2'),
  city: varchar('city', { length: 100 }),
  province: varchar('province', { length: 100 }),
  postalCode: varchar('postal_code', { length: 20 }),
  country: varchar('country', { length: 100 }),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('free'),
  subscriptionStatus: subscriptionStatusEnum('subscription_status').default('inactive'),
  emailVerified: integer('email_verified').default(0), // 0 = not verified, 1 = verified
  verificationToken: uuid('verification_token'),
  verificationTokenExpiry: timestamp('verification_token_expiry'),
  passwordResetToken: uuid('password_reset_token'),
  passwordResetExpiry: timestamp('password_reset_expiry'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Clones Table
export const clones = pgTable('clones', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  industryType: industryEnum('industry_type'),
  tavusReplicaId: varchar('tavus_replica_id', { length: 255 }),
  tavusPersonaId: varchar('tavus_persona_id', { length: 255 }),
  tavusDocumentIds: jsonb('tavus_document_ids'), // Array of document IDs
  tavusObjectiveIds: jsonb('tavus_objective_ids'), // Array of objective IDs
  tavusGuardrailsId: varchar('tavus_guardrails_id', { length: 255 }),
  status: cloneStatusEnum('status').default('pending'),
  avatarUrl: text('avatar_url'),
  voiceId: varchar('voice_id', { length: 255 }),
  personalityTraits: jsonb('personality_traits'),
  trainingData: jsonb('training_data'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Integration Configs Table
export const integrationConfigs = pgTable('integration_configs', {
  id: uuid('id').defaultRandom().primaryKey(),
  cloneId: uuid('clone_id').references(() => clones.id).notNull(),
  integrationType: integrationTypeEnum('integration_type'),
  websiteUrl: text('website_url'),
  embedCode: text('embed_code'),
  apiKey: varchar('api_key', { length: 255 }),
  webhookUrl: text('webhook_url'),
  configuration: jsonb('configuration'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Conversations Table
export const conversations = pgTable('conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  cloneId: uuid('clone_id').references(() => clones.id).notNull(),
  visitorId: varchar('visitor_id', { length: 255 }),
  sessionData: jsonb('session_data'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  endedAt: timestamp('ended_at'),
  leadCaptured: boolean('lead_captured').default(false),
  conversationTranscript: jsonb('conversation_transcript'),
});

// Analytics Table
export const analytics = pgTable('analytics', {
  id: uuid('id').defaultRandom().primaryKey(),
  cloneId: uuid('clone_id').references(() => clones.id).notNull(),
  metricType: varchar('metric_type', { length: 50 }),
  metricValue: numeric('metric_value'),
  metadata: jsonb('metadata'),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  clones: many(clones),
}));

export const clonesRelations = relations(clones, ({ one, many }) => ({
  user: one(users, {
    fields: [clones.userId],
    references: [users.id],
  }),
  integrationConfigs: many(integrationConfigs),
  conversations: many(conversations),
  analytics: many(analytics),
}));

export const integrationConfigsRelations = relations(integrationConfigs, ({ one }) => ({
  clone: one(clones, {
    fields: [integrationConfigs.cloneId],
    references: [clones.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ one }) => ({
  clone: one(clones, {
    fields: [conversations.cloneId],
    references: [clones.id],
  }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  clone: one(clones, {
    fields: [analytics.cloneId],
    references: [clones.id],
  }),
}));
