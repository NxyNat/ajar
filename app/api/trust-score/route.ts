import { generateText, Output } from "ai"
import { z } from "zod"

export const maxDuration = 30

const requestSchema = z.object({
  name: z.string(),
  role: z.enum(["tenant", "landlord"]),
  breakdown: z.object({
    identity: z.number(),
    income: z.number(),
    employment: z.number(),
    payment: z.number(),
  }),
  ownershipVerified: z.boolean().optional(),
  responseRate: z.number().optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
})

const reportSchema = z.object({
  score: z.number().min(0).max(100).describe("Overall AJAR trust score from 0-100"),
  breakdown: z.object({
    identity: z.number().min(0).max(100),
    income: z.number().min(0).max(100),
    employment: z.number().min(0).max(100),
    payment: z.number().min(0).max(100),
  }),
  summary: z.string().describe("A 2-3 sentence plain-language summary of the trust assessment"),
  strengths: z.array(z.string()).min(2).max(4).describe("Concise strengths drawn from the signals"),
  considerations: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("Things to consider or watch for, fair and non-judgmental"),
})

// Deterministic fallback so the prototype always returns a believable report.
function fallbackReport(input: z.infer<typeof requestSchema>) {
  const { identity, income, employment, payment } = input.breakdown
  const score = Math.round(identity * 0.25 + income * 0.3 + employment * 0.2 + payment * 0.25)
  return {
    score,
    breakdown: input.breakdown,
    summary: `${input.name} has a ${score >= 80 ? "low" : score >= 50 ? "medium" : "high"}-risk profile based on verified identity, financial, and behavioral signals on AJAR.`,
    strengths: [
      identity >= 90 ? "Government identity fully verified" : "Identity verification on file",
      payment >= 80 ? "Strong, consistent payment history" : "Payment history available for review",
      input.ownershipVerified ? "Property ownership verified against the registry" : "Active, responsive profile",
    ].slice(0, 3),
    considerations: [
      income < 70 ? "Income signals are moderate — request recent statements" : "Confirm lease terms before signing",
      employment < 70 ? "Employment stability could be stronger" : "Evidence auto-deletes after a decision",
    ].slice(0, 2),
  }
}

export async function POST(req: Request) {
  let input: z.infer<typeof requestSchema>
  try {
    input = requestSchema.parse(await req.json())
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  try {
    const { output } = await generateText({
      model: "openai/gpt-5-mini",
      output: Output.object({ schema: reportSchema }),
      system:
        "You are AJAR's trust-scoring engine for Jordan's rental market. You assess landlords and tenants from verified identity, financial, employment, and behavioral signals. Be fair, evidence-based, and non-discriminatory. Weight signals roughly as: payment history 25%, income 30%, employment 20%, identity 25%. Keep the per-component breakdown close to the provided inputs. Write clear, neutral, professional language.",
      prompt: `Generate an AJAR trust report for this ${input.role}.\n\nName: ${input.name}\nVerified signal scores (0-100): identity ${input.breakdown.identity}, income ${input.breakdown.income}, employment ${input.breakdown.employment}, payment history ${input.breakdown.payment}.\nProperty ownership verified: ${input.ownershipVerified ?? "n/a"}\nResponse rate: ${input.responseRate ?? "n/a"}%\nRating: ${input.rating ?? "n/a"}/5 across ${input.reviewCount ?? 0} reviews.\n\nProduce an overall 0-100 score, a per-component breakdown, a short summary, strengths, and considerations.`,
    })

    return Response.json(output)
  } catch (error) {
    console.log("[v0] trust-score AI error, using fallback:", error)
    return Response.json(fallbackReport(input))
  }
}
