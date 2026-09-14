import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// Case studies are fully self-contained: unlike industries/service pages (whose
// section content lives in `site_content`), every section of a case study is
// embedded directly in its own document here. Sub-documents use `_id: false` so
// the editor round-trips clean objects.
const caseStudySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    industry: { type: String, default: "" },
    published: { type: Boolean, required: true, default: false },
    sort_order: { type: Number, required: true, default: 0 },

    hero: {
      type: new Schema(
        {
          eyebrow: { type: String, default: "Case Study" },
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          heroImage: { type: String, default: "" },
          cardImage: { type: String, default: "" },
          imageAlt: { type: String, default: "" },
          resultBadge: { type: String, default: "" },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    brands: {
      type: new Schema(
        {
          heading: { type: String, default: "" },
          description: { type: String, default: "" },
          logos: {
            type: [
              new Schema(
                { name: { type: String, default: "" }, logo: { type: String, default: "" } },
                { _id: false }
              ),
            ],
            default: [],
          },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    challenges: {
      type: new Schema(
        {
          heading: { type: String, default: "" },
          intro: { type: String, default: "" },
          items: {
            type: [new Schema({ text: { type: String, default: "" } }, { _id: false })],
            default: [],
          },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    strategy: {
      type: new Schema(
        {
          heading: { type: String, default: "" },
          intro: { type: String, default: "" },
          items: {
            type: [new Schema({ text: { type: String, default: "" } }, { _id: false })],
            default: [],
          },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    journey: {
      type: new Schema(
        {
          heading: { type: String, default: "" },
          subheading: { type: String, default: "" },
          chartLabel: { type: String, default: "" },
          chartValues: { type: [Number], default: [] },
          phases: {
            type: [
              new Schema(
                {
                  period: { type: String, default: "" },
                  title: { type: String, default: "" },
                  description: { type: String, default: "" },
                },
                { _id: false }
              ),
            ],
            default: [],
          },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    results: {
      type: new Schema(
        {
          heading: { type: String, default: "" },
          items: {
            type: [
              new Schema(
                { value: { type: String, default: "" }, label: { type: String, default: "" } },
                { _id: false }
              ),
            ],
            default: [],
          },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    outcome: {
      type: new Schema(
        {
          heading: { type: String, default: "" },
          paragraphs: {
            type: [new Schema({ text: { type: String, default: "" } }, { _id: false })],
            default: [],
          },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    cta: {
      type: new Schema(
        {
          heading: { type: String, default: "" },
          description: { type: String, default: "" },
          buttonLabel: { type: String, default: "" },
          buttonHref: { type: String, default: "" },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "case_studies", versionKey: false, minimize: false }
);
caseStudySchema.index({ sort_order: 1, slug: 1 });

export type CaseStudyDoc = InferSchemaType<typeof caseStudySchema>;
export const CaseStudyModel: Model<CaseStudyDoc> =
  (models.CaseStudy as Model<CaseStudyDoc>) ?? model<CaseStudyDoc>("CaseStudy", caseStudySchema);
