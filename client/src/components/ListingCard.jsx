/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingCard({ listing }) {
  return (
    <div className=" bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[200px] rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imagesUrl[0]}
          alt={listing.name}
          className="h-[320px] sm:h-[180px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg text-slate-700 font-semibold">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-4 h-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 font-semibold mt-2">
            {listing.offer
              ? listing.discountPrice.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })
              : listing.regularPrice.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
            {listing.type === "rent" && " / Mes"}
          </p>
          <div className="text-slate-600 flex items-center gap-3">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} habitaciones`
                : "1 habitación"}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baños`
                : "1 baño"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
