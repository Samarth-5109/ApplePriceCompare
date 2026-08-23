import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import SecondaryCard from "./components/SecondaryCard";
import { ArrowDownRight, ArrowRight, Medal } from "lucide-react";
import { getComparePrices, getProductModel, getProductType } from "./api/products";
import countries from "./constants/countries";

function App() {
  const [selectedModel, setSelectedModel] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productModels, setProductModels] = useState([]);
  const [country1, setCountry1]= useState("India")
  const [country2, setCountry2]= useState("United Arab Emirates")
  const [comparison, setComparision]= useState(null)
  const [loading, setLoading]= useState(false)
  const [compareError, setCompareError]= useState("")

  useEffect(() => {
    const fetchProducts = async () => {
  try {
    const data = await getProductType();

    const products = Array.isArray(data)
      ? data
      : data?.productTypes || [];

    setProducts(products);

    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

fetchProducts();
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;

    const fetchModels = async () => {
      try {
        const data = await getProductModel(selectedProduct);
         
        const models=Array.isArray(data)?data:data?.models||[]
        setProductModels(models);

        if (models.length > 0) {
          setSelectedModel(models[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchModels();
  }, [selectedProduct]);

  const countryCode1 = countries.find(c => c.label === country1)?.value;
const countryCode2 = countries.find(c => c.label === country2)?.value;

  useEffect(()=>{
    if(!selectedModel||!countryCode1||!countryCode2) return

    const fetchComparision= async()=>{
      setLoading(true)
      setCompareError("")
      try{
        const data= await getComparePrices(selectedModel, countryCode1, countryCode2)
        setComparision(data)
      }catch(error){
        setCompareError("Failed to fetch comparison.")
      }finally{
        setLoading(false)
      }
    };
    fetchComparision()
  },[selectedModel, countryCode1, countryCode2])

  const selectedCountry1= countries.find(
    (country)=>country.label===country1
  )

  const selectedCountry2=countries.find(
    (country)=>country.label===country2
  )



  const formatCurrency=(amount, currency)=>{
    switch(currency){
      case "INR":return `₹${amount.toLocaleString()}`;
      case "USD":return `$${amount.toLocaleString()}`;
      case "GBP":return `£${amount.toLocaleString()}`;
      case "AED":return `AED${amount.toLocaleString()}`;
      default: return `${currency} ${amount.toLocaleString()}`;
    }
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-5xl px-5 py-5">
          <Header />

          {/* Search Card */}
          <div className="mt-6">
            <Card>
              <Input placeholder="Search products..." />
              <div className="mt-2 flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Product Type
                  </label>
                  <Select
                    value={selectedProduct}
                    onValueChange={setSelectedProduct}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {products.map((product) => {
                          return (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Product Model
                  </label>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {productModels.map((model) => {
                          return (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Country Cards */}

          <div className="flex gap-4 mt-6">
            <Card className="flex-1 bg-blue-500 p-4">
              <label className="block text-sm font-medium text-amber-50 mb-2">
                Country 1
              </label>
              <Select 
              value={country1}
              onValueChange={setCountry1}
              >
                <SelectTrigger className="w-full bg-amber-50 font-bold data-placeholder:text-gray-950">
                  <SelectValue placeholder="India"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((country) => {
                      return (
                        <SelectItem key={country.label} value={country.label}>
                          {country.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Card>

            <Card className="flex-1 bg-purple-500 p-4">
              <label className="block text-sm font-medium text-amber-50 mb-2">
                Country 2
              </label>
              <Select
              value={country2}
              onValueChange={setCountry2}
              >
                <SelectTrigger className="w-full bg-amber-50 font-bold data-placeholder:text-gray-950">
                  <SelectValue placeholder="United Arab Emirates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((country) => {
                      return (
                        <SelectItem key={country.label} value={country.label}>
                          {country.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Card>
          </div>

          {/* selected product result*/}

          <Card className="mt-6">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {selectedModel}
              </p>
              <p className="text-gray-500">{selectedProduct}</p>
            </div>
          </Card>

          {/* Result */}

          <Card className="mt-6">
            <div className="flex justify-between">
            {(loading||compareError)?(
              <p className="text-center text-gray-500">Loading prices...</p>
            ):comparison?(
              <>
              <SecondaryCard
                flag={selectedCountry1?.flag}
                color="blue"
                country={country1}
                currency={selectedCountry1?.currency}
                price={formatCurrency(comparison.comparison.country1.price, selectedCountry1?.currency)}
                usd={`~ $${comparison.comparison.country1.price.toLocaleString()}USD`}
              />
              <div className="flex flex-col gap-3 justify-center">
                <ArrowRight className="mx-auto text-purple-500 w-9 h-9" />
                <div className="w-35 h-fit flex flex-col text-center bg-green-200 rounded-lg p-4 gap-2">
                  <ArrowDownRight className="mx-auto text-green-700" />
                  <p className="text-sm font-medium text-green-900">
                    {Math.abs(comparison.difference.percentage)}% cheaper
                  </p>
                  <p className="text-xs text-green-700">in {comparison.difference.cheaperCountry}</p>
                </div>
              </div>
              <SecondaryCard
                flag={selectedCountry2?.flag}
                color="purple"
                country={country2}
                currency={selectedCountry2?.currency}
                price={formatCurrency(comparison.comparison.country2.price, selectedCountry2?.currency )}
                usd={`~ $${comparison.comparison.country2.price.toLocaleString()}USD`}
              />
              </>
            ):(
              <p className="text-center text-gray-500">Select a model and countries to compare</p>
            )}
            </div>
          </Card>
          {/* Savings */}
          {
            comparison &&(

          <Card className="bg-yellow-100 mt-6">
            <div className="flex flex-col text-center justify-center items-center gap-2">
              <div className="flex items-center gap-1">
                <Medal className="text-yellow-600" />
                <p className="text-yellow-700 font-medium">Potential Savings</p>
              </div>
              <p className="text-yellow-900 font-bold text-2xl">{formatCurrency(comparison.savings.amount, "USD")}</p>
              <p className="text-yellow-700 text-sm">
                by buying in {comparison.savings.country}
              </p>
            </div>
          </Card>
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;
