/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Navigation } from "swiper/modules"
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa"
import { useSelector } from "react-redux"
import Contact from "../components/Contact"

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null)
  const[loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(false)
  const params = useParams()
  const {currentUser} = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
      setLoading(true)
      const res = await fetch(`/api/listing/get/${params.id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true)
        setLoading(false)
        return;
      }
      setListing(data);
      setLoading(false)
      setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
   fetchData()
   setLoading(false)
  }, [params.id])
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Upps!! Algo fue mal.</p>
      )}

      {listing && !loading && !error && (
        <div>
          <Swiper navigation={true}>
            {listing.imagesUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className=" h-[420px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[18%] right-[3%] z-10 bg-white shadow-lg rounded-full w-12 h-12 flex justify-center items-center cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
            {copied && (
              <p className="absolute top-[120%] text-white bg-slate-700 rounded-md px-2 py-1">
                Link Copiado
              </p>
            )}
          </div>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} -
              <span className="text-slate-600 ml-2">
                {listing.offer
                  ? listing.discountPrice.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })
                  : listing.regularPrice.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })}
                {listing.type === "rent" && " / month"}
              </span>
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-44 text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer === true && (
                <p className="bg-green-900 w-full max-w-44 text-white text-center p-1 rounded-md">
                  {+listing.regularPrice - +listing.discountPrice} € descuento
                </p>
              )}
            </div>

            <p className="text-slate-700 xl:text-lg px-3 sm:px-0">
              <span className="font-semibold text-black">Descripcion - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 px-3 sm:px-0">
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} cuartos`
                  : "cuarto"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1 ? `${listing.bathrooms} baños` : "baño"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking" : "Sin Parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Amueblado" : "No Amueblado"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={() => setContact(true)} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-white hover:text-slate-700 hover:outline">Contact landlord</button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
