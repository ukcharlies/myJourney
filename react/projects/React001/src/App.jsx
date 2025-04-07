import { ListData } from "./component/ListData";
import { Product } from "./component/Product";
import { Students } from "./component/Students";
import { MyForm } from "./component/MyForm";
import { ControlledForm } from "./component/controlledForm";
import { RHForm } from "./component/RHForm";
import { Zod } from "./component/Zod";
export default function App() {
  const langs = ["JavaScript", "TypeScript", "Python", "Java", "PHP"];
  const countries = ["Nigeria", "Ghana", "SA", "Kenya"];
  const countryLogger = (theCountry) => {
    console.log(theCountry);
  };

  return (
    <div className="text-base p-6">
      <h1 className="text-4xl font-bold text-blue-500">
        Welcome to React + Tailwind CSS with Vite!
      </h1>
      <p className="mt-4 text-gray-700">Start building something amazing 🚀</p>
      <ListData langs={langs} logger={countryLogger} countries={countries} />
      <Product />
      <Students />
      <Zod />
    </div>
  );
}
