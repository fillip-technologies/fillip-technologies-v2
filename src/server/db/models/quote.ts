import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const quoteSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, default: null },
    selections: { type: Schema.Types.Mixed, default: [] },
    line_items: { type: Schema.Types.Mixed, default: [] },
    one_time_total: { type: Number, required: true, default: 0 },
    monthly_total: { type: Number, required: true, default: 0 },
    emailed: { type: Boolean, required: true, default: false },
    created_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "quotes", versionKey: false, minimize: false }
);

export type QuoteDoc = InferSchemaType<typeof quoteSchema>;
export const QuoteModel: Model<QuoteDoc> =
  (models.Quote as Model<QuoteDoc>) ?? model<QuoteDoc>("Quote", quoteSchema);
