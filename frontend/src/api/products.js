const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const getProductType = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/types`);
    if (!response.ok) throw new Error(`HTTP${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch error", error);
    throw error;
  }
};

const getProductModel = async (product) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/products/models?product=${product}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Post error:", error);
    throw error;
  }
};

export { getProductType, getProductModel };
