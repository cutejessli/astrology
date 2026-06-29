import type { HouseNumber } from "../core";
import type { RetrogradeSunSignReading } from "./types";

export const MERCURY_RETROGRADE_HOUSE_READINGS = {
  1: {
    solarHouse: 1,
    areaName: "Identity and Personal Direction",
    headline: "Your voice and direction are being rewritten",
    paragraphs: [
      "You may notice yourself reconsidering how you introduce yourself, express an opinion, or move toward a personal goal. Words that once felt natural can suddenly seem incomplete, and an old version of you may briefly return for another look.",
      "This is not a demand to reinvent yourself overnight. It is a useful pause for noticing which labels, plans, and ways of speaking still feel true. Let your next step become clearer before making a dramatic declaration.",
    ],
    focusAreas: ["Self-expression", "Personal decisions", "Appearance and direction"],
    practicalAction:
      "Review your personal priorities and rewrite one statement about who you are or where you are going.",
    reflectionPrompt: "What part of my identity is ready for more honest language?",
  },
  2: {
    solarHouse: 2,
    areaName: "Money, Values, and Security",
    headline: "Your relationship with security deserves a second look",
    paragraphs: [
      "A payment, purchase, budget, possession, or conversation about money may need to be revisited. You may also recognize that something you once valued no longer deserves the same amount of time, energy, or financial support.",
      "Use this period to check details and understand the emotional meaning behind your spending and saving choices. The deeper review is not only about what you own, but about what helps you feel genuinely stable and resourced.",
    ],
    focusAreas: ["Budget and payments", "Possessions", "Personal values"],
    practicalAction:
      "Audit recurring expenses, confirm outstanding payments, and identify one resource that can be used more wisely.",
    reflectionPrompt: "What actually makes me feel secure, and what only creates the appearance of security?",
  },
  3: {
    solarHouse: 3,
    areaName: "Communication and Everyday Movement",
    headline: "Slow the message down before it travels",
    paragraphs: [
      "Texts, emails, appointments, errands, short trips, and everyday conversations can become unusually busy or tangled. A sibling, neighbor, class, document, or unfinished idea may also return to your attention.",
      "This is an excellent time to edit, clarify, relearn, and reconnect. Say less when you are unsure, repeat important details, and leave more room in the schedule than you think you need.",
    ],
    focusAreas: ["Messages and documents", "Learning and errands", "Siblings and neighbors"],
    practicalAction:
      "Double-check your calendar and resend or clarify any message whose meaning could be misunderstood.",
    reflectionPrompt: "Where would clearer, simpler communication change my daily life?",
  },
  4: {
    solarHouse: 4,
    areaName: "Home, Family, and Emotional Foundations",
    headline: "The past is asking to be understood differently",
    paragraphs: [
      "A family conversation, home project, memory, or question about where you belong may resurface. You could find yourself sorting through old objects, reconsidering a living arrangement, or hearing a familiar story with new emotional understanding.",
      "The purpose is not to become trapped in the past. It is to repair the foundation beneath the next chapter. Give practical home matters careful attention, and let family conversations unfold without forcing an immediate conclusion.",
    ],
    focusAreas: ["Home decisions", "Family communication", "Emotional roots"],
    practicalAction:
      "Finish one neglected home task or create space for a calm conversation about an unresolved family matter.",
    reflectionPrompt: "What does home need to mean for me now?",
  },
  5: {
    solarHouse: 5,
    areaName: "Creativity, Romance, and Joy",
    headline: "Something that once lit you up may return",
    paragraphs: [
      "An unfinished creative project, former romantic interest, old hobby, or question involving children may come back into view. Pleasure can feel reflective rather than straightforward, asking you to remember what made you feel expressive before life became overly managed.",
      "Revisit without assuming that every return must become permanent. This is fertile energy for editing art, rediscovering play, and having honest conversations about affection, attention, and what makes your heart feel alive.",
    ],
    focusAreas: ["Creative projects", "Romance and affection", "Play and self-expression"],
    practicalAction:
      "Return to one abandoned creative idea and spend time with it without judging whether it must become productive.",
    reflectionPrompt: "What kind of joy have I postponed because it did not seem practical enough?",
  },
  6: {
    solarHouse: 6,
    areaName: "Routines, Work, and Well-Being",
    headline: "Your daily systems are revealing what needs repair",
    paragraphs: [
      "Schedules, work processes, appointments, devices, chores, or wellness habits may require extra attention. Small inefficiencies can become impossible to ignore, especially when you have been compensating for them through effort alone.",
      "Treat delays as useful information. This is a strong period for reorganizing, correcting instructions, rescheduling what no longer fits, and noticing how your emotional state affects your energy and daily functioning.",
    ],
    focusAreas: ["Workflows and schedules", "Health habits", "Responsibilities and service"],
    practicalAction:
      "Choose one repeated daily frustration and redesign the system around it instead of continuing to push through it.",
    reflectionPrompt: "Which part of my routine supports me, and which part quietly drains me?",
  },
  7: {
    solarHouse: 7,
    areaName: "Relationships and Agreements",
    headline: "A relationship conversation needs a more careful hearing",
    paragraphs: [
      "A partner, collaborator, client, or important one-to-one connection may bring an unfinished issue back to the table. Old relationships can also reappear, though their return is information—not automatic proof that they belong in your future.",
      "Listen for assumptions hiding beneath the words. Agreements may need revision, expectations may need to be named, and both people may need time before deciding what the conversation ultimately means.",
    ],
    focusAreas: ["Partnership communication", "Contracts and agreements", "Boundaries and expectations"],
    practicalAction:
      "Restate one important agreement in plain language and ask the other person what they believe was agreed upon.",
    reflectionPrompt: "What do I need relationships to understand about me that I have not clearly expressed?",
  },
  8: {
    solarHouse: 8,
    areaName: "Shared Resources, Trust, and Transformation",
    headline: "The unspoken details can no longer remain vague",
    paragraphs: [
      "Shared money, debt, taxes, insurance, intimacy, trust, grief, or a complicated emotional exchange may require review. Information that was incomplete can surface, or a deeper conversation may reveal why a practical issue has carried so much emotional weight.",
      "Move slowly and verify every number, promise, and assumption. This period can support meaningful repair when difficult subjects are approached honestly, but it is not the moment to pressure yourself or another person into instant vulnerability.",
    ],
    focusAreas: ["Shared finances", "Trust and intimacy", "Unresolved emotional material"],
    practicalAction:
      "Gather the documents or facts surrounding one shared obligation before beginning the emotional conversation about it.",
    reflectionPrompt: "Where would greater clarity allow me to release fear or regain trust?",
  },
  9: {
    solarHouse: 9,
    areaName: "Beliefs, Study, and Wider Horizons",
    headline: "Your understanding of the bigger picture is evolving",
    paragraphs: [
      "A belief, spiritual teaching, educational path, publication, legal matter, or long-distance travel plan may need revision. You may return to a subject you once studied and discover that it now speaks to you in a completely different way.",
      "Questioning is productive here. Research before proclaiming certainty, confirm travel and application details, and allow your philosophy to become more spacious rather than replacing one rigid answer with another.",
    ],
    focusAreas: ["Beliefs and spirituality", "Education and publishing", "Long-distance plans"],
    practicalAction:
      "Revisit a book, course, or teaching that shaped you and write down what you understand differently now.",
    reflectionPrompt: "Which belief still expands my life, and which one has become too small for me?",
  },
  10: {
    solarHouse: 10,
    areaName: "Career, Visibility, and Direction",
    headline: "Your public direction is ready for refinement",
    paragraphs: [
      "A professional plan, public message, leadership decision, or conversation with an authority figure may need another pass. Work from the past can return, and you may reconsider how you want your contribution to be recognized.",
      "Avoid rushing to define your entire future from one delay or awkward exchange. Revise the strategy, correct the presentation, and make sure the path you are pursuing still reflects the person you are becoming.",
    ],
    focusAreas: ["Career decisions", "Reputation and messaging", "Leadership and long-term goals"],
    practicalAction:
      "Review your professional bio, portfolio, or current goal and remove language that no longer reflects your direction.",
    reflectionPrompt: "What do I want to be known for now—not merely what have I been known for before?",
  },
  11: {
    solarHouse: 11,
    areaName: "Friendships, Community, and Future Plans",
    headline: "Your people and your future are being reconsidered together",
    paragraphs: [
      "An old friend, group, audience, collaborative project, or digital community may return to your attention. Plans for the future can shift as you see more clearly which connections support your growth and which ones belong mainly to an earlier chapter.",
      "This is a productive time to repair community communication, revise a shared project, and reconsider how technology or social media supports your larger purpose. A reunion may be meaningful without requiring you to recreate the past exactly as it was.",
    ],
    focusAreas: ["Friendships and groups", "Technology and audiences", "Future goals"],
    practicalAction:
      "Review one group commitment or future plan and clarify who is responsible for what before moving ahead.",
    reflectionPrompt: "Which relationships genuinely belong in the future I am building?",
  },
  12: {
    solarHouse: 12,
    areaName: "Rest, Closure, and the Inner World",
    headline: "Quiet information is rising from beneath the surface",
    paragraphs: [
      "Dreams, memories, unfinished grief, private worries, or old mental patterns may become more noticeable. You may need more solitude than usual, and trying to maintain constant output can make the inner noise louder rather than quieter.",
      "This is less about obtaining immediate answers and more about making room for what has not yet been fully processed. Protect sleep, reduce unnecessary stimulation, and record insights before deciding what they require from you.",
    ],
    focusAreas: ["Rest and retreat", "Dreams and subconscious patterns", "Closure and spiritual recovery"],
    practicalAction:
      "Create a small daily period without messages, media, or obligations and use it to journal, rest, or reflect.",
    reflectionPrompt: "What becomes audible when I stop demanding an immediate solution?",
  },
} as const satisfies Record<HouseNumber, RetrogradeSunSignReading>;

export function getMercuryRetrogradeHouseReading(
  house: HouseNumber
): RetrogradeSunSignReading {
  return MERCURY_RETROGRADE_HOUSE_READINGS[house];
}
