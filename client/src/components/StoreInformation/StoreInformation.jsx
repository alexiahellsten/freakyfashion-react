import { Earth, Plane, ShieldHalf, Smile } from "lucide-react";

function StoreInformation() {
  return (
    <section class="store-information flex flex-col items-center gap-7 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-0 w-full">
      <div class="flex items-center justify-center gap-2.5 sm:m-2.5 sm:p-3.5">
        <Earth />
        <h3 class="text-center text-lg">Gratis frakt och returer</h3>
      </div>
      <div class="flex items-center justify-center gap-2.5 sm:m-2.5 sm:p-3.5">
        <Plane />
        <h3 class="text-center text-lg">Expressfrakt</h3>
      </div>
      <div class="flex items-center justify-center gap-2.5 sm:m-2.5 sm:p-3.5">
        <ShieldHalf />
        <h3 class="text-center text-lg">Säkra betalningar</h3>
      </div>
      <div class="flex items-center justify-center gap-2.5 sm:m-2.5 sm:p-3.5">
        <Smile />
        <h3 class="text-center text-lg">Nyheter varje dag</h3>
      </div>
    </section>
  );
}
export default StoreInformation;
