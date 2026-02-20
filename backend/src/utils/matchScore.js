const skillName = (s) => (typeof s === 'string' ? s : s?.name || '');

export const calcMatchScore = (viewer, target) => {
  const viewerWanted = new Set((viewer.skillsWanted || []).map(skillName).filter(Boolean));
  const viewerOffered = new Set((viewer.skillsOffered || []).map(skillName).filter(Boolean));
  const reasons = [];
  let score = 0;

  (target.skillsOffered || []).forEach((skillObj) => {
    const skill = skillName(skillObj);
    if (viewerWanted.has(skill)) {
      score += 3;
      reasons.push(`They offer: ${skill}`);
    }
  });

  (target.skillsWanted || []).forEach((skillObj) => {
    const skill = skillName(skillObj);
    if (viewerOffered.has(skill)) {
      score += 2;
      reasons.push(`They want: ${skill}`);
    }
  });

  if (viewer.college && target.college && viewer.college === target.college) {
    score += 1;
    reasons.push('Same college');
  }

  if (target.isVerified) {
    score += 1;
    reasons.push('Verified profile');
  }

  return { matchScore: score, reasons: [...new Set(reasons)] };
};
