export const calcMatchScore = (viewer, target) => {
  const viewerWanted = new Set(viewer.skillsWanted || []);
  const viewerOffered = new Set(viewer.skillsOffered || []);
  let score = 0;
  (target.skillsOffered || []).forEach((skill) => {
    if (viewerWanted.has(skill)) score += 2;
  });
  (target.skillsWanted || []).forEach((skill) => {
    if (viewerOffered.has(skill)) score += 1;
  });
  return score;
};
