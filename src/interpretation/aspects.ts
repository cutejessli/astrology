// ============================================================
// Aspect Meanings and Symbolism
// ============================================================

export type AspectType = "conjunction" | "opposition" | "trine" | "square" | "sextile";

export interface AspectMeaning {
  dynamic: string;
  gift: string;
  challenge: string;
  integrationPath: string;
}

export const aspectMeanings: Record<AspectType, AspectMeaning> = {
  conjunction: {
    dynamic:
      "A union of planetary energies, blending their essential natures into a powerful synthesis. Where conjunction occurs, the two forces become almost inseparable in expression.",
    gift:
      "Potent focus and intensity in that area of life. These energies amplify each other, creating singular purpose and concentrated manifestation. The whole is greater than the sum of its parts.",
    challenge:
      "The energies can overwhelm without clear direction or become so fused that their individual qualities are lost. Excess in one area, or confusion about which impulse to follow.",
    integrationPath:
      "Consciously channel this merged energy toward a unified purpose. Name the distinct qualities of each force and learn when to emphasize each one. Your intensity is your superpower when directed with intention.",
  },

  opposition: {
    dynamic:
      "A polarity between two planetary forces, standing on opposite sides of your being. Opposition creates tension, awareness, and the need for integration between competing impulses.",
    gift:
      "Dynamic balance and the capacity to hold paradox. You naturally see multiple perspectives and can become an integrator of opposites. This aspect develops wisdom through understanding both sides.",
    challenge:
      "Oscillation between extremes without finding center. Projection of disowned qualities onto others. Internal civil war that creates indecision or external conflict.",
    integrationPath:
      "Recognize that both sides of the opposition have validity and serve a purpose. Seek the third point—the integration that honors both forces rather than choosing one. Practice holding both truths simultaneously.",
  },

  trine: {
    dynamic:
      "A harmonious flow between two planetary forces, creating ease and natural cooperation. Trine is the aspect of grace, where energies work together effortlessly.",
    gift:
      "Natural talent and ease of expression in that area. Things come more readily to you here. This is where your gifts flow without excessive struggle, and where you can offer genuine help to others.",
    challenge:
      "The ease can lead to complacency or taking gifts for granted. You may not develop depth in areas that come naturally, or may become lazy in areas that need cultivation.",
    integrationPath:
      "Consciously develop and refine your natural gifts rather than assuming they need no work. Use this ease as a foundation to go deeper. Remember that grace is not given to be hoarded but shared.",
  },

  square: {
    dynamic:
      "A 90-degree angle between two planetary forces, creating friction, urgency, and the pressure to grow. Square is the aspect of growth through challenge.",
    gift:
      "Tremendous motivating power to overcome obstacles and develop character. This friction creates resilience, determination, and the capacity to accomplish difficult things. You become strong through resistance.",
    challenge:
      "Internal tension and frustration that can feel paralyzing if you don't understand its purpose. The energies seem opposed, creating blocked energy, stress, or a sense of being at odds with yourself.",
    integrationPath:
      "Reframe the tension as fuel for growth rather than evidence of flaw. Name the obstacle clearly and commit to working with it consciously. Your squares are where you build real capability and wisdom.",
  },

  sextile: {
    dynamic:
      "A 60-degree angle between two planetary forces, creating opportunity and supportive connection. Sextile is subtler than trine but offers genuine cooperation without the passivity.",
    gift:
      "These energies support and enhance each other, creating opportunities for growth and expression. You have access to complementary skills and can develop them through practice and engagement.",
    challenge:
      "The opportunity is gentler than trine—it requires some effort to activate. You might overlook these gifts if you're not paying attention, or fail to capitalize on the support offered.",
    integrationPath:
      "Actively develop these supportive connections through practice and engagement. Recognize opportunity when it presents itself and take conscious steps toward it. This aspect rewards intention.",
  },
};
