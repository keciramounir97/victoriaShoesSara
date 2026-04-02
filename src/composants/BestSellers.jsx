import Badge from './Badge';
import Button from './Button';
import {ArrowRight} from "lucide-react"
import {products} from "../data" 
import "../styles/bestSellers.css"
export default function BestSellers(){
   
    return <>
  <section className="bg-gradient-to-br from-rose-50 to-amber-50  rounded-2xl mt-20 mx-7">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2  lg:text-left sm:text-center pl-6">
          <Badge className="mb-4 bg-amber-500 text-white mt-4 ">Best-sellers</Badge>
            <h2 className=" text-prf text-2xl  mb-4">Nos produits préférés</h2>
            <p className="text-gray-600 mb-6">Découvrez les chaussures les plus appréciées par nos clients</p>
            <Button className="bg-rose-500 hover:bg-rose-600" onClick={() => { }}>
              Découvrir <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {products.filter(p => p.isBestseller).slice(0, 4).map(p => (
              <div key={p.id} onClick={() => openProductDetail(p)} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md mt-6">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 " />
              </div>
            ))}
          </div>
        </div>
      </section>
     </>
}