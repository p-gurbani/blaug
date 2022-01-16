import Request from "./Request";

export const uploadFile = async (file) => {
  if (file) {
    const data = new FormData();
    const filename = "BLG_" + Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);
    try {
      const result = await Request.post("upload", data);
      if (result.success) {
        return filename;
      }
    } catch (err) {}
  } else {
    return null;
  }
};
