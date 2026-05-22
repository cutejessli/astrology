// ============================================================
// Aspect Meanings and Interpretation
// ============================================================

import { AspectType } from "../aspects";

export interface AspectMeaning {
  dynamic: string;
  gift: string;
  challenge: string;
  integrationPath: string;
  keywords: string[];
}

export const aspectMeanings: Record<AspectType, AspectMeaning> = {
  conjunction: {
    dynamic:
      "A fusion of two planetary energies, where their essential natures merge and amplify. Conjunction creates singular focus—what touches here becomes intensified and concentrated in expression.",
    gift:
      "Potent power and undivided presence in this domain of life. When consciously engaged, these fused energies channel with remarkable clarity and force. This is where your greatest intensity becomes your strongest resource.",
    challenge:
      "Overwhelming power without clear direction. The merged energies can become compulsive, obsessive, or so fused that neither force is distinguishable. Excess in expression, or confusion about which impulse is dominating.",
    integrationPath:
      "Consciously channel this concentrated power toward meaningful purpose. Learn to modulate intensity—sometimes turning it up fully, sometimes tempering it. Your fusion is superpower when directed with intention. Understand that this concentration asks for maturity and responsibility.",
    keywords: ["fusion", "intensity", "power", "focus", "amplification", "concentration"],
  },

  opposition: {
    dynamic:
      "A polarity where two planetary forces stand across from each other in your being, creating inherent tension and awareness. Opposition is the aspect of projection—what you see in others often reflects your own disowned potential.",
    gift:
      "Dynamic balance and the capacity to integrate opposites. You naturally see multiple sides and can become a bridge between polarities. This aspect develops wisdom by forcing you to understand both perspectives as valid. You become wise through holding paradox.",
    challenge:
      "Oscillation between extremes without finding center. Unconscious projection of disowned qualities onto others, creating external conflict that mirrors internal war. Difficulty choosing or committing without feeling betrayal of the other side.",
    integrationPath:
      "Recognize that both poles are parts of you, not enemies. The integration point lies not in choosing one over the other, but in finding the deeper principle they both serve. Practice honoring both energies simultaneously. Your wisdom emerges when you stop choosing and start integrating.",
    keywords: ["polarity", "projection", "balance", "witness", "integration", "paradox"],
  },

  trine: {
    dynamic:
      "A harmonious angle where two planetary energies flow naturally together, creating ease and cooperation. Trine is the aspect of grace—here, things work with your efforts rather than against them.",
    gift:
      "Natural talent and effortless cooperation in this area. Gifts come readily; skills develop more easily than elsewhere in your chart. This is where you can offer genuine help and where growth happens almost despite yourself. Here, you are naturally capable.",
    challenge:
      "The ease can breed complacency or invisibility. You might take these gifts for granted or not develop them as deeply as you could. The flow can become so automatic that you lose consciousness of the process. Potential becomes wasted through lack of attention.",
    integrationPath:
      "Consciously develop and refine what comes naturally. Don't assume ease means mastery—go deeper. Use this harmony as a foundation for sophisticated expression. Remember that grace is not given to be overlooked but to be honored through conscious cultivation and generous sharing.",
    keywords: ["ease", "flow", "harmony", "gift", "grace", "cooperation"],
  },

  square: {
    dynamic:
      "A 90-degree tension where two planetary energies create friction and pressure. Square is the aspect of growth—the friction itself is the fuel for development. Here, nothing comes easy, but everything you gain is earned and deeply integrated.",
    gift:
      "Tremendous motivating power and resilience. This aspect drives you to overcome obstacles and develop real capability. You become strong through resistance. The friction creates urgency that pushes you toward mastery. This is where you build character and genuine competence.",
    challenge:
      "Internal frustration and blocked energy that can feel paralyzing if you don't understand its purpose. The energies seem opposed, creating stress, self-doubt, or a sense that something is fundamentally wrong. You may experience chronic tension or feel perpetually at odds with yourself.",
    integrationPath:
      "Reframe the friction as fuel rather than flaw. Name the specific conflict clearly and commit to working with it consciously. The tension is asking you to develop new capacity. Your squares are where real strength is built. Honor the pressure as invitation to grow, not evidence of dysfunction.",
    keywords: ["friction", "challenge", "growth", "tension", "resilience", "mastery"],
  },

  sextile: {
    dynamic:
      "A 60-degree angle where two planetary energies support and enhance each other, creating opportunity and cooperation. Sextile is more subtle than trine—the gifts are real but require some effort to activate.",
    gift:
      "These energies naturally complement each other, creating genuine opportunity for growth. You have access to skills and support that, with practice, can develop into real capability. This is where potential meets willingness—if you show up, the cooperation is available.",
    challenge:
      "The opportunity can be overlooked because it's less insistent than square friction or as obvious as trine ease. You might fail to capitalize on support that's offered. Without conscious engagement, this potential quietly disappears from view.",
    integrationPath:
      "Actively develop these complementary energies through practice and engagement. Show up consistently even when the motivation isn't forced by pressure. Recognize opportunity when it presents itself and take deliberate steps toward it. This aspect rewards intention and attention.",
    keywords: ["opportunity", "cooperation", "support", "skill-building", "engagement", "potential"],
  },
};
