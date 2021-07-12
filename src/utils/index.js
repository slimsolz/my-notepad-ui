export const getTitle = (content) => {
  return content.length > 50 ? content.substring(0, 50) + "..." : content;
};
