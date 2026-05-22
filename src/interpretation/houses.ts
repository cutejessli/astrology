// ============================================================
// Astrological House Meanings and Life Domains
// ============================================================

type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface HouseMeaning {
  title: string;
  lifeArea: string;
  coreTheme: string;
  psychologicalExpression: string;
  spiritualExpression: string;
  shadowExpression: string;
  healingPath: string;
  keywords: string[];
}

export const houseMeanings: Record<HouseNumber, HouseMeaning> = {
  1: {
    title: "The Self",
    lifeArea: "Identity, embodiment, first impression, personal emergence",
    coreTheme: "How you show up in the world. The 1st house is your presence, embodiment, and first movement into life.",
    psychologicalExpression: "Self-concept, body awareness, personal agency, instinctive presentation, and the way you initiate experience.",
    spiritualExpression: "Spirit taking form through the body, the sacred act of incarnation, visibility, and embodied presence.",
    shadowExpression: "Rigid identity, excessive self-focus, disconnection from the body, or performing a false self.",
    healingPath: "Inhabit your body with acceptance, allow identity to evolve, and let authentic presence be enough.",
    keywords: ["identity", "body", "presence", "emergence", "self", "appearance"],
  },
  2: {
    title: "Resources and Values",
    lifeArea: "Money, possessions, body, self-worth, personal resources",
    coreTheme: "What sustains you and what you value. The 2nd house describes resources, embodiment, and worth.",
    psychologicalExpression: "Self-worth, earning capacity, receiving, stability needs, and the felt sense of deserving.",
    spiritualExpression: "The sacredness of matter, gratitude, stewardship, and the body as a vessel of value.",
    shadowExpression: "Scarcity mindset, hoarding, over-attachment to possessions, or tying worth only to material proof.",
    healingPath: "Build inner worth, receive without guilt, and align material life with true values.",
    keywords: ["resources", "money", "values", "self-worth", "body", "security"],
  },
  3: {
    title: "Mind and Communication",
    lifeArea: "Thinking, communication, siblings, local environment, learning",
    coreTheme: "How the mind connects experience into meaning through language, perception, and local relationship.",
    psychologicalExpression: "Thinking style, speech patterns, learning, curiosity, sibling dynamics, and everyday exchange.",
    spiritualExpression: "Sacred communication, the bridge between minds, and understanding as a path of connection.",
    shadowExpression: "Scattered thought, compulsive talking, manipulation through language, or inherited mental noise.",
    healingPath: "Listen deeply, speak with discernment, and let curiosity become understanding rather than distraction.",
    keywords: ["communication", "mind", "learning", "siblings", "curiosity", "perception"],
  },
  4: {
    title: "Roots and Home",
    lifeArea: "Family, ancestry, home, emotional foundation, the past",
    coreTheme: "Where you come from, what grounds you, and how emotional safety is created or repaired.",
    psychologicalExpression: "Family patterns, private emotional life, belonging, home, memory, and early conditioning.",
    spiritualExpression: "Ancestral ground, inner sanctuary, lineage healing, and the sacred root system beneath the visible life.",
    shadowExpression: "Unresolved family trauma, clinging to the past, emotional dependency, or inability to create safety.",
    healingPath: "Honor your roots without being bound by them, and build an inner and outer home that nourishes truth.",
    keywords: ["home", "family", "roots", "ancestry", "belonging", "foundation"],
  },
  5: {
    title: "Creative Self-Expression",
    lifeArea: "Creativity, joy, romance, children, play, self-expression",
    coreTheme: "Where your unique light becomes visible through joy, creation, romance, and play.",
    psychologicalExpression: "Creative confidence, pleasure, performance, romance, children, and the willingness to be seen.",
    spiritualExpression: "Divine creativity moving through the individual heart as joy, art, and authentic radiance.",
    shadowExpression: "Attention-seeking, creative shame, blocked joy, addictive pleasure, or fear of being seen imperfectly.",
    healingPath: "Create for the joy of creating, share your gifts, and let play restore the soul.",
    keywords: ["creativity", "joy", "romance", "children", "play", "expression"],
  },
  6: {
    title: "Work and Service",
    lifeArea: "Work, health, daily practice, service, craft, routine",
    coreTheme: "How daily life becomes a practice of refinement, service, health, and useful devotion.",
    psychologicalExpression: "Work habits, health patterns, skill-building, service, routines, and practical self-care.",
    spiritualExpression: "The sacred ordinary, devotion through craft, and healing through consistent embodied practice.",
    shadowExpression: "Perfectionism, burnout, martyrdom, health anxiety, or work disconnected from deeper purpose.",
    healingPath: "Serve sustainably, refine without self-punishment, and make daily rhythm a form of devotion.",
    keywords: ["work", "health", "service", "routine", "craft", "practice"],
  },
  7: {
    title: "Partnership and Mirrors",
    lifeArea: "Relationships, marriage, committed partnership, contracts, mirrors",
    coreTheme: "How you meet the other and discover yourself through committed relationship.",
    psychologicalExpression: "Partnership patterns, projection, intimacy, contracts, cooperation, and the qualities sought in others.",
    spiritualExpression: "Relationship as mirror, sacred contract, and the path of meeting another without abandoning the self.",
    shadowExpression: "Projection, dependency, avoidance of intimacy, people-pleasing, or choosing partners from old wounds.",
    healingPath: "Relate from wholeness, practice honest reciprocity, and use mirrors for growth rather than blame.",
    keywords: ["partnership", "relationship", "mirrors", "contracts", "commitment", "relating"],
  },
  8: {
    title: "Transformation and Intimacy",
    lifeArea: "Shared resources, intimacy, death and rebirth, sexuality, shadow, transformation",
    coreTheme: "Where old forms dissolve and deeper power, trust, and intimacy are forged.",
    psychologicalExpression: "Vulnerability, shared power, sexuality, inheritance, crisis, shadow work, and psychological depth.",
    spiritualExpression: "Initiation, alchemy, surrender, regeneration, and the sacred mystery of death and rebirth.",
    shadowExpression: "Control, obsession, manipulation, fear of vulnerability, or entanglement through shared power.",
    healingPath: "Meet shadow honestly, build trust consciously, and let transformation release what is no longer alive.",
    keywords: ["transformation", "intimacy", "shadow", "sexuality", "shared resources", "rebirth"],
  },
  9: {
    title: "Wisdom and Meaning",
    lifeArea: "Philosophy, higher learning, spirituality, travel, belief systems, truth-seeking",
    coreTheme: "How you seek meaning, expand perspective, and orient life toward larger truth.",
    psychologicalExpression: "Beliefs, worldview, study, travel, teachers, philosophy, and the search for purpose.",
    spiritualExpression: "The pilgrimage of consciousness, wisdom traditions, faith, and the sacred horizon beyond the known.",
    shadowExpression: "Dogma, arrogance, spiritual bypassing, restless escape, or preaching what has not been embodied.",
    healingPath: "Let belief evolve through experience, integrate wisdom into practice, and stay humble before truth.",
    keywords: ["wisdom", "meaning", "belief", "travel", "philosophy", "spirituality"],
  },
  10: {
    title: "Calling and Public Role",
    lifeArea: "Career, vocation, public reputation, authority, legacy, social standing",
    coreTheme: "What you are called to build, contribute, and become visible for in the world.",
    psychologicalExpression: "Ambition, vocation, public identity, authority, achievement, legacy, and social responsibility.",
    spiritualExpression: "Dharma, sacred contribution, mature authority, and the offering of gifts to collective life.",
    shadowExpression: "Status-chasing, burnout, living someone else's vision, control, or public success without inner alignment.",
    healingPath: "Build authority through integrity, clarify your real calling, and let legacy arise from lived values.",
    keywords: ["career", "calling", "authority", "legacy", "reputation", "purpose"],
  },
  11: {
    title: "Community and Future Vision",
    lifeArea: "Friendships, networks, community, collective contribution, future vision, groups",
    coreTheme: "How individual gifts participate in community, shared vision, and collective evolution.",
    psychologicalExpression: "Friendship, belonging, networks, ideals, group identity, future planning, and social contribution.",
    spiritualExpression: "Collective awakening, shared possibility, and the spiritual intelligence of community.",
    shadowExpression: "Alienation, conformity, detachment, ideological rigidity, or losing the self to group identity.",
    healingPath: "Bring authentic individuality into genuine community and ground future vision in present action.",
    keywords: ["community", "friendship", "networks", "future", "vision", "collective"],
  },
  12: {
    title: "Spiritual Dissolution",
    lifeArea: "Unconscious, dreams, solitude, karma, surrender, hidden dimensions",
    coreTheme: "Where ego softens and the soul encounters mystery, solitude, and the unseen field beneath life.",
    psychologicalExpression: "Dreams, hidden patterns, unconscious material, solitude, retreat, compassion, and psychic sensitivity.",
    spiritualExpression: "Mystical surrender, karma, dissolution, divine union, and the ocean beyond separate identity.",
    shadowExpression: "Escapism, isolation, victimhood, blurred boundaries, spiritual bypassing, or unconscious self-undoing.",
    healingPath: "Use solitude for real practice, bring shadow to awareness, and keep compassion anchored in boundaries.",
    keywords: ["unconscious", "dreams", "solitude", "karma", "surrender", "mysticism"],
  },
};
