import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty messages history." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Mock assistant fallback if no API key is configured yet to prevent breaking local development
      return NextResponse.json({
        role: "assistant",
        content: "Hello! I am Fillip AI, your virtual assistant. To activate live answers powered by Gemini 2.5 Flash, please make sure to add `GEMINI_API_KEY=your_key` in your `.env` file. How can I help you today?",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-2.5-flash as requested by the user
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are Fillip AI Support, a helpful and friendly assistant representing Fillip Technologies.
Your goal is to answer visitors' queries about our services and company in a warm, professional, and clear manner.

=== COMPANY OVERVIEW ===
- Name: Fillip Technologies
- Website: https://filliptechnologies.com
- Experience: 13+ years
- Clients: 1000+ happy clients
- Team: 40+ professionals
- Tagline: "Don't let your competitors steal the spotlight. Choose Fillip Technologies and boost your brand!"

=== SERVICES ===
1. Website Design & Development — Custom websites, e-commerce, WordPress, mobile apps, software development
2. SEO Services — Local SEO, on-page, off-page, technical SEO, competitor analysis, WordPress SEO, Shopify SEO
3. Social Media Marketing — Facebook, Instagram, YouTube, LinkedIn marketing
4. Social Media Management — Full account management
5. PPC / Paid Ads — Google Ads, Facebook Ads, Instagram Ads, YouTube Ads
6. Content Marketing & Writing — Blog posts, web content, copywriting
7. Graphic Designing — Logo design, branding, UI/UX, social media creatives
8. Google Business Profile (GMB) Optimization
9. Lead Generation Services
10. Training & Internships — Available at Fillip Skill Academy (fillipskillacademy.com)

Industries served: Finance, Education, Healthcare, IT, E-commerce, Real Estate, Government

=== CONTACT — HEAD OFFICE (Patna) ===
Address: A3, Ground Floor, Beside Kalyan Jewellers, Near Chandan Hero, Kankarbagh Main Road, Patna, Bihar - 800020
Phone: +91-7257930444, +91-7545999996, +91-7545999995
Email: info@filliptechnologies.com

=== CONTACT — BRANCH OFFICE (Ranchi) ===
Address: Ispat Residency, 1st Floor, A-block-104, Kathal More – Argora – Ranchi Rd, Harmu, Ranchi, Jharkhand 834002
Phone: +91-7545999996
Email: ranchi@filliptechnologies.com

=== SOCIAL MEDIA ===
- Facebook: facebook.com/FillipTechnologies
- Instagram: instagram.com/filliptechnologies
- YouTube: youtube.com/channel/UCR7oww-nQszfqAsf19T2UtQ
- LinkedIn: linkedin.com/company/fillip-technologies
- Twitter/X: x.com/Fillip_Tech

=== PRICING ===
Pricing is custom and project-based. Always invite users to book a free consultation at: https://filliptechnologies.com/request-a-consultation/

=== CONVERSATION GUIDELINES ===
- Keep responses concise (under 2-3 short paragraphs).
- Provide correct contact numbers, email, or addresses when asked.
- Be extremely polite, professional, and helpful.

=== FORMATTING (Markdown) ===
- Replies are rendered as Markdown, so format for easy scanning.
- Use "- " bullet points when listing multiple services or items (one per line); never cram a list into one paragraph.
- Use **bold** for short labels/headers (e.g. **SEO Services:**), then a brief description.
- Write links as [text](url) — e.g. [book a free consultation](https://filliptechnologies.com/request-a-consultation/).
- Keep paragraphs short (1-2 sentences). Do not use raw HTML or headings larger than a few words.`,
    });

    // Format message history for Gemini SDK
    // Gemini startChat history expects the first message to have the 'user' role.
    // We slice out the initial assistant greeting message to conform to this.
    const rawHistory = messages.slice(0, -1);
    const firstUserIndex = rawHistory.findIndex((msg: any) => msg.role === "user");

    const history = (firstUserIndex === -1 ? [] : rawHistory.slice(firstUserIndex)).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage);
    const responseText = result.response.text();

    return NextResponse.json({
      role: "assistant",
      content: responseText,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
