// ============================================================
// Zodiac Sign Meanings and Symbolism
// ============================================================

import { ZodiacSign } from "../core";

export interface SignMeaning {
  element: "fire" | "earth" | "air" | "water";
  modality: "cardinal" | "fixed" | "mutable";
  coreArchetype: string;
  psychologicalExpression: string;
  spiritualExpression: string;
  shadowExpression: string;
  healingPath: string;
  keywords: string[];
}

export const signMeanings: Record<ZodiacSign, SignMeaning> = {
  Aries: {
    element: "fire",
    modality: "cardinal",
    coreArchetype:
      "The Initiator—the spark of becoming, the impulse toward independent existence. Aries is the first breath after the void, consciousness asserting itself into being.",
    psychologicalExpression:
      "Direct encounter with your own will and desire. You move toward what calls to you without elaborate justification. Your psychology operates through immediate response, authentic reaction, and the courage to be seen. You develop self-knowledge through action, not analysis.",
    spiritualExpression:
      "The sacred impulse toward awakening and individuation. Aries embodies the spiritual warrior—not fighting against the world but fighting toward your own truth. This is the fire of initiation, the beginning of every hero's journey.",
    shadowExpression:
      "Impulsive aggression masquerading as honesty. Domination of others through force of will. Self-centeredness that overlooks impact. Recklessness that breaks what's fragile. Anger without understanding its source.",
    healingPath:
      "Learn that true courage includes hesitation and reflection. Channel your fire toward purposes larger than personal victory. Understand that initiating requires also completing. Your warrior spirit matures when it serves something beyond itself.",
    keywords: ["courage", "initiation", "will", "authenticity", "independence", "emergence"],
  },

  Taurus: {
    element: "earth",
    modality: "fixed",
    coreArchetype:
      "The Consolidator—the force that transforms potential into presence. Taurus is substance made conscious, the body becoming aware of itself as sacred matter.",
    psychologicalExpression:
      "Embodied awareness and sensory intelligence. You know things through direct experience—what something feels like, tastes like, costs in effort and resources. Your psychology roots in the body and the material world. You develop trust through consistency and presence over time.",
    spiritualExpression:
      "The divine made manifest in form. Taurus understands that matter itself is sacred, that the body is a temple, that lasting beauty requires patient tending. This is the spirituality of incarnation—spirit committed to physical reality.",
    shadowExpression:
      "Stubborn resistance to necessary change. Possessiveness that strangles what it claims to love. Sensory indulgence as avoidance of deeper feeling. Material anxiety masquerading as security. Refusal to risk what's been accumulated.",
    healingPath:
      "Distinguish between healthy boundaries and fearful walls. Practice releasing what no longer serves. Understand that true security comes from flexibility, not rigidity. Your gifts are most potent when shared, not hoarded.",
    keywords: ["stability", "embodiment", "loyalty", "presence", "resources", "patience"],
  },

  Gemini: {
    element: "air",
    modality: "mutable",
    coreArchetype:
      "The Translator—the principle of connection through understanding. Gemini is the nervous system of consciousness itself, translating between worlds.",
    psychologicalExpression:
      "Mental agility and relational connection. Your psychology lives in the space between things—between self and other, idea and feeling, past and future. You develop understanding through conversation, pattern recognition, and seeing from multiple angles. Your gift is making connections visible.",
    spiritualExpression:
      "The sacred messenger bridging inner and outer worlds. Gemini embodies divine communication—the principle that all separation is illusion created by misunderstanding. This is the spirituality of unity through comprehension.",
    shadowExpression:
      "Scattered focus that leaves nothing deepened. Superficial understanding passed off as knowledge. Words used to manipulate rather than illuminate. Detachment masquerading as objectivity. Gossip and small talk replacing genuine connection.",
    healingPath:
      "Commit to depth in what matters most. Listen as intently as you speak. Let your gift for connection serve genuine understanding rather than information collection. Learn that presence is more valuable than novelty.",
    keywords: ["communication", "connection", "curiosity", "learning", "translation", "adaptation"],
  },

  Cancer: {
    element: "water",
    modality: "cardinal",
    coreArchetype:
      "The Nurturer—the primal force of care and belonging. Cancer is the mother principle itself—not gender but the fundamental impulse to create safety and continuation.",
    psychologicalExpression:
      "Emotional depth and relational attunement. Your psychology operates through feeling and instinct. You sense what's unspoken, what's needed before it's asked. You develop self-knowledge through emotional exploration and understanding your needs. Your inner world is as real and complex as the outer world.",
    spiritualExpression:
      "The sacred heart recognizing all beings as family. Cancer embodies unconditional love as spiritual practice. This is the spirituality of presence, of showing up consistently for what you care about, of making sanctuary.",
    shadowExpression:
      "Using emotion as weapon or shield. Clinging to the past as identity. Projection of unmet needs onto others. Passive-aggressive patterns born from unexpressed hurt. Enmeshment masquerading as love.",
    healingPath:
      "Develop emotional literacy—name what you feel without acting from it immediately. Set boundaries that protect rather than isolate. Understand that nurturing others begins with nurturing yourself. Your sensitivity is strength when paired with discernment.",
    keywords: ["emotion", "nurturing", "intuition", "home", "family", "belonging"],
  },

  Leo: {
    element: "fire",
    modality: "fixed",
    coreArchetype:
      "The Creator—the force of self-expression and authentic becoming. Leo is the sun consciousness, the drive to bring your unique light into visibility.",
    psychologicalExpression:
      "Creative self-expression and authentic visibility. Your psychology develops through bringing your gifts into the world and witnessing how they land. You need to know you matter, that your specific presence makes a difference. Self-knowledge comes through creative action and genuine praise.",
    spiritualExpression:
      "Divine creative force expressing through individual uniqueness. Leo embodies the principle that your authentic self is itself spiritual expression. This is the spirituality of becoming—of offering your gifts as service to the whole.",
    shadowExpression:
      "Addiction to approval and validation. Arrogance masquerading as confidence. Using dominance to secure belonging. Drama and theatricality replacing genuine expression. Rigidity in how you must be seen.",
    healingPath:
      "Distinguish between healthy confidence and ego-protection. Create for the joy of creating, not for applause. Understand that true authority comes from integrity, not control. Your light is brightest when serving something beyond personal glory.",
    keywords: ["creativity", "authenticity", "generosity", "visibility", "pride", "vitality"],
  },

  Virgo: {
    element: "earth",
    modality: "mutable",
    coreArchetype:
      "The Analyst—the discriminating intelligence that separates signal from noise. Virgo is the sacred servant, devoted to improvement and healing through discernment.",
    psychologicalExpression:
      "Analytical clarity and practical capability. Your psychology operates through observation, distinction, and understanding systems. You see what needs fixing and know how to fix it. Self-knowledge comes through self-examination and refinement. You develop mastery through detailed attention.",
    spiritualExpression:
      "The principle of sacred service and spiritual discernment. Virgo embodies the understanding that attention itself is a spiritual practice, that caring for details is caring for the world. This is the spirituality of presence and precision.",
    shadowExpression:
      "Perfectionism that becomes self-punishment. Criticism that wounds. Anxiety expressed as constant refinement. Obsessive focus on flaws in self and others. Spiritual bypassing disguised as healing work.",
    healingPath:
      "Recognize that perfection is illusion—progress and presence matter more. Offer your analytical gifts without judgment. Understand that your own healing must include self-compassion. Your service is most powerful when grounded in acceptance.",
    keywords: ["discernment", "service", "analysis", "healing", "improvement", "precision"],
  },

  Libra: {
    element: "air",
    modality: "cardinal",
    coreArchetype:
      "The Arbiter—the principle of balance and justice. Libra seeks equilibrium not through stasis but through dynamic relationship and conscious choice.",
    psychologicalExpression:
      "Relational awareness and value discernment. Your psychology develops through relationship—you become yourself through genuine connection. You naturally perceive multiple perspectives and the spaces between them. Self-knowledge comes through genuine dialogue and reflected understanding.",
    spiritualExpression:
      "The principle of harmony through honest engagement. Libra embodies the understanding that justice and beauty are spiritual practices. This is the spirituality of choice—consciously creating balance rather than accepting imposed harmony.",
    shadowExpression:
      "People-pleasing that sacrifices authenticity. Indecision masquerading as balance. Avoidance of conflict that breeds resentment. Projection of values onto others. Superficial charm replacing genuine connection.",
    healingPath:
      "Develop your own values independent of others' approval. Practice standing firmly for what matters, even if it disrupts harmony. Understand that real balance requires making difficult choices. Your gift is most powerful when grounded in authentic self-knowledge.",
    keywords: ["balance", "justice", "relationship", "aesthetics", "choice", "fairness"],
  },

  Scorpio: {
    element: "water",
    modality: "fixed",
    coreArchetype:
      "The Alchemist—the force of radical transformation through unflinching truth. Scorpio descends into darkness to bring hidden gold to light.",
    psychologicalExpression:
      "Psychological depth and transformative power. Your psychology operates through intense introspection and unflinching self-examination. You're drawn to what's hidden, complex, and taboo. Self-knowledge comes through confronting shadow material and emerging transformed. You develop wisdom through crisis and regeneration.",
    spiritualExpression:
      "The principle of death and rebirth as spiritual path. Scorpio embodies the understanding that transformation requires releasing what's outworn. This is the spirituality of initiation—moving through trials toward genuine power and wisdom.",
    shadowExpression:
      "Control and manipulation born from fear of vulnerability. Vengefulness toward those who hurt you. Obsessive intensity that consumes. Secrecy and isolation masquerading as depth. Power-seeking through psychological manipulation.",
    healingPath:
      "Share your truth while respecting boundaries. Transform jealousy into commitment; vengeance into healing. Understand that real power comes through authentic connection, not control. Your intensity is superpower when directed toward growth.",
    keywords: ["transformation", "depth", "power", "truth", "intensity", "regeneration"],
  },

  Sagittarius: {
    element: "fire",
    modality: "mutable",
    coreArchetype:
      "The Seeker—the archetypal explorer of meaning and possibility. Sagittarius aims the arrow toward horizon, always toward what's not yet known.",
    psychologicalExpression:
      "Visionary thinking and meaning-making. Your psychology operates through exploration, pattern-seeking, and the construction of meaning frameworks. You need to understand the larger context and purpose. Self-knowledge comes through experience and philosophical reflection. You develop wisdom by integrating diverse perspectives.",
    spiritualExpression:
      "The principle of expansion toward higher consciousness. Sagittarius embodies the understanding that growth is ongoing, that there's always more to discover. This is the spirituality of journey—the path itself being sacred.",
    shadowExpression:
      "Overconfidence disconnected from reality. Lack of follow-through on what's begun. Blind spots despite perceived wisdom. Recklessness disguised as adventure. Preaching rather than practicing.",
    healingPath:
      "Ground your vision in present reality. Complete what you begin before seeking the next horizon. Balance optimism with honesty about limitations. Understand that wisdom comes from integration, not accumulation. Your gifts serve others when embodied, not just theorized.",
    keywords: ["exploration", "meaning", "optimism", "wisdom", "expansion", "vision"],
  },

  Capricorn: {
    element: "earth",
    modality: "cardinal",
    coreArchetype:
      "The Builder—the principle of structure and earned authority. Capricorn is time made conscious, understanding that lasting creation requires patient effort.",
    psychologicalExpression:
      "Strategic clarity and responsible action. Your psychology operates through realistic assessment and step-by-step manifestation. You understand consequences and plan accordingly. Self-knowledge comes through responsibility and achievement. You develop maturity through facing limitations and working within them creatively.",
    spiritualExpression:
      "The principle of sacred responsibility and earned mastery. Capricorn embodies the understanding that spirit works through matter, that patience and integrity create enduring transformation. This is the spirituality of becoming an elder.",
    shadowExpression:
      "Coldness and emotional unavailability masquerading as strength. Excessive control born from fear. Overemphasis on status and external achievement. Self-punishment through work. Inability to rest or receive.",
    healingPath:
      "Soften rigid patterns without abandoning integrity. Allow yourself to play, rest, and feel without losing your edge. Understand that authority comes from character, not control. Your wisdom is most powerful when combined with warmth.",
    keywords: ["structure", "responsibility", "discipline", "achievement", "maturity", "integrity"],
  },

  Aquarius: {
    element: "air",
    modality: "fixed",
    coreArchetype:
      "The Revolutionary—the principle of consciousness evolution and collective awakening. Aquarius breaks the mold to reveal what's possible beyond current forms.",
    psychologicalExpression:
      "Visionary thinking and authentic individuation. Your psychology operates through ideation, pattern recognition, and commitment to collective good. You see what could be and work toward it. Self-knowledge comes through challenging convention and discovering your unique contribution. You develop through engagement with ideas and communities.",
    spiritualExpression:
      "The principle of consciousness breakthrough and collective elevation. Aquarius embodies the understanding that individual awakening serves the whole. This is the spirituality of revolution—reimagining what's possible.",
    shadowExpression:
      "Detachment masquerading as objectivity. Stubborn idealism disconnected from human needs. Alienation from community due to perceived superiority. Coldness and emotional unavailability. Rebellion for its own sake.",
    healingPath:
      "Let your revolutionary insights serve genuine human connection. Your unique vision matters—ground it in compassion. Understand that community requires vulnerability, not just shared ideas. Your gifts serve evolution when they include the heart.",
    keywords: ["innovation", "individuality", "community", "consciousness", "idealism", "revolution"],
  },

  Pisces: {
    element: "water",
    modality: "mutable",
    coreArchetype:
      "The Mystic—the principle of transcendence and unity. Pisces dissolves boundaries to reveal the ocean of connection underlying all separation.",
    psychologicalExpression:
      "Intuitive sensitivity and imaginative depth. Your psychology operates through feeling, imagination, and empathic resonance. You sense what's unspoken and perceive non-rational dimensions. Self-knowledge comes through dreams, imagination, and emotional exploration. You develop through surrendering rigid categories.",
    spiritualExpression:
      "The principle of mystical union and compassionate presence. Pisces embodies the understanding that all separation is ultimately illusion, that love is the fundamental reality. This is the spirituality of surrender—merging individual will with divine will.",
    shadowExpression:
      "Boundary dissolution that harms self and others. Escapism and fantasy replacing reality engagement. Victim consciousness and spiritual bypassing. Confusion about what's real. Over-absorption of others' emotions.",
    healingPath:
      "Anchor your spirituality in embodied reality and healthy boundaries. Your sensitivity is strength when paired with discernment. Understand that compassion includes saying no. Your gifts serve others when you maintain your own integrity.",
    keywords: ["spirituality", "compassion", "imagination", "intuition", "transcendence", "empathy"],
  },
};
