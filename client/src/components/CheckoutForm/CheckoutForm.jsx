import { useBasket } from "../../contexts/BasketContext";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CheckoutForm() {
  const { dispatch } = useBasket();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "CLEAR_BASKET" });

    navigate("/order-confirmation");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Kunduppgifter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="text-base">
                  Förnamn
                </Label>
                <Input type="text" id="firstname" name="firstname" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="text-base">
                  Efternamn
                </Label>
                <Input type="text" id="lastname" name="lastname" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                E-post
              </Label>
              <Input type="email" id="email" name="email" required />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Adress</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street" className="text-base">
                  Gata
                </Label>
                <Input type="text" id="street" name="street" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalcode" className="text-base">
                    Postnummer
                  </Label>
                  <Input
                    type="number"
                    id="postalcode"
                    name="postalcode"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-base">
                    Stad
                  </Label>
                  <Input type="text" id="city" name="city" required />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" name="newsletter" />
            <Label htmlFor="newsletter" className="text-sm font-normal">
              Jag vill ta emot nyhetsbrev
            </Label>
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" className="p-4 m-2 text-base">
              Köp
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export default CheckoutForm;

// import { useBasket } from "../../contexts/BasketContext";
// // import { useNavigate } from "react-router";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// function CheckoutForm() {
//   const { dispatch } = useBasket();
//   //   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch({ type: "CLEAR_BASKET" });

//     alert("Ditt köp har gått igenom!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle className="text-2xl font-semibold">
//             Kunduppgifter
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstname" className="text-base">
//                   Förnamn
//                 </Label>
//                 <Input type="text" id="firstname" name="firstname" required />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastname" className="text-base">
//                   Efternamn
//                 </Label>
//                 <Input type="text" id="lastname" name="lastname" required />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-base">
//                 E-post
//               </Label>
//               <Input type="email" id="email" name="email" required />
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-medium">Adress</h3>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="street" className="text-base">
//                   Gata
//                 </Label>
//                 <Input type="text" id="street" name="street" required />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="postalcode" className="text-base">
//                     Postnummer
//                   </Label>
//                   <Input
//                     type="number"
//                     id="postalcode"
//                     name="postalcode"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="city" className="text-base">
//                     Stad
//                   </Label>
//                   <Input type="text" id="city" name="city" required />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <Checkbox id="newsletter" name="newsletter" />
//             <Label htmlFor="newsletter" className="text-sm font-normal">
//               Jag vill ta emot nyhetsbrev
//             </Label>
//           </div>

//           <div className="flex justify-center pt-4">
//             <Button type="submit" className="p-4 m-2 text-base">
//               Köp
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </form>
//   );
// }

// export default CheckoutForm;
