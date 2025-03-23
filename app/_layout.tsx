import { Slot } from "expo-router";
import { Providers } from "@/components/providers";

export default function RootLayout() {
  return (
    <Providers>
      <Slot />
    </Providers>
  );
}
