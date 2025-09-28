// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // lihtsalt suuna esmalt splash ekraanile
  return <Redirect href="/splash" />;
}