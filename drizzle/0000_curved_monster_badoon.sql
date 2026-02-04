CREATE TYPE "public"."clone_status" AS ENUM('pending', 'processing', 'active', 'inactive', 'failed');--> statement-breakpoint
CREATE TYPE "public"."industry_type" AS ENUM('car_sales', 'real_estate', 'custom');--> statement-breakpoint
CREATE TYPE "public"."integration_type" AS ENUM('website', 'widget', 'api', 'webhook');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'inactive', 'cancelled', 'trial');--> statement-breakpoint
CREATE TYPE "public"."subscription_tier" AS ENUM('free', 'basic', 'pro', 'enterprise');--> statement-breakpoint
CREATE TABLE "analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clone_id" uuid NOT NULL,
	"metric_type" varchar(50),
	"metric_value" numeric,
	"metadata" jsonb,
	"recorded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"industry_type" "industry_type",
	"tavus_replica_id" varchar(255),
	"tavus_persona_id" varchar(255),
	"tavus_document_ids" jsonb,
	"tavus_objective_ids" jsonb,
	"tavus_guardrails_id" varchar(255),
	"status" "clone_status" DEFAULT 'pending',
	"avatar_url" text,
	"voice_id" varchar(255),
	"personality_traits" jsonb,
	"training_data" jsonb,
	"conversation_url" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clone_id" uuid NOT NULL,
	"visitor_id" varchar(255),
	"session_data" jsonb,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp,
	"lead_captured" boolean DEFAULT false,
	"conversation_transcript" jsonb
);
--> statement-breakpoint
CREATE TABLE "integration_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clone_id" uuid NOT NULL,
	"integration_type" "integration_type",
	"website_url" text,
	"embed_code" text,
	"api_key" varchar(255),
	"webhook_url" text,
	"configuration" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"company_name" varchar(255),
	"industry" "industry_type",
	"phone" varchar(30),
	"address1" text,
	"address2" text,
	"city" varchar(100),
	"province" varchar(100),
	"postal_code" varchar(20),
	"country" varchar(100),
	"subscription_tier" "subscription_tier" DEFAULT 'free',
	"subscription_status" "subscription_status" DEFAULT 'inactive',
	"email_verified" integer DEFAULT 0,
	"verification_token" uuid,
	"verification_token_expiry" timestamp,
	"password_reset_token" uuid,
	"password_reset_expiry" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_clone_id_clones_id_fk" FOREIGN KEY ("clone_id") REFERENCES "public"."clones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clones" ADD CONSTRAINT "clones_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_clone_id_clones_id_fk" FOREIGN KEY ("clone_id") REFERENCES "public"."clones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integration_configs" ADD CONSTRAINT "integration_configs_clone_id_clones_id_fk" FOREIGN KEY ("clone_id") REFERENCES "public"."clones"("id") ON DELETE no action ON UPDATE no action;