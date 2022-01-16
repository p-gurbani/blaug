exports.sanitizeUser = (user) => {
  const { hash, salt, ...otherInfo } = user._doc;
  return otherInfo;
};
