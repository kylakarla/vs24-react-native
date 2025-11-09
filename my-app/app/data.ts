export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return data.map((item: any) => ({
      id: String(item.id),
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
    }));
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
};