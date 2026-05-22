// ============================================================
// Planet Meanings and Symbolism
// ============================================================

import { Planet } from "../core";

export interface PlanetMeaning {
  coreMeaning: string;
  psychologicalFunction: string;
  spiritualFunction: string;
  shadowExpression: string;
  healingPath: string;
  keywords: string[];
}

export const planetMeanings: Record<Planet, PlanetMeaning> = {
  sun: {
    coreMeaning: "The radiant core of selfhood, essential life force, conscious will, and creative identity.",
    psychologicalFunction: "Ego structure, personal agency, self-expression, and the desire to live from an authentic center.",
    spiritualFunction: "The inner divine spark, creative vitality, and the path of conscious purpose.",
    shadowExpression: "Rigid identity, pride, domination, burnout, or needing constant validation to feel real.",
    healingPath: "Embody your authentic light with humility, consistency, and generosity.",
    keywords: ["identity", "will", "vitality", "purpose", "creativity", "selfhood"],
  },
  moon: {
    coreMeaning: "The emotional body, instinct, memory, inner safety, and the private self beneath conscious performance.",
    psychologicalFunction: "Emotional responses, needs, attachment patterns, comfort, protection, and unconscious habits.",
    spiritualFunction: "Intuition, cycles, ancestral memory, receptivity, and the sacred intelligence of feeling.",
    shadowExpression: "Emotional reactivity, clinging to the past, dependency, moodiness, or manipulative vulnerability.",
    healingPath: "Honor feelings without being ruled by them, and build inner safety through compassionate awareness.",
    keywords: ["emotion", "instinct", "intuition", "memory", "security", "nurturing"],
  },
  mercury: {
    coreMeaning: "The messenger mind, communication, perception, learning, translation, and connective intelligence.",
    psychologicalFunction: "Thinking style, speech, curiosity, analysis, adaptability, and how information is processed.",
    spiritualFunction: "The bridge between worlds, sacred language, symbolic understanding, and conscious exchange.",
    shadowExpression: "Scattered thinking, nervous overactivity, manipulation through words, gossip, or over-intellectualizing.",
    healingPath: "Speak with discernment, listen deeply, and let intellect serve wisdom rather than avoidance.",
    keywords: ["communication", "thinking", "learning", "curiosity", "language", "connection"],
  },
  venus: {
    coreMeaning: "The principle of love, attraction, beauty, value, pleasure, harmony, and relational magnetism.",
    psychologicalFunction: "Relational style, values, aesthetics, affection, receptivity, and what feels desirable or worthy.",
    spiritualFunction: "Divine love, creative magnetism, harmony, beauty as devotion, and the sacred art of receiving.",
    shadowExpression: "People-pleasing, possessiveness, vanity, dependency, seduction without truth, or confusing worth with approval.",
    healingPath: "Root love in self-worth, choose beauty with integrity, and give and receive without abandoning yourself.",
    keywords: ["love", "value", "beauty", "attraction", "pleasure", "relationship"],
  },
  mars: {
    coreMeaning: "The warrior force of action, desire, courage, heat, assertion, sexuality, and directed will.",
    psychologicalFunction: "Drive, anger, initiative, boundaries, competition, pursuit, and the ability to act on desire.",
    spiritualFunction: "Sacred fire, courageous embodiment, protection of life force, and action in service of purpose.",
    shadowExpression: "Aggression, recklessness, domination, suppressed anger, impulsive conflict, or force without wisdom.",
    healingPath: "Channel fire into purposeful action, clean boundaries, and courageous integrity.",
    keywords: ["action", "courage", "desire", "drive", "assertion", "boundaries"],
  },
  jupiter: {
    coreMeaning: "The principle of expansion, meaning, faith, wisdom, growth, opportunity, and blessing.",
    psychologicalFunction: "Optimism, worldview, philosophy, generosity, learning, confidence, and the search for larger meaning.",
    spiritualFunction: "Grace, benevolence, spiritual expansion, higher wisdom, and trust in a larger order.",
    shadowExpression: "Excess, overconfidence, dogma, entitlement, avoidance through optimism, or ungrounded promise.",
    healingPath: "Balance faith with discernment, expansion with responsibility, and generosity with grounded truth.",
    keywords: ["growth", "meaning", "wisdom", "faith", "abundance", "expansion"],
  },
  saturn: {
    coreMeaning: "The teacher of time, structure, discipline, responsibility, boundaries, maturity, and earned mastery.",
    psychologicalFunction: "Commitment, realism, fear, endurance, authority, limits, accountability, and long-term construction.",
    spiritualFunction: "Sacred responsibility, karmic maturation, elder wisdom, and spirit made durable through form.",
    shadowExpression: "Rigidity, fear, control, shame, pessimism, self-punishment, or walls mistaken for boundaries.",
    healingPath: "Transform fear into mature structure, and build slowly with patience, integrity, and self-respect.",
    keywords: ["structure", "discipline", "time", "responsibility", "boundaries", "maturity"],
  },
  uranus: {
    coreMeaning: "The awakener, liberator, disruptor, innovator, and lightning force of individuation.",
    psychologicalFunction: "Originality, rebellion, breakthrough thinking, nervous electricity, and refusal of false conformity.",
    spiritualFunction: "Higher mind, sudden awakening, freedom, collective evolution, and the shock of expanded consciousness.",
    shadowExpression: "Chaos, detachment, alienation, rebellion without purpose, or disruption that never grounds into change.",
    healingPath: "Ground your uniqueness into useful liberation and let freedom serve connection rather than escape.",
    keywords: ["awakening", "freedom", "innovation", "disruption", "individuality", "revolution"],
  },
  neptune: {
    coreMeaning: "The mystic ocean of imagination, compassion, transcendence, dreams, surrender, and subtle perception.",
    psychologicalFunction: "Sensitivity, idealism, fantasy, empathy, longing, porous boundaries, and symbolic imagination.",
    spiritualFunction: "Mystical union, divine compassion, ego dissolution, devotion, and direct contact with the unseen.",
    shadowExpression: "Escapism, illusion, denial, victimhood, addiction to fantasy, or spirituality without embodiment.",
    healingPath: "Anchor compassion in boundaries, discern intuition from projection, and make mystical insight livable.",
    keywords: ["spirituality", "dreams", "compassion", "imagination", "mysticism", "surrender"],
  },
  pluto: {
    coreMeaning: "The force of death, rebirth, shadow, power, compulsion, depth, and radical transformation.",
    psychologicalFunction: "Shadow work, crisis, survival instincts, psychological depth, control patterns, and regeneration.",
    spiritualFunction: "Alchemy, initiation, descent, soul power, and the truth that emerges after false forms die.",
    shadowExpression: "Manipulation, obsession, secrecy, domination, fear of vulnerability, or destructive control.",
    healingPath: "Meet shadow honestly, release what is dead, and reclaim power through transformation rather than control.",
    keywords: ["transformation", "power", "shadow", "regeneration", "depth", "alchemy"],
  },
};
